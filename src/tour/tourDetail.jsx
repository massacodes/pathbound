import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTourById, fetchTours } from "../services/mockTravelApi";

const TourDetail = ({ tours, setTours }) => {
  const [fallbackTour, setFallbackTour] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  // Optionally, fetch tours if not already loaded
  useEffect(() => {
    if (!tours || tours.length === 0) {
      const loadTours = async () => {
        try {
          const data = await fetchTours();
          setTours(data);
        } catch (error) {
          console.error(error);
        }
      };
      loadTours();
    }
  }, [tours, setTours]);

  const matchedFallbackTour = fallbackTour?.id === id ? fallbackTour : null;
  const tour = tours.find((t) => t.id === id) || matchedFallbackTour;

  useEffect(() => {
    if (tour) return;

    const loadTourById = async () => {
      try {
        const data = await fetchTourById(id);
        setFallbackTour(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadTourById();
  }, [id, tour]);

  if (!tour) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center text-xl text-primary">
        Loading tour details...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="text-primary mb-6 hover:underline"
      >
        ← Back to All Journeys
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* LEFT COLUMN (2/3) - Story & Details */}
        <div className="lg:col-span-2 space-y-10">
          <div className="rounded-3xl overflow-hidden shadow-2xl h-112.5">
            <img
              src={tour.image}
              alt={tour.destination}
              className="w-full h-full object-cover"
            />
          </div>

          <section>
            <h1 className="font-serif text-5xl text-primary mb-4">
              Explore {tour.destination}
            </h1>
            <p className="text-xl text-ink/60 leading-relaxed">
              Experience the soul of {tour.country}. From historic architecture
              to world-class cuisine, your journey starts the moment you board.
            </p>
          </section>

          {/* 2. Tour Quick Facts Grid */}
          <section className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 border-y border-slate-100 py-10">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-ink/40 font-bold mb-1">
                Tour Operator
              </h4>
              <p className="text-lg text-primary font-medium">
                Expat Explore Travel
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-ink/40 font-bold mb-1">
                Tour Code
              </h4>
              <p className="text-lg text-primary font-medium">ITS</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-ink/40 font-bold mb-1">
                Guide Type
              </h4>
              <p className="text-lg text-primary font-medium">Fully Guided</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-ink/40 font-bold mb-1">
                Group Size
              </h4>
              <p className="text-lg text-primary font-medium">10 - 51</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-ink/40 font-bold mb-1">
                Physical Rating
              </h4>
              <p className="text-lg text-primary font-medium">Low</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-ink/40 font-bold mb-1">
                Age Range
              </h4>
              <p className="text-lg text-primary font-medium">10+</p>
            </div>
          </section>

          {/* 3. What's Included Section */}
          <section className="space-y-6 mt-26">
            <h2 className="font-serif text-3xl text-primary">
              What's Included
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-2xl text-accent">✈️</div>
                <div>
                  <h4 className="font-bold text-primary">
                    International tours
                  </h4>
                  <p className="text-ink/60 leading-relaxed">
                    Round-trip economy class tours (upgradeable) from SFO to{" "}
                    {tour.destination} are fully included in this package.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl text-accent">🧳</div>
                <div>
                  <h4 className="font-bold text-primary">Baggage Allowance</h4>
                  <p className="text-ink/60 leading-relaxed">
                    1 Carry-on (7kg) and 1 Checked-in bag (23kg) included per
                    passenger.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. What's Not Included - Corrected Logic */}
          <section className="bg-slate-50 p-8 rounded-3xl space-y-4 border border-slate-100">
            <h2 className="font-serif text-2xl text-primary font-medium">
              What's Not Included
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-ink/60">
                <span className="text-red-400 font-bold">✕</span>
                <span>
                  <strong>Land Tours:</strong> Local excursions, museum entries,
                  and guided city walks must be booked separately.
                </span>
              </li>
              <li className="flex items-start gap-3 text-ink/60">
                <span className="text-red-400 font-bold">✕</span>
                <span>
                  <strong>Visas:</strong> While we provide tour documentation,
                  entry visas remain the traveller’s responsibility.
                </span>
              </li>
              <li className="flex items-start gap-3 text-ink/60">
                <span className="text-red-400 font-bold">✕</span>
                <span>
                  <strong>Travel Insurance:</strong> We highly recommend
                  purchasing comprehensive insurance for your journey.
                </span>
              </li>
            </ul>
          </section>

          {/* 5. Detailed Tour Information (FAQ style) */}
          <section className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-serif text-3xl text-primary">
                Detailed Tour Information
              </h2>
              <p className="text-ink/40 italic">
                Everything you need to know ahead of the tour
              </p>
            </div>

            <div className="space-y-2">
              {[
                "Accommodation",
                "Meals & Diets",
                "Practical Info",
                "Group & Guide",
              ].map((topic) => (
                <div
                  key={topic}
                  className="group border border-slate-100 rounded-2xl p-6 hover:bg-white hover:shadow-md transition-all cursor-pointer flex justify-between items-center"
                >
                  <span className="font-bold text-primary">{topic}</span>
                  <span className="text-accent">→</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (1/3) - Sticky Booking Card */}
        <div className="lg:sticky lg:top-32">
          <div className="bg-primary text-white p-8 rounded-[2rem] shadow-xl">
            <div className="mb-6">
              <span className="text-accent text-sm font-bold uppercase">
                Total Price
              </span>
              <h2 className="text-4xl font-sans">
                {tour.price}{" "}
                <span className="text-lg font-sans text-white/60">/person</span>
              </h2>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                <span>Airline</span>
                <span className="font-bold">{tour.airline}</span>
              </div>
              <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                <span>Aircraft</span>
                <span className="font-bold">{tour.aircraft}</span>
              </div>
            </div>

            <button className="w-full bg-accent text-primary font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform">
              Complete Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
