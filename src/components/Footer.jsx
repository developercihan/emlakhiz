import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black pt-24 md:pt-40 pb-12 md:pb-16 px-6 md:px-24 relative z-40 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24 mb-24 md:mb-40">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-6 mb-8 md:mb-10">
            <img src="/images/logo.png" alt="Logo" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
            <div className="text-3xl md:text-5xl font-black text-white uppercase italic">Emlak<span className="text-accent">Hız</span></div>
          </div>
          <p className="text-white/30 max-w-sm leading-relaxed text-base md:text-lg font-medium">
            Veriyi hıza, hızı kâra dönüştüren yeni nesil dijital mimari.
          </p>
        </div>
        <div className="grid grid-cols-2 md:block gap-8">
          <div>
            <h4 className="text-white font-black mb-6 md:mb-10 text-[10px] tracking-widest uppercase">Navigasyon</h4>
            <ul className="text-white/30 space-y-3 md:space-y-4 text-[10px] font-black uppercase tracking-widest">
              <li><a href="#portfolio" className="hover:text-accent transition-colors">Portföy</a></li>
              <li><a href="#protocol" className="hover:text-accent transition-colors">Protokol</a></li>
            </ul>
          </div>
          <div className="md:mt-12">
            <h4 className="text-white font-black mb-6 md:mb-10 text-[10px] tracking-widest uppercase">İletişim</h4>
            <ul className="text-white/30 space-y-3 md:space-y-4 font-mono text-[9px] tracking-[0.2em] uppercase">
              <li className="hover:text-accent cursor-pointer">bilgi@emlakhiz.pro</li>
              <li className="text-accent/60">İSTANBUL_MERKEZ_01</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-12 md:pt-16">
        <div className="text-white/10 text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.5em] uppercase text-center md:text-left">
          EMLAKHIZ © 2026 — TÜM HAKLARI SAKLIDIR
        </div>
      </div>
    </footer>
  );
};

export default Footer;
