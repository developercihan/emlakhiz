import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortfolioSection from './components/PortfolioSection';
import SocialProof from './components/SocialProof';
import Protocol from './components/Protocol';
import AppointmentSection from './components/AppointmentSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ValuationWizard from './components/ValuationWizard';
import LoadingScreen from './components/LoadingScreen';
import WelcomePopup from './components/WelcomePopup';
import ConciergeAI from './components/ConciergeAI';

const App = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis for Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Show popup after loading is complete and a short delay
    setTimeout(() => {
      setIsPopupOpen(true);
    }, 2000);
  };

  return (
    <div className="relative w-full bg-background text-white selection:bg-accent selection:text-white">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <div className="animate-in fade-in duration-1000">
          <CustomCursor />
          <ConciergeAI />
          <Navbar onOpenWizard={() => setIsWizardOpen(true)} />
          <Hero onOpenWizard={() => setIsWizardOpen(true)} />
          <PortfolioSection />
          <SocialProof />
          <Protocol />
          <AppointmentSection />
          <Footer />
          <ValuationWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
          <WelcomePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default App;
