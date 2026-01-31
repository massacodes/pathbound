import { useState } from "react";
import "./index.css";

// assets

import planeIcon from "./assets/plane-icon.svg";
import commentIcon from "./assets/comment-icon.svg";
import clickIcon from "./assets/click-icon.svg";
import travelImage from "./assets/travel-image.jpg";
import heroImage from "./assets/hero-bg.jpg";

// components

import Nabar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import FeatureCard from "./components/cards/FeatureCard.jsx";
import { fetchFlights } from "./services/mockTravelApi.jsx";

/**
 * PathBound App
 * A consumer-facing Online Travel Agency (OTA) landing page.
 */
function App() {
  const [query, setQuery] = useState(""); // UI State

  const [flights, setFlights] = useState([]); // Data State
  const [isLoading, setIsLoading] = useState(false); // Status State

  const handleSearch = async () => {
    setIsLoading(true);
    const data = await fetchFlights(query);
    setFlights(data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100">
      {/* --- NAVBAR --- */}
      <Nabar />

      {/* --- MAIN CONTENT --- */}
      <main>
        {/* --- HERO SECTION --- */}
        <section className="pt-40 pb-24 px-6 bg-gray-200 relative py-20 text-center overflow-hidden min-h-[60vh] flex items-center">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${heroImage})`,
            }}
          />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white font-serif">
              Your next escape, <br />
              <span>calculated to perfection.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-white mb-12">
              We scan thousands of flights, hotels, and hidden gems in seconds
              to find the vacation that fits your soul and your budget.
            </p>

            {/* --- SEARCH BAR COMPONENT --- 
                This simulates the interface where the API would be triggered.
            */}
            <div className="max-w-4xl mx-auto bg-white p-4 rounded-2xl shadow-2xl border border-slate-400 flex flex-col md:flex-row gap-4">
              <div className="flex-1 text-left px-4 py-2 border-r border-slate-300">
                <label className="block text-xs font-bold uppercase text-ink mb-1">
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full outline-none text-lg font-medium"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="flex-1 text-left px-4 py-2">
                <label className="block text-xs font-bold uppercase text-ink mb-1">
                  Travel Dates
                </label>
                <input
                  type="text"
                  placeholder="Add dates"
                  className="w-full outline-none text-lg font-medium"
                />
              </div>
              <button
                className="bg-primary hover:bg-[#043124] text-accent px-10 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                onClick={handleSearch}
              >
                <span>Find Deals</span>
              </button>
            </div>
          </div>
        </section>

        {/* --- VALUE PROPS (SERVICES) --- */}
        <section id="how-it-works" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-ink">
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

        {/* --- ABOUT SECTION --- */}
        <section
          id="destinations"
          className="py-24 bg-primary text-ink overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-accent">
                Explore more for less.
              </h2>
              <p className="text-white mb-8 text-lg">
                At PathBound, we believe travel is more than just reaching a
                destination it is a pursuit of the extraordinary. We curate
                bespoke journeys that blend the world’s most breathtaking
                landscapes with effortless, real-time technology. Our mission is
                to provide the modern explorer with an unmatched standard of
                luxury and transparency, ensuring that your next great adventure
                is as seamless as it is unforgettable.
              </p>
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
                className="flex-1 px-6 py-4 rounded-xl border border-slate-700 focus:ring-2 focus:ring-orange-500 outline-none"
              />
              <button className="bg-primary text-accent px-8 py-4 rounded-xl font-bold hover:bg-[#053629] transition-all">
                Join the Club
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}

      <Footer />
    </div>
  );
}

export default App;
