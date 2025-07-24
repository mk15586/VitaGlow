// components/CTASection.jsx

"use client"; // Required for Framer Motion and other hooks

import Link from "next/link";
import { motion } from "framer-motion";

const CTASection = () => {
  // Animation variants for the container to orchestrate animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Stagger the animation of children by 0.2s
      },
    },
  };

  // Animation variants for individual child elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
      className="relative overflow-hidden bg-gradient-to-r from-[#312e81] via-[#1e293b] to-[#065f46] py-28"
    >
      {/* Animated Aurora Background */}
      <div className="absolute inset-0 z-0 animate-aurora aurora-background opacity-40" />
      
      {/* Static Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('/grid-white.svg')]" />
      
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          variants={itemVariants}
          className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-4xl font-extrabold text-transparent md:text-6xl"
        >
          {/* This span creates the animated shine effect */}
          <span className="animate-shine bg-[linear-gradient(110deg,transparent,45%,#ffffff,55%,transparent)] bg-[length:250%_100%]">
            Ready to Transform Your Healthcare?
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl"
        >
          Join thousands of Patna residents who are taking control of their health with VitaGlow. Experience the future of personalized wellness today.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/signup"
              className="group relative inline-block transform-gpu rounded-lg bg-gradient-to-r from-[#6366f1] to-[#34d399] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300"
            >
              {/* Shine effect on hover */}
              <span className="absolute inset-0 -z-10 h-full w-full rounded-lg bg-gradient-to-r from-[#6366f1] to-[#34d399] opacity-75 blur-xl transition-all duration-300 group-hover:opacity-100 group-hover:blur-2xl" />
              Start Your Free Trial
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/features"
              className="group relative inline-block transform-gpu rounded-lg border-2 border-white/40 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/80 hover:bg-white/10"
            >
              Explore Features
            </Link>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10 text-sm text-gray-400">
          No credit card required • 14-day free trial • Cancel anytime
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTASection;