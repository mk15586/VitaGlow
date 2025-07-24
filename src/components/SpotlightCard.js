import { useRef, useEffect } from "react";

const SpotlightCard = ({ icon, title, description, className = '' }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMouseMove = (e) => {
      const { left, top } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);
    };
    card.addEventListener('mousemove', handleMouseMove);
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={cardRef} className={`spotlight-card relative rounded-3xl p-8 bg-slate-50/80 border border-slate-200/80 shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group ${className}`}>
      <div className="spotlight-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative flex flex-col items-center text-center z-10">
        {icon}
        <h3 className="font-bold text-xl mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default SpotlightCard;
