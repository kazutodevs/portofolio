import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const projects = [
    {
      title: 'myCode Studio Platform',
      description: 'Full-stack digital service marketplace connecting developers with clients for web, mobile, and game development projects.',
      category: 'Full Stack',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
      status: 'Live',
      color: 'cyan',
      icon: '🚀',
      highlight: true
    },
    {
      title: 'SA-MP Advanced Gamemode',
      description: 'Custom roleplay gamemode featuring advanced economy system, job management, and AI-powered NPC interactions.',
      category: 'Game Dev',
      tech: ['Pawn', 'MySQL', 'SA-MP SDK'],
      status: '5000+ players',
      color: 'purple',
      icon: '🎮'
    },
    {
      title: 'E-Commerce Platform',
      description: 'Responsive e-commerce solution with product catalog, shopping cart, and integrated payment processing.',
      category: 'Web Dev',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'Live',
      color: 'pink',
      icon: '🛒'
    },
    {
      title: 'Discord Bot Suite',
      description: 'Comprehensive Discord bot with moderation, music streaming, and custom game features for 100k+ servers.',
      category: 'Automation',
      tech: ['Discord.js', 'Node.js', 'MongoDB'],
      status: '100k+ servers',
      color: 'blue',
      icon: '🤖'
    },
    {
      title: 'Mobile Social App',
      description: 'Native Android app with real-time messaging, user profiles, and social networking features.',
      category: 'Mobile',
      tech: ['Kotlin', 'Firebase', 'Android SDK'],
      status: '10k+ downloads',
      color: 'cyan',
      icon: '📱'
    },
    {
      title: 'Data Analytics Dashboard',
      description: 'Real-time analytics dashboard with interactive charts, data visualization, and export functionality.',
      category: 'Web Dev',
      tech: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
      status: 'Live',
      color: 'purple',
      icon: '📊'
    }
  ];

  return (
    <section id="projects" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full">
              <span className="text-sm font-mono text-neon-cyan">04 / Projects</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white">
              Featured Work
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              A selection of projects that showcase my skills and expertise across 
              different technologies and domains.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue mt-8"
          />
        </motion.div>

        {/* Featured Project */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <GlassCard glowColor="cyan" className="p-8 md:p-12 border-2 border-neon-cyan/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left - Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">🚀</span>
                  <div>
                    <div className="text-sm font-mono text-neon-cyan">Featured Project</div>
                    <h3 className="text-3xl font-bold text-white">myCode Studio</h3>
                  </div>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  A comprehensive digital service platform connecting developers with clients. 
                  Built with modern tech stack to handle 20+ concurrent projects with real-time 
                  progress tracking and secure payment processing.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400 font-semibold">Tech Stack:</p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-neon-cyan/20 border border-neon-cyan/30 rounded-full text-xs text-neon-cyan"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-neon-cyan">
                    <span className="w-2 h-2 bg-neon-cyan rounded-full" />
                    <span className="text-sm">20+ projects managed</span>
                  </div>
                  <div className="flex items-center gap-2 text-neon-cyan">
                    <span className="w-2 h-2 bg-neon-cyan rounded-full" />
                    <span className="text-sm">$50k+ revenue handled</span>
                  </div>
                  <div className="flex items-center gap-2 text-neon-cyan">
                    <span className="w-2 h-2 bg-neon-cyan rounded-full" />
                    <span className="text-sm">95% client satisfaction</span>
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-neon-cyan/20 border border-neon-cyan/50 rounded-lg text-neon-cyan hover:bg-neon-cyan/30 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-500/30 rounded-lg text-gray-300 hover:border-gray-400 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </motion.a>
                </div>
              </div>

              {/* Right - Visual */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="h-64 bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 rounded-lg border border-neon-cyan/30 flex items-center justify-center"
              >
                <div className="text-6xl">💼</div>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.slice(1).map((project, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <GlassCard glowColor={project.color} className="h-full p-6 flex flex-col" withHover>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{project.icon}</span>
                  <span className={`px-2 py-1 text-xs font-mono bg-neon-${project.color}/10 border border-neon-${project.color}/30 text-neon-${project.color} rounded`}>
                    {project.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-400 mb-4 flex-grow">
                  {project.description}
                </p>

                <div className="space-y-4 border-t border-space-600/50 pt-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-2 font-semibold">Technologies:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 py-1 text-xs bg-neon-${project.color}/10 border border-neon-${project.color}/20 text-neon-${project.color} rounded`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-gray-400">{project.status}</span>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-neon-cyan hover:text-neon-purple transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/50 rounded-lg text-neon-cyan hover:shadow-neon-cyan transition-all"
          >
            View All Projects on GitHub
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}