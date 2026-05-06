import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Bell, ShieldCheck } from 'lucide-react';

const WelcomePopup = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const ctx = gsap.context(() => {
        gsap.fromTo(modalRef.current, 
          { y: 50, opacity: 0, scale: 0.9, filter: "blur(10px)" },
          { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "back.out(1.7)", delay: 1 }
        );
      });
      return () => ctx.revert();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="relative w-full max-w-lg bg-[#0A0A14] border border-accent/20 p-8 md:p-12 rounded-[2rem] shadow-[0_0_100px_rgba(197,160,89,0.15)] overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-8 border border-accent/20">
            <Bell size={28} className="text-accent animate-bounce" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-6">
            Özel Portföy <br /> <span className="text-accent italic">Açıldı.</span>
          </h2>
          
          <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10">
            Bugün sisteme dahil edilen 4 yeni malikâne için VIP protokolümüz aktif edilmiştir.
          </p>
          
          <div className="flex flex-col gap-4 w-full">
            <button 
              onClick={onClose}
              className="bg-accent text-white py-6 rounded-none text-lg font-black uppercase tracking-tighter shadow-3xl hover:bg-white hover:text-black transition-all"
            >
              Portföyü İncele
            </button>
            <div className="flex items-center justify-center gap-2 text-[8px] font-mono text-white/20 uppercase tracking-widest">
              <ShieldCheck size={12} className="text-accent" /> %100 Gizlilik Garantisi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
