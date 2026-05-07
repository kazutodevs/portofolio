import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';

export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const hardSkills = [
    { name: 'SA-MP / Pawn Script', level: 88 },
    { name: 'HTML / CSS / JavaScript', level: 80 },
    { name: 'Node.js / Express', level: 65 },
    { name: 'React / Frontend', level: 75 },
    { name: 'MySQL / Database', level: 75 },
    { name: 'Discord.js', level: 70 },
    { name: 'TypeScript', level: 60 },
    { name: 'REST APIs', level: 80 }
  ];

  const softSkills = [
    'Problem Solving',
    'Communication',
    'Time Management',
    'Adaptability',
    'Detail Oriented',
    'Teamwork',
    'Fast Learner',
    'Critical Thinking',
    'Leadership',
    'Creative Thinking',
    'Client Empathy',
    'Self-motivated'
  ];

  const tools = [
    { name: 'Git / GitHub', level: 85 },
    { name: 'VS Code / IDE', level: 90 },
    { name: 'Linux / Terminal', level: 75 },
    { name: 'Docker', level: 30 },
    { name: 'Figma / Design', level: 20},
    { name: 'AWS / Cloud', level: 10}
  ];

  const SkillBar = ({ name, level, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <span className="text-xs font-mono text-neon-cyan">{level}%</span>
      </div>
      <div className="h-2 bg-space-700 rounded-full overflow-hidden border border-space-600/50">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ delay: delay + 0.2, duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"
        />
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neon-purple/10 border border-neon-purple/30 rounded-full">
              <span className="text-sm font-mono text-neon-purple">02 / Skills</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white">
              Technical Expertise
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              A comprehensive toolkit of programming languages, frameworks, and tools 
              that power innovative solutions.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-gradient-to-r from-neon-purple to-neon-pink mt-8"
          />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Hard Skills */}
          <GlassCard glowColor="cyan" className="p-8 lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">💻</span>
              <h3 className="text-xl font-semibold text-white">Hard Skills</h3>
            </div>
            <motion.div className="space-y-6">
              {hardSkills.map((skill, idx) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={idx * 0.05}
                />
              ))}
            </motion.div>
          </GlassCard>

          {/* Soft Skills */}
          <GlassCard glowColor="purple" className="p-8 lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">🎯</span>
              <h3 className="text-xl font-semibold text-white">Soft Skills</h3>
            </div>
            <motion.div className="space-y-2">
              {softSkills.map((skill, idx) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-4 py-2 bg-neon-purple/10 border border-neon-purple/30 rounded-lg text-sm text-neon-purple hover:bg-neon-purple/20 transition-all"
                >
                  ✓ {skill}
                </motion.div>
              ))}
            </motion.div>
          </GlassCard>

          {/* Tools */}
          <GlassCard glowColor="pink" className="p-8 lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">🛠️</span>
              <h3 className="text-xl font-semibold text-white">Tools & Env</h3>
            </div>
            <motion.div className="space-y-6">
              {tools.map((tool, idx) => (
                <SkillBar
                  key={tool.name}
                  name={tool.name}
                  level={tool.level}
                  delay={idx * 0.05}
                />
              ))}
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* Learning Paths */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 pt-20 border-t border-neon-cyan/20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-2xl font-display font-bold text-white">Currently Learning</h3>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {['Web3 / Blockchain', 'Machine Learning', 'Cloud Architecture', 'DevOps', 'React JS', "BluePrint UE5", "AR/VR Games"].map((tech) => (
              <GlassCard
                key={tech}
                glowColor="cyan"
                className="p-6 text-center"
                withHover
              >
                <p className="text-sm font-semibold text-neon-cyan">{tech}</p>
              </GlassCard>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}