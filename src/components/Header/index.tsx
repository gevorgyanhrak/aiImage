import { Link } from 'react-router';

import type { ReactNode } from 'react';

import { TEST_IDS } from './constants/testIds';
import { PULSE_NAMES } from '@/constants/pulseNames';

type HeaderProps = {
  children?: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <header
      className="sticky top-0 z-50 bg-[var(--header-bg)] glow-line"
      data-testid={TEST_IDS.CONTAINER}
      data-pulse-section="header"
      data-pulse-group="header"
    >
      <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          data-testid={TEST_IDS.LOGO_LINK}
          data-pulse-name={PULSE_NAMES.GEN_AI_LOGO}
          className="flex items-baseline gap-2.5 shrink-0 group"
        >
          <span className="text-base md:text-lg font-bold tracking-[0.15em] uppercase neon-text neon-pulse">
            hrakAi
          </span>
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#555] group-hover:text-[#888] transition-colors duration-300 hidden sm:inline">
            studio
          </span>
        </Link>

        {/* Navigation slot — filled by Tabs on home page */}
        {children && (
          <div className="flex-1 min-w-0 ml-6 md:ml-10">
            {children}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
