import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  glowColor = 'cyan',
  withHover = true,
  delay = 0,
  ...props
}) {
  const glowColors = {
    cyan: 'shadow-neon-cyan',
    purple: 'shadow-neon-purple',
    pink: 'shadow-neon-pink',
    blue: 'shadow-glow',
  };

  const borderColors = {
    cyan: 'border-neon-cyan/30',
    purple: 'border-neon-purple/30',
    pink: 'border-neon-pink/30',
    blue: 'border-neon-blue/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={withHover ? { y: -5 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`
        relative backdrop-blur-lg bg-white/5 border rounded-xl
        transition-all duration-300 overflow-hidden
        ${borderColors[glowColor]}
        ${withHover ? 'hover:' + glowColors[glowColor] : ''}
        ${className}
      `}
      {...props}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}