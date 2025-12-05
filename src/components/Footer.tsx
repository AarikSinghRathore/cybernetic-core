import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-steel/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="font-display text-2xl text-foreground">
            <span className="text-neon-blue">G</span>OURAV <span className="text-neon-cyan">G</span>ANGWAR
          </div>

          {/* Status */}
          <div className="flex items-center gap-6 font-mono text-xs text-muted-foreground">
            <span>SYS.VER: 2025.1</span>
            <span className="text-neon-blue">●</span>
            <span>STATUS: ACTIVE</span>
          </div>

          {/* Copyright */}
          <div className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved
          </div>
        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          className="mt-8 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent"
        />
      </div>
    </footer>
  );
};
