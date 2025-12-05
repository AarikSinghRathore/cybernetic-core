import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/sections/Hero';
import { Profile } from '../components/sections/Profile';
import { Education } from '../components/sections/Education';
import { Skills } from '../components/sections/Skills';
import { Projects } from '../components/sections/Projects';
import { Timeline } from '../components/sections/Timeline';
import { Achievements } from '../components/sections/Achievements';
import { Certifications } from '../components/sections/Certifications';
import { CoreFit } from '../components/sections/CoreFit';
import { Hobbies } from '../components/sections/Hobbies';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/Footer';

const Index = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [colorHue, setColorHue] = useState(204); // Starting blue hue

  useEffect(() => {
    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    // Scroll-based color shift
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      // Shift from blue (204) to cyan (180) to teal (170)
      const newHue = 204 - scrollProgress * 34;
      setColorHue(newHue);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Dynamic CSS variable update for color shifting
  useEffect(() => {
    document.documentElement.style.setProperty('--neon-glow', `${colorHue} 100% 56%`);
  }, [colorHue]);

  return (
    <div className="relative min-h-screen bg-void overflow-x-hidden">
      {/* Global scanline effect */}
      <div className="fixed inset-0 pointer-events-none z-50 scanline opacity-20" />
      
      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 noise-overlay" />

      {/* Dynamic background gradient that shifts with scroll */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at ${50 + mousePos.x * 10}% ${50 + mousePos.y * 10}%, hsl(${colorHue} 100% 10% / 0.3) 0%, transparent 50%)`,
        }}
      />

      <Navigation />
      
      <main>
        <Hero />
        <section id="profile">
          <Profile />
        </section>
        <section id="education">
          <Education />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <Projects />
        <Timeline />
        <Achievements />
        <Certifications />
        <CoreFit />
        <Hobbies />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
