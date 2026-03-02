import { useRef } from 'react';
import type { LandingTextItem, LandingUploadItem } from '@/types/landing';
import type { IAppStore } from '@/store/store';
import { useAppStore } from '@/store/store';

type Props = {
  textItems: LandingTextItem[];
  uploadItems: LandingUploadItem[];
};

const selector = (state: IAppStore) => ({ textItems: state.textItems, preview: state.preview });

const scrollByAmount = (target: HTMLDivElement, amount: number) => {
  target.scrollTo({
    top: amount,
    behavior: 'smooth',
  });
};

const useFocusOnNextInput = ({ textItems, uploadItems }: Props) => {
  const { textItems: textItemsData, preview } = useAppStore(selector);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollOnEmptyInput = () => {
    const container = containerRef.current;

    if (!container) return;
    const containerDiv = container.getBoundingClientRect();

    const allUploadItemIds = uploadItems.map(uploadItem => String(uploadItem.id));
    const emptyUploadItems = allUploadItemIds.filter(id => !preview[id]);
    let scrollTop = container.scrollTop;

    // check for empty media upload items, if exists, scroll to the first empty item
    if (emptyUploadItems.length > 0) {
      const firstEmptyItemContainer = document.getElementById(emptyUploadItems[0]);

      if (!firstEmptyItemContainer) return;

      const uploadItemDiv = firstEmptyItemContainer.getBoundingClientRect();
      const relativeTop = uploadItemDiv.top - containerDiv.top;
      const relativeBottom = relativeTop + uploadItemDiv.height;

      if (relativeTop < 0) {
        scrollTop = container.scrollTop + relativeTop;
      } else if (relativeBottom > containerDiv.height) {
        scrollTop = container.scrollTop + relativeBottom - containerDiv.height;
      }

      scrollByAmount(container, scrollTop);

      return;
    }

    const allTextItemIds = textItems.map(textItem => String(textItem.id));
    const emptyTextItems = allTextItemIds.filter(id => !textItemsData[id]);

    if (emptyTextItems.length > 0) {
      const emptyTextItems = textItems.filter(textItem => !textItemsData[textItem.id]);
      const firstEmptyTextInput = document.getElementById(emptyTextItems[0].id);

      if (!firstEmptyTextInput) return;

      const textInputDiv = firstEmptyTextInput.getBoundingClientRect();
      const relativeTop = textInputDiv.top - containerDiv.top;
      const relativeBottom = relativeTop + textInputDiv.height;

      if (relativeTop < 0) {
        scrollTop = container.scrollTop + relativeTop;
      } else if (relativeBottom > containerDiv.height) {
        scrollTop = container.scrollTop + relativeBottom - containerDiv.height;
      }

      scrollByAmount(container, scrollTop);
    }
  };

  return {
    containerRef,
    scrollOnEmptyInput,
  };
};

export default useFocusOnNextInput;
