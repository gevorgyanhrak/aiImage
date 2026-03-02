import Image from 'next/image';
import Link from 'next/link';
import { TEST_IDS } from './constants/testIds';
import SectionText from '../SectionText';
import { PULSE_NAMES } from '@/constants/pulseNames';

const headerLogo = '/images/hrakai-logo.svg';

const Header = () => {
  return (
    <header className="md:sticky top-0 md:z-50 md:bg-background/90 md:backdrop-blur-md" data-testid={TEST_IDS.CONTAINER} data-pulse-section="header" data-pulse-group="header">
      <div className="flex gap-3 items-center justify h-14 px-3 md:px-6 py-2">
        <Link href="/" data-testid={TEST_IDS.LOGO_LINK} data-pulse-name={PULSE_NAMES.GEN_AI_LOGO} className="flex gap-2 items-center">
          <Image src={headerLogo} height={32} width={32} loading="eager" alt="logo" className="w-8 h-8" />
          <div className="flex flex-col items-between justify-between">
            <SectionText as="h1" text="hrakAi Studio" className="text-base font-bold tracking-tight text-white leading-4" />
            <SectionText as="h2" text="AI Tools" className="text-xs font-normal text-white leading-4" />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
