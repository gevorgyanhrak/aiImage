import BreadCrump from '@/components/BreadCrump';
import MasonrySkeleton from '@/components/MasonrySkeleton';
import TermsNotice from '@/components/TermsNotice';
import { BREADCRUMB_BASE_SEGMENT, BREADCRUMB_SKELETON_SEGMENT } from '@/constants/breadcrumb';
import { TEST_IDS } from './constants/testIds';

const Loading = () => {
  return (
    <main className="min-h-screen bg-background md:bg-app-black text-foreground" data-testid={TEST_IDS.MAIN}>
      <div className="mx-auto px-3 pt-2 md:pt-10 md:pb-8 md:px-6">
        <BreadCrump segments={[BREADCRUMB_BASE_SEGMENT, BREADCRUMB_SKELETON_SEGMENT, BREADCRUMB_SKELETON_SEGMENT]} />
      </div>
      <div className="py-4 mx-auto max-w-5xl px-4">
        <section className="grid grid-cols-1 gap-3 rounded-2xl md:bg-background md:p-6 lg:grid-cols-2 lg:gap-6" data-testid={TEST_IDS.CONTENT_SECTION}>
          <div className="contents lg:flex lg:flex-col lg:gap-4">
            {/* PresetHero skeleton */}
            <div className="order-1 lg:order-none">
              <div className="flex flex-col gap-1">
                <div className="h-7 w-48 rounded bg-muted/60 skeleton-shimmer" />
                <div className="h-10 w-full rounded bg-muted/60 skeleton-shimmer" />
              </div>
            </div>

            {/* UploadArea skeleton */}
            <div className="order-3 lg:order-none">
              <div className="h-40 w-full rounded-lg bg-muted/60 skeleton-shimmer" data-testid={TEST_IDS.UPLOAD_GRID} />
            </div>

            {/* PreviewFooter and TermsNotice skeleton */}
            <div className="flex flex-col gap-2 order-4 lg:order-none">
              <div className="h-12 w-full rounded-full bg-muted/60 skeleton-shimmer" data-testid={TEST_IDS.FOOTER} />
              <TermsNotice />
            </div>
          </div>

          {/* Media preview skeleton */}
          <div className="relative w-full h-[160px] md:h-[540px] flex items-center justify-center order-2 lg:order-none" data-testid={TEST_IDS.MEDIA_PREVIEW}>
            <div className="w-full h-full rounded-xl bg-muted/60 skeleton-shimmer" />
          </div>
        </section>

        {/* Similar presets  */}
        <div className="mt-10 flex flex-col gap-7">
          <div className="h-8 w-60 rounded bg-muted/60 skeleton-shimmer" />
          <MasonrySkeleton itemCount={5} />
        </div>
      </div>
    </main>
  );
};

export default Loading;
