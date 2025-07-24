    "use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Folder, UserCircle, Settings, Sparkles, X, Loader, Plus, Home, BookOpen, BarChart2 } from 'lucide-react';

    const AIModal = ({ isOpen, onClose }) => {
    // ... (unchanged from original) ...
    };


// ... (AIModal component remains unchanged) ...


const Dock = ({
  magnification = 70,
  distance = 100,
}) => {
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  // Use absolute positioning for dock when shrunk
  const getInitialDockPosition = () => {
    if (typeof window !== 'undefined') {
      return { x: window.innerWidth / 2 - 56, y: window.innerHeight - 120 };
    }
    // Default values for SSR
    return { x: 0, y: 0 };
  };
  const [dockPosition, setDockPosition] = useState(getInitialDockPosition);

  // Update dock position on window resize to keep it visible
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setDockPosition((pos) => ({
        x: Math.min(pos.x, window.innerWidth - 56),
        y: Math.min(pos.y, window.innerHeight - 56),
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: "home", name: "Home", icon: Home },
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    
    { id: "appointment", name: "Appointment", icon: require("lucide-react").CalendarCheck, href: "/appointment" },
    { id: "reports", name: "Reports", icon: BarChart2 },
    { id: "resources", name: "Resources", icon: BookOpen },
    { id: "ai", name: "AI Assistant", icon: Sparkles },
    { id: "nearby", name: "Nearby Facilities", icon: require("lucide-react").MapPin, href: "/nearby" },
    { id: "profile", name: "Profile", icon: UserCircle },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  // Shrink/expand dock on Home click
  const handleHomeClick = () => {
    setIsShrunk((prev) => !prev);
  };

  // Drag logic for shrunk dock
  const handleDragEnd = (event, info) => {
    // Center the dock at the drop point by subtracting half its width and height
    const dockWidth = 56 * 2; // w-14 * 2 (p-3 + icon size + padding)
    const dockHeight = 80; // h-20
    setDockPosition({
      x: info.point.x - dockWidth / 2,
      y: info.point.y - dockHeight / 2,
    });
  };

  return (
    <>
      <AnimatePresence>
        {!isShrunk ? (
          <motion.nav
            key="dock-full"
            onMouseLeave={() => {
              setHoveredItem(null);
              setActiveItem(null);
            }}
            initial={{ y: 60, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-end h-20 p-3 gap-4 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-indigo-500/10 border border-white/80 z-40"
            style={{ boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-50/30 to-purple-50/30 z-[-1]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent rounded-full" />
            {navItems.map((item) => (
              item.id === "home"
                ? <DockItem
                    key={item.id}
                    item={item}
                    magnification={magnification}
                    distance={distance}
                    isActive={activeItem === item.id}
                    isHovered={hoveredItem === item.id}
                    setActive={setActiveItem}
                    setHovered={setHoveredItem}
                    onModalOpen={() => setIsModalOpen(true)}
                    onClick={handleHomeClick}
                  />
                : <DockItem
                    key={item.id}
                    item={item}
                    magnification={magnification}
                    distance={distance}
                    isActive={activeItem === item.id}
                    isHovered={hoveredItem === item.id}
                    setActive={setActiveItem}
                    setHovered={setHoveredItem}
                    onModalOpen={() => setIsModalOpen(true)}
                  />
            ))}
          </motion.nav>
        ) : (
          <motion.div
            key="dock-shrunk"
            drag
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.8, opacity: 0, left: dockPosition.x, top: dockPosition.y }}
            animate={{ scale: 1, opacity: 1, left: dockPosition.x, top: dockPosition.y }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed flex items-end h-20 p-3 bg-white/90 backdrop-blur-2xl rounded-full shadow-2xl border border-white/80 z-50 cursor-grab"
            style={{ boxShadow: "0 20px 50px rgba(0, 0, 0, 0.13)" }}
          >
            <DockItem
              item={navItems[0]}
              magnification={magnification}
              distance={distance}
              isActive={true}
              isHovered={hoveredItem === navItems[0].id}
              setActive={setActiveItem}
              setHovered={setHoveredItem}
              onModalOpen={() => setIsModalOpen(true)}
              onClick={handleHomeClick}
              isShrunk={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AIModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};


import Link from "next/link";
const DockItem = ({ 
  item, 
  magnification, 
  distance,
  isActive, 
  isHovered,
  setActive,
  setHovered,
  onModalOpen,
  onClick,
  isShrunk
}) => {
  const itemRef = useRef(null);
  const scale = useSpring(1, { mass: 0.1, stiffness: 180, damping: 15 });
  const translate = useSpring(0, { mass: 0.1, stiffness: 180, damping: 15 });
  const glowIntensity = useSpring(0, { mass: 0.1, stiffness: 180, damping: 15 });

  // Apply effects only when this specific item is hovered
  useEffect(() => {
    if (isHovered) {
      scale.set(1 + magnification/100);
      translate.set(0);
      glowIntensity.set(0.8);
    } else {
      scale.set(1);
      translate.set(0);
      glowIntensity.set(0);
    }
  }, [isHovered, magnification]);

  const handleClick = () => {
    if (item.id === "home" && onClick) {
      onClick();
    } else if (item.id === "ai") {
      onModalOpen();
    } else if (item.href) {
      // navigation handled by Link below
    } else {
      setActive(prev => prev === item.id ? null : item.id);
    }
  };

  const content = (
    <>
      <DockItemTooltip 
        name={item.name} 
        isVisible={isHovered}
      />
      <motion.div
        className={`relative w-14 h-14 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300 ${
          isActive 
            ? "bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30" 
            : "bg-white/90 backdrop-blur-sm"
        } ${isShrunk ? 'rounded-full' : ''}`}
        style={{ 
          scale,
          boxShadow: isActive 
            ? "0 10px 25px -5px rgba(99, 102, 241, 0.4)" 
            : "0 4px 20px -6px rgba(0, 0, 0, 0.1)"
        }}
        whileTap={{ scale: 0.92 }}
      >
        <motion.div 
          className={`absolute inset-0 ${isShrunk ? 'rounded-full' : 'rounded-xl'} bg-gradient-to-br from-indigo-400/30 to-purple-400/30`}
          style={{ opacity: glowIntensity }}
        />
        <item.icon 
          size={28} 
          className={`transition-colors duration-300 ${
            isActive 
              ? "text-white" 
              : isHovered 
                ? "text-indigo-600" 
                : "text-slate-600"
          }`} 
          strokeWidth={isActive ? 1.8 : 1.5}
        />
        <AnimatePresence>
          {isActive && (
            <motion.div 
              className="absolute -bottom-1 w-1 h-1 bg-indigo-400 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );

  if (isShrunk) {
    // Only Home button, draggable handled by parent
    return (
      <motion.div
        ref={itemRef}
        className="relative flex flex-col items-center"
        style={{ zIndex: isHovered ? 10 : 1 }}
        onClick={handleClick}
        onMouseEnter={() => setHovered(item.id)}
        onMouseLeave={() => setHovered(null)}
      >
        {content}
      </motion.div>
    );
  }
  return item.href ? (
    <Link href={item.href} legacyBehavior>
      <a
        ref={itemRef}
        className="relative flex flex-col items-center"
        style={{ x: translate, zIndex: isHovered ? 10 : 1 }}
        onClick={handleClick}
        onMouseEnter={() => setHovered(item.id)}
        onMouseLeave={() => setHovered(null)}
      >
        {content}
      </a>
    </Link>
  ) : (
    <motion.div
      ref={itemRef}
      className="relative flex flex-col items-center"
      style={{ x: translate, zIndex: isHovered ? 10 : 1 }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(item.id)}
      onMouseLeave={() => setHovered(null)}
    >
      {content}
    </motion.div>
  );
};


const DockItemTooltip = ({ name, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute -top-9 px-3 py-1.5 text-xs font-medium bg-slate-800 text-white rounded-lg shadow-lg whitespace-nowrap"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
        >
          {name}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 -mb-1" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dock;