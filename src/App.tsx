import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import GodHero from './components/GodHero';
import CrystalCards from './components/CrystalCards';
import About from './components/About';
import Gallery from './components/Gallery';
import Carousel3D from './components/Carousel3D';
import VIPBooking from './components/VIPBooking';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import FloatingCTA from './components/FloatingCTA';
import OfferBanner from './components/OfferBanner';
import Preloader from './components/Preloader';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import DiamondParticles from './components/DiamondParticles';
import MarqueeStrip from './components/MarqueeStrip';
import HorizontalGallery from './components/HorizontalGallery';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import TrustBadges from './components/TrustBadges';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <SmoothScroll>
      <Preloader onComplete={handleLoadComplete} />
      {loaded && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <DiamondParticles />
          <div className="min-h-screen bg-[#050208] text-white overflow-x-hidden selection:bg-eden-pink/30 selection:text-white relative">
            <Navbar />
            <GodHero />
            <MarqueeStrip />
            <CrystalCards />
            <TrustBadges />
            <MarqueeStrip />
            <About />
            <HorizontalGallery />
            <Gallery />
            <BeforeAfterSlider />
            <Carousel3D />
            <VIPBooking />
            <Footer />
            <WhatsAppButton />
            <FloatingCTA />
            <OfferBanner />
          </div>
        </>
      )}
    </SmoothScroll>
  );
}
