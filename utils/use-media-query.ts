'use client'
import { useState, useEffect } from 'react';

export const sizes = {
    sm: '(max-width: 500px)',
    md: '(max-width: 950px)',
    lg: '(min-width: 951px)',
}

export function useMediaQuery(query: any ) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    window.addEventListener('resize',listener);
    return () => window.removeEventListener('resize', listener)
  }, [matches, query]);

  return matches;
}

    
