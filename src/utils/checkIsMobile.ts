'use client';

import isServer from './isServer';

const checkIsMobile = () => {
  if (isServer()) {
    return false;
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return isMobile;
};

export default checkIsMobile;
