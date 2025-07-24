const StatsSection = ({ statsRef, stats }) => (
  <section className="py-20 bg-white/50 backdrop-blur-sm">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={statsRef}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-slate-100">
            <div className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#34d399]">
              {stat.value}{stat.suffix}
            </div>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
