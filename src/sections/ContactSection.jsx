import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

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

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'novalgamedev@gmail.com',
      href: 'mailto:novalgamedev@gmail.com',
      color: 'cyan'
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      value: '+62 895-4281-48933',
      href: 'https://wa.me/62895428148933',
      color: 'purple'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Indonesia 🇮🇩',
      href: '#',
      color: 'pink'
    }
  ];

  return (
    <section id="contact" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neon-pink/10 border border-neon-pink/30 rounded-full">
              <span className="text-sm font-mono text-neon-pink">05 / Contact</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white">
              Let's Work Together
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Get in touch and 
              let's create something amazing together.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-gradient-to-r from-neon-pink to-neon-cyan mx-auto mt-8"
          />
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {contactMethods.map((method, idx) => (
            <motion.a
              key={idx}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="no-underline"
            >
              <GlassCard glowColor={method.color} className="p-8 text-center h-full">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="flex justify-center mb-4"
                >
                  <div className={`w-12 h-12 rounded-lg bg-neon-${method.color}/20 border border-neon-${method.color}/30 flex items-center justify-center`}>
                    <method.icon className={`w-6 h-6 text-neon-${method.color}`} />
                  </div>
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {method.label}
                </h3>
                <p className={`text-neon-${method.color} font-mono text-sm`}>
                  {method.value}
                </p>
              </GlassCard>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <GlassCard glowColor="cyan" className="p-8 md:p-12">
            <motion.form
              variants={containerVariants}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-space-800/50 border border-space-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/20 transition-all"
                  placeholder="John Doe"
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-space-800/50 border border-space-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/20 transition-all"
                  placeholder="john@example.com"
                />
              </motion.div>

              {/* Subject */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-space-800/50 border border-space-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/20 transition-all"
                  placeholder="Project Inquiry"
                />
              </motion.div>

              {/* Message */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-space-800/50 border border-space-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/20 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-lg font-semibold text-space-900 hover:shadow-neon-cyan transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </motion.div>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-neon-cyan/20 border border-neon-cyan/50 rounded-lg text-neon-cyan text-sm text-center"
                >
                  ✓ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
            </motion.form>
          </GlassCard>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">
            Or connect with me on my social networks
          </p>
          <div className="flex justify-center gap-4">
            {[
              { label: 'GitHub', emoji: '💻' },
              { label: 'LinkedIn', emoji: '💼' },
              { label: 'Twitter', emoji: '🐦' }
            ].map((social) => (
              <motion.button
                key={social.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 transition-all text-xl"
              >
                {social.emoji}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}