import './globals.css';

import type { ReactNode } from 'react';

import dynamic from 'next/dynamic';

import Header from '@/components/Header';
import PreloadLinks from '@/components/PreloadLinks';
import PreconnectLinks from '@/components/PreconnectLinks';
import { mainMetadata } from '@/constants/seo';
import Providers from '@/providers';
import PixelScript from '@/components/PixelScript';
import FullstoryScript from '@/components/FullstoryScript';

const Footer = dynamic(() => import('@/components/Footer'));
const GoogleAnalytics = dynamic(() => import('@/components/GoogleAnalytics'));

export const metadata = mainMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <PreconnectLinks />
        <PreloadLinks />
        <PixelScript />
        <FullstoryScript />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
      <GoogleAnalytics />
    </html>
  );
}
