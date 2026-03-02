import { Link } from 'react-router';
import { TEST_IDS } from './constants/testIds';
import { PULSE_NAMES } from '@/constants/pulseNames';

const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 bg-[var(--header-bg)] glow-line"
      data-testid={TEST_IDS.CONTAINER}
      data-pulse-section="header"
      data-pulse-group="header"
    >
      <div className="flex items-center h-16 px-4 md:px-6">
        <Link
          to="/"
          data-testid={TEST_IDS.LOGO_LINK}
          data-pulse-name={PULSE_NAMES.GEN_AI_LOGO}
          className="flex items-baseline gap-3 group"
        >
          <span className="text-lg font-bold tracking-[0.2em] uppercase neon-text neon-pulse">
            hrakAi
          </span>
          <span className="text-[10px] font-medium tracking-[0.35em] uppercase text-[#555] group-hover:text-[#888] transition-colors duration-300">
            studio
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
