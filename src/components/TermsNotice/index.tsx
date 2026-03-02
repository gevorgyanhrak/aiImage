import { memo } from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { TEST_IDS } from './constants/testIds';

interface TermsNoticeProps {
  linkHref?: string;
}

const DEFAULT_LINK_HREF = '#';

const TermsNotice = ({ linkHref = DEFAULT_LINK_HREF }: TermsNoticeProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center" data-testid={TEST_IDS.CONTAINER}>
      <Flex className="flex-row justify-center align-center text-center wrap gap-1">
        <Text as="p" size="2" className="!font-hrakai font-medium text-white max-w-[250px] sm:max-w-[280px]" data-testid={TEST_IDS.PRIMARY_TEXT}>
          By continuing, you agree to our{' '}
          <a target="_blank" className="font-hrakai font-medium underline md:no-underline text-primary" href={linkHref} data-testid={TEST_IDS.PRIMARY_LINK} rel="noreferrer">
            Gen AI ToU
          </a>
        </Text>
      </Flex>
    </div>
  );
};

export default memo(TermsNotice);
