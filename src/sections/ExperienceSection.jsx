import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';

export default function ExperienceSection() {
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

  const experiences = [
    {
      period: '2024 — Present',
      role: 'Founder & Lead Developer',
      company: 'myCode Studio',
      description: 'Founded and managing an independent digital development studio serving clients in web, mobile, SA-MP, and Discord Bot development.',
      achievements: [
        '20+ projects completed',
        'Client retention rate 95%',
        'Team lead for 5+ developers'
      ],
      tags: ['Web Dev', 'SA-MP', 'Android', 'Discord Bot', 'Leadership'],
      color: 'cyan'
    },
    {
      period: '2022 — 2024',
      role: 'SA-MP Server Developer',
      company: 'Freelance',
      description: 'Developed and modified SA-MP gamemodes for various roleplay and freeroam servers with specialized focus on economy systems and anti-cheat solutions.',
      achievements: [
        'Custom anti-cheat system',
        'Dynamic economy management',
        '10+ server deployments'
      ],
      tags: ['Pawn Script', 'MySQL', 'Roleplay System', 'Optimization'],
      color: 'purple'
    },
    {
      period: '2023 — 2024',
      role: 'Full Stack Web Developer',
      company: 'Freelance',
      description: 'Built responsive websites, e-commerce platforms, and company profiles for SMEs and startups with focus on performance and user experience.',
      achievements: [
        'Mobile-first design',
        'PageSpeed 95+ score',
        '15+ satisfied clients'
      ],
      tags: ['React', 'Node.js', 'MySQL', 'Responsive Design'],
      color: 'pink'
    },
    {
      period: '2021 — 2022',
      role: 'Self-taught Developer',
      company: 'Community Learning',
      description: 'Started programming journey through self-learning, online courses, and active community participation on SA-MP Indonesia forums.',
      achievements: [
        '1000+ commits',
        'Contributed to open-source',
        'Mentored 5+ beginners'
      ],
      tags: ['Pawn', 'HTML/CSS', 'JavaScript', 'Community'],
      color: 'blue'
    }
  ];

  return (
    <section id="experience" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neon-pink/10 border border-neon-pink/30 rounded-full">
              <span className="text-sm font-mono text-neon-pink">03 / Experience</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white">
              Professional Journey
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              A timeline of growth, learning, and impactful contributions to the tech industry.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-gradient-to-r from-neon-pink to-neon-cyan mt-8"
          />
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {experiences.map((exp, idx) => (
            <motion.div key={idx} variants={itemVariants} className="relative">
              {/* Timeline connector */}
              {idx < experiences.length - 1 && (
                <div className="absolute left-8 top-24 w-1 h-12 bg-gradient-to-b from-neon-cyan/50 to-transparent" />
              )}

              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center z-10">
                <div className="relative">
                  <div className={`w-4 h-4 rounded-full bg-neon-${exp.color} ring-4 ring-space-900`} />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute inset-0 w-4 h-4 rounded-full bg-neon-${exp.color} opacity-50`}
                  />
                </div>
              </div>

              {/* Experience Card */}
              <GlassCard
                glowColor={exp.color}
                className="ml-32 p-8"
                withHover
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm font-mono text-gray-400 mb-2">{exp.period}</p>
                      <h3 className="text-2xl font-semibold text-white">
                        {exp.role}
                      </h3>
                      <p className={`text-lg font-semibold text-neon-${exp.color}`}>
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    whileInView={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <p className="text-sm font-semibold text-gray-400">Key Achievements:</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, aidx) => (
                        <li key={aidx} className="text-sm text-gray-300 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full bg-neon-${exp.color}`} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-space-600/50">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-xs font-mono bg-neon-${exp.color}/10 border border-neon-${exp.color}/30 text-neon-${exp.color} rounded-full`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 pt-20 border-t border-neon-cyan/20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-2xl font-display font-bold text-white">
              Impact & Contribution
            </h3>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: 'Projects', value: '20+' },
              { label: 'Happy Clients', value: '50+' },
              { label: 'Open Source', value: '15+' },
              { label: 'Code Reviews', value: '100+' }
            ].map((stat) => (
              <GlassCard
                key={stat.label}
                glowColor="purple"
                className="p-6 text-center"
                withHover
              >
                <div className="text-2xl font-bold text-neon-purple">{stat.value}</div>
                <div className="text-xs text-gray-400 font-mono">{stat.label}</div>
              </GlassCard>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}