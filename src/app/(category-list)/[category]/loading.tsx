import BreadCrump from '@/components/BreadCrump';
import MasonrySkeleton from '@/components/MasonrySkeleton';
import { BREADCRUMB_BASE_SEGMENT, BREADCRUMB_SKELETON_SEGMENT } from '@/constants/breadcrumb';

const Loading = () => {
  return (
    <>
      <div className="mx-auto pt-4 md:pt-8">
        <BreadCrump segments={[BREADCRUMB_BASE_SEGMENT, BREADCRUMB_SKELETON_SEGMENT]} />
      </div>
      <section className="flex flex-col gap-4 mt-4 md:mt-8">
        <div className="h-10 w-52 rounded bg-muted/60 skeleton-shimmer" />
        <div className="h-15 md:h-10 w-full md:w-3/4 rounded bg-muted/60 skeleton-shimmer" />
      </section>
      <section className="min-h-screen flex flex-col mt-2 py-6">
        <MasonrySkeleton itemCount={30} />
      </section>
    </>
  );
};

export default Loading;
