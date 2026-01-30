import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const decor = decorRef.current;
    if (!section || !content || !image || !decor) return;

    const ctx = gsap.context(() => {
      // Title animation - word by word
      const titleWords = content.querySelectorAll('.title-word');
      gsap.fromTo(
        titleWords,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Description
      const description = content.querySelector('.cta-description');
      if (description) {
        gsap.fromTo(
          description,
          { opacity: 0, filter: 'blur(8px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.6,
            delay: 0.3,
            ease: 'smooth',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // CTA buttons
      const ctaPrimary = content.querySelector('.cta-primary');
      const ctaSecondary = content.querySelector('.cta-secondary');

      if (ctaPrimary) {
        gsap.fromTo(
          ctaPrimary,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.5,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (ctaSecondary) {
        gsap.fromTo(
          ctaSecondary,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Image 3D reveal
      gsap.fromTo(
        image,
        { rotateY: 20, x: 50, opacity: 0 },
        {
          rotateY: 0,
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Decorative shapes
      const shapes = decor.querySelectorAll('.decor-shape');
      gsap.fromTo(
        shapes,
        { scale: 0, rotate: -20 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.4,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Continuous floating for shapes
      gsap.to(shapes, {
        y: 'random(-20, 20)',
        rotation: 'random(-10, 10)',
        duration: 'random(4, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.3,
          from: 'random',
        },
      });

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(image, {
            y: 30 - progress * 60,
            duration: 0.1,
          });
          gsap.to(shapes, {
            rotation: progress * 30,
            duration: 0.1,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #6B46C1 0%, #5534A0 50%, #1A1A2E 100%)',
      }}
    >
      {/* Decorative shapes */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="decor-shape absolute top-20 left-10 w-32 h-32 rounded-full opacity-20"
          style={{ background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)' }}
        />
        <div 
          className="decor-shape absolute bottom-20 right-1/4 w-24 h-24 rounded-full opacity-15"
          style={{ background: 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)' }}
        />
        <div 
          className="decor-shape absolute top-1/3 right-10 w-16 h-16 rounded-full opacity-20"
          style={{ background: 'white' }}
        />
        <div 
          className="decor-shape absolute bottom-1/3 left-1/4 w-20 h-20 opacity-10"
          style={{ 
            background: 'white',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          }}
        />
      </div>

      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 70% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Let's Create Something Amazing
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              <span className="title-word inline-block opacity-0">Ready</span>{' '}
              <span className="title-word inline-block opacity-0">to</span>{' '}
              <span className="title-word inline-block opacity-0">Start</span>{' '}
              <span className="title-word inline-block opacity-0">Your</span>{' '}
              <span className="title-word inline-block opacity-0">Project?</span>
            </h2>

            <p className="cta-description text-lg text-white/80 mb-8 max-w-lg mx-auto lg:mx-0 opacity-0">
              Let's collaborate and create something extraordinary together. 
              Your vision, my expertise—let's make it happen.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="cta-primary magnetic-btn inline-flex items-center px-8 py-4 bg-white text-[#6B46C1] font-medium rounded-full hover:bg-[#E0E7FF] transition-all duration-300 hoverable group opacity-0"
              >
                Get In Touch
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#portfolio"
                className="cta-secondary magnetic-btn inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 hoverable opacity-0"
              >
                View Portfolio
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative perspective-1000 hidden lg:block">
            <div
              ref={imageRef}
              className="relative transform-3d opacity-0"
            >
              {/* Glow effect */}
              <div 
                className="absolute -inset-8 rounded-full opacity-30 blur-3xl"
                style={{
                  background: 'linear-gradient(135deg, #EC4899 0%, #06B6D4 100%)',
                }}
              />

              {/* Image container */}
              <div 
                className="relative overflow-hidden rounded-3xl"
                style={{
                  clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)',
                }}
              >
                <img
                  src="/about-portrait.jpg"
                  alt="Alex Morgan"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/40 to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6B46C1] to-[#EC4899] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A1A2E]">Let's Talk</p>
                    <p className="text-xs text-gray-500">Start your project</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
