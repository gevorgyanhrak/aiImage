import { Info } from 'lucide-react';
import { Text } from '@radix-ui/themes';
import Frame from '../Frame';
import DraggableContainer from '@/components/DraggableContainer';
import type { ErrorType } from '@/types/upload';
import type { MediaType } from '@/types/media';
import { TEST_IDS } from '../constants/testIds';

interface IErrorView {
  onSelect: (urls: string[]) => void;
  onError: (error: ErrorType) => void;
  message?: string;
  multiplyEnabled?: boolean;
  type: MediaType;
  extensions: string[];
}

const DEFAULT_MESSAGE = 'File type not supported';

const ErrorView = ({ onSelect, onError, message = DEFAULT_MESSAGE, multiplyEnabled, type, extensions }: IErrorView) => {
  return (
    <Frame dataTestId={TEST_IDS.ERROR}>
      <DraggableContainer extensions={extensions} type={type} onFileSelect={onSelect} onError={onError} multiplyEnabled={multiplyEnabled} tone="error">
        <div className="flex flex-col items-center gap-3 text-center px-4">
          <div className="h-12 w-12 rounded-full bg-[#1A1A1A] flex items-center justify-center">
            <Info className="h-6 w-6 text-destructive" />
          </div>
          <div className="space-y-2">
            <Text as="p" size="2" weight="bold" className="text-foreground" data-testid={TEST_IDS.ERROR_MESSAGE}>
              {message}
            </Text>
            <Text as="p" size="1" className="text-muted-foreground">
              Please upload a {extensions.join(', ')}
              <br />
              {type} to continue
            </Text>
          </div>
        </div>
      </DraggableContainer>
    </Frame>
  );
};

export default ErrorView;
