import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Dumbbell, Swords, Timer, BookOpen, Gamepad2 } from 'lucide-react';

const hobbies = [
  { name: 'Kickboxing', detail: 'National Level', icon: Dumbbell },
  { name: 'Martial Arts', detail: 'Combat Training', icon: Swords },
  { name: 'Long-distance Running', detail: 'Endurance', icon: Timer },
  { name: 'Tech Research', detail: 'Deep Dives', icon: BookOpen },
  { name: 'Strategy Reading', detail: 'Growth', icon: Gamepad2 },
];

export const Hobbies = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="relative py-20 overflow-hidden">
      {/* Minimal industrial strip background */}
      <div className="absolute inset-0 bg-gradient-to-r from-void via-charcoal/30 to-void" />
      <div className="absolute inset-0 blueprint-grid opacity-5" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header - inline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-8 flex-wrap"
        >
          <span className="font-mono text-xs text-muted-foreground tracking-wider">BEYOND CODE</span>
          
          {/* Hobbies as horizontal strip */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {hobbies.map((hobby, index) => {
              const Icon = hobby.icon;
              const parallaxX = useTransform(
                scrollYProgress,
                [0, 1],
                [-(index - 2) * 20, (index - 2) * 20]
              );

              return (
                <motion.div
                  key={index}
                  style={{ x: parallaxX }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 px-4 py-2 glass-panel rounded-full group hover:border-neon-blue/40 transition-all duration-300"
                >
                  <Icon className="w-4 h-4 text-neon-blue group-hover:text-neon-cyan transition-colors" />
                  <div>
                    <span className="font-mono text-sm text-foreground">{hobby.name}</span>
                    <span className="hidden md:inline text-xs text-muted-foreground ml-2">
                      ({hobby.detail})
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
