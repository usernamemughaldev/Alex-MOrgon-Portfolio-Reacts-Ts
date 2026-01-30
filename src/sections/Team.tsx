import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Twitter, Linkedin, Dribbble, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Alex Morgan',
    role: 'Creative Director',
    bio: 'Vision and strategy',
    image: '/hero-portrait.jpg',
    socials: {
      twitter: '#',
      linkedin: '#',
      dribbble: '#',
    },
  },
  {
    name: 'Sarah Chen',
    role: 'Lead Designer',
    bio: 'Beautiful interfaces',
    image: '/team-sarah.jpg',
    socials: {
      twitter: '#',
      linkedin: '#',
      dribbble: '#',
    },
  },
  {
    name: 'Marcus Johnson',
    role: 'Senior Developer',
    bio: 'Robust solutions',
    image: '/team-marcus.jpg',
    socials: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Emily Davis',
    role: 'Motion Artist',
    bio: 'Living animations',
    image: '/team-emily.jpg',
    socials: {
      twitter: '#',
      linkedin: '#',
      dribbble: '#',
    },
  },
];

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!section || !header || !grid) return;

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

      // Cards 3D flip animation
      const cards = grid.querySelectorAll('.team-card');
      cards.forEach((card, index) => {
        const direction = index % 2 === 0 ? -90 : 90;
        
        gsap.fromTo(
          card,
          { rotateY: direction, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2 + index * 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Social icons pop in
        const socials = card.querySelectorAll('.social-icon');
        gsap.fromTo(
          socials,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            delay: 0.9 + index * 0.15,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          cards.forEach((card, i) => {
            const offset = i % 2 === 0 ? 20 : -20;
            gsap.to(card, {
              y: offset - progress * offset * 2,
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
      id="team"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-lg text-[#6B46C1] font-medium mb-4 opacity-0">
            My Team
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-6 opacity-0">
            Meet the Creative <span className="gradient-text">Minds</span>
          </h2>
          <p className="text-lg text-gray-600 opacity-0">
            A talented group of professionals dedicated to excellence
          </p>
        </div>

        {/* Team Grid */}
        <div 
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1200"
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`team-card group relative opacity-0 ${
                index === 1 ? 'lg:mt-6' : index === 2 ? 'lg:-mt-6' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hoverable">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Social icons */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        className="social-icon w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1A1A2E] hover:bg-[#6B46C1] hover:text-white transition-colors duration-300"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        className="social-icon w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1A1A2E] hover:bg-[#6B46C1] hover:text-white transition-colors duration-300"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials.dribbble && (
                      <a
                        href={member.socials.dribbble}
                        className="social-icon w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1A1A2E] hover:bg-[#EC4899] hover:text-white transition-colors duration-300"
                        aria-label="Dribbble"
                      >
                        <Dribbble className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        className="social-icon w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white transition-colors duration-300"
                        aria-label="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#6B46C1] text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Want to join our creative team?
          </p>
          <a
            href="#contact"
            className="magnetic-btn inline-flex items-center px-8 py-4 border-2 border-[#6B46C1] text-[#6B46C1] font-medium rounded-full hover:bg-[#6B46C1] hover:text-white transition-all duration-300 hoverable"
          >
            View Open Positions
          </a>
        </div>
      </div>
    </section>
  );
};

export default Team;
