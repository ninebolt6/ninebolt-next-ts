import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isExistsGaId, pageview } from 'libs/gtag';

export default function usePageView() {
  const router = useRouter();
  
  useEffect(() => {
    if(!isExistsGaId) {
      return;
    }
  
    const handleRouteChange = (path: string) => {
      pageview(path);
    }
  
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router.events]);
}