import UploadProgress from '@/components/UploadProgress';
import Frame from '../Frame';
import { TEST_IDS } from '../constants/testIds';

interface IUploadingView {
  progress: number;
}

const UploadingView = ({ progress }: IUploadingView) => {
  return (
    <Frame dataTestId={TEST_IDS.UPLOADING}>
      <UploadProgress progress={progress} />
    </Frame>
  );
};

export default UploadingView;
