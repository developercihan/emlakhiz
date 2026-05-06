import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MessageSquare, Send, X, Bot, User, Sparkles, MessageCircle } from 'lucide-react';

const ConciergeAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hoş geldiniz. Ben EmlakHız Concierge. Size en uygun lüks portföyü bulmak için buradayım. Bugün nasıl bir yatırım hayal ediyorsunuz?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatRef = useRef(null);
  const scrollRef = useRef(null);

  const phoneNumber = "905555555555";
  const message = "Merhaba EmlakHız, VIP portföy hakkında bilgi almak istiyorum.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(chatRef.current, 
        { y: 50, opacity: 0, scale: 0.9, filter: "blur(10px)" },
        { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userText = inputValue.trim().toLowerCase();
    const userMessage = { id: Date.now(), type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI Response
    setTimeout(() => {
      let botText = "";
      if (userText.includes("merhaba") || userText.includes("selam")) {
        botText = "Merhaba! EmlakHız VIP Concierge servisine hoş geldiniz. Size İstanbul'un en seçkin bölgelerindeki gizli portföylerimiz hakkında bilgi verebilir veya bir değerleme raporu hazırlayabilirim. Nasıl yardımcı olabilirim?";
      } else {
        botText = "Anlıyorum. Talebiniz veri havuzumuzda işleniyor. Kriterlerinize uygun Beşiktaş ve Bebek hattında 3 adet VIP portföyümüz mevcut. Detayları incelemek ister misiniz?";
      }

      const botMessage = { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: botText
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <>
      {/* Unified Floating Sidebar (LEFT) */}
      <div className="fixed bottom-6 left-6 md:left-10 z-[4000] flex flex-col gap-4 items-center">
        {/* Concierge AI Toggle Button (TOP) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#0A0A14] text-accent w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.3)] border border-accent/20 hover:scale-110 transition-all duration-300"
        >
          <Sparkles className="w-5 h-5 md:w-7 md:h-7 animate-pulse" />
        </button>

        {/* WhatsApp Button (BOTTOM) */}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 scale-125" />
            <div className="relative bg-green-600 hover:bg-green-500 text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
              <MessageCircle className="w-5 h-5 md:w-7 md:h-7" fill="currentColor" />
            </div>
          </div>
        </a>
      </div>

      {/* Chat Window (LEFT) */}
      {isOpen && (
        <div 
          ref={chatRef}
          className="fixed bottom-24 left-6 z-[4000] w-[calc(100vw-48px)] md:w-[400px] h-[500px] md:h-[600px] bg-[#0A0A14] border border-white/10 rounded-[2rem] shadow-3xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-accent flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-black text-[10px] uppercase tracking-widest">Concierge AI</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/60 text-[8px] uppercase font-bold">Çevrimiçi</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[12px] md:text-sm leading-relaxed ${
                  msg.type === 'user' 
                    ? 'bg-accent text-white rounded-tr-none text-right' 
                    : 'bg-white/5 text-white/90 border border-white/5 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/5 flex gap-3 shrink-0">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Yatırım kriterlerinizi yazın..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-white text-[11px] outline-none focus:border-accent transition-colors"
            />
            <button 
              onClick={handleSend}
              className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConciergeAI;
