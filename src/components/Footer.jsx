import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const links = {
    'Product': ['About', 'Skills', 'Experience', 'Projects'],
    'Connect': ['GitHub', 'LinkedIn', 'Email', 'WhatsApp'],
    'Resources': ['Blog', 'Docs', 'Templates', 'Assets'],
  };

  return (
    <footer className="relative border-t border-neon-cyan/20 bg-space-900/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-lg animate-pulse opacity-75" />
                <div className="absolute inset-1 bg-space-900 rounded-lg flex items-center justify-center">
                  <span className="font-display font-bold text-neon-cyan text-sm">K</span>
                </div>
              </div>
              <span className="font-display font-bold text-lg text-white">
                Kazuto<span className="text-neon-cyan">.dev</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Crafting innovative digital solutions with passion and precision.
            </p>
            <div className="flex gap-3 pt-4">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Mail, href: '#', label: 'Email' }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="w-10 h-10 rounded-lg bg-space-800/50 border border-space-600/30 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(links).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (idx + 1) * 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-sm text-gray-400 hover:text-neon-cyan transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-space-700/50 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm text-gray-400"
          >
            © {currentYear} <span className="text-neon-cyan font-semibold">Kazuto.dev</span> • 
            Crafted with ☕ & <span className="text-neon-pink">passion</span>
          </motion.div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-2 bg-space-800/50 border border-space-600/30 rounded-lg text-neon-cyan hover:border-neon-cyan/50 hover:bg-space-800 transition-all"
          >
            Back to Top
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-neon-cyan/5 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-neon-purple/5 to-transparent rounded-full blur-3xl -z-10" />
    </footer>
  );
}