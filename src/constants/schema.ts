import type { HowToStep, SoftwareApplication } from 'schema-dts';

export const defaultSoftwareApplicationSchema = {
  softwareVersion: '1.0',
  operatingSystem: 'Web',
  applicationCategory: 'AI Image and Video Generator',
  name: 'hrakAi Studio',
  url: 'http://localhost:3000',
  publisher: {
    '@type': 'Organization',
    name: 'hrakAi',
    url: 'http://localhost:3000',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    reviewCount: 892,
    bestRating: '5',
    worstRating: '1',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  creator: {
    '@type': 'Organization',
    name: 'hrakAi',
    url: 'http://localhost:3000',
  },
} as SoftwareApplication;

export const defaultHowToSteps = [
  {
    '@type': 'HowToStep',
    name: 'Upload Video',
    text: 'Upload your wedding or portrait video to hrakAi',
  },
  {
    '@type': 'HowToStep',
    name: 'Select Effect',
    text: 'Choose the Ghostly Bride effect from the horror effects category',
  },
  {
    '@type': 'HowToStep',
    name: 'Generate',
    text: 'Click generate and let AI transform your video into a haunting scene',
  },
  {
    '@type': 'HowToStep',
    name: 'Download',
    text: 'Download your ghostly bride video in high quality',
  },
] as Array<HowToStep>;
