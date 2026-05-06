import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => onComplete()
      });

      // Initial state
      gsap.set(logoRef.current, { scale: 0.9, opacity: 0 });

      // ULTRA FAST 0.5s TOTAL FLOW
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out"
      })
      .to(progressRef.current, {
        width: "100%",
        duration: 0.3,
        ease: "power2.inOut"
      }, "-=0.1")
      .to([logoRef.current, textRef.current, containerRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: "power2.in",
        stagger: 0.05
      })
      .set(containerRef.current, { display: "none" });

    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-12 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        {/* Large Logo in Center */}
        <div ref={logoRef} className="mb-12">
          <img src="/images/logo.png" alt="EmlakHız Logo" className="w-32 h-32 md:w-48 md:h-48 object-contain" />
        </div>

        <div ref={textRef} className="w-full">
          <div className="flex justify-between items-end mb-4">
            <span className="text-white font-black text-xs uppercase tracking-[0.3em]">Yükleniyor</span>
            <span className="text-accent font-mono text-[10px] uppercase">Sistem Hazırlanıyor</span>
          </div>
          
          <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
            <div 
              ref={progressRef}
              className="absolute top-0 left-0 h-full bg-accent w-0"
            />
          </div>
          
          <div className="mt-4 flex justify-between items-center text-[8px] font-mono text-white/10 uppercase tracking-widest">
            <span>© 2026 EMLAKHIZ</span>
            <span>VERİ_İŞLENİYOR</span>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-accent/5 rounded-full blur-[150px]" />
    </div>
  );
};

export default LoadingScreen;
