import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroScene } from '../three/HeroScene';
import { ChevronDown, Download, FolderOpen } from 'lucide-react';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-void"
    >
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-30" />
      
      {/* Deep particle layer (3D scene) */}
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute inset-0"
      >
        <HeroScene />
      </motion.div>

      {/* Mid-layer blueprint lines */}
      <motion.div 
        style={{ 
          y: y1,
          x: mousePos.x * 0.5,
          rotateX: mousePos.y * 0.05,
          rotateY: mousePos.x * 0.05
        }}
        className="absolute inset-0 pointer-events-none"
      >
        <svg className="w-full h-full opacity-20" viewBox="0 0 1920 1080">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1ea7ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#1ea7ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Horizontal lines */}
          {[200, 400, 600, 800].map((y, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0"
              y1={y}
              x2="1920"
              y2={y}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.2 }}
            />
          ))}
          {/* Vertical lines */}
          {[300, 600, 900, 1200, 1500].map((x, i) => (
            <motion.line
              key={`v-${i}`}
              x1={x}
              y1="0"
              x2={x}
              y2="1080"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.15 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Foreground HUD elements */}
      <motion.div 
        style={{ 
          x: mousePos.x * -0.3,
          y: mousePos.y * -0.3
        }}
        className="absolute top-10 left-10 opacity-40"
      >
        <div className="w-20 h-20 border border-neon-blue/30 rotate-45" />
        <div className="w-16 h-16 border border-neon-cyan/20 rotate-45 -mt-18 ml-2" />
      </motion.div>

      <motion.div 
        style={{ 
          x: mousePos.x * -0.2,
          y: mousePos.y * -0.2
        }}
        className="absolute bottom-20 right-10 opacity-40"
      >
        <div className="w-32 h-32 border border-neon-teal/20 rounded-full" />
        <div className="w-24 h-24 border border-neon-blue/30 rounded-full absolute top-4 left-4" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 container mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Status indicator */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-neon-cyan rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-neon-cyan rounded-full animate-ping opacity-50" />
              </div>
              <span className="font-mono text-sm text-neon-cyan tracking-wider">SYSTEM ONLINE</span>
            </div>

            {/* Name */}
            <motion.h1 
              className="font-display text-5xl md:text-7xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-gradient-shift">GOURAV</span>
              <br />
              <span className="text-foreground">GANGWAR</span>
            </motion.h1>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-2"
            >
              <p className="font-mono text-neon-blue text-lg tracking-wide">
                Industrial Automation · SCADA · Real-time Visualization
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                "Results-driven engineer building mission-critical SCADA behaviors, automation pipelines, dashboards, alarms, historian logging, and RCA workflows."
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a 
                href="#projects"
                className="btn-neon group flex items-center gap-2"
              >
                <FolderOpen className="w-5 h-5 transition-transform group-hover:rotate-12" />
                View Projects
              </a>
              <a 
                href="#contact"
                className="btn-neon-outline group flex items-center gap-2"
              >
                <Download className="w-5 h-5 transition-transform group-hover:translate-y-1" />
                Download Resume
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex gap-8 pt-8 border-t border-steel/30"
            >
              {[
                { value: '8.56', label: 'CGPA' },
                { value: '5+', label: 'Projects' },
                { value: '10+', label: 'Certs' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-2xl text-neon-blue text-glow">{stat.value}</div>
                  <div className="font-mono text-xs text-muted-foreground tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - 3D scene takes this space */}
          <div className="hidden lg:block" />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs text-muted-foreground tracking-wider">SCROLL</span>
          <ChevronDown className="w-5 h-5 text-neon-blue" />
        </motion.div>
      </motion.div>

      {/* Corner HUD decorations */}
      <div className="absolute top-6 right-6 font-mono text-xs text-muted-foreground/50 text-right">
        <div>SYS.STATUS: ACTIVE</div>
        <div>VER: 2025.1</div>
      </div>
    </section>
  );
};
