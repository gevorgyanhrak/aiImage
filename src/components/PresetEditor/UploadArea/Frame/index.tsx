import type { ReactNode } from 'react';

interface IFrame {
  children: ReactNode;
  dataTestId?: string;
}

const Frame = ({ children, dataTestId }: IFrame) => {
  return (
    <div
      className="detail-upload-zone relative flex h-40 w-full flex-col items-center justify-center gap-3 outline-none cursor-pointer"
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
};

export default Frame;
