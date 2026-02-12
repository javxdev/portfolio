import { useEffect, useRef } from 'react';
import { useMotionValue } from 'framer-motion';

// Types
import type { CursorState, MagneticTarget } from '../data/types';

export const useCursor = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const size = useMotionValue(16);
  const opacity = useMotionValue(1);
  
  const cursorStateRef = useRef<CursorState>({ isHovering: false });
  const magneticTargetsRef = useRef<MagneticTarget[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      if (cursorStateRef.current.isHovering) {
        const activeTarget = magneticTargetsRef.current.find(
          t => t.element.matches(':hover')
        );

        if (activeTarget) {
          const rect = activeTarget.element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
          );
          
          const maxDistance = Math.max(rect.width, rect.height);
          const strength = Math.max(0, 1 - distance / maxDistance) * activeTarget.strength;
          
          targetX = e.clientX + (centerX - e.clientX) * strength;
          targetY = e.clientY + (centerY - e.clientY) * strength;
        }
      }

      x.set(targetX);
      y.set(targetY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      style.remove();
    };
  }, [x, y]);

  const registerMagneticTarget = (
    element: HTMLElement,
    type: CursorState['targetType'],
    strength: number = 0.3
  ) => {
    magneticTargetsRef.current.push({ element, type, strength });
    
    const handleEnter = () => {
      cursorStateRef.current = { isHovering: true, targetType: type };
      size.set(20);
      opacity.set(1);
    };
    
    const handleLeave = () => {
      cursorStateRef.current = { isHovering: false };
      size.set(16);
      opacity.set(1);
    };

    element.addEventListener('mouseenter', handleEnter);
    element.addEventListener('mouseleave', handleLeave);

    return () => {
      element.removeEventListener('mouseenter', handleEnter);
      element.removeEventListener('mouseleave', handleLeave);
      magneticTargetsRef.current = magneticTargetsRef.current.filter(
        t => t.element !== element
      );
    };
  };

  return {
    x,
    y,
    size,
    opacity,
    registerMagneticTarget
  };
};