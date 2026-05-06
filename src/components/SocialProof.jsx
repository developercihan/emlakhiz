import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Quote } from 'lucide-react';

const SocialProof = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const stats = [
    { label: "Yıllık İşlem Hacmi", value: "₺2.4B+" },
    { label: "AI Doğruluk Oranı", value: "%99.2" },
    { label: "VIP Yatırımcı", value: "850+" },
    { label: "Ortalama Satış Hızı", value: "12 Gün" }
  ];

  const testimonials = [
    {
      text: "EmlakHız, gayrimenkul piyasasındaki belirsizliği ortadan kaldıran bir cerrah hassasiyetine sahip. Veri odaklı yaklaşımları sayesinde portföyümüzü %40 daha hızlı optimize ettik.",
      author: "Levent K. Arda",
      role: "Global Yatırım Grubu Direktörü"
    },
    {
      text: "Geleneksel emlakçılık ile EmlakHız arasındaki fark, bir daktilo ile süper bilgisayar arasındaki fark kadar büyük. Hız ve şeffaflık inanılmaz.",
      author: "Selin Yılmaz",
      role: "Gayrimenkul Portföy Yöneticisi"
    },
    {
      text: "İstanbul pazarında veri her şeydir. EmlakHız'ın sunduğu mikro-lokasyon analizleri sayesinde yatırımlarımızda hata payını sıfıra indirdik.",
      author: "Mert Demir",
      role: "Yatırım Stratejisti"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    gsap.fromTo(".testimonial-content", 
      { opacity: 0, x: 20, filter: "blur(10px)" },
      { opacity: 1, x: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
    );
  }, [activeTestimonial]);

  return (
    <section className="py-24 bg-black border-y border-white/5 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-24">
        {/* Animated Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 relative z-10">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-2 group cursor-none">
              <span className="text-accent font-black text-3xl md:text-5xl tracking-tighter transition-all duration-500 group-hover:text-white group-hover:scale-110 origin-left">
                {stat.value}
              </span>
              <span className="text-white/30 text-[10px] md:text-xs font-black uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-24 md:mt-40 max-w-4xl relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-accent" />
            <span className="text-accent font-mono text-xs uppercase tracking-widest">Yatırımcı Görüşleri</span>
          </div>
          
          <div className="relative min-h-[300px] flex flex-col justify-center">
            <Quote size={40} className="text-accent/10 absolute -top-6 -left-4 md:size-[80px] md:-top-12 md:-left-12" />
            
            <div className="testimonial-content relative z-10">
              <blockquote className="text-2xl md:text-5xl font-drama italic text-white leading-tight mb-10">
                "{testimonials[activeTestimonial].text}"
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-accent to-black opacity-50" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-tight">{testimonials[activeTestimonial].author}</p>
                  <p className="text-accent/60 text-[10px] uppercase tracking-widest font-black">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-1 transition-all duration-500 ${activeTestimonial === i ? 'w-12 bg-accent' : 'w-4 bg-white/10'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
