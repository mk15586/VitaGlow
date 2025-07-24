"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
    CalendarDays, Bell, ClipboardList, MapPin, User, ChevronLeft, ChevronRight, Clock, Map,
    LayoutDashboard, Folder, UserCircle, Settings, Sparkles, X, Loader, Home, BookOpen, BarChart2, Leaf, LogOut
} from 'lucide-react';

import Header from "@/components/header";


import Dock from "@/components/Dock";

const AIModal = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter your wellness goal or preference.');
      return;
    }
    setError('');
    setIsLoading(true);
    setResult('');

    const fullPrompt = `You are a friendly wellness assistant. User request: "${prompt}". Generate a helpful, structured plan using HTML.`;
    const payload = { contents: [{ role: "user", parts: [{ text: fullPrompt }] }] };
    const apiKey = ""; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) setResult(text);
      else throw new Error("Unexpected response structure.");
    } catch (err) {
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-slate-800">AI Wellness Assistant</h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g., A high-protein meal plan..." className="w-full p-3 rounded-lg border" rows="3" />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button onClick={handleGenerate} disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-500 text-white font-semibold rounded-lg">
                {isLoading ? <Loader className="animate-spin" /> : "Generate Plan"}
              </button>
            </div>
            {result && <div className="p-6 border-t overflow-y-auto" dangerouslySetInnerHTML={{ __html: result }} />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


// --- Mock Data ---
const dashboardCardsData = [
  { icon: User, title: "Profile", value: "Aarav Kumar", unit: "" },
  { icon: ClipboardList, title: "Prescriptions", value: 3, unit: "Active" },
  { icon: Bell, title: "Reminders", value: 5, unit: "Today" },
  { icon: CalendarDays, title: "Appointments", value: 2, unit: "Upcoming" },
];

const sampleEvents = [
  { date: "2025-07-22", time: "10:00 AM", title: "Dentist Appointment", location: "Patna Dental Care", type: "appointment" },
  { date: "2025-07-23", time: "2:00 PM", title: "General Checkup", location: "Apollo Clinic", type: "appointment" },
  { date: "2025-07-22", time: "8:00 AM", title: "Take Blood Pressure Medicine", type: "reminder" },
  { date: "2025-07-22", time: "9:00 PM", title: "Take Vitamin D", type: "reminder" },
  { date: "2025-08-05", time: "11:30 AM", title: "Cardiologist Follow-up", location: "Heart & Soul Hospital", type: "appointment" },
  { date: "2025-08-05", time: "8:00 PM", title: "Evening Walk", type: "reminder" },
];

// --- Reusable Dashboard Components ---
const DashboardCard = ({ icon: Icon, title, value, unit, index }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } }
    }}
    className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg shadow-indigo-500/5 border border-white/80 flex flex-col justify-between"
  >
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-slate-600">{title}</h3>
      <Icon className="text-indigo-400" size={22} />
    </div>
    <div>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
      <p className="text-sm text-slate-500">{unit}</p>
    </div>
  </motion.div>
);

const Calendar = ({ selectedDate, onDateChange, events }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  const today = new Date();
  const eventDates = events.map(e => new Date(e.date).toDateString());

  const changeMonth = (delta) => {
    const newDate = new Date(currentYear, currentMonth + delta, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  const renderDays = () => {
    const date = new Date(currentYear, currentMonth, 1);
    const days = [];
    const monthStartDay = date.getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < monthStartDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = new Date(currentYear, currentMonth, day);
      const isSelected = selectedDate.toDateString() === fullDate.toDateString();
      const isToday = today.toDateString() === fullDate.toDateString();
      const hasEvent = eventDates.includes(fullDate.toDateString());

      days.push(
        <motion.div
          key={day}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDateChange(fullDate)}
          className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors relative font-semibold text-base
            ${isSelected ? "bg-indigo-500 text-white font-bold" :
              isToday ? "bg-indigo-100 text-indigo-600" : "hover:bg-slate-100 text-slate-700"}
          `}
        >
          {day}
          {hasEvent && !isSelected && <div className="absolute bottom-1.5 w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>}
        </motion.div>
      );
    }
    return days;
  };

  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}
      className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-2xl shadow-indigo-500/10 border border-white/80"
    >
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-100"><ChevronLeft /></button>
        <h3 className="font-semibold text-lg text-slate-700">
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-100"><ChevronRight /></button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-sm text-slate-500 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {renderDays()}
      </div>
    </motion.div>
  );
};

const AgendaItem = ({ event, index }) => {
  const isAppointment = event.type === 'appointment';
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 rounded-xl flex gap-4 ${isAppointment ? 'bg-indigo-100/70' : 'bg-emerald-100/70'}`}
    >
      <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center ${isAppointment ? 'bg-indigo-200' : 'bg-emerald-200'}`}>
        {isAppointment ? <CalendarDays className="text-indigo-600" /> : <Bell className="text-emerald-600" />}
      </div>
      <div>
        <p className={`font-semibold ${isAppointment ? 'text-indigo-800' : 'text-emerald-800'}`}>{event.title}</p>
        <div className="text-sm text-slate-600 flex items-center gap-2 mt-1">
          <Clock size={14} /> {event.time}
          {event.location && <><span className="text-slate-300">|</span><Map size={14} /> {event.location}</>}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Dashboard Page ---
export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date("2025-07-22"));

  const todaysEvents = sampleEvents
    .filter(e => new Date(e.date).toDateString() === selectedDate.toDateString())
    .sort((a, b) => new Date(`1970/01/01 ${a.time}`) - new Date(`1970/01/01 ${b.time}`));

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="p-4 md:p-8 pt-24 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
            className="text-3xl font-bold text-slate-800 mb-2"
          >
            Welcome back, Aarav!
          </motion.h1>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
            className="text-slate-500 mb-8"
          >
            Here&apos;s your health summary for today. Stay healthy!
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardCardsData.map((card, i) => (
              <DashboardCard key={i} {...card} index={i} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} events={sampleEvents} />
            </div>
            <motion.div 
              variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}
              className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-2xl shadow-indigo-500/10 border border-white/80"
            >
              <h3 className="font-semibold text-lg text-slate-700 mb-4">
                Agenda for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                <AnimatePresence>
                  {todaysEvents.length > 0 ? (
                    todaysEvents.map((event, i) => <AgendaItem key={`${selectedDate.toISOString().slice(0, 10)}-${i}`} event={event} index={i} />)
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-center text-slate-500 py-10"
                    >
                      <p>No events scheduled for today.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      <Dock />
    </div>
  );
}
