import useFocusOnNextInput from '@/hooks/useFocusOnNextInput';
import type { LandingButton, LandingTextItem, LandingUploadItem, Transformation } from '@/types/landing';
import type { SectionItemWithFlow } from '@/types/sectionItem';
import type { SearchParams } from '@/types/common';
import UploadArea from '../PresetEditor/UploadArea';
import PreviewFooter from '../PresetEditor/PreviewFooter';
import TermsNotice from '../TermsNotice';
import TextInput from '../PresetEditor/TextInput';
import { TEST_IDS } from './constants/testIds';

type Props = {
  uploadItems: LandingUploadItem[];
  textItems: LandingTextItem[];
  id: string;
  flowId: string | null;
  button: LandingButton | null;
  redirectionUrl: string;
  transformationPrompt: string | null;
  prompt: string;
  queryParams: SearchParams;
  itemsIds: string[];
  mediaItem: SectionItemWithFlow;
  transformations: Transformation[];
  category: string;
};

const ItemsAndFooterWrapper = ({ uploadItems, textItems, id, flowId, button, redirectionUrl, transformationPrompt, prompt, queryParams, itemsIds, mediaItem, transformations, category }: Props) => {
  const { containerRef, scrollOnEmptyInput } = useFocusOnNextInput({ textItems, uploadItems });

  return (
    <>
      <div ref={containerRef} className="order-3 lg:order-none flex flex-col max-h-65 md:max-h-90 overflow-y-scroll gap-4">
        {uploadItems && (
          <div key={id} className={`grid ${uploadItems.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2`} data-testid={TEST_IDS.UPLOAD_GRID}>
            {uploadItems.map(({ id, title, extensions, type }) => (
              <UploadArea key={id} title={title} extensions={extensions} id={String(id)} type={type} shouldGetMetadata={!!flowId} searchParams={queryParams} />
            ))}
          </div>
        )}
        {textItems?.map(textItem => (
          <TextInput key={textItem.id} textItem={textItem} />
        ))}
      </div>

      <div className="space-y-6 order-4 lg:order-none">
        <div className="flex flex-col gap-2">
          {button && (
            <PreviewFooter
              {...button}
              category={category}
              primaryActionTitle={button.title}
              redirectionUrl={redirectionUrl}
              prompt={transformationPrompt ?? prompt}
              textItemsData={textItems}
              ids={itemsIds}
              media={mediaItem}
              transformations={transformations}
              scrollOnEmptyInput={scrollOnEmptyInput}
            />
          )}
          <TermsNotice />
        </div>
      </div>
    </>
  );
};

export default ItemsAndFooterWrapper;
