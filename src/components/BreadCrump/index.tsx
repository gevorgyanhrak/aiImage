import { Fragment } from 'react';
import Link from 'next/link';
import type { BreadcrumbListSegment } from '@/types/breadcrumb';
import { TEST_IDS } from './constants/testIds';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const BreadcrumbSkeleton = () => {
  return <span className="inline-block h-4 md:h-6 w-20 rounded bg-muted/60 skeleton-shimmer" data-testid={TEST_IDS.SKELETON} />;
};

interface BreadCrumpProps {
  segments: BreadcrumbListSegment[];
  className?: string;
}

const BreadCrump = ({ segments, className }: BreadCrumpProps) => {
  return (
    <Breadcrumb className={className} data-testid={TEST_IDS.CONTAINER}>
      <BreadcrumbList
        className="flex-nowrap overflow-x-auto whitespace-nowrap gap-1 sm:gap-2 px-1 [-ms-overflow-style:'none'] [scrollbar-width:none] [&::-webkit-scrollbar]{display:none}"
        data-testid={TEST_IDS.LIST}
      >
        {segments.map(({ href, title, isSkeleton }, index) => {
          const isLast = index === segments.length - 1;
          const content = isSkeleton ? <BreadcrumbSkeleton /> : title;
          return (
            <Fragment key={isSkeleton ? index : href}>
              <BreadcrumbItem data-testid={TEST_IDS.ITEM}>
                {isLast ? (
                  <BreadcrumbPage className="flex items-center hover:text-primary font-medium" data-testid={TEST_IDS.PAGE}>
                    {content}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild className="flex text-white items-center font-semibold hover:text-primary" data-testid={TEST_IDS.LINK}>
                    <Link href={href}>{content}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator data-testid={TEST_IDS.SEPARATOR} />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrump;
