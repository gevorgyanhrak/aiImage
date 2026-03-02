'use client';

import { useRef, useLayoutEffect } from 'react';

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
  // Header sticks only on desktop; add its height there so the section title stays visible
  const isDesktop = window.matchMedia('(min-width: 768px)').matches;
  const header = isDesktop ? document.querySelector<HTMLElement>(`[data-testid="${TEST_IDS.CONTAINER}"]`) : null;
  const headerHeight = header?.getBoundingClientRect().height ?? 0;

  return headerHeight + tabsHeight + OFFSET_SPACING;
};

const TabNavigation = ({ items }: TabNavigationProps) => {
  const sectionIds = items.map(item => item.id);
  const [activeTabId, setActiveTabId] = useScrollSpy({ sectionIds });
  const tabListRef = useRef<HTMLElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

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

  useLayoutEffect(() => {
    const activeButton = document.getElementById(ACTIVE_TAB_ID) as HTMLElement | null;
    if (!activeButton) return;

    requestAnimationFrame(() => {
      const container = tabListRef.current;

      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const activeButton = document.getElementById(ACTIVE_TAB_ID);
      const activeButtonRect = activeButton!.getBoundingClientRect();
      const activeButtonCenter = activeButtonRect.left + activeButtonRect.width / 2;
      const containerCenter = containerRect.left + containerRect.width / 2;
      const delta = activeButtonCenter - containerCenter;

      const targetScrollLeft = container!.scrollLeft + delta;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
    });
  }, [activeTabId]);

  return (
    <div
      ref={tabsContainerRef}
      className="sticky top-0 md:top-[56px] z-45 md:bg-background/90 md:backdrop-blur-md bg-[#121212] px-4 md:px-6 py-2"
      data-testid={TEST_IDS.CONTAINER}
      data-pulse-section="tabs"
    >
      <nav ref={tabListRef} className="max-w-full w-full mx-auto overflow-x-auto scrollbar-hide" aria-label="Gallery categories">
        <ul className="w-full mx-auto rounded-[var(--radius)] py-1 flex gap-2" role="list" data-testid={TEST_IDS.LIST}>
          {items.map(({ id, title }) => {
            const isActive = activeTabId === id;

            return (
              <li key={id} {...(isActive && { id: ACTIVE_TAB_ID })} className="list-none flex-shrink-0" data-testid={TEST_IDS.ITEM}>
                <button
                  type="button"
                  onClick={() => handleTabClick(String(id))}
                  className={cn(
                    'w-full rounded-lg border py-[6px] px-3 text-sm font-semibold text-[#B3B3B3]  focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ring hover:text-foreground',
                    'inline-flex items-center justify-center gap-1.5 cursor-pointer h-8',
                    isActive && 'text-white border-gradient-valentine',
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
      </nav>
    </div>
  );
};

export default TabNavigation;
