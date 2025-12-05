import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { User, Target, Cpu, Zap } from 'lucide-react';

export const Profile = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const lineY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const highlights = [
    { icon: Cpu, text: "Industrial Automation" },
    { icon: Target, text: "AI-driven Visualization" },
    { icon: Zap, text: "Cloud Systems" },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Blueprint lines background */}
      <motion.div 
        style={{ y: lineY }}
        className="absolute inset-0 pointer-events-none"
      >
        <svg className="w-full h-full opacity-10" preserveAspectRatio="none">
          <defs>
            <pattern id="blueprintPattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1ea7ff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprintPattern)" />
        </svg>
      </motion.div>

      {/* Floating blueprint elements */}
      <motion.div 
        style={{ y }}
        className="absolute left-10 top-20 w-64 h-64 border border-neon-blue/10 rounded-lg rotate-12 opacity-30"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute right-20 bottom-20 w-48 h-48 border border-neon-cyan/10 rounded-full opacity-20"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="w-12 h-[2px] bg-gradient-to-r from-neon-blue to-transparent" />
          <span className="section-heading flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </span>
        </motion.div>

        {/* Main content card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glass panel */}
          <div className="glass-panel rounded-lg p-8 md:p-12 hud-corners">
            {/* Scan line effect */}
            <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
              <motion.div
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-6">
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
                Results-driven engineering student specializing in{' '}
                <span className="text-neon-blue font-semibold">industrial automation foundations</span>,{' '}
                <span className="text-neon-cyan font-semibold">AI-driven visualization</span>,{' '}
                <span className="text-neon-teal font-semibold">cloud systems</span>, Linux, and data modeling.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Strong capabilities in debugging, root cause analysis, scripting, dashboard logic, testing, 
                and pipeline design — aligned directly with Industrial Automation & Robotics product ecosystems. 
                Built multiple complex systems involving visualization, alarms, logging, release workflows, 
                documentation, and environment testing.
              </p>

              {/* Highlight chips */}
              <div className="flex flex-wrap gap-3 pt-4">
                {highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-steel/50 border border-neon-blue/20 rounded-full"
                  >
                    <item.icon className="w-4 h-4 text-neon-blue" />
                    <span className="font-mono text-sm text-foreground/80">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-neon-blue/40" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-neon-blue/40" />
          </div>

          {/* Background glow */}
          <div className="absolute -inset-4 bg-neon-blue/5 blur-3xl rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
};
