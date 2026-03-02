import type { CSSProperties, ReactNode, RefObject } from 'react';

export interface IMasonryDimension {
  width: number;
  height: number;
}

export interface IMasonryProps {
  children: ReactNode[];
  style?: CSSProperties;
  columns?: number;
  rows?: number;
  horizontal?: boolean;
  horizontalGap?: number;
  verticalGap?: number;
  className?: string;
  dimensions: IMasonryDimension[];
  rowHeight?: number;
  isVirtualizationEnabled?: boolean;
  id?: string;
  contentRef?: RefObject<HTMLDivElement | null>;
}
