import React from 'react';
import { motion } from 'framer-motion';
import Scene3D from '../components/Scene3D';
import GlassCard from '../components/GlassCard';
import { ExternalLink, Github, Linkedin, Mail } from 'lucide-react';

export default function HeroSection({ mousePosition }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Scene3D mousePosition={mousePosition} />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Eyebrow */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full"
            >
              <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
              <span className="text-sm font-mono text-neon-cyan">Available for Project</span>
            </motion.div>

            {/* Main Title */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-5xl lg:text-7xl font-display font-bold tracking-tighter">
                <span className="text-white">Noval</span>
                <br />
                <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
                  Hadi.P
                </span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-lg font-mono text-gray-300">
                Software Engineer • <span className="text-neon-purple">Game Developer</span> • IT Support
              </p>
              <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                Passionate developer crafting innovative digital solutions. Specializing in web, mobile, 
                and game development with 3+ years of experience and 20+ successful projects.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-3 gap-4 py-4"
            >
              {[
                { number: '3+', label: 'Years Exp.' },
                { number: '20+', label: 'Projects' },
                { number: '100%', label: 'Passion' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={statVariants}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-neon-cyan">{stat.number}</div>
                  <div className="text-xs text-gray-400 font-mono">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-lg font-semibold text-space-900 hover:shadow-neon-cyan transition-all duration-300"
              >
                Get in Touch
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-neon-cyan/50 rounded-lg font-semibold text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300"
              >
                View Portfolio
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              {[
                { icon: Github, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Mail, href: '#' }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-lg border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-neon-cyan transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Floating Info Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:grid grid-cols-1 gap-4"
          >
            {/* Card 1 - Identity */}
            <GlassCard glowColor="cyan" delay={0.6} className="p-6">
              <div className="font-mono text-sm text-neon-cyan mb-4">// Identity</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Full Name</span>
                  <span className="text-white">Noval Hadi Purnomo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white">Indonesia 🇮🇩</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="text-neon-cyan">novalgamedev@gmail.com</span>
                </div>
              </div>
            </GlassCard>

            {/* Card 2 - Tech Stack */}
            <GlassCard glowColor="purple" delay={0.7} className="p-6">
              <div className="font-mono text-sm text-neon-purple mb-4">// Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'TypeScript', 'Three.js', 'MySQL', 'Discord.js'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-neon-purple/20 border border-neon-purple/30 rounded-full text-xs text-neon-purple"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GlassCard>

            {/* Card 3 - Status */}
            <GlassCard glowColor="pink" delay={0.8} className="p-6">
              <div className="font-mono text-sm text-neon-pink mb-4">// Availability</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-neon-pink rounded-full animate-pulse" />
                  <span className="text-white">Open to Opportunities</span>
                </div>
                <p className="text-xs text-gray-400">Ready to join a team and create amazing things</p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="text-center">
          <div className="text-xs text-gray-400 font-mono mb-2">Scroll to explore</div>
          <div className="w-6 h-10 border border-neon-cyan/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-neon-cyan rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}