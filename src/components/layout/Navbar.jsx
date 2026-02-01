import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-black tracking-tighter text-primary cursor-pointer">
          PathBound
        </div>

        <div className="hidden md:flex gap-8 font-medium text-slate-600 items-center">
          <Link to="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <Link to="/explore" className="hover:text-ink transition-colors">
            Explore
          </Link>
          <Link to="/about" className="hover:text-ink transition-colors">
            About Us
          </Link>
          <button className="bg-primary text-accent px-6 py-2.5 rounded-full hover:bg-[#053629] transition-all shadow-lg shadow-orange-200">
            Book a Trip
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
