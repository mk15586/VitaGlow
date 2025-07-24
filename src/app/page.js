"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import LogoIcon from "../components/LogoIcon";

// Animated Counter Hook
function useAnimatedCounter(target, isVisible) {
  const [count, setCount] = useState(0);
  const duration = 2000;
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const end = target;
    if (start === end) return;
    const incrementTime = duration / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [target, isVisible]);
  return count;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const statsRef = useRef(null);
  const [countersVisible, setCountersVisible] = useState(false);
  const heroTitle = "VitaGlow";
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && !countersVisible) {
          setCountersVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [countersVisible]);

  const activeUsers = useAnimatedCounter(10000, countersVisible);
  const satisfactionRate = useAnimatedCounter(98, countersVisible);
  const partners = useAnimatedCounter(500, countersVisible);
  const testimonials = [
    { name: "Aarav Kumar", quote: "VitaGlow has been a lifesaver for managing my parents' medications. The reminder feature is flawless!", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Priya Singh", quote: "Finding a 24/7 pharmacy in a new area of Patna was so easy with the map feature. Highly recommend this app!", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Rohan Gupta", quote: "The AI scanner is pure magic. It read my doctor's messy handwriting perfectly and set up my schedule in seconds.", image: "https://randomuser.me/api/portraits/men/36.jpg" },
    { name: "Ananya Sharma", quote: "Booking appointments has never been easier. I found a specialist nearby and got an appointment the same day!", image: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Vikram Patel", quote: "The medication tracking helped me identify patterns in my health. My doctor was impressed with the data!", image: "https://randomuser.me/api/portraits/men/41.jpg" },
    { name: "Neha Reddy", quote: "As a caregiver, VitaGlow has simplified managing medications for my entire family. A true game-changer!", image: "https://randomuser.me/api/portraits/women/26.jpg" }
  ];
  const stats = [
    { value: activeUsers, label: "Active Users", suffix: "+" },
    { value: satisfactionRate, label: "Satisfaction Rate", suffix: "%" },
    { value: partners, label: "Healthcare Partners", suffix: "+" },
    { value: 24, label: "Support Hours", suffix: "/7" }
  ];

  return (
    <div className="relative min-h-screen w-full bg-slate-50 text-gray-800 overflow-x-hidden">
      {/* --- Enhanced Background --- */}
      <div className="fixed inset-0 -z-50 bg-slate-50">
        <div className="absolute inset-0 bg-[url('/grid-noise.svg')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-[50vmax] h-[50vmax] bg-gradient-to-tr from-indigo-200/80 via-transparent to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-blob1"></div>
        <div className="absolute bottom-0 right-0 w-[60vmax] h-[60vmax] bg-gradient-to-bl from-emerald-200/80 via-transparent to-transparent rounded-full translate-x-1/2 translate-y-1/2 blur-3xl animate-blob2"></div>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-all duration-300 ${scrolled ? 'bg-gradient-to-r from-[#6366f1] to-[#34d399] shadow-lg' : 'bg-black/20'}`}>
                  <LogoIcon />
                </div>
                <span className={`font-bold text-2xl tracking-tighter transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-gray-700'}`}>
                  Vita<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#34d399]">Glow</span>
                </span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                <Link href="#features" className="text-gray-600 hover:text-[#6366f1] px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-200/50">Features</Link>
                <Link href="#how-it-works" className="text-gray-600 hover:text-[#6366f1] px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-200/50">How It Works</Link>
                <Link href="#testimonials" className="text-gray-600 hover:text-[#6366f1] px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-200/50">Testimonials</Link>
                <Link href="/auth/login" className="text-gray-600 hover:text-[#6366f1] px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-200/50">Login</Link>
                <Link href="/auth/signup" className="ml-2 px-5 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-[#6366f1] to-[#818cf8] hover:shadow-lg hover:shadow-[#6366f1]/50 transition-all duration-300 transform hover:-translate-y-0.5">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <HeroSection heroTitle={heroTitle} />
        <StatsSection statsRef={statsRef} stats={stats} />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection testimonials={testimonials} />
        <CTASection />
        <Footer />
      </main>

      {/* --- Global CSS for NEW Animations --- */}
      <style jsx global>{`
        @keyframes blob1 { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
        .animate-blob1 { animation: blob1 15s ease-in-out infinite; }
        @keyframes blob2 { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(-40px, 30px) scale(1.2); } 66% { transform: translate(20px, -30px) scale(0.8); } }
        .animate-blob2 { animation: blob2 18s ease-in-out infinite; }
        @keyframes char-reveal {
            0% { opacity: 0; transform: translateY(20px) scale(0.9); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-char-reveal {
            opacity: 0;
            animation: char-reveal 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes fadein-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fadein-up { animation: fadein-up 1s cubic-bezier(.4,0,.2,1) .2s both; }
        @keyframes fadein { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fadein { animation: fadein 1s .5s both; }
        .animate-fadein-delay { animation: fadein 1s .8s both; }
        @keyframes scroll-fadein {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-scroll-fadein {
            animation: scroll-fadein 1s cubic-bezier(.4,0,.2,1) both;
            animation-timeline: view();
            animation-range: entry 0% cover 30%;
        }
        @keyframes line-draw {
          from { transform: scaleY(0) translateX(-50%); }
          to { transform: scaleY(1) translateX(-50%); }
        }
        .animate-line-draw {
          transform-origin: top;
          animation: line-draw linear both;
          animation-timeline: view();
          animation-range: entry 20% cover 60%;
        }
        .spotlight-card {
            --spotlight-x: 50%;
            --spotlight-y: 50%;
        }
        .spotlight-effect {
            background: radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), rgba(165, 180, 252, 0.25), transparent 40%);
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-container {
            animation: marquee 60s linear infinite;
        }
        @keyframes shine {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        .animate-shine {
            background: linear-gradient(90deg, #fff, #fff, rgba(255, 255, 255, 0.5), #fff, #fff);
            background-size: 200% auto;
            color: #fff;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shine 5s linear infinite;
        }
      `}</style>
    </div>
  );
}