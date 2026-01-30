import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    id: 1,
    title: 'The Future of UI Design in 2024',
    excerpt: 'Exploring emerging trends and technologies shaping the design landscape',
    image: '/blog-design.jpg',
    date: 'Jan 15, 2024',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'Mastering Design Systems',
    excerpt: 'Building scalable, consistent design languages for modern products',
    image: '/blog-system.jpg',
    date: 'Jan 10, 2024',
    readTime: '8 min read',
    featured: false,
  },
  {
    id: 3,
    title: 'Animation for Better UX',
    excerpt: 'How motion design improves user experience and engagement',
    image: '/blog-animation.jpg',
    date: 'Jan 5, 2024',
    readTime: '6 min read',
    featured: false,
  },
];

const Blog = () => {
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
        header.querySelectorAll('.animate-item'),
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

      // Cards animation
      const cards = grid.querySelectorAll('.blog-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            scale: card.classList.contains('featured') ? 0.9 : 1,
            y: 40, 
            opacity: 0 
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: card.classList.contains('featured') ? 0.8 : 0.7,
            delay: 0.3 + index * 0.15,
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
          cards.forEach((card) => {
            gsap.to(card, {
              y: 20 - progress * 40,
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
      id="blog"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <p className="animate-item text-lg text-[#6B46C1] font-medium mb-4 opacity-0">
              Blog
            </p>
            <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] opacity-0">
              Latest <span className="gradient-text">Insights</span>
            </h2>
          </div>
          <a
            href="#"
            className="animate-item mt-4 sm:mt-0 inline-flex items-center text-[#6B46C1] font-medium hoverable group opacity-0"
          >
            View All Posts
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Blog Grid */}
        <div 
          ref={gridRef}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Featured Post */}
          <div className="blog-card featured group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 lg:row-span-2 opacity-0 hoverable">
            <div className="relative h-full min-h-[400px] lg:min-h-full">
              <img
                src={posts[0].image}
                alt={posts[0].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/50 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block px-3 py-1 bg-[#6B46C1] text-white text-xs font-medium rounded-full mb-4">
                  Featured
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#E0E7FF] transition-colors">
                  {posts[0].title}
                </h3>
                
                <p className="text-gray-300 mb-4">
                  {posts[0].excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {posts[0].date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {posts[0].readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Other Posts */}
          {posts.slice(1).map((post) => (
            <div
              key={post.id}
              className="blog-card group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 opacity-0 hoverable"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-2 group-hover:text-[#6B46C1] transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <a
                    href="#"
                    className="text-[#6B46C1] font-medium text-sm flex items-center gap-1 group/link"
                  >
                    Read
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
