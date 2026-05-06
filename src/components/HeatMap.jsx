import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { TrendingUp, X, MapPin, Activity, ArrowRight } from 'lucide-react';

const HeatMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = [
    { 
      id: 1, 
      name: "Beşiktaş & Bebek", 
      price: "₺320.000/m²", 
      trend: "+12.4%", 
      top: "42%", 
      left: "48%",
      details: "İstanbul'un kalbi, lüksün ve boğazın buluştuğu nokta."
    },
    { 
      id: 2, 
      name: "Nişantaşı", 
      price: "₺285.000/m²", 
      trend: "+8.2%", 
      top: "45%", 
      left: "44%",
      details: "Cemiyet hayatının ve modanın merkezi. Yüksek prestij."
    },
    { 
      id: 3, 
      name: "Zekeriyaköy", 
      price: "₺145.000/m²", 
      trend: "+18.6%", 
      top: "25%", 
      left: "47%",
      details: "Müstakil yaşamın zirvesi. Güven ve doğa odaklı."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marker-pulse", {
        scale: 3,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.out"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 md:py-40 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-accent font-mono text-xs uppercase tracking-[0.3em]">Market Intelligence</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8]">
              Yatırım <br /> <span className="text-white/40 italic">Otoritesi.</span>
            </h2>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl flex items-center gap-6">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <TrendingUp className="text-accent" />
            </div>
            <div>
              <p className="text-white font-black text-lg leading-tight uppercase tracking-tighter">Yıllık %14.2</p>
              <p className="text-white/30 text-[9px] uppercase font-bold tracking-widest">Ortalama Değer Artışı</p>
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-[16/10] md:aspect-[21/9] bg-[#0A0A0F] rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* GEOGRAPHICAL MAP OVERLAY */}
          <div className="absolute inset-0 z-0">
            {/* SVG MAP OF ISTANBUL REGION */}
            <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full opacity-10 text-accent fill-current">
              <path d="M100,100 L900,100 L900,400 L100,400 Z" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
              <text x="500" y="250" fontSize="120" fontWeight="900" textAnchor="middle" fill="currentColor" opacity="0.05">ISTANBUL</text>
            </svg>
            
            {/* Realistic Geographical Map Texture */}
            <img 
              src="https://images.unsplash.com/photo-1548345680-f5475ee5df15?auto=format&fit=crop&q=80&w=2000" 
              alt="Geographical Map Background" 
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.2] contrast-[1.5] mix-blend-screen opacity-30"
            />
          </div>

          {/* GRID & HUD ELEMENTS */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

          {/* MARKERS */}
          {regions.map((region) => (
            <div 
              key={region.id}
              className="absolute z-10"
              style={{ top: region.top, left: region.left }}
            >
              <div 
                onClick={() => setSelectedRegion(region)}
                className="relative flex items-center justify-center group/marker cursor-pointer"
              >
                <div className="marker-pulse absolute w-12 h-12 bg-accent/30 rounded-full" />
                <div className={`relative w-4 h-4 rounded-full border-2 border-black transition-all duration-500 shadow-2xl ${
                  selectedRegion?.id === region.id ? 'bg-white scale-[1.8] shadow-[0_0_30px_rgba(255,255,255,0.8)]' : 'bg-accent group-hover/marker:scale-150'
                }`} />
                
                <div className={`absolute top-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg transition-all duration-300 ${
                  selectedRegion?.id === region.id ? 'opacity-100 -translate-y-2' : 'opacity-100'
                }`}>
                  <p className="text-white text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{region.name}</p>
                </div>
              </div>
            </div>
          ))}

          {/* SIDEBAR ANALYTICS */}
          {selectedRegion && (
            <div className="absolute top-10 right-10 w-80 bg-[#0A0A10]/95 backdrop-blur-3xl border border-accent/30 p-10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] animate-in slide-in-from-right-10 duration-700 z-50">
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-accent/10 rounded-2xl border border-accent/20">
                  <MapPin size={24} className="text-accent" />
                </div>
                <button onClick={() => setSelectedRegion(null)} className="text-white/20 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <span className="text-accent font-mono text-[9px] uppercase tracking-[0.4em] mb-2 block">Seçili Bölge</span>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">{selectedRegion.name}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-white/30 text-[8px] uppercase font-bold mb-1">m² Fiyatı</p>
                    <p className="text-lg font-black text-white font-mono">{selectedRegion.price.split('/')[0]}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-white/30 text-[8px] uppercase font-bold mb-1">Trend</p>
                    <p className="text-lg font-black text-green-400 font-mono">{selectedRegion.trend}</p>
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed font-medium italic border-l-2 border-accent pl-4">
                  "{selectedRegion.details}"
                </p>

                <button className="w-full bg-white text-black py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-all group">
                  Raporu Görüntüle <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* SYSTEM HUD */}
          <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center bg-black/40 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/5">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">Live Feed: Istanbul Analytics</span>
              </div>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="flex items-center gap-3">
                <Activity size={14} className="text-accent" />
                <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">Otorite Seviyesi: Doğrulanmış</span>
              </div>
            </div>
            <div className="text-white/20 text-[9px] font-mono tracking-widest">
              IST-MAP_PRO_V2
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeatMap;
