import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart3, Clock, Cpu, ShieldCheck, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card Stacking Effect
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: "+=100%",
          scrub: true,
          animation: gsap.to(card, {
            scale: 0.9,
            opacity: 0,
            filter: "blur(20px)",
            ease: "none"
          })
        });
      });

      // Floating Icons Animation
      gsap.to(".floating-icon", {
        y: -20,
        rotation: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          each: 0.5,
          from: "random"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { 
      num: "01", 
      title: "Dijital Keşif", 
      desc: "Nöral ağlarımız kriterlerinizi yaşam tarzı beklentilerinizle eşleştirir. Veri saniyeler içinde işlenir.", 
      img: "/images/hero-villa.png",
      icons: [<Cpu size={20} />, <Globe size={20} />]
    },
    { 
      num: "02", 
      title: "AI Analizi", 
      desc: "Mülk değeri ve teknik analizi 14ms içinde ekranınızda. Hata payı %1'in altındadır.", 
      img: "/images/modern-interior.png",
      icons: [<BarChart3 size={20} />, <ShieldCheck size={20} />]
    },
    { 
      num: "03", 
      title: "Vip Randevu", 
      desc: "Otonom takvimimizle bir tıkla yerinizi ayırtın. Zamanınız bizim için en değerli varlıktır.", 
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070",
      icons: [<Clock size={20} />, <ShieldCheck size={20} />]
    }
  ];

  return (
    <section id="protocol" ref={containerRef} className="bg-background relative">
      {steps.map((step, i) => (
        <div 
          key={i} 
          className="protocol-card sticky top-0 h-screen w-full flex items-center justify-center p-6 md:p-24 bg-[#0A0A14] border-t border-white/5"
          style={{ zIndex: i + 10 }}
        >
          {/* Animated Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] pointer-events-none uppercase tracking-tighter select-none">
            {step.title}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center max-w-7xl relative z-10 w-full">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-4 mb-6 md:mb-10">
                <span className="font-mono text-accent text-xl md:text-3xl font-black">PROTOKOL_{step.num}</span>
                <div className="h-[2px] w-12 md:w-16 bg-accent/30" />
              </div>
              <h3 className="text-4xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter uppercase leading-[0.8]">{step.title}</h3>
              <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-lg mb-10 md:mb-12">{step.desc}</p>
              
              <div className="flex gap-4">
                {step.icons.map((icon, idx) => (
                  <div key={idx} className="floating-icon w-12 h-12 md:w-16 md:h-16 border border-white/10 flex items-center justify-center bg-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <div className="text-accent relative z-10">{icon}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 md:order-2 rounded-[2rem] md:rounded-[4rem] overflow-hidden aspect-square relative border border-white/10 shadow-3xl group">
              <img src={step.img} alt={step.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-accent/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-1000" />
              
              {/* Scanline Effect Animation */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/50 shadow-[0_0_15px_rgba(197,160,89,0.5)] animate-scanline z-20" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Protocol;
