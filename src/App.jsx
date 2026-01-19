import { useState } from "react";
import "./index.css";

import planeIcon from "./assets/plane-icon.svg";
import commentIcon from "./assets/comment-icon.svg";
import clickIcon from "./assets/click-icon.svg";
import travelImage from "./assets/travel-image.jpg";

import FeatureCard from "./components/FeatureCard";

/**
 * PathBound App
 * A consumer-facing Online Travel Agency (OTA) landing page.
 */
function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100">
      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter text-orange-600 cursor-pointer">
            PathBound
          </div>

          <div className="hidden md:flex gap-8 font-medium text-slate-600 items-center">
            <a
              href="#destinations"
              className="hover:text-orange-600 transition-colors"
            >
              Destinations
            </a>
            <a
              href="#how-it-works"
              className="hover:text-orange-600 transition-colors"
            >
              How it Works
            </a>
            <a
              href="#deals"
              className="hover:text-orange-600 transition-colors"
            >
              Today's Deals
            </a>
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-orange-200">
              Book a Trip
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* --- HERO SECTION --- */}
        <section className="pt-40 pb-24 px-6 bg-gray-200">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-900">
              Your next escape, <br />
              <span className="text-orange-600">calculated to perfection.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-12">
              We scan thousands of flights, hotels, and hidden gems in seconds
              to find the vacation that fits your soul and your budget.
            </p>

            {/* --- SEARCH BAR COMPONENT --- 
                This simulates the interface where the API would be triggered.
            */}
            <div className="max-w-4xl mx-auto bg-white p-4 rounded-2xl shadow-2xl border border-slate-400 flex flex-col md:flex-row gap-4">
              <div className="flex-1 text-left px-4 py-2 border-r border-slate-300">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full outline-none text-lg font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-1 text-left px-4 py-2">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Travel Dates
                </label>
                <input
                  type="text"
                  placeholder="Add dates"
                  className="w-full outline-none text-lg font-medium"
                />
              </div>
              <button className="bg-orange-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all flex items-center justify-center gap-2">
                <span>Find Deals</span>
              </button>
            </div>
          </div>
        </section>

        {/* --- VALUE PROPS (SERVICES) --- */}
        <section id="how-it-works" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">
                Why book with PathBound?
              </h2>
              <p className="">
                We use the world's most advanced travel APIs to save you time
                and money.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Real-Time Pricing (Airplane) */}
              <FeatureCard
                title="Real-Time Pricing"
                desc="Direct API links to 500+ airlines mean you get the price we see, instantly."
                iconSrc={planeIcon}
              />

              {/* Verified Reviews (Message Bubbles) */}
              <FeatureCard
                title="Verified Reviews"
                desc="Every hotel includes live traveler feedback pulled directly from global databases."
                iconSrc={commentIcon}
              />

              {/* One-Click Booking (Secure Shield) */}
              <FeatureCard
                title="One-Click Booking"
                desc="No redirects. Secure your entire trip including flights and stays in one checkout."
                iconSrc={clickIcon}
              />
            </div>
          </div>
        </section>

        {/* --- ABOUT / TRUST SECTION --- */}
        <section
          id="destinations"
          className="py-24 bg-slate-900 text-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Explore more for less.
              </h2>
              <p className="text-slate-400 mb-8 text-lg">
                At PathBound, we believe technology should make travel simpler.
                Our smart algorithms monitor price fluctuations 24/7 so you
                don't have to.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-600/20 flex items-center justify-center text-orange-500 font-bold">
                    01
                  </div>
                  <p>Smart price-drop alerts delivered to your inbox.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-600/20 flex items-center justify-center text-orange-500 font-bold">
                    02
                  </div>
                  <p>Flexible cancellation on 90% of all hotel bookings.</p>
                </div>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <div className="relative aspect-square bg-slate-800 rounded-3xl flex items-center justify-center border border-white/10 overflow-hidden">
                <img
                  src={travelImage}
                  alt="Scenic travel destination"
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section id="deals" className="py-24 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-6">
              Get 10% off your first trip.
            </h2>
            <p className="text-slate-600 mb-10">
              Join 50,000+ travelers who find their dream vacations using
              PathBound.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none"
              />
              <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
                Join the Club
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-slate-900 border-t border-slate-200 text-center text-slate-500 text-sm">
        <p>
          © 2026 PathBound Travel Agency. All prices verified via travel partner
          APIs.
        </p>
      </footer>
    </div>
  );
}

export default App;
