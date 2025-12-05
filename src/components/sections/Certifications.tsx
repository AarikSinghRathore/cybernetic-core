import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Award, Cloud, Shield, Brain, Code, ChevronDown } from 'lucide-react';

const certificationCategories = [
  {
    title: 'Cloud & Infrastructure Certifications',
    icon: Cloud,
    color: 'neon-blue',
    certs: [
      {
        name: 'Google Cloud Tech Series',
        issuer: 'Google',
        description: 'Demonstrates foundational and intermediate knowledge of cloud compute, storage, IAM, networking, and deployment pipelines on Google Cloud.',
      },
      {
        name: 'Cloud Computing',
        issuer: 'NPTEL IIT Kharagpur',
        description: 'University-level certification covering distributed systems, virtualization, multi-tenant architecture, cloud security principles, and large-scale infrastructure.',
      },
      {
        name: 'Linux Essentials (LFS101x)',
        issuer: 'Linux Foundation',
        description: 'Certifies strong command-line proficiency, Linux OS internals, system administration basics, shell environments, permissions, and troubleshooting.',
      },
    ],
  },
  {
    title: 'Cybersecurity & Networking Certifications',
    icon: Shield,
    color: 'neon-cyan',
    certs: [
      {
        name: 'Introduction to Cybersecurity',
        issuer: 'Cisco',
        description: 'Validates understanding of threat models, attack surfaces, secure configurations, and basic defense strategies.',
      },
      {
        name: 'Networking Basics',
        issuer: 'Cisco',
        description: 'Covers IP addressing, subnetting, routing, switching, protocols, and network troubleshooting fundamentals.',
      },
    ],
  },
  {
    title: 'AI & Emerging Tech Certifications',
    icon: Brain,
    color: 'neon-teal',
    certs: [
      {
        name: 'Generative AI',
        issuer: 'Microsoft + LinkedIn',
        description: 'Demonstrates foundational knowledge of GenAI systems, prompt engineering, LLM behavior, and integration patterns.',
      },
      {
        name: 'AI for Executives',
        issuer: 'AWS',
        description: 'Focuses on high-level AI strategy, architecture choices, scaling considerations, and responsible deployment.',
      },
      {
        name: 'Introduction to Generative AI',
        issuer: 'IBM',
        description: 'Provides conceptual understanding of generative models, use-cases, architectures, and ethical constraints.',
      },
    ],
  },
  {
    title: 'Technical & Programming Certifications',
    icon: Code,
    color: 'neon-blue',
    certs: [
      {
        name: 'SQL (Advanced)',
        issuer: 'HackerRank',
        description: 'Proves ability to write advanced SQL queries, optimize data retrieval, work with joins/subqueries.',
      },
      {
        name: 'Problem Solving (Intermediate)',
        issuer: 'HackerRank',
        description: 'Validates structured thinking, algorithmic reasoning, and code-based problem decomposition.',
      },
      {
        name: 'Python',
        issuer: 'HackerRank',
        description: 'Demonstrates proficiency in Python syntax, control structures, data handling, and scripting.',
      },
      {
        name: 'Industrial IoT',
        issuer: 'Coursera',
        description: 'Introduces IIoT systems, edge compute, device integration, sensor networks, and industrial data pipelines.',
      },
      {
        name: 'Modeling & Debugging Embedded Systems',
        issuer: 'Coursera',
        description: 'Covers embedded workflows, real-time constraints, system modeling, and debugging techniques.',
      },
    ],
  },
];

const CertificationCategory = ({ category, index, isInView }: { category: typeof certificationCategories[0]; index: number; isInView: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-panel rounded-lg overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between group hover:bg-steel/20 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg bg-${category.color}/10 border border-${category.color}/30`}>
            <Icon className={`w-5 h-5 text-${category.color}`} />
          </div>
          <span className="font-display text-lg text-foreground group-hover:text-neon-blue transition-colors">
            {category.title}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            ({category.certs.length})
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-4">
              {category.certs.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="p-4 bg-charcoal/50 rounded-lg border border-steel/30 hover:border-neon-blue/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-mono text-sm text-foreground">{cert.name}</h4>
                    <span className={`font-mono text-xs text-${category.color}`}>{cert.issuer}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Certifications = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 blueprint-dots opacity-10" />

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
            <Award className="w-4 h-4" />
            Certifications
          </span>
        </motion.div>

        {/* Certification accordion */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {certificationCategories.map((category, index) => (
            <CertificationCategory
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
