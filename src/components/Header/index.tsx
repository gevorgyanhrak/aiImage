import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import {
  LogIn,
  Moon,
  Sun,
  Menu,
  X,
  Sparkles,
  Image,
  Video,
  Wand2,
  PenTool,
  SmilePlus,
} from 'lucide-react';

import type { ReactNode } from 'react';

import { TEST_IDS } from './constants/testIds';
import { PULSE_NAMES } from '@/constants/pulseNames';
import { useAppStore } from '@/store/store';
import UserPopup from '@/components/UserPopup';
import LoginModal from '@/components/LoginModal';
import { cn } from '@/lib/utils';

type HeaderProps = {
  children?: ReactNode;
};

const NAV_LINKS = [
  { label: 'AI Effects', href: '/ai-effects', icon: Sparkles },
  { label: 'Photo Editor', href: '/photo-editor', icon: Image },
  { label: 'Video Effects', href: '/video-effects', icon: Video },
  { label: 'AI Generate', href: '/ai-generate', icon: Wand2 },
  { label: 'Design Tools', href: '/design-tools', icon: PenTool },
  { label: 'Face & Body', href: '/face-body', icon: SmilePlus },
];

const Header = ({ children }: HeaderProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuthenticated = useAppStore(s => s.isAuthenticated);
  const theme = useAppStore(s => s.theme);
  const setTheme = useAppStore(s => s.setTheme);
  const { pathname } = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [mobileOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-[var(--header-bg)] glow-line"
        data-testid={TEST_IDS.CONTAINER}
        data-pulse-section="header"
        data-pulse-group="header"
        ref={mobileMenuRef}
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 min-w-0 ml-8 overflow-x-auto scrollbar-hide">
            {children || (
              <ul className="flex items-center gap-1">
                {NAV_LINKS.map(({ label, href, icon: Icon }) => {
                  const isActive = pathname === href || pathname.startsWith(href + '/');
                  return (
                    <li key={href} className="list-none shrink-0">
                      <Link
                        to={href}
                        className={cn(
                          'flex items-center gap-2 px-3.5 py-2 text-sm font-medium tracking-wide rounded-lg transition-all duration-200 whitespace-nowrap',
                          isActive
                            ? 'text-[var(--neon-pink)] bg-[var(--neon-pink)]/8 shadow-[inset_0_0_12px_rgba(244,64,151,0.06)]'
                            : 'text-[var(--page-text-secondary)] hover:text-[var(--page-text)] hover:bg-[var(--surface-hover)]',
                        )}
                      >
                        <Icon className={cn(
                          'h-4 w-4 shrink-0 transition-colors duration-200',
                          isActive ? 'text-[var(--neon-pink)]' : '',
                        )} />
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>

          {/* Right side: actions */}
          <div className="shrink-0 ml-4 flex items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--surface-border-strong)] bg-[var(--surface)] text-[var(--page-text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--page-text)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <UserPopup />
            ) : (
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-pink-light)] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_16px_rgba(244,64,151,0.25)] hover:shadow-[0_0_24px_rgba(244,64,151,0.4)] transition-shadow"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign in</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen(prev => !prev)}
              className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg border border-[var(--surface-border-strong)] bg-[var(--surface)] text-[var(--page-text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--page-text)] transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-[var(--surface-border)]',
            mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 border-t-transparent',
          )}
        >
          <nav className="px-4 py-4">
            {children ? (
              <div className="mb-2">{children}</div>
            ) : (
              <ul className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map(({ label, href, icon: Icon }) => {
                  const isActive = pathname === href || pathname.startsWith(href + '/');
                  return (
                    <li key={href} className="list-none">
                      <Link
                        to={href}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'text-[var(--neon-pink)] bg-[var(--neon-pink)]/10 border border-[var(--neon-pink)]/20 shadow-[0_0_20px_rgba(244,64,151,0.08)]'
                            : 'text-[var(--page-text)] bg-[var(--surface)] border border-[var(--surface-border)] hover:bg-[var(--surface-hover)] hover:border-[var(--surface-border-strong)]',
                        )}
                      >
                        <Icon className={cn(
                          'h-5 w-5 shrink-0',
                          isActive ? 'text-[var(--neon-pink)]' : 'text-[var(--page-text-muted)]',
                        )} />
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>
        </div>
      </header>
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default Header;
