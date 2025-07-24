import LogoIcon from "./LogoIcon";

const Footer = () => (
  <footer className="bg-slate-900 text-white">
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#34d399]">
              <LogoIcon />
            </div>
            <span className="font-bold text-2xl tracking-tighter ml-3">
              Vita<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#34d399]">Glow</span>
            </span>
          </div>
          <p className="text-slate-400 mb-6 max-w-md">
            Your modern health assistant for Patna, India. Helping you manage medications, book appointments, and find local care—all in one place.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase mb-6 text-slate-400">Solutions</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-base text-slate-300 hover:text-white transition-colors">Prescription AI</a></li>
            <li><a href="#" className="text-base text-slate-300 hover:text-white transition-colors">Medication Reminders</a></li>
            <li><a href="#" className="text-base text-slate-300 hover:text-white transition-colors">Healthcare Map</a></li>
            <li><a href="#" className="text-base text-slate-300 hover:text-white transition-colors">Appointment Booking</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase mb-6 text-slate-400">Company</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-base text-slate-300 hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="text-base text-slate-300 hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="text-base text-slate-300 hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="text-base text-slate-300 hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase mb-6 text-slate-400">Support</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-base text-slate-300 hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="text-base text-slate-300 hover:text-white transition-colors">FAQs</a></li>
            <li><a href="#" className="text-base text-slate-300 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-base text-slate-300 hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} VitaGlow. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
