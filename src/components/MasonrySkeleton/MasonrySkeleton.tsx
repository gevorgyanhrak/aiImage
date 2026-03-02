interface MasonrySkeletonProps {
  itemCount: number;
}

const getRandomHeight = () => Math.floor(Math.random() * 101) + 200;

const MasonrySkeleton = ({ itemCount }: MasonrySkeletonProps) => {
  const SKELETON_ITEMS = Array.from({ length: itemCount }).map((_, index) => {
    return {
      id: index,
      height: getRandomHeight(),
    };
  });

  return (
    <div className="w-full box-border columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
      {SKELETON_ITEMS.map(item => (
        <div key={item.id} className="mb-4 w-full aspect-square rounded-lg bg-muted/60 skeleton-shimmer" style={{ height: `${item.height}px` }} />
      ))}
    </div>
  );
};

export default MasonrySkeleton;
