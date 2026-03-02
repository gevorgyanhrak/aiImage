import { Upload } from 'lucide-react';
import { Text } from '@radix-ui/themes';

import DraggableContainer from '@/components/DraggableContainer';
import type { ErrorType } from '@/types/upload';
import type { MediaType } from '@/types/media';
import { TEST_IDS } from '../constants/testIds';

import Frame from '../Frame';

interface IIdleView {
  onSelect: (urls: string[]) => void;
  onError: (error: ErrorType) => void;
  multiplyEnabled?: boolean;
  extensions: string[];
  title: string;
  type: MediaType;
}

const IdleView = ({ onSelect, onError, multiplyEnabled, extensions, title, type }: IIdleView) => {
  return (
    <Frame dataTestId={TEST_IDS.IDLE}>
      <DraggableContainer type={type} onFileSelect={onSelect} onError={onError} multiplyEnabled={multiplyEnabled} extensions={extensions}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background">
          <Upload className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <div className="text-center flex flex-col gap-1">
          <Text as="p" size="3" weight="bold" className="font-medium text-foreground" data-testid={TEST_IDS.IDLE_TITLE}>
            {title}
          </Text>
          <Text as="p" size="1" className="text-[#B3B3B3]" data-testid={TEST_IDS.IDLE_EXTENSIONS}>
            {extensions.join(', ')}
          </Text>
        </div>
      </DraggableContainer>
    </Frame>
  );
};

export default IdleView;
