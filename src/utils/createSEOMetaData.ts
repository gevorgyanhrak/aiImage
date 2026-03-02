import { SITE_NAME, TWITTER_SITE, TWITTER_CREATOR, TWITTER_CARD, AUTHORS, OG_TYPE } from '@/constants/seo';
import type { SeoSettings } from '@/types/seoSettings';
import type { Metadata } from 'next/types';

const createSEOMetaData = (seoSettings: SeoSettings | null): Metadata => {
  const { canonicalUrl, keywords, metaDescription, noFollow, noIndex, ogDescription, ogImage, ogTitle, ogUrl, title, twitterDescription, twitterImage, twitterTitle } = seoSettings ?? {};

  return {
    title,
    description: metaDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
      url: ogUrl,
      siteName: SITE_NAME,
      type: OG_TYPE,
    },
    twitter: {
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : undefined,
      site: TWITTER_SITE,
      creator: TWITTER_CREATOR,
      card: TWITTER_CARD,
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
    },
    keywords,
    authors: AUTHORS,
    alternates: {
      canonical: canonicalUrl,
    },
  };
};

export { createSEOMetaData };
