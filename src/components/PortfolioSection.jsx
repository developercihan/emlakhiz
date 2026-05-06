import React from 'react';
import { Target, ShieldCheck, MapPin } from 'lucide-react';

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 md:py-40 px-6 md:px-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 blur-[150px] rounded-full" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
        <div className="lg:col-span-5">
          <span className="text-accent font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 md:mb-6 block">Küratörlü Seçki</span>
          <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-8 md:mb-10">
            Sadece <br /> <span className="italic font-drama text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Seçkin</span> <br /> Yapılar.
          </h2>
          <p className="text-white/40 text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-md">
            Yapay zeka algoritmalarımız pazarın sadece en üst %2'lik dilimine giren mimari yapıları listeler.
          </p>
          <div className="space-y-4 md:space-y-6">
            {['Kişiselleştirilmiş Eşleşme', 'Doğrulanmış Portföy'].map((text, i) => (
              <div key={i} className="flex items-center gap-4 md:gap-6 group cursor-pointer">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-none border border-white/10 flex items-center justify-center group-hover:border-accent transition-all">
                  {i === 0 ? <Target size={16} /> : <ShieldCheck size={16} />}
                </div>
                <span className="text-[10px] md:text-sm font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-7 relative">
          <div className="aspect-[4/5] rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl relative group">
            <img 
              src="/images/modern-interior.png" 
              alt="Luxury Interior" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
              <p className="text-accent font-mono text-[8px] md:text-xs uppercase tracking-widest mb-2">İlan No #4402</p>
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase">Obsidian Rezidans</h3>
              <p className="text-white/60 text-xs mt-2 flex items-center gap-2"><MapPin size={12} /> Beşiktaş, İstanbul</p>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-accent p-6 md:p-10 shadow-2xl">
            <p className="text-white text-3xl md:text-5xl font-black leading-none tracking-tighter">₺124M</p>
            <p className="text-white/60 text-[8px] md:text-[10px] uppercase font-bold mt-2 tracking-[0.2em]">Pazar Değeri</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
