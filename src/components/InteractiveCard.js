import { useRef, useEffect } from "react";
import { BellIcon, DoctorIcon } from "./Icons";

const InteractiveCard = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      const rotateX = -y / 30;
      const rotateY = x / 30;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
    };
    const handleMouseLeave = () => {
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
    };
    document.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="hidden lg:block absolute top-[55%] right-[-5%] w-[400px] h-[250px] transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
      <div className="absolute inset-0 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6">
        <div className="w-full h-full border-2 border-dashed border-gray-300/50 rounded-2xl flex flex-col justify-between p-4">
          <div>
            <div className="flex justify-between items-center">
              <p className="font-bold text-gray-800">Health Dashboard</p>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6366f1] to-[#34d399] flex items-center justify-center shadow-lg">
                <Image src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" width={36} height={36} className="w-9 h-9 rounded-full border-2 border-white" />
              </div>
            </div>
            <p className="text-sm text-gray-500">Welcome, Priya!</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-indigo-50/50 rounded-lg">
              <BellIcon />
              <div>
                <p className="font-semibold text-sm text-indigo-700">Next Reminder</p>
                <p className="text-xs text-gray-600">Paracetamol - 9:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-emerald-50/50 rounded-lg">
              <DoctorIcon />
              <div>
                <p className="font-semibold text-sm text-emerald-700">Upcoming Appointment</p>
                <p className="text-xs text-gray-600">Dr. Sharma - Tomorrow, 11 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCard;
