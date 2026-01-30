import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);

  useEffect(() => {
    // Check if touch device
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Set initial position off-screen
    gsap.set([dot, ring], { x: -100, y: -100 });

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Fast, responsive dot movement
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });

      // Slightly delayed ring for smooth follow
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      gsap.to(ring, {
        scale: 0.8,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      gsap.to(ring, {
        scale: isHovering ? 1.5 : 1,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    // Handle hoverable elements
    const handleElementEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      
      // Wrap effect - expand ring
      gsap.to(ring, {
        scale: 1.5,
        borderColor: '#EC4899',
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
      });

      // Add magnetic effect to the element
      if (target.classList.contains('magnetic')) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        gsap.to(target, {
          x: (mousePos.current.x - centerX) * 0.2,
          y: (mousePos.current.y - centerY) * 0.2,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleElementLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(false);
      
      // Reset ring
      gsap.to(ring, {
        scale: isClicking ? 0.8 : 1,
        borderColor: 'white',
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
      });

      // Reset magnetic element
      if (target.classList.contains('magnetic')) {
        gsap.to(target, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'elastic.out(1, 0.3)',
        });
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, .hoverable, .magnetic'
    );
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementEnter);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
      
      document.body.style.cursor = 'auto';
    };
  }, [isHovering, isClicking]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor cursor-dot fixed pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'difference' }}
      />
      <div
        ref={ringRef}
        className={`custom-cursor cursor-ring fixed pointer-events-none z-[9998] transition-colors duration-300 ${
          isHovering ? 'border-pink-500' : 'border-white'
        }`}
        style={{ mixBlendMode: 'difference' }}
      />
    </>
  );
};

export default CustomCursor;
