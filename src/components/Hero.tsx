import { useState, useEffect } from 'react';
import { ChevronDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onSectionChange: (section: string) => void;
}

const Hero = ({ onSectionChange }: HeroProps) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
    'Full Stack Developer',
    'React Specialist', 
    'UI/UX Designer',
    'Problem Solver'
  ];

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % roles.length;
      const fullText = roles[current];

      setText(
        isDeleting 
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 bg-animated">
        {/* Multiple gradient layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.15),transparent_50%)] animate-float" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.12),transparent_40%)] animate-float-reverse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(168,85,247,0.1),transparent_60%)] animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Morphing shapes */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-primary/20 to-accent/20 animate-morph" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-l from-accent/15 to-primary/15 animate-morph" style={{ animationDelay: '5s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 animate-morph" style={{ animationDelay: '7s' }} />
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          >
            <div 
              className={`w-1 h-1 bg-primary rounded-full opacity-40`}
              style={{ 
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`
              }}
            />
          </div>
        ))}
        
        {/* Geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`geo-${i}`}
            className={`absolute animate-float ${i % 2 === 0 ? 'animate-float' : 'animate-float-reverse'}`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + i * 0.5}s`
            }}
          >
            {i % 3 === 0 && (
              <div className="w-6 h-6 border border-primary/30 rotate-45 bg-primary/5" />
            )}
            {i % 3 === 1 && (
              <div className="w-4 h-4 rounded-full border border-accent/30 bg-accent/5" />
            )}
            {i % 3 === 2 && (
              <div className="w-5 h-5 bg-primary/10 transform rotate-45 rounded-sm border border-primary/20" />
            )}
          </div>
        ))}
        
        {/* Drifting elements */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`drift-${i}`}
            className="absolute animate-drift opacity-20"
            style={{
              top: `${30 + i * 25}%`,
              animationDelay: `${i * 7}s`,
              animationDuration: `${25 + i * 5}s`
            }}
          >
            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${i % 2 === 0 ? 'from-primary to-accent' : 'from-accent to-primary'}`} />
          </div>
        ))}
        
        {/* Orbiting elements */}
        <div className="absolute top-1/4 left-1/4">
          <div className="animate-orbit">
            <div className="w-3 h-3 bg-primary/40 rounded-full" />
          </div>
        </div>
        <div className="absolute top-3/4 right-1/4">
          <div className="animate-orbit" style={{ animationDelay: '8s', animationDuration: '20s' }}>
            <div className="w-2 h-2 bg-accent/40 rounded-full" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 animate-fade-in-up">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-primary p-1 animate-pulse-glow">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-white">
                DS
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="text-foreground">Hi, I'm </span>
            <span className="gradient-text">Devansh Som</span>
          </h1>

          {/* Typing Animation */}
          <div className="h-16 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl text-muted-foreground">
              <span className="text-accent font-semibold">{text}</span>
              <span className="animate-pulse">|</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Passionate developer creating innovative web solutions with modern technologies. 
            Specialized in React, Node.js, and full-stack development with a focus on user experience.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-all duration-300 glow-primary"
              onClick={() => onSectionChange('projects')}
            >
              View My Work
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            {[
              { icon: Github, href: 'https://github.com', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:devansh@example.com', label: 'Email' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={() => onSectionChange('about')}
            className="animate-bounce text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Scroll to About section"
          >
            <ChevronDown className="w-8 h-8 mx-auto" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;