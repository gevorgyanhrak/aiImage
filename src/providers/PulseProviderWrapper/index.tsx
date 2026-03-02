'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { remoteSettings } from '@/configs/remoteSettings';
import { PulseProvider } from '@pulse/react';

type PulseProviderClientProps = {
  children: ReactNode;
};

const PulseProviderWrapper = ({ children }: PulseProviderClientProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) return children;

  return <PulseProvider {...remoteSettings}>{children}</PulseProvider>;
};

export default PulseProviderWrapper;
