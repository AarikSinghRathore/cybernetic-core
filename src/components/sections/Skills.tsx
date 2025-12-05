import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Cpu, Code, Cloud, Brain, Settings, 
  Database, Terminal, Server, Gauge, FileCode
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Industrial & Automation',
    icon: Cpu,
    color: 'neon-blue',
    skills: [
      'SCADA Fundamentals (Basic)',
      'HMI Concepts (Dashboards, alarms, events)',
      'Data Logging & Visualization (Python)',
      'UI Event Scripting (Python + JS)',
    ],
  },
  {
    title: 'Programming',
    icon: Code,
    color: 'neon-cyan',
    skills: ['Python', 'MATLAB', 'Shell'],
  },
  {
    title: 'Tools',
    icon: Terminal,
    color: 'neon-teal',
    skills: ['Pandas', 'Matplotlib', 'SQL'],
  },
  {
    title: 'Cloud & Infrastructure',
    icon: Cloud,
    color: 'neon-blue',
    skills: ['GCP', 'AWS', 'Linux (LFS101x)', 'Virtualization', 'Cisco Networking'],
  },
  {
    title: 'AI & Visualization',
    icon: Brain,
    color: 'neon-cyan',
    skills: ['GenAI', 'XAI', 'Scientific dashboards', 'Real-time graphs'],
  },
  {
    title: 'Software Engineering',
    icon: Settings,
    color: 'neon-teal',
    skills: ['Release Mgmt', 'RCA', 'Documentation', 'Troubleshooting'],
  },
];

const SkillCard = ({ category, index, isInView }: { category: typeof skillCategories[0]; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="perspective-1000"
    >
      <motion.div
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? 5 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="relative glass-panel rounded-lg p-6 h-full preserve-3d group"
      >
        {/* Neon border animation */}
        <div 
          className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            isHovered ? 'animate-glow-pulse' : ''
          }`}
          style={{
            boxShadow: isHovered 
              ? `0 0 20px hsl(var(--${category.color}) / 0.5), inset 0 0 20px hsl(var(--${category.color}) / 0.1)`
              : 'none'
          }}
        />

        {/* Blueprint glow behind */}
        <div className="absolute -inset-1 bg-gradient-to-br from-neon-blue/10 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg bg-${category.color}/10 border border-${category.color}/30`}>
              <Icon className={`w-5 h-5 text-${category.color}`} />
            </div>
            <h3 className="font-display text-lg text-foreground">{category.title}</h3>
          </div>

          {/* Skills list */}
          <ul className="space-y-2">
            {category.skills.map((skill, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 + i * 0.05 }}
                className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors"
              >
                <span className={`w-1.5 h-1.5 rounded-full bg-${category.color}/50`} />
                <span className="font-mono">{skill}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Corner accent */}
        <div className={`absolute top-0 right-0 w-12 h-12 border-t border-r border-${category.color}/20 rounded-tr-lg`} />
      </motion.div>
    </motion.div>
  );
};

export const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Holographic background */}
      <div className="absolute inset-0 holographic opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-neon-blue" />
            <span className="section-heading flex items-center gap-2">
              <Gauge className="w-4 h-4" />
              Technical Skills
            </span>
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-neon-blue" />
          </div>
          <p className="text-muted-foreground font-mono text-sm">HOLOGRAPHIC SKILL MATRIX</p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
