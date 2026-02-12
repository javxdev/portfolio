import { useEffect, useRef, useCallback } from 'react';
import { useMotionValue } from 'framer-motion';
import Lenis from '@studio-freight/lenis';


export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const isDesktop = window.innerWidth > 768;
    
    if (!isDesktop) {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.set(docHeight > 0 ? scrollTop / docHeight : 0);
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
      const progress = limit > 0 ? Math.max(0, Math.min(1, scroll / limit)) : 0;
      scrollProgress.set(progress);
    });

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [scrollProgress]);

  const scrollTo = useCallback((target: string | number, options?: { offset?: number; duration?: number }) => {
    const { offset = 0, duration = 1.5 } = options || {};
    const selector = typeof target === 'string' && !target.startsWith('#') 
      ? `#${target}` 
      : target;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(selector, {
        offset,
        duration,
      });
    } else if (typeof selector === 'string') {
      const element = document.querySelector(selector);
      if (element) {
        const nav = document.querySelector('nav');
        const navHeight = nav?.offsetHeight ?? 0;
        
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navHeight + offset;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }
  }, []);

  return { lenis: lenisRef.current, scrollProgress, scrollTo };
};