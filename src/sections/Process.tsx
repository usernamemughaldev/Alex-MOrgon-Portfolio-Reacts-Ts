import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover',
    description: 'Understanding your goals, audience, and challenges through in-depth research and analysis.',
    details: ['User Research', 'Market Analysis', 'Competitor Review', 'Goal Definition'],
    color: '#6B46C1',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Design',
    description: 'Creating wireframes, prototypes, and visual designs that align perfectly with your vision.',
    details: ['Wireframing', 'Prototyping', 'Visual Design', 'User Testing'],
    color: '#EC4899',
  },
  {
    number: '03',
    icon: Code,
    title: 'Develop',
    description: 'Building robust, scalable solutions with clean, maintainable code and best practices.',
    details: ['Frontend Development', 'Backend Integration', 'API Development', 'Quality Assurance'],
    color: '#06B6D4',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Deliver',
    description: 'Launching, testing, and optimizing for maximum impact and continuous improvement.',
    details: ['Deployment', 'Performance Testing', 'Analytics Setup', 'Ongoing Support'],
    color: '#10B981',
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const stepsContainer = stepsRef.current;
    const progress = progressRef.current;
    if (!section || !header || !stepsContainer || !progress) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header.children,
        { y: 40, opacity: 0 },
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

      // Step cards animation with stagger
      const stepCards = stepsContainer.querySelectorAll('.step-card');
      stepCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: stepsContainer,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Number scale animation
        const number = card.querySelector('.step-number');
        if (number) {
          gsap.fromTo(
            number,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1,
              opacity: 0.1,
              duration: 0.6,
              delay: 0.3 + index * 0.2,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: stepsContainer,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Progress bar animation
      gsap.fromTo(
        progress.querySelector('.progress-fill'),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: stepsContainer,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Connecting line SVG draw
      const connectingLine = section.querySelector('.connecting-line');
      if (connectingLine) {
        const path = connectingLine.querySelector('path');
        if (path) {
          const pathLength = (path as SVGPathElement).getTotalLength();
          gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });

          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: stepsContainer,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-lg text-[#6B46C1] font-medium mb-4 opacity-0">
            My Process
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-6 opacity-0">
            How I Bring Ideas to <span className="gradient-text">Life</span>
          </h2>
          <p className="text-lg text-gray-600 opacity-0">
            A proven methodology that ensures every project succeeds
          </p>
        </div>

        {/* Progress Bar */}
        <div ref={progressRef} className="relative mb-12">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="progress-fill h-full bg-gradient-to-r from-[#6B46C1] via-[#EC4899] to-[#06B6D4] rounded-full origin-left" />
          </div>
        </div>

        {/* Steps Grid */}
        <div ref={stepsRef} className="relative">
          {/* Connecting Line (Desktop) */}
          <svg
            className="connecting-line absolute top-24 left-0 w-full h-4 hidden lg:block pointer-events-none"
            viewBox="0 0 1200 20"
            preserveAspectRatio="none"
          >
            <path
              d="M0 10 Q 150 0, 300 10 T 600 10 T 900 10 T 1200 10"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6B46C1" />
                <stop offset="33%" stopColor="#EC4899" />
                <stop offset="66%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-card group relative opacity-0"
              >
                {/* Large background number */}
                <span 
                  className="step-number absolute -top-8 -left-4 text-[120px] font-bold leading-none opacity-0 pointer-events-none select-none"
                  style={{ color: `${step.color}15` }}
                >
                  {step.number}
                </span>

                {/* Card content */}
                <div className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2 hoverable">
                  {/* Step number badge */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <step.icon 
                      className="w-6 h-6" 
                      style={{ color: step.color }}
                    />
                  </div>

                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 mb-6 text-sm">
                    {step.description}
                  </p>

                  {/* Details list */}
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li 
                        key={i} 
                        className="flex items-center text-sm text-gray-500"
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full mr-2"
                          style={{ backgroundColor: step.color }}
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connector dot */}
                <div 
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-md hidden lg:block"
                  style={{ backgroundColor: step.color }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Ready to start your project? Let's discuss your ideas.
          </p>
          <a
            href="#contact"
            className="magnetic-btn inline-flex items-center px-8 py-4 bg-[#6B46C1] text-white font-medium rounded-full hover:bg-[#5534A0] transition-all duration-300 hoverable group"
          >
            Start a Project
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;
