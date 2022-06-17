import { useState, useEffect } from 'react';

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<'' | 'sm' | 'md' | 'lg'>('');

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setScreenSize('lg');
        return;
      }

      if (window.innerWidth <= 640) {
        setScreenSize('sm');
        return;
      }

      setScreenSize('md');
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { screenSize };
}
