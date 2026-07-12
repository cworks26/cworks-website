import { useEffect, useState } from 'react';

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handle = () => setPrefersReduced(mq.matches);
    handle();
    mq.addEventListener ? mq.addEventListener('change', handle) : mq.addListener(handle);
    return () => mq.removeEventListener ? mq.removeEventListener('change', handle) : mq.removeListener(handle);
  }, []);

  return prefersReduced;
}
