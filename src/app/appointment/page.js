"use client";

import React, { useState, Fragment } from "react";
import Image from "next/image";
import Header from "../../components/header"; // Assuming this component exists
import Dock from "../../components/Dock"; // Assuming this component exists
import { Search, CalendarCheck, Hospital, Loader2, X, Star, ChevronRight, User, Stethoscope, Clock, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- EXPANDED MOCK DATA ---
const mockHospitals = [
  {
    id: "HOS1",
    name: "Apex Wellness Center",
    address: "Brahmapura, Muzaffarpur",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    departments: ["Cardiology", "Neurology", "Orthopedics"],
  },
  {
    id: "HOS2",
    name: "Serene Health Hospital",
    address: "Club Road, Muzaffarpur",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1629904850762-e68955217140?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    departments: ["Pediatrics", "Oncology", "General Medicine"],
  },
  {
    id: "HOS3",
    name: "City Central Hospital",
    address: "Juran Chapra, Muzaffarpur",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    departments: ["Dermatology", "Gastroenterology", "Urology"],
  },
  {
    id: "HOS4",
    name: "Horizon Medical Institute",
    address: "Mithanpura, Muzaffarpur",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    departments: ["ENT", "Ophthalmology", "Cardiology"],
  },
];

// --- STYLING VARIANTS FOR ANIMATION ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};


// --- REUSABLE HOSPITAL CARD COMPONENT ---
const HospitalCard = ({ hospital, onSelect }) => (
  <motion.div
    variants={itemVariants}
    layout
    className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl border border-slate-200/80 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
    onClick={() => onSelect(hospital)}
  >
    <div className="w-full md:w-48 h-40 flex-shrink-0">
      <Image
        src={hospital.image}
        alt={hospital.name}
        width={320}
        height={200}
        className="w-full h-full object-cover rounded-xl"
        style={{ objectFit: 'cover', borderRadius: '0.75rem' }}
        priority
      />
    </div>
    <div className="flex-1 text-center md:text-left">
      <h3 className="font-bold text-xl text-slate-800">{hospital.name}</h3>
      <p className="text-slate-500 text-sm mt-1">{hospital.address}</p>
      <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
        <Star className="text-amber-400 fill-amber-400" size={18} />
        <span className="font-semibold text-slate-700">{hospital.rating}</span>
        <span className="text-slate-400 text-sm">({hospital.departments.length} Departments)</span>
      </div>
    </div>
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors font-semibold"
      >
        Book Now <ChevronRight size={18} />
    </motion.button>
  </motion.div>
);

// --- MULTI-STEP BOOKING MODAL COMPONENT ---
const BookingModal = ({ hospital, isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [bookingDetails, setBookingDetails] = useState({
        department: '',
        date: '',
        time: '',
        patientName: '',
        reason: ''
    });
    const [isBooking, setIsBooking] = useState(false);

    const handleUpdate = (field, value) => {
        setBookingDetails(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);
    
    const handleConfirmBooking = () => {
        setIsBooking(true);
        setTimeout(() => {
            handleNext(); // Move to success step
            setIsBooking(false);
        }, 2000);
    };

    const handleClose = () => {
        onClose();
        // Reset state after a delay to allow for exit animation
        setTimeout(() => {
            setStep(1);
            setBookingDetails({ department: '', date: '', time: '', patientName: '', reason: '' });
        }, 300);
    };

    const renderStep = () => {
        switch (step) {
            case 1: // Department Selection
                return (
                    <motion.div key="step1" initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: 20}}>
                        <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2"><Stethoscope size={20} /> Select a Department</h3>
                        <div className="space-y-2">
                            {hospital.departments.map(dept => (
                                <button key={dept} onClick={() => { handleUpdate('department', dept); handleNext(); }} className="w-full text-left p-3 rounded-lg hover:bg-indigo-50 transition-colors font-medium text-slate-600">
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                );
            case 2: // Date & Time Selection
                return (
                    <motion.div key="step2" initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: 20}}>
                         <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2"><CalendarDays size={20} /> Choose Date & Time</h3>
                         <div className="space-y-4">
                            {/* In a real app, this would be a proper calendar component */}
                            <div className="grid grid-cols-3 gap-2">
                                {['July 29', 'July 30', 'July 31'].map(d => <button key={d} onClick={() => handleUpdate('date', d)} className={`p-2 text-sm rounded-lg border ${bookingDetails.date === d ? 'bg-indigo-600 text-white' : 'bg-white hover:border-indigo-400'}`}>{d}</button>)}
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'].map(t => <button key={t} onClick={() => handleUpdate('time', t)} className={`p-2 text-sm rounded-lg border ${bookingDetails.time === t ? 'bg-indigo-600 text-white' : 'bg-white hover:border-indigo-400'}`}>{t}</button>)}
                            </div>
                         </div>
                         <button onClick={handleNext} disabled={!bookingDetails.date || !bookingDetails.time} className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-indigo-300">Next</button>
                    </motion.div>
                );
            case 3: // Patient Details
                return (
                    <motion.div key="step3" initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: 20}}>
                        <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2"><User size={20} /> Enter Your Details</h3>
                        <div className="space-y-4">
                            <input type="text" placeholder="Full Name" value={bookingDetails.patientName} onChange={e => handleUpdate('patientName', e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none" />
                            <input type="text" placeholder="Reason for visit (optional)" value={bookingDetails.reason} onChange={e => handleUpdate('reason', e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none" />
                        </div>
                        <button onClick={handleNext} disabled={!bookingDetails.patientName} className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-indigo-300">Review Booking</button>
                    </motion.div>
                );
            case 4: // Confirmation
                return (
                     <motion.div key="step4" initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: 20}}>
                        <h3 className="text-lg font-semibold text-slate-700 mb-4">Confirm Your Appointment</h3>
                        <div className="space-y-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                            <p><strong className="font-medium text-slate-800">Hospital:</strong> {hospital.name}</p>
                            <p><strong className="font-medium text-slate-800">Department:</strong> {bookingDetails.department}</p>
                            <p><strong className="font-medium text-slate-800">Date & Time:</strong> {bookingDetails.date} at {bookingDetails.time}</p>
                            <p><strong className="font-medium text-slate-800">Patient:</strong> {bookingDetails.patientName}</p>
                        </div>
                        <button onClick={handleConfirmBooking} disabled={isBooking} className="w-full mt-6 bg-emerald-500 text-white py-2 rounded-lg font-semibold hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                            {isBooking ? <Loader2 className="animate-spin" size={20} /> : 'Confirm Booking'}
                        </button>
                    </motion.div>
                );
            case 5: // Success
                return (
                     <motion.div key="step5" initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} className="text-center">
                        <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay: 0.1, type: "spring", stiffness: 200, damping: 10}} className="w-20 h-20 bg-emerald-100 rounded-full mx-auto flex items-center justify-center">
                            <CalendarCheck className="text-emerald-500" size={40} />
                        </motion.div>
                        <h3 className="text-xl font-bold text-slate-800 mt-6">Appointment Booked!</h3>
                        <p className="text-slate-500 mt-2">Your appointment at {hospital.name} is confirmed for {bookingDetails.date} at {bookingDetails.time}.</p>
                        <button onClick={handleClose} className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">Done</button>
                    </motion.div>
                )
        }
    };
    
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
                layout
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{type: "spring", stiffness: 300, damping: 30}}
                className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">{hospital.name}</h2>
                        <p className="text-slate-500 text-sm">Booking Appointment</p>
                    </div>
                    {step < 5 && (
                        <button onClick={handleClose} className="p-1 rounded-full hover:bg-slate-200 transition-colors">
                            <X size={20} className="text-slate-500"/>
                        </button>
                    )}
                </div>
                
                <AnimatePresence mode="wait">
                    {renderStep()}
                </AnimatePresence>
                
                 {step > 1 && step < 5 && (
                     <button onClick={handleBack} className="absolute bottom-6 left-6 text-sm font-medium text-slate-500 hover:text-slate-800 transition">Back</button>
                 )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
};


// --- MAIN PAGE COMPONENT ---
export default function AppointmentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);

  const filteredHospitals = mockHospitals.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 bg-gradient-to-br from-indigo-50/20 via-white to-slate-50/20">
      <Header />
      <main className="max-w-4xl mx-auto pt-12 pb-32 px-4">
        <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center text-slate-900">Book an Appointment</h1>
            <p className="text-slate-500 text-center mb-10">Find and book with top hospitals near you.</p>
        </motion.div>
        
        <div className="mb-8 sticky top-4 z-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search hospitals by name or location..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/80 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-slate-700 transition-all shadow-lg text-lg"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          </div>
        </div>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredHospitals.length > 0 ? (
              filteredHospitals.map(hospital => (
                <HospitalCard key={hospital.id} hospital={hospital} onSelect={setSelectedHospital} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-slate-500 py-12"
              >
                <Hospital size={48} className="mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-semibold">No Hospitals Found</h3>
                <p>Try adjusting your search query.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>


      {selectedHospital && (
        <BookingModal 
          hospital={selectedHospital}
          isOpen={true}
          onClose={() => setSelectedHospital(null)}
        />
      )}

      <Dock />
    </div>
  );
}