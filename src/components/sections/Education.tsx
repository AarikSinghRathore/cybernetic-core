import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';

const educationData = [
  {
    institution: 'VIT Bhopal University',
    degree: 'B.Tech CSE',
    period: '2024–2028',
    grade: '8.56/10',
  },
  {
    institution: 'Army Public School',
    degree: 'Higher Secondary',
    period: '2023',
    grade: '86.2%',
  },
  {
    institution: 'Army Public School',
    degree: 'Secondary',
    period: '2021',
    grade: '94.3%',
  },
];

const coursework = [
  'Operating Systems',
  'Computer Networks',
  'DBMS',
  'DSA',
  'Distributed Systems',
  'Automation Basics',
  'Data Visualization',
  'AI/ML',
];

export const Education = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 blueprint-dots opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-12 h-[2px] bg-gradient-to-r from-neon-cyan to-transparent" />
          <span className="section-heading flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Education
          </span>
        </motion.div>

        {/* Education cards */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="glass-panel rounded-lg p-6 md:p-8 group hover:border-neon-blue/40 transition-all duration-500 card-hover">
                {/* Animated border on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-lg border border-neon-blue/30 animate-pulse-glow" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl text-foreground group-hover:text-neon-blue transition-colors">
                      {edu.institution}
                    </h3>
                    <p className="font-mono text-muted-foreground">{edu.degree}</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-mono text-sm text-muted-foreground">{edu.period}</div>
                      <div className="font-display text-2xl text-neon-cyan text-glow">{edu.grade}</div>
                    </div>
                  </div>
                </div>

                {/* Decorative line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-neon-blue/50 via-neon-cyan/50 to-transparent origin-left"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Relevant Coursework */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-neon-blue" />
            <h3 className="font-mono text-sm text-neon-blue tracking-wider">RELEVANT COURSEWORK</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {coursework.map((course, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1 + i * 0.05 }}
                className="px-4 py-2 bg-charcoal border border-steel/50 rounded font-mono text-sm text-muted-foreground hover:border-neon-blue/50 hover:text-foreground transition-all duration-300"
              >
                {course}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
