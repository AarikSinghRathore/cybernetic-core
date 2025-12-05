import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Trophy, Target, Shield } from 'lucide-react';

const achievements = [
  {
    title: 'MSME 5 Innovation Challenge',
    status: 'Stage-1 Cleared',
    icon: Award,
  },
  {
    title: 'Smart India Hackathon 2025',
    status: 'Internal Round Cleared',
    icon: Trophy,
  },
  {
    title: 'Google Solution Challenge',
    status: 'SDG-4 Track',
    icon: Target,
  },
  {
    title: 'IDEX Defence Innovation',
    status: 'Proposal Under Eval',
    icon: Shield,
  },
];

export const Achievements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-charcoal/50 to-void" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-heading flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4" />
            National Programs & Achievements
          </span>
        </motion.div>

        {/* Achievement cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="glass-panel rounded-lg p-6 h-full text-center relative overflow-hidden animate-glow-pulse hover:animate-none hover:glow-md transition-all duration-500">
                  {/* Icon */}
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-neon-blue/10 border border-neon-blue/20">
                    <Icon className="w-6 h-6 text-neon-blue" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-neon-blue transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="font-mono text-xs text-neon-cyan tracking-wider">
                    {achievement.status}
                  </p>

                  {/* Pulse effect */}
                  <div className="absolute inset-0 bg-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
