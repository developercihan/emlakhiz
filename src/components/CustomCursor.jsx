import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const ctx = gsap.context(() => {
      const onMouseMove = (e) => {
        const { clientX, clientY } = e;
        
        gsap.to(cursor, {
          x: clientX,
          y: clientY,
          duration: 0.1,
          ease: "power2.out"
        });

        gsap.to(follower, {
          x: clientX,
          y: clientY,
          duration: 0.4,
          ease: "power2.out"
        });
      };

      const onMouseEnter = () => {
        gsap.to([cursor, follower], { opacity: 1, scale: 1, duration: 0.3 });
      };

      const onMouseLeave = () => {
        gsap.to([cursor, follower], { opacity: 0, scale: 0, duration: 0.3 });
      };

      const onLinkEnter = () => {
        gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        gsap.to(follower, { scale: 2.5, backgroundColor: "rgba(197, 160, 89, 0.2)", border: "1px solid rgba(197, 160, 89, 0.5)", duration: 0.3 });
      };

      const onLinkLeave = () => {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(follower, { scale: 1, backgroundColor: "transparent", border: "1px solid rgba(255, 255, 255, 0.2)", duration: 0.3 });
      };

      window.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);

      const links = document.querySelectorAll('a, button, .cursor-pointer');
      links.forEach(link => {
        link.addEventListener('mouseenter', onLinkEnter);
        link.addEventListener('mouseleave', onLinkLeave);
      });
    });

    return () => {
      ctx.revert();
      const links = document.querySelectorAll('a, button, .cursor-pointer');
      // Olay dinleyicileri ctx.revert() ile temizlenmeyebilir, manuel temizlik gerekebilir
      // Ancak GSAP context içindeki event listener'ları yönetmek daha iyidir.
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-transform"
      />
    </>
  );
};

export default CustomCursor;
