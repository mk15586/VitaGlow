import Link from "next/link";
import InteractiveCard from "./InteractiveCard";


const HeroSection = ({ heroTitle }) => (
  <section className="relative min-h-screen flex flex-col items-center justify-start text-center px-4 overflow-hidden pt-35" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
    {/* Iconic floating blurred blobs */}
    <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-[#6366f1]/20 blur-xl animate-float1" />
    <div className="absolute top-1/3 right-20 w-24 h-24 rounded-full bg-[#34d399]/20 blur-xl animate-float2" />
    <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-[#fbbf24]/20 blur-xl animate-float3" />
    {/* Glossy, Aesthetic, Iconic Page Background */}
    <div className="fixed inset-0 -z-50 pointer-events-none">
      {/* Main vibrant gradient glass background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#a5b4fc] via-[#818cf8]/80 to-[#5eead4]/70" style={{backdropFilter:'blur(18px)', WebkitBackdropFilter:'blur(18px)'}} />
      {/* Glossy reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/10 to-transparent mix-blend-lighten" style={{backdropFilter:'blur(2px)', WebkitBackdropFilter:'blur(2px)'}} />
      {/* More visible grid/pattern overlay for iconic look */}
      <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')] bg-center bg-repeat" />
      {/* Large blurred color blobs for extra depth */}
      <div className="absolute left-[-10vw] top-[-10vh] w-[40vw] h-[40vw] bg-indigo-400/30 rounded-full blur-3xl" />
      <div className="absolute right-[-5vw] bottom-[-10vh] w-[50vw] h-[50vw] bg-teal-300/30 rounded-full blur-3xl" />
      {/* Subtle glass highlight stripe */}
      <div className="absolute top-0 left-1/4 w-1/2 h-24 bg-white/30 rounded-full blur-2xl opacity-60 rotate-2" />
    </div>
    {/* Animated Background Blobs */}
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#6366f1] to-[#34d399] opacity-20"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      {/* Gradient Blobs */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#f0fdfa]">
        <div className="absolute left-[-20vw] top-[-15vh] w-[50vw] h-[50vw] bg-[#a5b4fc]/40 rounded-full blur-3xl animate-blob1" />
        <div className="absolute right-[-15vw] bottom-[-10vh] w-[60vw] h-[60vw] bg-[#34d399]/30 rounded-full blur-3xl animate-blob2" />
        <div className="absolute left-[20vw] top-[40vh] w-[40vw] h-[40vw] bg-[#fbbf24]/20 rounded-full blur-3xl animate-blob3" />
      </div>
    </div>

    <div className="relative z-10 max-w-5xl mx-auto">
      {/* Top Pill/Badge */}
      <div className="inline-block px-4 py-2 mb-8 rounded-full bg-white/60 border border-slate-200/80 shadow-sm backdrop-blur-sm animate-fadein-up">
        <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-400">
          ✨ Revolutionizing Healthcare in Patna
        </p>
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 text-slate-800">
        {heroTitle.split("").map((char, i) => (
          <span
            key={i}
            className="animate-char-reveal inline-block"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-slate-600 mb-12 font-light leading-relaxed max-w-3xl mx-auto animate-fadein">
        Your modern health assistant for Patna, India. <br />
        Manage medications, book appointments, and find local care—<span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500">all in one place</span>.
      </p>

      {/* Call-to-Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadein-delay">
        <Link href="/auth/signup" className="group relative inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#6366f1] to-[#34d399] text-white font-bold text-lg shadow-lg overflow-hidden transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#a5b4fc]/50">
          <span className="relative z-10">Get Started Today</span>
          <span className="absolute inset-0 bg-white/20 scale-0 rounded-full transition-transform duration-500 group-hover:scale-150 origin-center"></span>
        </Link>
        <Link href="/auth/login" className="group relative inline-block px-8 py-4 rounded-full border-2 border-[#6366f1] text-[#6366f1] font-bold text-lg bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-[#6366f1] hover:text-white hover:shadow-xl">
          <span>Login</span>
        </Link>
      </div>
    </div>
    <InteractiveCard />
    {/* Extra global styles for animation and background */}
    <style jsx global>{`
      @keyframes float1 {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-20px) scale(1.08); }
      }
      .animate-float1 { animation: float1 8s ease-in-out infinite; }
      @keyframes float2 {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(25px) scale(1.12); }
      }
      .animate-float2 { animation: float2 10s ease-in-out infinite; }
      @keyframes float3 {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-18px) scale(0.95); }
      }
      .animate-float3 { animation: float3 12s ease-in-out infinite; }
      @keyframes float {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        50% { transform: translateY(-30px) rotate(15deg); opacity: 0.8; }
        100% { transform: translateY(0) rotate(0deg); opacity: 1; }
      }
      @keyframes blob1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }
      .animate-blob1 { animation: blob1 15s ease-in-out infinite; }
      @keyframes blob2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(-40px, 30px) scale(1.2); }
        66% { transform: translate(20px, -30px) scale(0.8); }
      }
      .animate-blob2 { animation: blob2 18s ease-in-out infinite; }
      @keyframes blob3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(20px, 40px) scale(1.1); }
        66% { transform: translate(-30px, -20px) scale(0.9); }
      }
      .animate-blob3 { animation: blob3 12s ease-in-out infinite; }
      @keyframes char-reveal {
        from { opacity: 0; transform: translateY(20px) scale(0.8); filter: blur(5px); }
        to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      }
      .animate-char-reveal { animation: char-reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
      @keyframes fadein-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadein-up { animation: fadein-up 0.8s ease-out forwards; }
      @keyframes fadein {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .animate-fadein { animation: fadein 1s ease-in-out 0.5s forwards; opacity: 0; }
      @keyframes fadein-delay {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadein-delay { animation: fadein-delay 1s ease-out 0.8s forwards; opacity: 0; }
    `}</style>
  </section>
);

export default HeroSection;
