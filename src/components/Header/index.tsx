import { Link } from 'react-router';
import { LogIn } from 'lucide-react';

import type { ReactNode } from 'react';

import { TEST_IDS } from './constants/testIds';
import { PULSE_NAMES } from '@/constants/pulseNames';
import { useAppStore } from '@/store/store';

type HeaderProps = {
  children?: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  const isAuthenticated = useAppStore(s => s.isAuthenticated);
  const user = useAppStore(s => s.user);

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

        {/* Auth */}
        <div className="shrink-0 ml-4">
          {isAuthenticated && user ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 hover:bg-white/[0.06] transition-colors"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#F44097] to-[#FC67FA] text-[10px] font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-medium text-white/60 hidden sm:inline">{user.name}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/50 hover:text-white/70 hover:bg-white/[0.06] transition-colors"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign in</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
