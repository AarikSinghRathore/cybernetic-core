import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Phone, Github, Linkedin, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully!', {
      description: 'Thank you for reaching out. I will get back to you soon.',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'gouravgangwar123456@gmail.com', href: 'mailto:gouravgangwar123456@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 8688871356', href: 'tel:+918688871356' },
    { icon: Github, label: 'GitHub', value: 'github.com/gourav', href: 'https://github.com' },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/gourav', href: 'https://linkedin.com' },
  ];

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden" id="contact">
      {/* Particle drift background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void to-charcoal/50" />
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-heading flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            Contact
          </span>
          <p className="text-muted-foreground font-mono text-sm mt-4">
            INITIATE COMMUNICATION PROTOCOL
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-panel rounded-lg p-8 relative">
              {/* Scan line */}
              <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                <motion.div
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent"
                />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label className="font-mono text-xs text-neon-blue tracking-wider block mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-charcoal/50 border border-steel/50 rounded-lg px-4 py-3 font-mono text-foreground focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-neon-blue tracking-wider block mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-charcoal/50 border border-steel/50 rounded-lg px-4 py-3 font-mono text-foreground focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-neon-blue tracking-wider block mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full bg-charcoal/50 border border-steel/50 rounded-lg px-4 py-3 font-mono text-foreground focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all resize-none"
                    placeholder="Enter your message"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-neon w-full flex items-center justify-center gap-2 group"
                >
                  <span>Transmit</span>
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>

              {/* Corner decorations */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-neon-blue/30 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-neon-blue/30 rounded-bl-lg" />
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-panel rounded-lg p-8">
              <h3 className="font-display text-xl text-foreground mb-6">Direct Channels</h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={index}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-charcoal/30 rounded-lg border border-steel/30 hover:border-neon-blue/50 transition-all group"
                    >
                      <div className="p-2 rounded-lg bg-neon-blue/10 border border-neon-blue/30">
                        <Icon className="w-5 h-5 text-neon-blue" />
                      </div>
                      <div>
                        <div className="font-mono text-xs text-muted-foreground">{info.label}</div>
                        <div className="font-mono text-sm text-foreground group-hover:text-neon-blue transition-colors">
                          {info.value}
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Status indicator */}
            <div className="glass-panel rounded-lg p-6 flex items-center gap-4">
              <div className="relative">
                <div className="w-3 h-3 bg-neon-cyan rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-neon-cyan rounded-full animate-ping opacity-50" />
              </div>
              <div>
                <div className="font-mono text-sm text-foreground">Available for opportunities</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
