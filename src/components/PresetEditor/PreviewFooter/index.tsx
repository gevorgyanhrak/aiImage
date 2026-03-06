import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Flex } from '@radix-ui/themes';

import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/store';
import postJson from '@/utils/postJson';
import { AI_IMAGE_BASE_URL } from '@/constants/globals';
import redirectToExternalDomain from '@/utils/redirectToExternalDomain';
import checkIsMobile from '@/utils/checkIsMobile';
import { MediaType } from '@/types/media';
import buildPreset from '@/utils/buildPreset';
import type { LandingTextItem, LandingUploadItem, Transformation } from '@/types/landing';
import { TEST_IDS } from './constants/testIds';
import type { IPreviewImage, IPreviewState } from '@/store/preview';
import { getPresetGenMiniappContent } from '@/constants/presetGenMiniappContent';
import type { InputItemType } from '@/types/presetGenMiniappContent';
import { AD_URL_PARAMS } from '@/constants/analytics';
import type { SectionItemWithFlow } from '@/types/sectionItem';
import { PULSE_NAMES } from '@/constants/pulseNames';
import { cn } from '@/lib/utils';
import sendFacebookPixelEvent from '@/utils/sendFacebookPixelEvent';
import { FacebookPixelEvent } from '@/types/facebookPixel';

interface IPreviewFooter {
  id: number;
  primaryActionTitle: string;
  prompt: string;
  ariaLabel: string;
  redirectionUrl: string;
  textItemsData: LandingTextItem[];
  ids: string[];
  media: SectionItemWithFlow;
  transformations?: Transformation[];
  scrollOnEmptyInput: () => void;
  category: string;
}

const getFlowInputItems = (previews: IPreviewImage[], uploadItems?: LandingUploadItem[], textItems?: Record<string, string>) => {
  const previewItems = uploadItems
    ? previews.map(preview => {
        const uploadItem = uploadItems.find(item => String(item.id) === String(preview.id));
        return {
          src: preview.sourceUrl ?? '',
          title: uploadItem?.title ?? '',
          id: String(uploadItem?.id),
          width: preview.width ?? 0,
          height: preview.height ?? 0,
          type: uploadItem?.type as unknown as InputItemType,
        };
      })
    : [];

  const textEntries = Object.entries(textItems ?? {});
  const texts = textEntries.length
    ? textEntries.map(([key, value]) => ({
        type: 'text' as const,
        id: key,
        value,
      }))
    : [];

  return [...previewItems, ...texts];
};

const selector = (state: IPreviewState, ids: string[]) => ({
  selectedPreviews: state.getPreviewsByIds({ ids }),
  textItems: state.textItems,
});

const PreviewFooter = ({ id, primaryActionTitle, ariaLabel, redirectionUrl, prompt, textItemsData, ids, media, transformations, category, scrollOnEmptyInput }: IPreviewFooter) => {
  const [isLoading, setIsLoading] = useState(false);
  const { textItems, selectedPreviews } = useAppStore(state => selector(state, ids));

  const uploadedCount = selectedPreviews.map(preview => preview?.mediaUrl).filter(Boolean).length;
  const requiredCount = ids?.length;
  const allTextItemsFilled = textItemsData?.length > 0 ? textItemsData.every(item => Boolean(textItems[String(item.id)])) : true;
  const disabled = (requiredCount && uploadedCount !== requiredCount) || !allTextItemsFilled;

  const onGenerate = async () => {
    if (disabled) {
      scrollOnEmptyInput();
      return;
    }

    try {
      setIsLoading(true);
      const uploadedMedia = selectedPreviews
        .filter(preview => preview?.sourceUrl)
        .map(preview => ({
          sourceUrl: preview.sourceUrl,
          type: preview.type,
        }));
      const isMobile = await checkIsMobile();
      const target = isMobile ? '_self' : '_blank';

      if (!uploadedMedia.length && !Object.values(textItems).length) {
        throw new Error('No media uploaded or one of text areas is empty');
      }

      if (redirectionUrl.includes('ai-try-on')) {
        const finalRedirectionUrl = `${AI_IMAGE_BASE_URL}${redirectionUrl}${uploadedMedia[0].sourceUrl}`;
        redirectToExternalDomain({ href: finalRedirectionUrl, target });
        return;
      }
      const needToBuildPresets = media && transformations;
      const preset = needToBuildPresets ? buildPreset({ media, transformations, prompt }) : null;

      const payload: Record<string, unknown> =
        media.flow?.uploadItems || Object.keys(textItems).length
          ? {
              ...getPresetGenMiniappContent({
                resultType: media.type,
                webhookId: media.flow?.webhookId ?? '',
                category,
                previewMedia: {
                  src: media.media.url,
                  type: media.type,
                  title: media.title,
                  description: media.description,
                  ...(media.type === MediaType.VIDEO && media.media.poster ? { poster: media.media.poster } : {}),
                },
                inputs: getFlowInputItems(selectedPreviews, media.flow?.uploadItems, textItems),
              }),
            }
          : {
              media: uploadedMedia,
              prompt,
              ...(preset && { preset }),
            };
      const { response } = await postJson(payload);

      const result = response?.url || response?.download_url;

      if (!result) throw new Error('No result');

      const adParams = AD_URL_PARAMS.reduce((acc, param) => {
        const value = sessionStorage.getItem(param);

        if (value) acc += `&${param}=${value}`;

        return acc;
      }, '');

      const finalRedirectionUrl = `${AI_IMAGE_BASE_URL}${redirectionUrl.replace(/\s+/g, '')}${result}${adParams}`;

      sendFacebookPixelEvent(FacebookPixelEvent.Lead, { content_name: media.title });
      redirectToExternalDomain({ href: finalRedirectionUrl, target });
    } catch (error) {
      console.error('Error in onGenerate:', error);
      // TODO: add error handling with toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex className="items-center justify-center flex-col gap-4" data-testid={TEST_IDS.FOOTER}>
      <Button
        isLoading={isLoading}
        aria-label={ariaLabel}
        id={String(id)}
        onClick={onGenerate}
        aria-disabled={disabled}
        className={cn(
          'detail-generate-btn w-full h-12 rounded-xl gap-3 justify-center border-0',
          disabled && 'opacity-35 pointer-events-none',
        )}
        data-testid={TEST_IDS.GENERATE_BUTTON}
        data-pulse-name={PULSE_NAMES.GENERATE}
      >
        <Sparkles className="h-5 w-5 text-white" />
        <span className="text-[15px] leading-[24px] font-semibold text-white">{primaryActionTitle}</span>
      </Button>
    </Flex>
  );
};

export default PreviewFooter;
