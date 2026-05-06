import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X, ChevronRight } from 'lucide-react';

const Navbar = ({ onOpenWizard }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, { x: 0, opacity: 1, duration: 0.8, ease: "power4.out" });
      gsap.fromTo(".menu-item", { x: 50, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, delay: 0.2, ease: "power3.out" });
    } else {
      gsap.to(menuRef.current, { x: "100%", opacity: 0, duration: 0.6, ease: "power4.in" });
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav 
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-out px-4 py-2 rounded-full flex items-center justify-between border ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-2xl border-white/10 w-[95%] max-w-4xl shadow-premium' 
            : 'bg-transparent border-transparent w-[95%] max-w-7xl text-white'
        }`}
      >
        <div className="flex items-center gap-4 md:gap-6 pl-2 md:pl-4">
          <img src="/images/logo.png" alt="Logo" className="w-14 h-14 md:w-20 md:h-20 object-contain" />
          <div className="text-xl md:text-3xl font-black tracking-tighter text-white uppercase italic">
            Emlak<span className="text-accent">Hız</span>
          </div>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black tracking-[0.2em] uppercase text-white/50">
          <a href="#portfolio" className="hover:text-accent transition-colors">Portföy</a>
          <a href="#protocol" className="hover:text-accent transition-colors">Protokol</a>
          <a href="#contact" className="hover:text-accent transition-colors">İletişim</a>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={onOpenWizard}
            className="magnetic-button hidden sm:block bg-accent text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-premium transition-all"
          >
            <span>RANDEVU AL</span>
          </button>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-[200] bg-[#0A0A14] flex flex-col p-8 translate-x-full opacity-0 pointer-events-auto md:hidden"
      >
        <div className="flex justify-between items-center mb-16">
          <div className="text-2xl font-black text-white italic uppercase">Emlak<span className="text-accent">Hız</span></div>
          <button onClick={() => setIsMenuOpen(false)} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-8">
          {['Portföy', 'Protokol', 'Vizyon', 'İletişim'].map((item, i) => (
            <a 
              key={i} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setIsMenuOpen(false)}
              className="menu-item text-4xl font-black text-white uppercase tracking-tighter flex items-center justify-between group"
            >
              <span>{item}</span>
              <ChevronRight className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
        <div className="mt-auto pt-12 border-t border-white/5">
          <p className="text-white/30 text-xs font-black uppercase tracking-[0.3em] mb-6">GÜVENLİ VERİ HATTI</p>
          <button 
            onClick={() => { setIsMenuOpen(false); onOpenWizard(); }}
            className="w-full bg-accent text-white py-6 text-xl font-black uppercase tracking-tighter shadow-3xl"
          >
            Ücretsiz Danışmanlık Al
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
