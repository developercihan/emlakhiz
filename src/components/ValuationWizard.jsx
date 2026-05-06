import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, ChevronRight, BarChart3, MapPin, Home, Layers, CheckCircle2 } from 'lucide-react';

const ValuationWizard = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    region: '',
    type: '',
    area: '',
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power4.out" });
    }
  }, [isOpen]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else startAnalysis();
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(4);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md">
      <div 
        ref={modalRef}
        className="relative w-full max-w-2xl bg-[#0A0A14] border border-white/10 rounded-[2rem] overflow-hidden shadow-3xl"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-accent/20 w-full">
          <div 
            className="h-full bg-accent transition-all duration-500" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="text-accent font-mono text-[10px] uppercase tracking-widest mb-4 block">ADIM 01/03</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-8">Hangi Bölge <br /> <span className="text-white/40">İçin Analiz İstiyorsunuz?</span></h2>
              <div className="grid grid-cols-2 gap-4">
                {['İstanbul', 'Bodrum', 'İzmir', 'Antalya'].map((loc) => (
                  <button 
                    key={loc}
                    onClick={() => { setData({...data, region: loc}); handleNext(); }}
                    className="group p-6 border border-white/5 bg-white/5 hover:border-accent hover:bg-accent/5 transition-all text-left relative overflow-hidden"
                  >
                    <MapPin size={16} className="text-accent/40 mb-4 group-hover:text-accent transition-colors" />
                    <span className="text-white font-bold block">{loc}</span>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 translate-x-1/2 -translate-y-1/2 rounded-full" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="text-accent font-mono text-[10px] uppercase tracking-widest mb-4 block">ADIM 02/03</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-8">Mülk Tipini <br /> <span className="text-white/40">Seçin.</span></h2>
              <div className="grid grid-cols-2 gap-4">
                {['Müstakil Villa', 'Rezidans', 'Penthouse', 'Malikâne'].map((type) => (
                  <button 
                    key={type}
                    onClick={() => { setData({...data, type: type}); handleNext(); }}
                    className="group p-6 border border-white/5 bg-white/5 hover:border-accent hover:bg-accent/5 transition-all text-left"
                  >
                    <Home size={16} className="text-accent/40 mb-4 group-hover:text-accent transition-colors" />
                    <span className="text-white font-bold block">{type}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="text-accent font-mono text-[10px] uppercase tracking-widest mb-4 block">ADIM 03/03</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-8">Tahmini <br /> <span className="text-white/40">Metrekare?</span></h2>
              <div className="grid grid-cols-1 gap-4">
                {['100 - 250 m²', '250 - 500 m²', '500 - 1000 m²', '1000+ m²'].map((area) => (
                  <button 
                    key={area}
                    onClick={() => { setData({...data, area: area}); handleNext(); }}
                    className="group p-6 border border-white/5 bg-white/5 hover:border-accent hover:bg-accent/5 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Layers size={16} className="text-accent/40 group-hover:text-accent" />
                      <span className="text-white font-bold">{area}</span>
                    </div>
                    <ChevronRight size={16} className="text-white/20 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative mb-10">
                <div className="w-24 h-24 border-2 border-accent/20 rounded-full animate-spin border-t-accent" />
                <BarChart3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent" size={32} />
              </div>
              <p className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter mb-4">Veri Havuzu Analiz Ediliyor...</p>
              <div className="space-y-2 max-w-xs w-full">
                <div className="flex justify-between text-[8px] font-mono text-white/30 uppercase">
                  <span>Nöral Ağ Bağlantısı</span>
                  <span className="text-accent">AKTİF</span>
                </div>
                <div className="flex justify-between text-[8px] font-mono text-white/30 uppercase">
                  <span>Pazar Verisi (2026)</span>
                  <span className="text-accent">OKUNDU</span>
                </div>
                <div className="flex justify-between text-[8px] font-mono text-white/30 uppercase">
                  <span>Regresyon Modeli</span>
                  <span className="text-accent">HESAPLANIYOR</span>
                </div>
              </div>
            </div>
          )}

          {step === 4 && !isAnalyzing && (
            <div className="animate-in zoom-in duration-500 text-center py-10">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={40} className="text-accent" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-4">Analiz Tamamlandı.</h2>
              <p className="text-white/40 text-lg mb-12">Detaylı raporunuz hazırlandı. <br /> Erişim için doğrulama yapın.</p>
              
              <div className="space-y-4">
                <label htmlFor="wizard-email" className="sr-only">E-posta Adresiniz</label>
                <input 
                  id="wizard-email"
                  type="email" 
                  placeholder="E-posta Adresiniz" 
                  className="w-full bg-white/5 border border-white/10 p-5 text-white font-bold focus:border-accent outline-none transition-colors"
                />
                <button className="w-full bg-accent text-white py-6 text-xl font-black uppercase tracking-tighter shadow-3xl hover:bg-white hover:text-black transition-all">
                  Raporu Görüntüle
                </button>
              </div>
              <p className="text-[8px] text-white/20 uppercase font-bold tracking-widest mt-6">
                *Verileriniz 256-bit SSL protokolü ile korunmaktadır.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValuationWizard;
