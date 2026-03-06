import { memo } from 'react';
import { TEST_IDS } from './constants/testIds';

interface TermsNoticeProps {
  linkHref?: string;
}

const DEFAULT_LINK_HREF = '#';

const TermsNotice = ({ linkHref = DEFAULT_LINK_HREF }: TermsNoticeProps) => {
  return (
    <div className="w-full text-center" data-testid={TEST_IDS.CONTAINER}>
      <p className="text-xs text-white/25" data-testid={TEST_IDS.PRIMARY_TEXT}>
        By continuing, you agree to our{' '}
        <a
          target="_blank"
          className="text-white/40 underline hover:text-white/60 transition-colors"
          href={linkHref}
          data-testid={TEST_IDS.PRIMARY_LINK}
          rel="noreferrer"
        >
          AiImage
        </a>
      </p>
    </div>
  );
};

export default memo(TermsNotice);
