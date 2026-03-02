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

const getStickyOffset = (tabsContainer: HTMLDivElement | null) => {
  const tabsHeight = tabsContainer?.getBoundingClientRect().height ?? 0;
  const header = document.querySelector<HTMLElement>(`[data-testid="${TEST_IDS.CONTAINER}"]`);
  const headerHeight = header?.getBoundingClientRect().height ?? 0;

  return headerHeight + tabsHeight + OFFSET_SPACING;
};

const TabNavigation = ({ items }: TabNavigationProps) => {
  const sectionIds = items.map(item => item.id);
  const [activeTabId, setActiveTabId] = useScrollSpy({ sectionIds });
  const tabListRef = useRef<HTMLElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  const handleTabClick = (value: string) => {
    if (activeTabId == value) return;
    const element = document.getElementById(value);
    if (!element) return;
    setActiveTabId(value);

    const offset = getStickyOffset(tabsContainerRef.current);
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: 'smooth',
    });
  };

  const updateUnderline = useCallback(() => {
    const activeButton = document.getElementById(ACTIVE_TAB_ID);
    const container = tabListRef.current;
    const underline = underlineRef.current;

    if (!activeButton || !container || !underline) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    const left = buttonRect.left - containerRect.left + container.scrollLeft;
    const width = buttonRect.width;

    underline.style.left = `${left}px`;
    underline.style.width = `${width}px`;
  }, []);

  // Update underline position and auto-scroll tabs when active changes
  useLayoutEffect(() => {
    const activeButton = document.getElementById(ACTIVE_TAB_ID) as HTMLElement | null;
    if (!activeButton) return;

    requestAnimationFrame(() => {
      // Auto-center active tab in scroll container
      const container = tabListRef.current;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const activeButtonRect = activeButton.getBoundingClientRect();
        const activeButtonCenter = activeButtonRect.left + activeButtonRect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;
        const delta = activeButtonCenter - containerCenter;
        const targetScrollLeft = container.scrollLeft + delta;

        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth',
        });
      }

      // Update neon underline position
      updateUnderline();
    });
  }, [activeTabId, updateUnderline]);

  return (
    <div
      ref={tabsContainerRef}
      className="sticky top-16 z-45 bg-[var(--header-bg)] px-4 md:px-6 py-0"
      data-testid={TEST_IDS.CONTAINER}
      data-pulse-section="tabs"
    >
      <nav
        ref={tabListRef}
        className="relative max-w-full w-full mx-auto overflow-x-auto scrollbar-hide"
        aria-label="Gallery categories"
      >
        <ul
          className="w-full mx-auto py-3 flex gap-6 md:gap-8"
          role="list"
          data-testid={TEST_IDS.LIST}
        >
          {items.map(({ id, title }) => {
            const isActive = activeTabId === id;

            return (
              <li
                key={id}
                {...(isActive && { id: ACTIVE_TAB_ID })}
                className="list-none flex-shrink-0"
                data-testid={TEST_IDS.ITEM}
              >
                <button
                  type="button"
                  onClick={() => handleTabClick(String(id))}
                  className={cn(
                    'relative pb-3 text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer',
                    'focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ring',
                    'border-none bg-transparent',
                    isActive
                      ? 'text-white neon-text-subtle'
                      : 'text-[#555] hover:text-[#aaa]',
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
        {/* Animated neon underline */}
        <span ref={underlineRef} className="neon-underline" />
      </nav>
    </div>
  );
};

export default TabNavigation;
