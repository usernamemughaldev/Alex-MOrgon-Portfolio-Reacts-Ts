import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Palette, 
  Code2, 
  Fingerprint, 
  Sparkles, 
  MessageSquare, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating intuitive, beautiful interfaces that users love and remember.',
    color: 'from-[#6B46C1] to-[#8B5CF6]',
  },
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Building fast, responsive, and scalable web applications with modern tech.',
    color: 'from-[#06B6D4] to-[#22D3EE]',
  },
  {
    icon: Fingerprint,
    title: 'Brand Identity',
    description: 'Crafting memorable brands that stand out and tell your unique story.',
    color: 'from-[#EC4899] to-[#F472B6]',
  },
  {
    icon: Sparkles,
    title: 'Motion Design',
    description: 'Bringing interfaces to life with purposeful, delightful animations.',
    color: 'from-[#F59E0B] to-[#FBBF24]',
  },
  {
    icon: MessageSquare,
    title: 'Consulting',
    description: 'Strategic guidance for digital transformation and growth.',
    color: 'from-[#10B981] to-[#34D399]',
  },
  {
    icon: TrendingUp,
    title: 'SEO Optimization',
    description: 'Improving visibility and driving organic growth to your business.',
    color: 'from-[#6366F1] to-[#818CF8]',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    const decor = decorRef.current;
    if (!section || !header || !cards || !decor) return;

    const ctx = gsap.context(() => {
      // Header animations
      const subtitle = header.querySelector('.services-subtitle');
      const title = header.querySelector('.services-title');
      const description = header.querySelector('.services-description');

      gsap.fromTo(
        subtitle,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        title,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        description,
        { opacity: 0, filter: 'blur(5px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'smooth',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards 3D flip animation
      const cardElements = cards.querySelectorAll('.service-card');
      cardElements.forEach((card, index) => {
        gsap.fromTo(
          card,
          { rotateX: -30, y: 60, opacity: 0 },
          {
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.12,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cards,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Decorative shape rotation
      gsap.fromTo(
        decor,
        { rotate: -180, scale: 0 },
        {
          rotate: 0,
          scale: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Continuous rotation for decor
      gsap.to(decor, {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          cardElements.forEach((card, i) => {
            gsap.to(card, {
              y: 40 - progress * 80 + (i % 2) * 20,
              duration: 0.1,
            });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#FAFBFC]"
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(107, 70, 193, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative shape */}
      <div
        ref={decorRef}
        className="absolute -top-20 -right-20 w-64 h-64 opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #6B46C1 0%, #EC4899 100%)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <p className="services-subtitle text-lg text-[#6B46C1] font-medium mb-4 opacity-0">
            My Services
          </p>
          <h2 className="services-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-6 opacity-0">
            What I Can Do For <span className="gradient-text">You</span>
          </h2>
          <p className="services-description text-lg text-gray-600 opacity-0">
            From concept to launch, I provide comprehensive digital solutions tailored to your unique needs.
          </p>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1200"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform-3d opacity-0 hoverable ${
                index === 1 ? 'lg:mt-10' : ''
              } ${index === 4 ? 'lg:mt-10' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Hover 3D effect */}
              <div 
                className="absolute inset-0 rounded-2xl bg-white transition-all duration-500 group-hover:shadow-2xl"
                style={{
                  transform: 'translateZ(-10px)',
                }}
              />

              {/* Icon */}
              <div 
                className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                style={{ transform: 'translateZ(30px)' }}
              >
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div style={{ transform: 'translateZ(20px)' }}>
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-3 group-hover:text-[#6B46C1] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>

                {/* Learn more link */}
                <a
                  href="#contact"
                  className="inline-flex items-center text-[#6B46C1] font-medium group/link hoverable"
                >
                  <span className="relative">
                    Learn More
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6B46C1] group-hover/link:w-full transition-all duration-300" />
                  </span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-300" />
                </a>
              </div>

              {/* Gradient border on hover */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${service.color.includes('6B46C1') ? '#6B46C1' : service.color.includes('06B6D4') ? '#06B6D4' : service.color.includes('EC4899') ? '#EC4899' : '#F59E0B'}20 0%, transparent 50%)`,
                  padding: '2px',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
