import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';
import ThreeBackground from '../components/ThreeBackground';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const blob = blobRef.current;
    const particles = particlesRef.current;
    if (!section || !content || !image || !blob || !particles) return;

    const ctx = gsap.context(() => {
      // Subtitle animation - split text characters
      const subtitle = content.querySelector('.hero-subtitle');
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { y: 40, opacity: 0, rotateX: -40 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.6, delay: 0.3, ease: 'expo.out' }
        );
      }

      // Title animation - word by word
      const titleWords = content.querySelectorAll('.title-word');
      gsap.fromTo(
        titleWords,
        { clipPath: 'inset(0 100% 0 0)', x: -30, opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.5,
          ease: 'expo.out',
        }
      );

      // Description animation
      const description = content.querySelector('.hero-description');
      if (description) {
        gsap.fromTo(
          description,
          { opacity: 0, filter: 'blur(10px)' },
          { opacity: 1, filter: 'blur(0px)', duration: 0.7, delay: 1, ease: 'smooth' }
        );
      }

      // CTA buttons animation
      const ctaPrimary = content.querySelector('.cta-primary');
      const ctaSecondary = content.querySelector('.cta-secondary');
      
      if (ctaPrimary) {
        gsap.fromTo(
          ctaPrimary,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, delay: 1.2, ease: 'elastic.out(1, 0.5)' }
        );
      }
      
      if (ctaSecondary) {
        gsap.fromTo(
          ctaSecondary,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, delay: 1.3, ease: 'expo.out' }
        );
      }

      // Social proof animation
      const socialProof = content.querySelector('.social-proof');
      if (socialProof) {
        gsap.fromTo(
          socialProof,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 1.5, ease: 'expo.out' }
        );
      }

      // Image 3D reveal
      gsap.fromTo(
        image,
        { rotateY: -25, x: 100, opacity: 0 },
        { rotateY: 0, x: 0, opacity: 1, duration: 1.2, delay: 0.4, ease: 'expo.out' }
      );

      // Blob morph and scale
      gsap.fromTo(
        blob,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, delay: 0.2, ease: 'elastic.out(1, 0.5)' }
      );

      // Floating particles
      const particleElements = particles.querySelectorAll('.particle');
      particleElements.forEach((particle, i) => {
        gsap.fromTo(
          particle,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 0.6,
            duration: 1,
            delay: 0.5 + i * 0.1,
            ease: 'expo.out',
          }
        );

        // Continuous floating animation
        gsap.to(particle, {
          y: `random(-30, 30)`,
          x: `random(-20, 20)`,
          duration: `random(4, 8)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });

      // Scroll-triggered parallax
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(content, {
            y: -80 * progress,
            opacity: 1 - progress * 0.7,
            duration: 0.1,
          });

          gsap.to(image, {
            y: -40 * progress,
            rotateY: 8 * progress,
            duration: 0.1,
          });

          gsap.to(blob, {
            scale: 1 + 0.3 * progress,
            rotate: 45 * progress,
            duration: 0.1,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Three.js Background */}
      <ThreeBackground />

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-gradient-to-br from-[#6B46C1] to-[#EC4899]"
            style={{
              width: `${Math.random() * 12 + 8}px`,
              height: `${Math.random() * 12 + 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1 perspective-1000">
            <p className="hero-subtitle text-lg text-[#6B46C1] font-medium mb-4 opacity-0">
              Hello, I'm Alex Morgan
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A2E] leading-tight mb-6">
              <span className="title-word inline-block opacity-0">Crafting</span>{' '}
              <span className="title-word inline-block opacity-0">Digital</span>{' '}
              <span className="title-word inline-block opacity-0 gradient-text-animated">Experiences</span>{' '}
              <span className="title-word inline-block opacity-0">That</span>{' '}
              <span className="title-word inline-block opacity-0">Inspire</span>
            </h1>

            <p className="hero-description text-lg text-gray-600 mb-8 max-w-lg opacity-0">
              Award-winning designer & developer transforming bold ideas into immersive
              digital realities. Let's create something extraordinary together.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#portfolio"
                className="cta-primary magnetic-btn inline-flex items-center px-8 py-4 bg-[#6B46C1] text-white font-medium rounded-full hover:bg-[#5534A0] transition-all duration-300 hoverable group opacity-0"
              >
                View My Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              <a
                href="#contact"
                className="cta-secondary magnetic-btn inline-flex items-center px-8 py-4 border-2 border-[#6B46C1] text-[#6B46C1] font-medium rounded-full hover:bg-[#6B46C1] hover:text-white transition-all duration-300 hoverable opacity-0"
              >
                <Play className="mr-2 w-5 h-5" />
                Let's Talk
              </a>
            </div>

            <div className="social-proof flex items-center gap-4 opacity-0">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6B46C1] to-[#EC4899] border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-[#1A1A2E]">50+</span> global brands trust us
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative perspective-1000">
            {/* Animated Blob Background */}
            <div
              ref={blobRef}
              className="absolute -inset-8 lg:-inset-16 z-0 opacity-0"
              style={{
                background: 'linear-gradient(135deg, #6B46C1 0%, #EC4899 50%, #06B6D4 100%)',
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                animation: 'morphBlob 8s ease-in-out infinite',
                filter: 'blur(40px)',
                opacity: 0.3,
              }}
            />

            {/* Hero Image */}
            <div
              ref={imageRef}
              className="relative z-10 transform-3d opacity-0 group hoverable"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:rotate-y-[-5deg]">
                <img
                  src="/hero-portrait.jpg"
                  alt="Alex Morgan"
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/20 to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 bg-white rounded-2xl shadow-xl p-4 float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6B46C1] to-[#EC4899] flex items-center justify-center">
                    <span className="text-white text-xl">★</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A1A2E]">8+ Years</p>
                    <p className="text-xs text-gray-500">Experience</p>
                  </div>
                </div>
              </div>

              {/* Another floating element */}
              <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 bg-white rounded-2xl shadow-xl p-4 float-slow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#6B46C1] flex items-center justify-center">
                    <span className="text-white text-xl">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A1A2E]">150+</p>
                    <p className="text-xs text-gray-500">Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFBFC] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
