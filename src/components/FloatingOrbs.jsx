import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingOrbs() {
  const orbs = [
    {
      id: 1,
      size: 300,
      color: 'from-neon-cyan to-transparent',
      position: { top: '10%', left: '10%' },
      duration: 20,
      blur: 'blur-3xl',
    },
    {
      id: 2,
      size: 250,
      color: 'from-neon-purple to-transparent',
      position: { top: '50%', right: '5%' },
      duration: 25,
      blur: 'blur-3xl',
    },
    {
      id: 3,
      size: 200,
      color: 'from-neon-blue to-transparent',
      position: { bottom: '10%', left: '20%' },
      duration: 30,
      blur: 'blur-2xl',
    },
    {
      id: 4,
      size: 280,
      color: 'from-neon-pink to-transparent',
      position: { top: '30%', right: '15%' },
      duration: 22,
      blur: 'blur-3xl',
    },
  ];

  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full ${orb.blur} bg-gradient-to-br ${orb.color} opacity-20`}
          style={{
            width: orb.size,
            height: orb.size,
            ...orb.position,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Animated gradient mesh overlay */}
      <div className="absolute inset-0 opacity-40">
        <svg width="100%" height="100%" className="w-full h-full">
          <defs>
            <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 212, 255, 0.1)" />
              <stop offset="50%" stopColor="rgba(179, 102, 255, 0.05)" />
              <stop offset="100%" stopColor="rgba(255, 0, 255, 0.1)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#meshGradient)" />
          
          {/* Grid pattern */}
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(0, 212, 255, 0.05)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}