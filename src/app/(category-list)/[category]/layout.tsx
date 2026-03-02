import type { ReactNode } from 'react';
import '../../styles/skeleton.css';

type CategoryLayoutProps = {
  children: ReactNode;
};

const CategoryLayout = ({ children }: CategoryLayoutProps) => {
  return <main className="min-h-screen bg-background text-foreground px-3 md:px-6">{children}</main>;
};

export default CategoryLayout;
