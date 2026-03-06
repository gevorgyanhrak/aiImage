import type { ChangeEvent } from 'react';
import type { IPreviewState } from '@/store/preview';
import { useAppStore } from '@/store/store';
import type { LandingTextItem } from '@/types/landing';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { TEST_IDS } from './constants/testIds';

type TextInputProps = {
  textItem: LandingTextItem;
};

const selector = (state: IPreviewState) => ({
  textItems: state.textItems,
  setTextItem: state.setTextItem,
});

const TextInput = ({ textItem }: TextInputProps) => {
  const { textItems, setTextItem } = useAppStore(selector);
  const isEmpty = !textItems[textItem.id];

  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextItem({ key: textItem.id, value: e.target.value });
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="detail-label">Prompt</span>
      <Textarea
        data-testid={TEST_IDS.TEXT_AREA}
        id={textItem.id}
        value={textItems[textItem.id] ?? ''}
        onChange={onTextAreaChange}
        placeholder="Describe what you want to create..."
        className={cn(
          'rounded-xl max-h-[80px] md:max-h-28 resize-none text-sm text-white/90 placeholder:text-white/20',
          'border border-white/[0.08] focus:border-white/15 focus:ring-0',
          isEmpty ? 'bg-white/[0.02]' : 'bg-white/[0.04]',
        )}
      />
    </div>
  );
};

export default TextInput;
