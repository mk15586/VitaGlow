import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa'; // For the decorative quote icon
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // For navigation buttons

// --- VitaGlow Realistic Indian Testimonials ---
const testimonials = [
  {
    quote: "VitaGlow&apos;s prescription scanner is a lifesaver for my parents. Reminders are always on time and the app is so easy to use!",
    name: 'Rohit Sinha',
    title: 'Bank Manager, Boring Road, Patna',
    image: '/profilePics/rohitSinha.png',
  },
  {
    quote: "I booked my doctor appointment in Kankarbagh within minutes. The map feature is super helpful for finding nearby clinics.",
    name: 'Pooja Kumari',
    title: 'Student, Magadh University',
    image: '/profilePics/PoojaKumari.png',
  },
  {
    quote: "As a working mom, the medicine reminders keep my family healthy. The app feels modern and trustworthy.",
    name: 'Neha Jha',
    title: 'School Teacher, Rajendra Nagar',
    image: '/profilePics/NehaJha.png',
  },
  {
    quote: "Finally, a health app made for Patna! The AI scanner reads my handwritten prescriptions perfectly.",
    name: 'Amitabh Prasad',
    title: 'Pharmacist, Kankarbagh',
    image: '/profilePics/AmitabhPrasad.png',
  },
  {
    quote: "VitaGlow helped me find a 24x7 medical store near Gandhi Maidan at midnight. Highly recommended!",
    name: 'Shalini Mishra',
    title: 'Entrepreneur, Bailey Road',
    image: '/profilePics/ShaliniMishra.png',
  },
];


const TestimonialsSection = () => {
  // We now use a tuple [index, direction] to manage state.
  // The direction helps AnimatePresence determine which way to animate.
  const [[current, direction], setCurrent] = useState([0, 0]);

  // --- Animation Variants for Framer Motion ---
  // This is a cleaner way to handle animations.
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const paginate = (newDirection) => {
    let newIndex = current + newDirection;
    if (newIndex < 0) {
      newIndex = testimonials.length - 1;
    } else if (newIndex >= testimonials.length) {
      newIndex = 0;
    }
    setCurrent([newIndex, newDirection]);
  };

  // Thresholds for swipe gesture
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section id="testimonials" className="py-20 md:py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight">
            Loved by Users in Patna
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what people are saying.
          </p>
        </div>

        {/* --- Card Carousel --- */}
        <div className="relative flex items-center justify-center h-[500px] md:h-[450px]">
          {/* --- Cards Behind --- */}
          {/* These create the stacked effect and are purely decorative */}
          <motion.div
            key={current + 1}
            className="absolute h-[85%] w-[80%] md:w-[70%] max-w-lg rounded-2xl bg-white/50 shadow-lg"
            initial={{ scale: 0.9, y: 30, opacity: 0.8 }}
            animate={{ scale: 0.9, y: 30, opacity: 1, transition: { duration: 0.4 } }}
          />
          <motion.div
            key={current + 2}
            className="absolute h-[80%] w-[70%] md:w-[60%] max-w-lg rounded-2xl bg-white/30 shadow-md"
            initial={{ scale: 0.8, y: 50, opacity: 0.5 }}
            animate={{ scale: 0.8, y: 50, opacity: 1, transition: { duration: 0.4 } }}
          />

          {/* --- Main Animated Card --- */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              // Key is crucial for AnimatePresence to detect changes
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute grid h-full w-full max-w-lg cursor-grab active:cursor-grabbing place-content-center rounded-2xl bg-white p-8 shadow-xl border border-slate-200/80"
            >
              <FaQuoteLeft className="absolute top-6 left-6 text-4xl text-slate-200/80" />
              
              <div className="text-center flex flex-col items-center gap-6">
                <Image
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-sm"
                />
                <p className="text-lg md:text-xl font-serif italic text-slate-700">
                  &quot;{testimonials[current].quote}&quot;
                </p>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    {testimonials[current].name}
                  </h3>
                  <p className="text-sm font-medium text-indigo-600">
                    {testimonials[current].title}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Navigation Buttons --- */}
        <div className="flex gap-4 mt-8 justify-center">
          <button
            aria-label="Previous testimonial"
            onClick={() => paginate(-1)}
            className="w-12 h-12 rounded-full bg-white hover:bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={() => paginate(1)}
            className="w-12 h-12 rounded-full bg-white hover:bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

// You would export this and use it in your app, passing the testimonials array as a prop or defining it within as shown.
export default TestimonialsSection;