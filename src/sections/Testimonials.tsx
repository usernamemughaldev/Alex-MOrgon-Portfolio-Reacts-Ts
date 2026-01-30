import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Jennifer Lee',
    role: 'CEO, TechStart',
    image: '/testimonial-jennifer.jpg',
    quote: 'Alex transformed our vision into reality. The attention to detail and creative solutions exceeded our expectations. Our new platform has increased user engagement by 200%.',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'Marketing Director, Bloom',
    image: '/testimonial-david.jpg',
    quote: 'Working with Alex was a game-changer. Our conversion rates increased by 150% after the redesign. The strategic approach and flawless execution made all the difference.',
    rating: 5,
  },
  {
    name: 'Maria Garcia',
    role: 'Founder, Artisan Co',
    image: '/testimonial-maria.jpg',
    quote: 'Professional, creative, and incredibly talented. Alex delivered beyond what we imagined possible. The brand identity perfectly captures our company values.',
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const carousel = carouselRef.current;
    if (!section || !header || !carousel) return;

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

      // Quote decoration
      const quoteDecor = section.querySelector('.quote-decoration');
      if (quoteDecor) {
        gsap.fromTo(
          quoteDecor,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 0.1,
            duration: 1,
            delay: 0.2,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Carousel entrance
      gsap.fromTo(
        carousel,
        { rotateY: -45, translateZ: -100, opacity: 0 },
        {
          rotateY: 0,
          translateZ: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Navigation dots
      const dots = section.querySelectorAll('.nav-dot');
      gsap.fromTo(
        dots,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.3,
          stagger: 0.05,
          delay: 0.8,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#FAFBFC]"
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(107, 70, 193, 0.1) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Quote decoration */}
      <div className="quote-decoration absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <Quote className="w-96 h-96 text-[#6B46C1]" strokeWidth={0.5} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-lg text-[#6B46C1] font-medium mb-4 opacity-0">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-6 opacity-0">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-lg text-gray-600 opacity-0">
            Feedback from amazing people I've had the pleasure to work with
          </p>
        </div>

        {/* Carousel */}
        <div 
          ref={carouselRef}
          className="relative perspective-1000 opacity-0"
        >
          {/* Testimonial Cards */}
          <div className="relative h-[400px] sm:h-[350px]">
            {testimonials.map((testimonial, index) => {
              const isActive = index === activeIndex;
              const isPrev = index === (activeIndex - 1 + testimonials.length) % testimonials.length;
              const isNext = index === (activeIndex + 1) % testimonials.length;
              
              let transform = 'translateX(100%) rotateY(45deg) scale(0.7) translateZ(-100px)';
              let opacity = 0;
              let zIndex = 0;
              
              if (isActive) {
                transform = 'translateX(0) rotateY(0) scale(1) translateZ(100px)';
                opacity = 1;
                zIndex = 10;
              } else if (isPrev) {
                transform = 'translateX(-60%) rotateY(25deg) scale(0.85) translateZ(-50px)';
                opacity = 0.7;
                zIndex = 5;
              } else if (isNext) {
                transform = 'translateX(60%) rotateY(-25deg) scale(0.85) translateZ(-50px)';
                opacity = 0.7;
                zIndex = 5;
              }

              return (
                <div
                  key={index}
                  className="absolute inset-0 flex items-center justify-center transition-all duration-600"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="w-full max-w-2xl bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
                    {/* Quote icon */}
                    <div className="mb-6">
                      <Quote className="w-10 h-10 text-[#6B46C1]" />
                    </div>

                    {/* Quote text */}
                    <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
                      "{testimonial.quote}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-[#1A1A2E]">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                      
                      {/* Rating */}
                      <div className="ml-auto flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1A1A2E] hover:bg-[#6B46C1] hover:text-white transition-all duration-300 z-20 hoverable"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1A1A2E] hover:bg-[#6B46C1] hover:text-white transition-all duration-300 z-20 hoverable"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`nav-dot w-3 h-3 rounded-full transition-all duration-300 hoverable ${
                  index === activeIndex
                    ? 'bg-[#6B46C1] scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
