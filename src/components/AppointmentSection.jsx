import React from 'react';

const AppointmentSection = () => {
  return (
    <section id="contact" className="py-24 md:py-40 px-6 md:px-24 bg-background relative z-30">
      <div className="max-w-6xl mx-auto bg-accent p-10 md:p-32 flex flex-col xl:flex-row items-center justify-between gap-12 md:gap-16 relative overflow-hidden rounded-[2rem] md:rounded-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="relative z-10 text-center xl:text-left">
          <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8] mb-6 md:mb-8">
            Geleceği <br className="hidden md:block" /> Ertelemeyin.
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-md font-bold italic leading-relaxed mx-auto xl:mx-0">
            VIP portföy erişimi için sınırlı kontenjandan yararlanın.
          </p>
        </div>
        
        <div className="relative z-10 flex flex-col items-center gap-6 w-full md:w-auto">
          <button className="w-full md:w-auto bg-white text-accent px-10 md:px-16 py-6 md:py-8 rounded-none text-xl md:text-2xl font-black uppercase tracking-tighter shadow-3xl">
            Hemen Randevu Al
          </button>
          <div className="flex items-center gap-3 text-white/60 font-mono text-[10px] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Bugün 4 Boş Randevu
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
