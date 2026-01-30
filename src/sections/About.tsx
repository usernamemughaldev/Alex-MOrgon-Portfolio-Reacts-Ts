import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Award, Users, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Briefcase, value: 150, suffix: '+', label: 'Projects Completed' },
  { icon: Award, value: 8, suffix: '+', label: 'Years Experience' },
  { icon: Users, value: 50, suffix: '+', label: 'Happy Clients' },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const svg = svgRef.current;
    const statsContainer = statsRef.current;
    if (!section || !image || !content || !svg || !statsContainer) return;

    const ctx = gsap.context(() => {
      // Image 3D flip entrance
      gsap.fromTo(
        image,
        { rotateY: -90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animations
      const subtitle = content.querySelector('.about-subtitle');
      const title = content.querySelector('.about-title');
      const description = content.querySelector('.about-description');
      const cta = content.querySelector('.about-cta');

      gsap.fromTo(
        subtitle,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        title,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        description,
        { opacity: 0, filter: 'blur(8px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'smooth',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        cta,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: section,
            start: 'top 55%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // SVG line draw animation
      const path = svg.querySelector('path');
      if (path) {
        const pathLength = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Stats counter animation
      const statItems = statsContainer.querySelectorAll('.stat-item');
      statItems.forEach((item, index) => {
        const valueEl = item.querySelector('.stat-value');
        const iconEl = item.querySelector('.stat-icon');
        
        if (valueEl && iconEl) {
          const targetValue = stats[index].value;
          
          gsap.fromTo(
            item,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: statsContainer,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Counter animation
          gsap.fromTo(
            { value: 0 },
            { value: targetValue },
            {
              duration: 2,
              delay: 0.5 + index * 0.1,
              ease: 'expo.out',
              onUpdate: function () {
                valueEl.textContent = Math.floor(this.targets()[0].value).toString();
              },
            }
          );
        }
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
            y: 50 - progress * 100,
            duration: 0.1,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background diagonal stripe */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, rgba(107, 70, 193, 0.03) 40%, rgba(107, 70, 193, 0.03) 60%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div className="relative perspective-1000">
            <div
              ref={imageRef}
              className="relative transform-3d opacity-0"
            >
              {/* Decorative blob */}
              <div 
                className="absolute -inset-8 lg:-inset-12 z-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(107, 70, 193, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
                  borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                  animation: 'morphBlob 10s ease-in-out infinite',
                }}
              />

              {/* Main image */}
              <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl hoverable group">
                <img
                  src="/about-portrait.jpg"
                  alt="About Alex Morgan"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/20 to-transparent" />
              </div>

              {/* SVG connecting line */}
              <svg
                ref={svgRef}
                className="absolute -right-20 top-1/2 w-40 h-40 z-20 hidden lg:block"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="M0 50 Q 50 0, 100 50"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6B46C1" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="lg:pl-8">
            <p className="about-subtitle text-lg text-[#6B46C1] font-medium mb-4 opacity-0">
              About Me
            </p>

            <h2 className="about-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] leading-tight mb-6 opacity-0">
              Passionate About Creating{' '}
              <span className="gradient-text">Meaningful Design</span>
            </h2>

            <p className="about-description text-lg text-gray-600 mb-8 opacity-0">
              With over 8 years of experience in digital design and development, I specialize 
              in crafting user-centered solutions that drive results. My approach combines 
              strategic thinking with creative execution, ensuring every project not only 
              looks beautiful but also achieves its business objectives.
            </p>

            <p className="about-description text-gray-600 mb-8 opacity-0">
              I believe great design is about understanding people—their needs, desires, and 
              behaviors. By putting users at the center of everything I create, I deliver 
              experiences that resonate and convert.
            </p>

            <a
              href="#"
              className="about-cta magnetic-btn inline-flex items-center px-8 py-4 bg-[#6B46C1] text-white font-medium rounded-full hover:bg-[#5534A0] transition-all duration-300 hoverable group opacity-0"
            >
              <Download className="mr-2 w-5 h-5 group-hover:animate-bounce" />
              Download CV
            </a>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hoverable"
            >
              <div className="stat-icon w-14 h-14 rounded-xl bg-gradient-to-br from-[#6B46C1] to-[#EC4899] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="stat-value text-4xl font-bold text-[#1A1A2E]">0</span>
                <span className="text-2xl font-bold text-[#6B46C1]">{stat.suffix}</span>
              </div>
              <p className="text-gray-500 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
