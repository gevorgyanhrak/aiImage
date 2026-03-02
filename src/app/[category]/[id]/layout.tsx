import '../../styles/radix-theme.css';
import '../../styles/skeleton.css';
import '../../styles/preset.css';

import ThemeWrapper from '@/components/ThemeWrapper';

import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function PresetLayout({ children }: LayoutProps) {
  return <ThemeWrapper>{children}</ThemeWrapper>;
}
