import "../index.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTours } from "../services/mockTravelApi";

// assets
import verifiedIcon from "../assets/icons/verified.svg";
import commentIcon from "../assets/icons/comment.svg";
import clickIcon from "../assets/icons/click.svg";
import travelImage from "../assets/travel-image.jpg";
import heroImage from "../assets/hero-bg.jpg";

// components
import FeatureCard from "../components/cards/FeatureCard.jsx";
import SearchBar from "../components/ui/SearchBar.jsx";

function App({ tours, setTours }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadTours = async () => {
      try {
        const data = await fetchTours();
        setTours(data.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };

    loadTours();
  }, [setTours]);

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
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-20 text-white font-serif">
              Your next adventure, <br />
              <span>curated to perfection.</span>
            </h1>

            <SearchBar
              query={query}
              setQuery={setQuery}
              onSearch={handleSearch}
            />
          </div>
        </section>

        {/* --- BEST SELLERS SECTION --- */}
        <section className="py-24 px-6 bg-slate-100 border-y border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-ink font-serif mb-2">
                  Best Sellers
                </h2>
                <p className="text-slate-600">
                  The world's most coveted itineraries, curated for you.
                </p>
              </div>
              <button
                onClick={() => navigate("/destinations")}
                className="text-ink font-bold border-b-2 border-ink pb-1 hover:text-primary/85 hover:border-primary/85 transition-all hidden sm:block"
              >
                View all destinations
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tours.map((tour) => (
                <div
                  key={tour.id}
                  onClick={() => navigate(`/tour/${tour.id}`)}
                  className="group relative aspect-3/4 overflow-hidden rounded-2xl cursor-pointer shadow-lg"
                >
                  {/* Background Image */}
                  <img
                    src={tour.image}
                    alt={tour.destination}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 flex items-center justify-center bg-primary px-4 py-3 rounded-full shadow-sm">
                    <span className="text-accent text-[10px] font-extrabold uppercase tracking-[0.15em] leading-none">
                      Best Seller
                    </span>
                  </div>

                  {/* Tour Details */}
                  <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white/70 text-xs uppercase tracking-widest mb-1">
                      {tour.country}
                    </p>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {tour.destination}
                    </h3>
                    <p className="text-white font-medium">From ${tour.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SERVICES SECTION --- */}
        <section id="services" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-primary">
                Why travel with PathBound?
              </h2>
              <p className="text-slate-600">
                We partner with the world's best tour operators to ensure
                quality, safety, and unforgettable memories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Expert Curation */}
              <FeatureCard
                title="Expert Curation"
                desc="Every itinerary is vetted by travel experts to ensure you see the best of every destination."
                iconSrc={verifiedIcon}
              />

              {/* Verified Travelers */}
              <FeatureCard
                title="Verified Reviews"
                desc="Read honest feedback from thousands of travelers who have walked these paths before you."
                iconSrc={commentIcon}
              />

              {/* All-Inclusive Ease */}
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
                className="flex-1 px-6 py-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ink/60 outline-none transition-all"
              />
              <button className="bg-accent border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold hover:bg-[#1b1918] transition-all shadow-lg active:scale-95">
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
