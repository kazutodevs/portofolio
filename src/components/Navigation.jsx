import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navigation({ theme, onThemeToggle }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-space-500/20 backdrop-blur-xl bg-space-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-lg animate-pulse opacity-75" />
              <div className="absolute inset-1 bg-space-900 rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-neon-cyan text-sm">K</span>
              </div>
            </div>
            <span className="font-display font-bold text-lg text-white">
              Kazuto
              <span className="text-neon-cyan">.dev</span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center space-x-1"
          >
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                variants={itemVariants}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-purple group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </motion.div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onThemeToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-space-800/50 border border-space-500/30 hover:border-neon-cyan/50 transition-colors"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              className="md:hidden w-10 h-10 flex items-center justify-center"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-neon-cyan" />
              ) : (
                <Menu className="w-6 h-6 text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-4 pt-4 pb-6 space-y-2 border-t border-space-500/20">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-300 hover:text-neon-cyan hover:bg-space-800/50 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
}