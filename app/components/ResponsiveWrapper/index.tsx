'use client';

import React, { useEffect, useState } from 'react';
import { initFontSize, loadVsConsoleInDevEnv, loadImages } from '../../utils/helper';
import ImgSourceMap from '../../constants/sourceMap';
import { useAppContext } from '../../hooks/useAppContext';
import InitLoading from '../Loading';
interface ResponsiveWrapperProps {
  children: React.ReactNode;
}

const ResponsiveWrapper = ({ children }: ResponsiveWrapperProps) => {
  const { isMobile, loadingService } = useAppContext();
  const [hasLoadedSource, setHasLoadedSource] = useState(false);
  const [hasFontSizeLoaded, setHasFontSizeLoaded] = useState(false);

  useEffect(() => {
    loadingService.send('LOADING');
    if (window && document) {
      initFontSize(document, window, isMobile);
      setHasFontSizeLoaded(true);
    }
    loadVsConsoleInDevEnv();
    loadImages(isMobile ? ImgSourceMap.mobile : ImgSourceMap.pc, () => {
      setHasLoadedSource(true);
    });
  }, [isMobile]);

  if (!hasFontSizeLoaded) {
    return null;
  }

  if (!hasLoadedSource) {
    return <InitLoading isInit />;
  }

  return <>{children}</>;
};

export default ResponsiveWrapper;
