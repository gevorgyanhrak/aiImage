import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Flex } from '@radix-ui/themes';

import { Button } from '@/components/ui/button';
import { useAppStore, getAppStore } from '@/store/store';
import LoginModal from '@/components/LoginModal';
import postJson from '@/utils/postJson';
import type { LandingTextItem } from '@/types/landing';
import { TEST_IDS } from './constants/testIds';
import type { IPreviewState } from '@/store/preview';
import { PULSE_NAMES } from '@/constants/pulseNames';
import { cn } from '@/lib/utils';

interface IPreviewFooter {
  id: number;
  primaryActionTitle: string;
  prompt: string;
  ariaLabel: string;
  redirectionUrl: string;
  textItemsData: LandingTextItem[];
  ids: string[];
  scrollOnEmptyInput: () => void;
  category: string;
  // keep unused props in interface for compatibility
  media?: unknown;
  transformations?: unknown;
}

const selector = (state: IPreviewState, ids: string[]) => ({
  selectedPreviews: state.getPreviewsByIds({ ids }),
  textItems: state.textItems,
});

const PreviewFooter = ({ id, primaryActionTitle, ariaLabel, prompt, textItemsData, ids, scrollOnEmptyInput }: IPreviewFooter) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isAuthenticated = useAppStore(s => s.isAuthenticated);
  const addGeneration = useAppStore(s => s.addGeneration);
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

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      setIsLoading(true);
      getAppStore().setResultUrl(null);
      getAppStore().setIsGenerating(true);

      const uploadedMedia = selectedPreviews
        .filter(preview => preview?.sourceUrl)
        .map(preview => ({
          sourceUrl: preview.sourceUrl,
          type: preview.type,
        }));

      // Build the final prompt including any text inputs
      const textValues = Object.values(textItems).filter(Boolean);
      const finalPrompt = [prompt, ...textValues].filter(Boolean).join('. ');

      const payload: Record<string, unknown> = {
        prompt: finalPrompt,
        ...(uploadedMedia.length && { media: uploadedMedia }),
      };

      const { response } = await postJson(payload);
      const resultUrl = response?.url || response?.download_url;

      if (!resultUrl) throw new Error('No result');

      getAppStore().setResultUrl(resultUrl);

      if (isAuthenticated) {
        addGeneration({
          prompt: finalPrompt,
          resultUrl,
          sourceUrl: uploadedMedia[0]?.sourceUrl ?? null,
        });
      }
    } catch (error) {
      console.error('Error in onGenerate:', error);
      getAppStore().setResultUrl(null);
    } finally {
      setIsLoading(false);
      getAppStore().setIsGenerating(false);
    }
  };

  return (
    <>
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
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default PreviewFooter;
