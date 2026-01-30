import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Entrance animation
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(
      nav.querySelector('.nav-logo'),
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'expo.out' }
    );

    tl.fromTo(
      nav.querySelectorAll('.nav-link'),
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'expo.out' },
      '-=0.4'
    );

    tl.fromTo(
      nav.querySelector('.nav-cta'),
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
      '-=0.2'
    );

    // Scroll behavior
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Glassmorphism effect
      setIsScrolled(currentScrollY > 100);
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass py-3 shadow-lg'
          : 'bg-transparent py-5'
      } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="nav-logo text-2xl font-bold font-['Poppins'] text-[#1A1A2E] hoverable"
          >
            <span className="gradient-text">Alex</span>Morgan
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="nav-link text-sm font-medium text-gray-700 hover:text-[#6B46C1] transition-colors duration-300 underline-anim hoverable"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="nav-cta magnetic-btn inline-flex items-center px-6 py-2.5 bg-[#6B46C1] text-white text-sm font-medium rounded-full hover:bg-[#5534A0] transition-colors duration-300 hoverable"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-[#6B46C1] transition-colors hoverable"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-base font-medium text-gray-700 hover:text-[#6B46C1] transition-colors duration-300 hoverable"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#6B46C1] text-white text-sm font-medium rounded-full hover:bg-[#5534A0] transition-colors duration-300 hoverable"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
