import type { ReactNode } from 'react';

interface IFrame {
  children: ReactNode;
  dataTestId?: string;
}

const Frame = ({ children, dataTestId }: IFrame) => {
  return (
    <div className="relative bg-black flex h-40 w-full flex-col items-center justify-center gap-3 transition-all outline-none overflow-hidden rounded-[var(--radius)]" data-testid={dataTestId}>
      {children}
    </div>
  );
};

export default Frame;
