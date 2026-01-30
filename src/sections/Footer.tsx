import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Twitter, Linkedin, Dribbble, Github, ArrowUp, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  navigation: [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ],
  services: [
    { name: 'UI/UX Design', href: '#services' },
    { name: 'Web Development', href: '#services' },
    { name: 'Brand Identity', href: '#services' },
    { name: 'Motion Design', href: '#services' },
  ],
  resources: [
    { name: 'Case Studies', href: '#' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Dribbble, href: '#', label: 'Dribbble' },
  { icon: Github, href: '#', label: 'GitHub' },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;
    if (!footer || !content) return;

    const ctx = gsap.context(() => {
      // Logo and tagline
      const logo = content.querySelector('.footer-logo');
      const tagline = content.querySelector('.footer-tagline');
      
      gsap.fromTo(
        [logo, tagline],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Link columns
      const columns = content.querySelectorAll('.link-column');
      columns.forEach((column, index) => {
        const links = column.querySelectorAll('a');
        gsap.fromTo(
          links,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            delay: 0.2 + index * 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Social icons
      const socials = content.querySelectorAll('.social-icon');
      gsap.fromTo(
        socials,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.6,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Copyright
      const copyright = content.querySelector('.copyright');
      if (copyright) {
        gsap.fromTo(
          copyright,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            delay: 0.8,
            ease: 'smooth',
            scrollTrigger: {
              trigger: footer,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Gradient orbs
      const orbs = footer.querySelectorAll('.gradient-orb');
      gsap.fromTo(
        orbs,
        { opacity: 0 },
        {
          opacity: 0.3,
          duration: 1,
          ease: 'smooth',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Continuous orb animation
      gsap.to(orbs, {
        x: 'random(-30, 30)',
        y: 'random(-20, 20)',
        scale: 'random(0.9, 1.1)',
        duration: 'random(8, 12)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 2,
          from: 'random',
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative pt-24 pb-8 overflow-hidden"
      style={{ background: '#1A1A2E' }}
    >
      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="gradient-orb absolute -top-32 -left-32 w-64 h-64 rounded-full opacity-0"
          style={{ background: 'radial-gradient(circle, rgba(107, 70, 193, 0.4) 0%, transparent 70%)' }}
        />
        <div 
          className="gradient-orb absolute top-1/2 -right-32 w-96 h-96 rounded-full opacity-0"
          style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)' }}
        />
        <div 
          className="gradient-orb absolute -bottom-32 left-1/3 w-80 h-80 rounded-full opacity-0"
          style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)' }}
        />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="footer-logo inline-block text-2xl font-bold font-['Poppins'] text-white mb-4 opacity-0 hoverable"
            >
              <span className="text-[#6B46C1]">Alex</span>Morgan
            </a>
            <p className="footer-tagline text-gray-400 mb-6 max-w-sm opacity-0">
              Creating digital experiences that inspire and drive results. Let's build something amazing together.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="social-icon w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#6B46C1] hover:text-white transition-all duration-300 opacity-0 hoverable"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="link-column">
            <h4 className="text-white font-bold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-[#06B6D4] transition-colors duration-300 inline-block hover:translate-x-1 transform hoverable"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="link-column">
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-[#06B6D4] transition-colors duration-300 inline-block hover:translate-x-1 transform hoverable"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="link-column">
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    className="text-gray-400 hover:text-[#06B6D4] transition-colors duration-300 inline-block hover:translate-x-1 transform hoverable"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="copyright text-gray-500 text-sm flex items-center gap-1 opacity-0">
              © {new Date().getFullYear()} Alex Morgan. Made with 
              <Heart className="w-4 h-4 text-[#EC4899] fill-[#EC4899]" /> 
              All rights reserved.
            </p>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="magnetic-btn flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 hoverable group"
            >
              <span className="text-sm">Back to top</span>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#6B46C1] transition-colors duration-300">
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
