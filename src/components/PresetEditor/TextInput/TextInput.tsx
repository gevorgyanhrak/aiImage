import type { ChangeEvent } from 'react';
import type { IPreviewState } from '@/store/preview';
import { useAppStore } from '@/store/store';
import type { LandingTextItem } from '@/types/landing';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
      <Label htmlFor={textItem.id}>Text Prompt</Label>
      <Textarea
        data-testid={TEST_IDS.TEXT_AREA}
        id={textItem.id}
        value={textItems[textItem.id] ?? ''}
        onChange={onTextAreaChange}
        placeholder="Describe what you want to create…"
        className={cn('bg-[#2A2A2A] border-2 border-color-[#3B3B3B] rounded-[8px] max-h-[70px] md:max-h-25 resize-none ', isEmpty && 'bg-black')}
      />
    </div>
  );
};

export default TextInput;
