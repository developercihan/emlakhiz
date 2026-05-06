import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Zap, BarChart3 } from 'lucide-react';

const Hero = ({ onOpenWizard }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-line-1", { y: 60, opacity: 0, duration: 1.2, ease: "power3.out" })
        .from(".hero-line-2", { y: 100, opacity: 0, duration: 1.5, ease: "power4.out" }, "-=0.8")
        .from(".hero-cta", { y: 40, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=0.8")
        .from(".floating-valuation", { x: 50, opacity: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" }, "-=0.5");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen md:h-[110vh] w-full flex items-center justify-start p-6 md:p-24 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-villa.png" 
          alt="Hero Villa" 
          className="w-full h-full object-cover opacity-60 scale-110"
          style={{ animation: 'kenBurns 40s linear infinite alternate' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#0A0A14] via-[#0A0A14]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl w-full pt-20 md:pt-0">
        <div className="flex flex-col gap-0">
          <span className="hero-line-1 text-accent font-mono text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.5em] uppercase mb-4 flex items-center gap-4">
            <span className="w-8 md:w-12 h-[1px] bg-accent" /> Lüks Gayrimenkul Yatırım Protokolü
          </span>
          <h1 className="flex flex-col gap-2">
            <span className="hero-line-1 text-4xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
              Mülkünüzü <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Yapay Zeka Hızıyla</span>
            </span>
            <span className="hero-line-2 text-6xl md:text-[14rem] font-drama italic text-accent leading-[0.7] -mt-2 md:-mt-4">
              Keşfedin.
            </span>
          </h1>
        </div>

        <div className="hero-cta mt-8 md:mt-12 flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-12">
          <button className="magnetic-button group bg-white text-black px-8 md:px-12 py-5 md:py-6 rounded-none text-base md:text-lg font-black uppercase tracking-tighter flex items-center justify-center md:justify-start gap-6 shadow-3xl transition-all">
            <span>Portföyü İncele</span>
            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-500" />
          </button>
          
          <div className="flex items-center gap-4 md:gap-6 px-4 md:px-0">
            <div 
              onClick={onOpenWizard}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center group cursor-pointer hover:border-accent transition-colors"
            >
              <Zap size={18} className="text-accent group-hover:scale-125 transition-transform" />
            </div>
            <div>
              <p onClick={onOpenWizard} className="text-white font-bold text-base md:text-lg cursor-pointer hover:text-accent transition-colors">Akıllı Emlak Analizi</p>
              <p className="text-white/40 text-[10px] tracking-widest uppercase">%98.4 Başarı Oranı</p>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Valuation Widget - Optimized for Mobile */}
      <div className="floating-valuation fixed bottom-4 right-4 md:absolute md:bottom-12 md:right-12 z-50">
        {/* Mobile View: Compressed FAB */}
        <div className="md:hidden group relative">
          <button 
            onClick={onOpenWizard}
            className="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-premium border border-accent/20"
          >
            <BarChart3 size={24} />
          </button>
        </div>

        {/* Desktop View: Full Card */}
        <div className="hidden md:block bg-[#05050A]/80 backdrop-blur-2xl border border-accent/30 p-8 rounded-[2rem] w-80 shadow-3xl">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-black tracking-widest uppercase text-accent">Anlık Değerleme</span>
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-white/40 text-[10px] uppercase font-bold">Ortalama m² Fiyatı</span>
              <span className="text-xl font-mono text-white">₺84,200</span>
            </div>
            <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-accent w-3/4 animate-shimmer" />
            </div>
            <p className="text-[10px] text-white/30 leading-relaxed italic">
              *Algoritmalarımız bölgedeki 12,000+ veriyi saniyeler içinde işledi.
            </p>
            <button 
              onClick={onOpenWizard}
              className="w-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase py-3 hover:bg-accent hover:text-white transition-all"
            >
              Mülkünü Ücretsiz Değerle
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
