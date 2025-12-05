import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FolderGit2, ExternalLink, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: 'Neural Holographic Engine',
    subtitle: 'SDG-4',
    description: 'Advanced AI-driven visualization system with real-time data processing capabilities.',
    features: [
      'BRD Interpretation → technical flows',
      '2D→3D Pipeline Architecture',
      'Architecture Documentation',
    ],
    color: 'neon-blue',
  },
  {
    title: 'Math Supernova Lab',
    subtitle: 'Educational Platform',
    description: 'Interactive STEM learning platform with real-time computation visualization.',
    features: [
      'Real-time computation visualizer',
      'Safe error-handling',
      'Vercel deployment',
      'Interactive STEM UI',
    ],
    color: 'neon-cyan',
  },
  {
    title: 'Project Kaal',
    subtitle: 'IDEX',
    description: 'Confidential defense innovation project with comprehensive system architecture.',
    features: [
      'Confidential work',
      'System architecture',
      'Feasibility study',
      'Threat-modeling',
    ],
    color: 'neon-teal',
  },
];

const ProjectCard = ({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Blueprint drawing animation on hover */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ padding: '2px' }}
      >
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          fill="none"
          stroke={`hsl(var(--${project.color}))`}
          strokeWidth="2"
          rx="8"
          className={`transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: isHovered ? 0 : 1000,
            transition: 'stroke-dashoffset 1s ease-in-out, opacity 0.3s',
          }}
        />
      </svg>

      <div className="glass-panel rounded-lg p-8 h-full relative overflow-hidden">
        {/* Floating depth effect */}
        <motion.div
          animate={{
            y: isHovered ? -5 : 0,
            x: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className={`font-mono text-xs text-${project.color} tracking-wider`}>
                {project.subtitle}
              </span>
              <h3 className="font-display text-2xl text-foreground mt-1 group-hover:text-neon-blue transition-colors">
                {project.title}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ExternalLink className={`w-5 h-5 text-${project.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Features */}
          <ul className="space-y-2">
            {project.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 + i * 0.1 }}
                className="flex items-center gap-2 text-sm"
              >
                <ChevronRight className={`w-4 h-4 text-${project.color}`} />
                <span className="font-mono text-foreground/70">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Background glow */}
        <div 
          className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-${project.color}`}
        />

        {/* Corner decoration */}
        <div className={`absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-${project.color}/30 rounded-tl-lg`} />
        <div className={`absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-${project.color}/30 rounded-br-lg`} />
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden" id="projects">
      {/* Parallax background elements */}
      <motion.div 
        style={{ y: parallaxY }}
        className="absolute inset-0 blueprint-grid opacity-10"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-12 h-[2px] bg-gradient-to-r from-neon-blue to-transparent" />
          <span className="section-heading flex items-center gap-2">
            <FolderGit2 className="w-4 h-4" />
            Projects
          </span>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
