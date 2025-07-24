import React from "react";

export default function DashboardCard({ icon: Icon, title, value, color }) {
  return (
    <div className={`flex items-center gap-4 p-6 rounded-2xl shadow-lg bg-white/80 border border-slate-100 hover:shadow-xl transition-all duration-300 group` + (color ? ` ${color}` : "") }>
      <div className="p-3 rounded-full bg-gradient-to-br from-indigo-100 to-emerald-100 group-hover:scale-110 transition-transform">
        {Icon && <Icon className="text-indigo-500" size={28} />}
      </div>
      <div>
        <div className="text-lg font-semibold text-slate-800">{title}</div>
        <div className="text-2xl font-bold text-indigo-600">{value}</div>
      </div>
    </div>
  );
}
