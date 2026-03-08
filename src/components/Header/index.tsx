import { useState } from 'react';
import { Link } from 'react-router';
import { LogIn, Moon, Sun } from 'lucide-react';

import type { ReactNode } from 'react';

import { TEST_IDS } from './constants/testIds';
import { PULSE_NAMES } from '@/constants/pulseNames';
import { useAppStore } from '@/store/store';
import UserPopup from '@/components/UserPopup';
import LoginModal from '@/components/LoginModal';

type HeaderProps = {
  children?: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isAuthenticated = useAppStore(s => s.isAuthenticated);
  const theme = useAppStore(s => s.theme);
  const setTheme = useAppStore(s => s.setTheme);

  return (
    <>
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
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[var(--page-text-muted)] group-hover:text-[var(--page-text-secondary)] transition-colors duration-300 hidden sm:inline">
            studio
          </span>
        </Link>

        {/* Navigation slot — filled by Tabs on home page */}
        {children && (
          <div className="flex-1 min-w-0 ml-6 md:ml-10">
            {children}
          </div>
        )}

        {/* Theme toggle + Auth */}
        <div className="shrink-0 ml-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--surface-border-strong)] bg-[var(--surface)] text-[var(--page-text-secondary)] hover:bg-[var(--surface-hover)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          {isAuthenticated ? (
            <UserPopup />
          ) : (
            <button
              type="button"
              onClick={() => setShowLoginModal(true)}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--surface-border-strong)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--page-text-secondary)] hover:bg-[var(--surface-hover)] transition-colors"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign in</span>
            </button>
          )}
        </div>
      </div>
    </header>
    <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default Header;
