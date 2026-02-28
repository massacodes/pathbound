import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

// assets
import planeIcon from "../assets/icons/plane-icon.svg";
import commentIcon from "../assets/icons/comment-icon.svg";
import clickIcon from "../assets/icons/click-icon.svg";
import travelImage from "../assets/travel-image.jpg";
import heroImage from "../assets/hero-bg.jpg";

// components
import FeatureCard from "../components/cards/FeatureCard.jsx";
import SearchBar from "../components/ui/SearchBar.jsx";

function App() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/destinations", { state: { initialQuery: query } });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100">
      <main>
        {/* --- HERO SECTION --- */}
        <section className="pt-40 pb-24 px-6 relative py-20 text-center overflow-hidden min-h-[70vh] flex items-center">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
            }}
          />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white font-serif">
              Your next adventure, <br />
              <span>curated to perfection.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-white mb-12">
              Escape the ordinary. We curate world-class itineraries and secret
              stays for the modern explorer.
            </p>

            <SearchBar
              query={query}
              setQuery={setQuery}
              onSearch={handleSearch}
            />
          </div>
        </section>

        {/* --- VALUE PROPS (SERVICES) --- */}
        <section id="services" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-ink">
                Why travel with PathBound?
              </h2>
              <p className="text-slate-600">
                We partner with the world's best tour operators to ensure
                quality, safety, and unforgettable memories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Expert Curation (Airplane replaced by concept of journey) */}
              <FeatureCard
                title="Expert Curation"
                desc="Every itinerary is vetted by travel experts to ensure you see the best of every destination."
                iconSrc={planeIcon}
              />

              {/* Verified Travelers (Message Bubbles) */}
              <FeatureCard
                title="Verified Reviews"
                desc="Read honest feedback from thousands of travelers who have walked these paths before you."
                iconSrc={commentIcon}
              />

              {/* All-Inclusive Ease (One-Click) */}
              <FeatureCard
                title="Seamless Booking"
                desc="From local transport to 4-star stays, secure your entire multi-day journey in one click."
                iconSrc={clickIcon}
              />
            </div>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section
          id="about-us"
          className="py-24 bg-primary text-ink overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-accent">
                Explore more for less.
              </h2>
              <p className="text-white mb-8 text-lg leading-relaxed">
                At PathBound, we believe travel is more than just reaching a
                destination it is a pursuit of the extraordinary. We curate
                bespoke journeys that blend the world’s most breathtaking
                landscapes with effortless, real-time technology. Our mission is
                to provide the modern explorer with an unmatched standard of
                adventure and transparency.
              </p>
            </div>
            <div className="relative group cursor-pointer">
              <div className="relative aspect-square bg-slate-800 rounded-3xl flex items-center justify-center border border-white/10 overflow-hidden shadow-2xl">
                <img
                  src={travelImage}
                  alt="Scenic travel destination"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section id="cta" className="py-24 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-4xl text-ink font-bold mb-6">
              Get 10% off your first tour.
            </h2>
            <p className="text-slate-600 mb-10">
              Join 50,000+ explorers who find their dream itineraries using
              PathBound.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              />
              <button className="bg-ink text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1b1918] transition-all shadow-lg active:scale-95">
                Join the Club
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
