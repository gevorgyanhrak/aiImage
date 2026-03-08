import { useRef, useLayoutEffect, useCallback } from 'react';

import { cn } from '@/lib/utils';
import type { TabItem } from '@/types/tabs';
import useScrollSpy from '@/hooks/useScrollSpy';
import { TEST_IDS } from './constants/testIds';

type TabNavigationProps = {
  items: Array<TabItem>;
};

const ACTIVE_TAB_ID = 'active-tab-id';
const OFFSET_SPACING = 6;

const getStickyOffset = () => {
  const header = document.querySelector<HTMLElement>('[data-testid="header-container"]');
  const headerHeight = header?.getBoundingClientRect().height ?? 64;
  return headerHeight + OFFSET_SPACING;
};

const TabNavigation = ({ items }: TabNavigationProps) => {
  const sectionIds = items.map(item => item.id);
  const [activeTabId, setActiveTabId] = useScrollSpy({ sectionIds });
  const navRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  const handleTabClick = (value: string) => {
    if (activeTabId == value) return;
    const element = document.getElementById(value);
    if (!element) return;
    setActiveTabId(value);

    const offset = getStickyOffset();
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: 'smooth',
    });
  };

  const updateUnderline = useCallback(() => {
    const activeButton = document.getElementById(ACTIVE_TAB_ID);
    const nav = navRef.current;
    const underline = underlineRef.current;

    if (!activeButton || !nav || !underline) return;

    const navRect = nav.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    const left = buttonRect.left - navRect.left + nav.scrollLeft;
    const width = buttonRect.width;

    underline.style.left = `${left}px`;
    underline.style.width = `${width}px`;
  }, []);

  useLayoutEffect(() => {
    const activeButton = document.getElementById(ACTIVE_TAB_ID) as HTMLElement | null;
    if (!activeButton) return;

    requestAnimationFrame(() => {
      // Auto-scroll to keep active tab visible
      const nav = navRef.current;
      if (nav) {
        const navRect = nav.getBoundingClientRect();
        const activeRect = activeButton.getBoundingClientRect();
        const activeCenter = activeRect.left + activeRect.width / 2;
        const navCenter = navRect.left + navRect.width / 2;
        const delta = activeCenter - navCenter;
        nav.scrollTo({
          left: nav.scrollLeft + delta,
          behavior: 'smooth',
        });
      }

      updateUnderline();
    });
  }, [activeTabId, updateUnderline]);

  return (
    <nav
      ref={navRef}
      className="relative overflow-x-auto scrollbar-hide"
      aria-label="Gallery categories"
      data-testid={TEST_IDS.CONTAINER}
      data-pulse-section="tabs"
    >
      <ul
        className="flex items-center gap-1 md:gap-1.5"
        role="list"
        data-testid={TEST_IDS.LIST}
      >
        {items.map(({ id, title }) => {
          const isActive = activeTabId === id;

          return (
            <li
              key={id}
              {...(isActive && { id: ACTIVE_TAB_ID })}
              className="list-none shrink-0"
              data-testid={TEST_IDS.ITEM}
            >
              <button
                type="button"
                onClick={() => handleTabClick(String(id))}
                className={cn(
                  'relative px-3 py-1.5 text-[13px] font-medium tracking-wide rounded-md transition-all duration-300 cursor-pointer whitespace-nowrap',
                  'focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ring',
                  'border-none bg-transparent',
                  isActive
                    ? 'text-[var(--page-text)]'
                    : 'text-[var(--page-text-muted)] hover:text-[var(--page-text-secondary)] hover:bg-[var(--surface)]',
                )}
                aria-current={isActive ? 'true' : undefined}
                aria-controls={String(id)}
                data-testid={TEST_IDS.BUTTON}
                data-pulse-name={title}
              >
                {title}
              </button>
            </li>
          );
        })}
      </ul>
      {/* Animated gradient underline */}
      <span ref={underlineRef} className="neon-underline" style={{ bottom: '-2px' }} />
    </nav>
  );
};

export default TabNavigation;
