import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Grid3X3, ArrowRight } from 'lucide-react';

const fitMatrix = [
  { requirement: 'SCADA/HMI', skill: 'Dashboard + visualization engine' },
  { requirement: 'RCA', skill: 'Troubleshooting workflows' },
  { requirement: 'Testing', skill: 'Dev/QA pipelines' },
  { requirement: 'Documentation', skill: 'BRD translation' },
  { requirement: 'Cloud Infrastructure', skill: 'GCP + AWS expertise' },
  { requirement: 'Data Logging', skill: 'Python + SQL pipelines' },
  { requirement: 'UI Scripting', skill: 'Python + JS event handling' },
  { requirement: 'Automation', skill: 'Shell + workflow design' },
];

export const CoreFit = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-void to-charcoal/50" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-heading flex items-center justify-center gap-2">
            <Grid3X3 className="w-4 h-4" />
            Core Fit Matrix
          </span>
          <p className="text-muted-foreground font-mono text-sm mt-4">
            INDUSTRIAL REQUIREMENTS MATCHING GRID
          </p>
        </motion.div>

        {/* Matrix grid */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel rounded-lg overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-3 bg-steel/30 border-b border-steel/50">
              <div className="p-4 font-mono text-xs text-neon-blue tracking-wider">REQUIREMENT</div>
              <div className="p-4 text-center font-mono text-xs text-muted-foreground">MATCH</div>
              <div className="p-4 font-mono text-xs text-neon-cyan tracking-wider text-right">YOUR SKILL</div>
            </div>

            {/* Data rows */}
            {fitMatrix.map((row, index) => {
              const parallaxX = useTransform(
                scrollYProgress,
                [0, 1],
                [index % 2 === 0 ? -20 : 20, index % 2 === 0 ? 20 : -20]
              );

              return (
                <motion.div
                  key={index}
                  style={{ x: parallaxX }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="grid grid-cols-3 items-center border-b border-steel/20 last:border-0 group hover:bg-neon-blue/5 transition-colors"
                >
                  <div className="p-4">
                    <span className="font-mono text-sm text-foreground group-hover:text-neon-blue transition-colors">
                      {row.requirement}
                    </span>
                  </div>
                  <div className="p-4 flex justify-center">
                    <ArrowRight className="w-5 h-5 text-neon-cyan group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="p-4">
                    <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors text-right block">
                      {row.skill}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
