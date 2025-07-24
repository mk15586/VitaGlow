"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Leaf } from 'lucide-react';

// A custom animated input component for a cleaner structure
const AnimatedInput = ({ id, name, type = "text", placeholder, icon: Icon, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    // The parent div now has the `group` class, which allows `group-focus-within` to work on child elements.
    <motion.div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-indigo-400">
        <Icon size={20} />
      </div>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={name}
        required
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full pl-10 pr-4 py-3 bg-slate-50/50 rounded-lg border border-slate-200/80 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:outline-none transition-all duration-300"
        placeholder={placeholder}
      />
    </motion.div>
  );
};

// Main Signup Page Component
export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Form Submitted:", formData);
      setIsSubmitting(false);
    }, 2000);
  };

  // Animation variants for the form container
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for individual form elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4 relative overflow-hidden">
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-10 -left-10 w-72 h-72 bg-emerald-300 rounded-full opacity-50 mix-blend-multiply filter blur-xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-10 -right-10 w-96 h-96 bg-indigo-300 rounded-full opacity-50 mix-blend-multiply filter blur-xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 5,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-300/40 p-8 border border-slate-200/80 z-10"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-emerald-400 to-indigo-500 p-3 rounded-full mb-4">
             <Leaf className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Create Your VitaGlow Account
          </h1>
          <p className="text-slate-500 mt-2">Join us and start your journey to wellness.</p>
        </motion.div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* FIX: Added 'group' class to enable focus effects on the icon within AnimatedInput */}
          <motion.div variants={itemVariants} className="group">
            <AnimatedInput id="name" name="name" type="text" placeholder="Full Name" icon={User} value={formData.name} onChange={handleChange} />
          </motion.div>
           {/* FIX: Added 'group' class to enable focus effects on the icon within AnimatedInput */}
          <motion.div variants={itemVariants} className="group">
            <AnimatedInput id="email" name="email" type="email" placeholder="Email Address" icon={Mail} value={formData.email} onChange={handleChange} />
          </motion.div>
           {/* FIX: Added 'group' class to enable focus effects on the icon within AnimatedInput */}
          <motion.div variants={itemVariants} className="group">
            <AnimatedInput id="password" name="password" type="password" placeholder="Password" icon={Lock} value={formData.password} onChange={handleChange} />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/30 transition-all duration-300 disabled:opacity-50"
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 20px -10px rgba(79, 70, 229, 0.6)" }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center justify-center"
                  >
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Sign Up
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </form>

        {/* Footer Section */}
        <motion.div variants={itemVariants} className="mt-8 text-center text-sm text-slate-500">
          <p>
            Already have an account?{' '}
            <a href="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-300">
              Sign In
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
