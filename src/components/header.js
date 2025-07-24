
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import LogoIcon from "./LogoIcon";
import { Folder, Bell, Search, UserCircle } from "lucide-react";

function Header() {

  // Height of header for layout offset
  const HEADER_HEIGHT = 88; // px (py-5 = 20px top + 20px bottom + 24px content)
  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl flex items-center justify-between px-12 py-5 bg-white/80 backdrop-blur-lg shadow border-b border-slate-100 rounded-b-3xl z-50"
        style={{borderBottomLeftRadius:'2.5rem',borderBottomRightRadius:'2.5rem', boxShadow:'0 6px 32px 0 rgba(99,102,241,0.08)', height: HEADER_HEIGHT}}
      >
      {/* Logo and Brand */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-gradient-to-r from-indigo-400 to-emerald-400 shadow">
            <LogoIcon className="w-7 h-7 text-white" />
          </span>
          <span className="font-bold text-xl tracking-tight text-slate-800">
            Vita<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-400">Glow</span>
          </span>
        </Link>
      </div>
      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100 border border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-slate-700 transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        </div>
      </div>
      {/* Icons */}
      <div className="flex items-center gap-5">
        <Link href="/somewhere" className="relative group">
          <Folder className="w-6 h-6 text-slate-500 group-hover:text-indigo-500 transition-colors" />
        </Link>
        <button className="relative group">
          <Bell className="w-6 h-6 text-slate-500 group-hover:text-indigo-500 transition-colors" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white"></span>
        </button>
        <button className="ml-2">
          <UserCircle className="w-8 h-8 text-slate-400 hover:text-indigo-500 transition-colors" />
        </button>
      </div>
      </motion.header>
      {/* Spacer to prevent content overlap */}
      <div style={{ height: HEADER_HEIGHT }} aria-hidden="true" />
    </>
  );
}

export default Header;
