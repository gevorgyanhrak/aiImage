import type { SectionSlider as SectionSliderType } from '@/types/strapiComponent';
import { TEST_IDS } from './constants/testIds';
import Card from './Card';
import { cn } from '@/lib/utils';

type PromotionBannerProps = Omit<SectionSliderType, '__component'>;

const SectionSlider = ({ items, title, priority }: PromotionBannerProps) => {
  const headingId = 'promotion-banner-heading';
  const sliderTitle = title ?? 'Featured promotions';

  return (
    <section className="overflow-x-auto scrollbar-hide" aria-labelledby={headingId} data-testid={TEST_IDS.SECTION} data-pulse-section={sliderTitle}>
      <h2 id={headingId} className={cn({ ['sr-only']: !title })}>
        {sliderTitle}
      </h2>
      <div className="flex gap-3 md:gap-5 py-1" data-testid={TEST_IDS.LIST}>
        {items.map(item => (
          <Card item={item} key={item.id} priority={priority} />
        ))}
      </div>
    </section>
  );
};

export default SectionSlider;
