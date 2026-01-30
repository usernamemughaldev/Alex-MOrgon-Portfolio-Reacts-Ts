import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Branding', 'UI/UX', 'Development', 'Motion'];

const projects = [
  {
    id: 1,
    title: 'Nexus Dashboard',
    description: 'Analytics platform redesign with modern UI',
    category: 'UI/UX',
    image: '/project-dashboard.jpg',
    link: '#',
  },
  {
    id: 2,
    title: 'Bloom Brand',
    description: 'Complete brand identity for wellness startup',
    category: 'Branding',
    image: '/project-brand.jpg',
    link: '#',
  },
  {
    id: 3,
    title: 'Pulse App',
    description: 'Fitness tracking mobile application',
    category: 'Development',
    image: '/project-fitness.jpg',
    link: '#',
  },
  {
    id: 4,
    title: 'Vertex Website',
    description: 'Corporate website redesign',
    category: 'UI/UX',
    image: '/project-website.jpg',
    link: '#',
  },
  {
    id: 5,
    title: 'Echo Motion',
    description: 'Product showcase animation',
    category: 'Motion',
    image: '/project-motion.jpg',
    link: '#',
  },
  {
    id: 6,
    title: 'Prism E-commerce',
    description: 'Online store development',
    category: 'Development',
    image: '/project-ecommerce.jpg',
    link: '#',
  },
];

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const filters = filtersRef.current;
    const grid = gridRef.current;
    if (!section || !header || !filters || !grid) return;

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

      // Filters animation
      gsap.fromTo(
        filters.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = grid.querySelectorAll('.portfolio-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.1,
            ease: 'expo.out',
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
            gsap.to(card, {
              y: 30 - progress * 60 + (i % 3) * 10,
              duration: 0.1,
            });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Handle filter change with animation
  const handleFilterChange = (filter: string) => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.portfolio-card');
    
    gsap.to(cards, {
      scale: 0.9,
      opacity: 0.3,
      duration: 0.3,
      ease: 'expo.out',
      onComplete: () => {
        setActiveFilter(filter);
        gsap.to(cards, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'expo.out',
        });
      },
    });
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#FAFBFC]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-lg text-[#6B46C1] font-medium mb-4 opacity-0">
            My Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-6 opacity-0">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 opacity-0">
            A selection of my recent work across various industries
          </p>
        </div>

        {/* Filter Tabs */}
        <div 
          ref={filtersRef} 
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hoverable ${
                activeFilter === category
                  ? 'bg-[#6B46C1] text-white shadow-lg shadow-[#6B46C1]/30'
                  : 'bg-white text-gray-600 hover:text-[#6B46C1] hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div 
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`portfolio-card group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 opacity-0 hoverable ${
                index % 3 === 1 ? 'lg:mt-10' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/90 via-[#1A1A2E]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Hover actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <a
                    href={project.link}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#6B46C1] hover:bg-[#6B46C1] hover:text-white transition-colors duration-300"
                    aria-label="View project"
                  >
                    <Eye className="w-5 h-5" />
                  </a>
                  <a
                    href={project.link}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#6B46C1] hover:bg-[#6B46C1] hover:text-white transition-colors duration-300"
                    aria-label="External link"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[#6B46C1]">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-2 group-hover:text-[#6B46C1] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {project.description}
                </p>
              </div>

              {/* 3D hover effect */}
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: '0 30px 60px rgba(107, 70, 193, 0.2)',
                  transform: 'translateZ(30px)',
                }}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="magnetic-btn inline-flex items-center px-8 py-4 border-2 border-[#6B46C1] text-[#6B46C1] font-medium rounded-full hover:bg-[#6B46C1] hover:text-white transition-all duration-300 hoverable group"
          >
            View All Projects
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
