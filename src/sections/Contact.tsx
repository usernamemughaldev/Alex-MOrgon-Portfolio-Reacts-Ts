import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Dribbble, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@alexmorgan.com',
    href: 'mailto:hello@alexmorgan.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: '#',
  },
];

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Dribbble, href: '#', label: 'Dribbble' },
  { icon: Github, href: '#', label: 'GitHub' },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const form = formRef.current;
    const info = infoRef.current;
    if (!section || !header || !form || !info) return;

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

      // Form animation
      const formElements = form.querySelectorAll('.form-element');
      gsap.fromTo(
        formElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Info animation
      const infoItems = info.querySelectorAll('.info-item');
      gsap.fromTo(
        infoItems,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: info,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Social icons
      const socials = info.querySelectorAll('.social-link');
      gsap.fromTo(
        socials,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.5,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: info,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Message Sent!',
      description: 'Thank you for reaching out. I\'ll get back to you soon.',
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#FAFBFC]"
    >
      {/* Background decoration */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 100% 0%, rgba(107, 70, 193, 0.1) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-lg text-[#6B46C1] font-medium mb-4 opacity-0">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-6 opacity-0">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-lg text-gray-600 opacity-0">
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2">
            <div className="space-y-6 mb-10">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="info-item group flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 opacity-0 hoverable"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6B46C1] to-[#EC4899] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="text-[#1A1A2E] font-medium group-hover:text-[#6B46C1] transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-gray-500 mb-4">Follow me on</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="social-link w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-[#6B46C1] hover:text-white hover:shadow-lg transition-all duration-300 opacity-0 hoverable"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="form-element opacity-0">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6B46C1] focus:ring-2 focus:ring-[#6B46C1]/20 transition-all"
                  />
                </div>
                <div className="form-element opacity-0">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6B46C1] focus:ring-2 focus:ring-[#6B46C1]/20 transition-all"
                  />
                </div>
              </div>

              <div className="form-element mb-6 opacity-0">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6B46C1] focus:ring-2 focus:ring-[#6B46C1]/20 transition-all"
                />
              </div>

              <div className="form-element mb-8 opacity-0">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6B46C1] focus:ring-2 focus:ring-[#6B46C1]/20 transition-all resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="form-element magnetic-btn w-full inline-flex items-center justify-center px-8 py-4 bg-[#6B46C1] text-white font-medium rounded-xl hover:bg-[#5534A0] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hoverable opacity-0"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
