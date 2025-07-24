
import { UserPlusIcon, DocumentMagnifyingGlassIcon, BellAlertIcon, MapPinIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    step: "1",
    title: "Sign Up & Set Profile",
    description: "Create your account and set up your health profile in minutes.",
    icon: <UserPlusIcon className="w-10 h-10 text-indigo-500 mx-auto" />,
  },
  {
    step: "2",
    title: "Scan Prescriptions",
    description: "Use our AI scanner to digitize your prescriptions instantly.",
    icon: <DocumentMagnifyingGlassIcon className="w-10 h-10 text-emerald-500 mx-auto" />,
  },
  {
    step: "3",
    title: "Get Smart Reminders",
    description: "Receive timely medication reminders and track adherence.",
    icon: <BellAlertIcon className="w-10 h-10 text-yellow-500 mx-auto" />,
  },
  {
    step: "4",
    title: "Find Local Care",
    description: "Discover nearby healthcare facilities and book appointments.",
    icon: <MapPinIcon className="w-10 h-10 text-pink-500 mx-auto" />,
  },
];


import React, { useRef, useEffect, useState } from 'react';

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-50 to-indigo-50 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-scroll-fadein">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">How VitaGlow Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Transforming healthcare in Patna with a simple, intuitive process.</p>
        </div>
        <div className="relative">
          {/* Animated vertical line */}
          <div className={
            `hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#a5b4fc] to-[#6ee7b7] rounded-full transform -translate-x-1/2 ${inView ? 'animate-hiw-line' : ''}`
          }></div>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Card section */}
                <div className="md:w-5/12 p-4">
                  <div
                    className={`bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-slate-100 ${inView ? 'opacity-0 translate-y-8 animate-hiw-card-fadein' : 'opacity-0 translate-y-8'}`}
                    style={inView ? {
                      animationDelay: `${0.8 + i * 0.5}s`,
                      animationFillMode: 'forwards',
                    } : {}}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="shrink-0">{step.icon}</span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-0">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 mt-2">{step.description}</p>
                  </div>
                </div>
                {/* Number bubble with animation */}
                <div className="md:w-2/12 flex justify-center py-4 md:py-0">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br from-[#6366f1] to-[#34d399] flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-white ${inView ? 'opacity-0 -translate-y-8 animate-hiw-bubble-drop' : 'opacity-0 -translate-y-8'}`}
                    style={inView ? {
                      animationDelay: `${0.4 + i * 0.5}s`,
                      animationFillMode: 'forwards',
                    } : {}}
                  >
                    {step.step}
                  </div>
                </div>
                <div className="md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

// Tailwind custom animation classes (add to your globals.css or tailwind config)
//
// .animate-hiw-line {
//   animation: hiw-line-draw 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s both;
// }
// @keyframes hiw-line-draw {
//   from { height: 0; opacity: 0; }
//   to { height: 100%; opacity: 1; }
// }
// .animate-hiw-bubble-drop {
//   animation: hiw-bubble-drop 0.5s cubic-bezier(0.4,0,0.2,1) both;
// }
// @keyframes hiw-bubble-drop {
//   from { opacity: 0; transform: translateY(-2rem) scale(0.7); }
//   to { opacity: 1; transform: translateY(0) scale(1); }
// }
// .animate-hiw-card-fadein {
//   animation: hiw-card-fadein 0.6s cubic-bezier(0.4,0,0.2,1) both;
// }
// @keyframes hiw-card-fadein {
//   from { opacity: 0; transform: translateY(2rem) scale(0.97); }
//   to { opacity: 1; transform: translateY(0) scale(1); }
// }
