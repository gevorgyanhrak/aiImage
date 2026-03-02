import type { ReactNode } from 'react';
import PulseProviderWrapper from './PulseProviderWrapper';

type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  return <PulseProviderWrapper>{children}</PulseProviderWrapper>;
};

export default Providers;
