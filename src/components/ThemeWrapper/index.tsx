'use client';

import type { ReactNode } from 'react';
import { Theme } from '@radix-ui/themes';

type ThemeWrapperProps = {
  children: ReactNode;
};

const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  return <Theme>{children}</Theme>;
};

export default ThemeWrapper;
