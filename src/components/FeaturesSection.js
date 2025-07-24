import SpotlightCard from "./SpotlightCard";
import { ClockIcon, BellIcon, MapPinIcon, DoctorIcon } from "./Icons";

const FeaturesSection = () => (
  <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center mb-16 animate-scroll-fadein">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Health Management, Reimagined</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Everything you need for a healthier life in Patna, powered by cutting-edge technology.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SpotlightCard
          icon={<ClockIcon />}
          title="AI Prescription Scanner"
          description="Upload a photo, instantly digitize prescriptions, and auto-schedule your meds."
          className="lg:col-span-2"
        />
        <SpotlightCard
          icon={<BellIcon />}
          title="Medicine Reminders"
          description="Never miss a dose—get timely notifications and track your adherence."
        />
        <SpotlightCard
          icon={<MapPinIcon />}
          title="Nearby Facilities Map"
          description="Find hospitals, clinics, and pharmacies in Patna with real-time directions."
        />
        <SpotlightCard
          icon={<DoctorIcon />}
          title="Doctor Appointments"
          description="Book consultations with top healthcare providers in Patna with one click."
          className="lg:col-span-2"
        />
      </div>
    </div>
  </section>
);

export default FeaturesSection;
