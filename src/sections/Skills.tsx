import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Figma, Code, Film, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    icon: Figma,
    title: 'Design',
    skills: ['Figma', 'Sketch', 'Adobe Suite'],
    percentage: 95,
    color: '#6B46C1',
  },
  {
    icon: Code,
    title: 'Development',
    skills: ['React', 'Node.js', 'TypeScript'],
    percentage: 90,
    color: '#06B6D4',
  },
  {
    icon: Film,
    title: 'Motion',
    skills: ['After Effects', 'Lottie', 'GSAP'],
    percentage: 85,
    color: '#EC4899',
  },
  {
    icon: BarChart3,
    title: 'Strategy',
    skills: ['User Research', 'Analytics', 'SEO'],
    percentage: 88,
    color: '#10B981',
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const rings = ringsRef.current;
    if (!section || !content || !rings) return;

    const ctx = gsap.context(() => {
      // Content animations
      const subtitle = content.querySelector('.skills-subtitle');
      const title = content.querySelector('.skills-title');
      const description = content.querySelector('.skills-description');
      const skillItems = content.querySelectorAll('.skill-item');

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
          duration: 0.6,
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

      gsap.fromTo(
        skillItems,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Progress rings animation
      const ringItems = rings.querySelectorAll('.ring-item');
      ringItems.forEach((item, index) => {
        const circle = item.querySelector('.progress-circle');
        const valueEl = item.querySelector('.ring-value');
        const percentage = skillCategories[index].percentage;
        const radius = 50;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        // Initial state
        gsap.set(circle, {
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
        });

        // Animate ring
        gsap.to(circle, {
          strokeDashoffset: offset,
          duration: 1.5,
          delay: 0.6 + index * 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: rings,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        // Animate center circle
        gsap.fromTo(
          item.querySelector('.center-circle'),
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            delay: 0.5 + index * 0.12,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: rings,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Counter animation
        gsap.fromTo(
          { value: 0 },
          { value: percentage },
          {
            duration: 1.5,
            delay: 0.6 + index * 0.12,
            ease: 'expo.out',
            onUpdate: function () {
              if (valueEl) {
                valueEl.textContent = Math.floor(this.targets()[0].value).toString();
              }
            },
            scrollTrigger: {
              trigger: rings,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Connecting lines draw animation
      const connectingLines = rings.querySelectorAll('.connecting-line');
      connectingLines.forEach((line, index) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            delay: 0.8 + index * 0.12,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: rings,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <div ref={contentRef}>
            <p className="skills-subtitle text-lg text-[#6B46C1] font-medium mb-4 opacity-0">
              My Skills
            </p>

            <h2 className="skills-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] leading-tight mb-6 opacity-0">
              Tools & Technologies I <span className="gradient-text">Master</span>
            </h2>

            <p className="skills-description text-lg text-gray-600 mb-10 opacity-0">
              Years of experience have honed my expertise across the full digital creation stack. 
              I'm constantly learning and adapting to new technologies.
            </p>

            {/* Skill Categories List */}
            <div className="space-y-6">
              {skillCategories.map((category, index) => (
                <div 
                  key={index}
                  className="skill-item group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 opacity-0 hoverable"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    <category.icon 
                      className="w-6 h-6" 
                      style={{ color: category.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.skills.join(', ')}
                    </p>
                  </div>
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: category.color }}
                  >
                    {category.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Rings Column */}
          <div ref={ringsRef} className="relative">
            {/* Center hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-[#6B46C1] to-[#EC4899] flex items-center justify-center shadow-xl z-10">
              <span className="text-white text-sm font-bold text-center">
                Expert<br/>Level
              </span>
            </div>

            {/* Rings arranged in a pattern */}
            <div className="grid grid-cols-2 gap-8">
              {skillCategories.map((category, index) => (
                <div 
                  key={index}
                  className={`ring-item relative flex flex-col items-center ${
                    index === 0 ? 'lg:mt-0' : index === 1 ? 'lg:mt-12' : index === 2 ? 'lg:-mt-4' : 'lg:mt-8'
                  }`}
                >
                  {/* Progress Ring */}
                  <div className="relative w-32 h-32 mb-4">
                    {/* Background circle */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="50"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                      />
                      {/* Progress circle */}
                      <circle
                        className="progress-circle"
                        cx="64"
                        cy="64"
                        r="50"
                        fill="none"
                        stroke={category.color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        style={{
                          transformOrigin: 'center',
                        }}
                      />
                    </svg>

                    {/* Center content */}
                    <div 
                      className="center-circle absolute inset-0 flex flex-col items-center justify-center opacity-0"
                    >
                      <category.icon 
                        className="w-6 h-6 mb-1" 
                        style={{ color: category.color }}
                      />
                      <span className="ring-value text-xl font-bold text-[#1A1A2E]">
                        0
                      </span>
                      <span className="text-xs text-gray-400">%</span>
                    </div>
                  </div>

                  {/* Label */}
                  <h4 className="text-sm font-bold text-[#1A1A2E]">
                    {category.title}
                  </h4>

                  {/* Connecting line to center */}
                  <div 
                    className="connecting-line absolute top-16 left-1/2 w-16 h-0.5 origin-left hidden lg:block"
                    style={{
                      background: `linear-gradient(to right, ${category.color}, transparent)`,
                      transform: `rotate(${45 + index * 90}deg)`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
