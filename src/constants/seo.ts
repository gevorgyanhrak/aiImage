import type { Metadata } from 'next/types';

export const SITE_NAME = 'hrakAi Studio';

export const AUTHORS = [{ name: SITE_NAME }];

export const TWITTER_CARD = 'summary_large_image';
export const TWITTER_SITE = '@hrak_ai';
export const TWITTER_CREATOR = '@hrak_ai';

export const OG_TYPE = 'website';

const logos = {
  favicon32: '/images/favicon-32.svg',
  favicon16: '/images/favicon-16.svg',
  appLogo: '/images/app-logo.svg',
};

export const mainMetadata: Metadata = {
  icons: {
    icon: [
      {
        url: logos.favicon32,
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        url: logos.favicon16,
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: logos.favicon32,
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: {
      url: logos.appLogo,
      sizes: '180x180',
      type: 'image/png',
    },
    shortcut: logos.favicon32,
  },
};
