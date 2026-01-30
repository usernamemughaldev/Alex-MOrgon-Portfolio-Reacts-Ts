import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Process from './sections/Process';
import Portfolio from './sections/Portfolio';
import Skills from './sections/Skills';
import Pricing from './sections/Pricing';
import Team from './sections/Team';
import Testimonials from './sections/Testimonials';
import Blog from './sections/Blog';
import CTA from './sections/CTA';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize smooth scroll behavior
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
          section.classList.add('active');
        },
        once: true,
      });
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#FAFBFC]">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        <Hero />
        <About />
        <Services />
        <Process />
        <Portfolio />
        <Skills />
        <Pricing />
        <Team />
        <Testimonials />
        <Blog />
        <CTA />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
