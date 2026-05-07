import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';

export default function AboutSection() {
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

  const highlights = [
    {
      title: 'Full Stack Development',
      description: 'Building complete solutions from frontend to backend with modern technologies',
      icon: '🚀'
    },
    {
      title: 'Game Development',
      description: 'Creating engaging game experiences with custom game engines and frameworks',
      icon: '🎮'
    },
    {
      title: 'Problem Solving',
      description: 'Analyzing complex problems and crafting elegant, scalable solutions',
      icon: '🧩'
    },
    {
      title: 'Team Collaboration',
      description: 'Working effectively with teams to deliver high-quality projects on time',
      icon: '👥'
    }
  ];

  return (
    <section id="about" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
              <span className="text-sm font-mono text-neon-cyan">01 / About Me</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white">
              Who I Am
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              A passionate software engineer dedicated to creating innovative digital solutions 
              that make a real impact in the tech world.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mt-8"
          />
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left - Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed text-lg">
                Hello! I'm <span className="text-neon-cyan font-semibold">Noval Hadi Purnomo</span>, 
                a developer with a passion for building exceptional digital experiences. My journey 
                in programming began with game development, which sparked my curiosity about how 
                systems work.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                Over the past 3+ years, I've evolved from game development to full-stack web and 
                mobile development, creating solutions across various industries. I believe in writing 
                code that's not just functional, but elegant, maintainable, and scalable.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or mentoring aspiring developers in the Indonesian tech community.
              </p>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              {[
                { label: 'Years Experience', value: '3+' },
                { label: 'Projects Completed', value: '20+' },
                { label: 'Team Collaborations', value: '15+' },
                { label: 'Code Commits', value: '2+' }
              ].map((fact, idx) => (
                <GlassCard key={idx} glowColor="cyan" className="p-4 text-center" withHover={false}>
                  <div className="text-2xl font-bold text-neon-cyan">{fact.value}</div>
                  <div className="text-xs text-gray-400 font-mono">{fact.label}</div>
                </GlassCard>
              ))}
            </div>
          </motion.div> 

          {/* Profile Picture */}
  {/* Profile Picture */}
  <div className="flex justify-center mb-8">
    <div className="relative">
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-neon-cyan/30 blur-3xl animate-pulse" />

      {/* Neon Border */}
      <div className="relative p-[4px] rounded-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink">
        <img
          src="https://i.ibb.co.com/PGkXD7BB/pepe-update.jpg"
          alt="Profile"
          className="w-80 h-80 rounded-full object-cover border-4 border-space-900"
        />
      </div>
    </div>
  </div>       

          {/* Right - Highlights */}
          <motion.div variants={itemVariants} className="space-y-4">     
            {highlights.map((highlight, idx) => (
              <GlassCard
                key={idx}
                glowColor={['cyan', 'purple', 'pink', 'blue'][idx % 4]}
                delay={idx * 0.1}
                className="p-6"
              >
                <div className="flex gap-4">
                  <div className="text-4xl flex-shrink-0">{highlight.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </motion.div>

        {/* Values */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-0 pt-0 border-t border-neon-cyan/20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-2xl font-display font-bold text-white">Core Values</h3>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {['Excellence', 'Innovation', 'Integrity', 'Growth'].map((value) => (
              <GlassCard
                key={value}
                glowColor="purple"
                className="p-6 text-center"
                withHover
              >
                <p className="text-lg font-semibold text-neon-purple">{value}</p>
              </GlassCard>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}