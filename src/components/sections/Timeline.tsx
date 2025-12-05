import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Users, Lightbulb, Rocket } from 'lucide-react';

const responsibilities = [
  {
    title: 'Team Lead',
    organization: 'Smart India Hackathon',
    icon: Users,
    color: 'neon-blue',
  },
  {
    title: 'Lead Research',
    organization: 'SpectraCall',
    icon: Lightbulb,
    color: 'neon-cyan',
  },
  {
    title: 'Co-Founder',
    organization: 'Project Kaal',
    icon: Rocket,
    color: 'neon-teal',
  },
];

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-heading">Responsibilities</span>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-steel/30 -translate-x-1/2">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-neon-blue via-neon-cyan to-neon-teal"
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-16">
            {responsibilities.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${isEven ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="glass-panel rounded-lg p-6 group hover:border-neon-blue/40 transition-all duration-500 card-hover">
                      <h3 className={`font-display text-xl text-foreground mb-2 group-hover:text-${item.color} transition-colors`}>
                        {item.title}
                      </h3>
                      <p className="font-mono text-sm text-muted-foreground">
                        {item.organization}
                      </p>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="w-2/12 flex justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.2 }}
                      className={`relative w-14 h-14 rounded-full bg-charcoal border-2 border-${item.color}/50 flex items-center justify-center group`}
                    >
                      <Icon className={`w-6 h-6 text-${item.color}`} />
                      
                      {/* Glow ring */}
                      <div className={`absolute inset-0 rounded-full border border-${item.color}/30 animate-pulse-ring`} />
                    </motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
