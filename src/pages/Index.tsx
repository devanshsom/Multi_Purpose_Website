import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import TodoApp from '@/components/TodoApp';
import Products from '@/components/Products';
import Contact from '@/components/Contact';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Handle section scrolling
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'todo', 'products', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionChange={scrollToSection} />
      
      <main>
        <section id="home">
          <Hero onSectionChange={scrollToSection} />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        
        <section id="todo">
          <TodoApp />
        </section>
        
        <section id="products">
          <Products />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background-tertiary py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">DS</span>
              </div>
              <span className="text-xl font-bold gradient-text">Devansh Som</span>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Full Stack Developer passionate about creating innovative web solutions 
              with modern technologies and exceptional user experiences.
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-6">
            {['About', 'Projects', 'Task Manager', 'Products', 'Contact'].map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', ''))}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {item}
              </button>
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>&copy; 2024 Devansh Som. All rights reserved.</p>
            <p className="mt-2">Built with React, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
    </CartProvider>
  );
};

export default Index;
