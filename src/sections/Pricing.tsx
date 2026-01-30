import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter',
    price: '1,500',
    description: 'Perfect for small projects and startups',
    features: [
      'Up to 5 pages',
      'Basic SEO setup',
      '2 revision rounds',
      '2 weeks delivery',
      'Email support',
    ],
    highlighted: false,
    color: '#6B46C1',
  },
  {
    name: 'Professional',
    price: '5,000',
    description: 'Most popular for growing businesses',
    features: [
      'Up to 15 pages',
      'Advanced SEO',
      'Unlimited revisions',
      '4 weeks delivery',
      'Priority support',
      'Analytics setup',
    ],
    highlighted: true,
    color: '#EC4899',
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale projects',
    features: [
      'Unlimited pages',
      'Full SEO suite',
      'Dedicated team',
      'Custom timeline',
      '24/7 support',
      'Strategy consulting',
    ],
    highlighted: false,
    color: '#06B6D4',
  },
];

const Pricing = () => {
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

      // Cards 3D rise animation
      const cardElements = cards.querySelectorAll('.pricing-card');
      cardElements.forEach((card, index) => {
        const isFeatured = card.classList.contains('featured');
        
        gsap.fromTo(
          card,
          { rotateX: 20, y: 80, opacity: 0 },
          {
            rotateX: 0,
            y: isFeatured ? -30 : 0,
            opacity: 1,
            duration: isFeatured ? 0.9 : 0.8,
            delay: 0.2 + index * 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cards,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Price counter animation
        const priceEl = card.querySelector('.price-value');
        if (priceEl && plans[index].price !== 'Custom') {
          const targetPrice = parseInt(plans[index].price.replace(',', ''));
          gsap.fromTo(
            { value: 0 },
            { value: targetPrice },
            {
              duration: 1,
              delay: 0.6 + index * 0.15,
              ease: 'expo.out',
              onUpdate: function () {
                const val = Math.floor(this.targets()[0].value);
                priceEl.textContent = val.toLocaleString();
              },
              scrollTrigger: {
                trigger: cards,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Decorative shapes float in
      gsap.fromTo(
        decor.children,
        { scale: 0, rotate: -30 },
        {
          scale: 1,
          rotate: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Continuous floating animation for decor
      gsap.to(decor.children, {
        y: 'random(-15, 15)',
        rotation: 'random(-5, 5)',
        duration: 'random(4, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.5,
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
          cardElements.forEach((card, i) => {
            gsap.to(card, {
              y: (i === 1 ? -30 : 0) + (20 - progress * 40),
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
      id="pricing"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#FAFBFC]"
    >
      {/* Decorative shapes */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20"
          style={{ background: 'linear-gradient(135deg, #6B46C1 0%, #EC4899 100%)' }}
        />
        <div 
          className="absolute bottom-20 right-10 w-48 h-48 rounded-full opacity-15"
          style={{ background: 'linear-gradient(135deg, #06B6D4 0%, #6B46C1 100%)' }}
        />
        <div 
          className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full opacity-10"
          style={{ background: 'linear-gradient(135deg, #EC4899 0%, #06B6D4 100%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-lg text-[#6B46C1] font-medium mb-4 opacity-0">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-6 opacity-0">
            Investment <span className="gradient-text">Plans</span>
          </h2>
          <p className="text-lg text-gray-600 opacity-0">
            Transparent pricing for every stage of your project
          </p>
        </div>

        {/* Pricing Cards */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8 perspective-1200"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card group relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-500 opacity-0 hoverable ${
                plan.highlighted 
                  ? 'featured shadow-2xl shadow-[#EC4899]/20 lg:-mt-8 lg:mb-8' 
                  : 'hover:shadow-xl hover:-translate-y-2'
              }`}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-[#EC4899] to-[#F472B6] rounded-full text-white text-sm font-medium shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">
                {plan.name}
              </h3>

              <p className="text-gray-500 text-sm mb-6">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  {plan.price !== 'Custom' && (
                    <span className="text-gray-400 text-lg">$</span>
                  )}
                  <span 
                    className="price-value text-5xl font-bold text-[#1A1A2E]"
                  >
                    {plan.price === 'Custom' ? 'Custom' : '0'}
                  </span>
                </div>
                {plan.price !== 'Custom' && (
                  <span className="text-gray-400 text-sm">/project</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${plan.color}15` }}
                    >
                      <Check className="w-3 h-3" style={{ color: plan.color }} />
                    </div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="#contact"
                className={`magnetic-btn w-full inline-flex items-center justify-center px-6 py-4 rounded-full font-medium transition-all duration-300 group/btn ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-[#EC4899] to-[#F472B6] text-white hover:shadow-lg hover:shadow-[#EC4899]/30'
                    : 'bg-gray-100 text-[#1A1A2E] hover:bg-[#6B46C1] hover:text-white'
                }`}
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>

              {/* Glow effect for featured */}
              {plan.highlighted && (
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: '0 0 60px rgba(236, 72, 153, 0.3)',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            All plans include a 30-day satisfaction guarantee.{' '}
            <a href="#contact" className="text-[#6B46C1] hover:underline">
              Questions? Let's talk.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
