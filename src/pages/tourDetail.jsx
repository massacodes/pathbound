import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Activity,
} from "lucide-react";
import { fetchTourById } from "../services/mockTravelApi";

function TourDetail() {
  const [tour, setTour] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();

  const getSavedTour = () => {
    const rawData = localStorage.getItem("pathbound-tours");
    if (!rawData) return null;
    const allTours = JSON.parse(rawData);
    return allTours.find((t) => String(t.id) === String(id)) || null;
  };

  const savedTour = getSavedTour();

  useEffect(() => {
    const loadTourById = async () => {
      try {
        const data = await fetchTourById(id);
        setTour(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadTourById();
  }, [id, setTour]);

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + tour.images.length) % tour.images.length,
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.images.length);
  };

  // If there's no tour, show loading state

  if (!tour)
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center text-xl text-primary">
        Loading tour details...
      </div>
    );

  return (
    <div className="bg-white min-h-screen">
      {/* Destination Images Gallery */}
      <div className="relative h-screen bg-slate-900 overflow-hidden group">
        <img
          src={tour.images[currentImageIndex]}
          className="w-full h-full object-cover antialiased opacity-90"
          style={{ imageRendering: "auto" }}
          loading="lazy"
          alt={savedTour.destination}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={prevImage}
            className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={nextImage}
            className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* left column: tour info & itinerary */}

          <div className="lg:col-span-2 space-y-12">
            {/* header section */}
            <section>
              <h1 className="text-4xl font-serif font-bold text-primary mb-2">
                Explore {savedTour.destination}
              </h1>
              <p className="text-xl text-slate-600 mb-5">
                {savedTour.country} in {savedTour.duration} Days,{" "}
                {Math.round(savedTour.duration - 1)} Nights in Destination
              </p>
              <div className="flex items-center gap-1 mb-10">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={22}
                    className={
                      i < Math.round(savedTour.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-yellow-400"
                    }
                  />
                ))}
                <div className="pl-3 items-center justify-center flex flex-row">
                  <p className="text-lg font-bold text-slate-900">
                    {savedTour.rating}
                  </p>
                  <p className="text-sm text-slate-500 ml-2">
                    ({savedTour.reviews} reviews)
                  </p>
                </div>
              </div>

              <p className="text-lg text-ink/70 leading-relaxed">
                Experience the soul of {savedTour.country}. From historic
                architecture to world-class cuisine, your journey starts the
                moment you board. Every detail is curated to perfection.
              </p>
            </section>

            {/* Details Section */}
            <section className="max-w-4xl py-11 border-y border-slate-300 mt-12 mb-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-slate-300">
                {/* tour code - technical detail */}
                <div className="flex flex-col items-center md:items-start px-4">
                  <span className="text-sm uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">
                    Reference
                  </span>
                  <span className="font-mono text-base font-semibold text-slate-900 ">
                    Tour Code: {savedTour.tourCode || "PB-2026-X"}
                  </span>
                  <p className="text-xs text-slate-600 mt-1">
                    Instant Confirmation
                  </p>
                </div>

                {/* physical rating - difficulty */}
                <div className="flex flex-col items-center md:items-start px-4">
                  <span className="text-sm uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">
                    Intensity
                  </span>
                  <div className="flex items-center gap-2">
                    <Activity size={16} className="text-primary" />
                    <span className="text-sm font-bold text-slate-900">
                      {savedTour.physicalRating}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-slate-300  mt-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all  duration-500"
                      style={{
                        width:
                          savedTour.physicalRating === "High" ? "100%" : "50%",
                      }}
                    />
                  </div>
                </div>

                {/* interests - tag cloud */}
                <div className="flex flex-col items-center md:items-start px-4">
                  <span className="text-sm uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">
                    Category
                  </span>
                  <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                    {savedTour.interests?.slice(0, 4).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-bold border border-slate-400 px-2 py-1 rounded text-ink uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            {/* itinerary section */}
            <section className="pb-18">
              <h3 className="text-3xl font-serif font-bold text-primary mb-8">
                Itinerary
              </h3>
              <div className="space-y-0 ml-4 border-l-2 border-slate-200">
                {[...Array(Number(savedTour.duration))]
                  .map((_, i) => i + 1)
                  .map((day) => (
                    <div key={day} className="grid gap-2 pb-14 pl-10 last:pb-0">
                      {/* Timeline Dot */}
                      <div>
                        <div className="flex flex-row items-center gap-2 mb-4">
                          <div className="w-4 h-4 rounded-full bg-primary shadow-sm" />
                          <div className="flex items-center gap-3 text-sm font-bold text-emerald-700 uppercase tracking-widest">
                            Day {day}
                          </div>
                        </div>

                        <h4 className="text-xl font-bold text-ink mb-2">
                          {tour.itinerary?.[day - 1]?.title}
                        </h4>
                        <p className="text-slate-600 leading-relaxed">
                          {tour.itinerary?.[day - 1]?.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-slate-100/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
              <p className="text-slate-400 line-through text-lg">
                From ${Math.round(savedTour.price * 1.6)}
              </p>
              <div className="flex flex-col items-center gap-1 my-4">
                <h2 className="text-5xl font-bold text-primary">
                  ${savedTour.price}
                </h2>
                <span className="text-emerald-600 font-bold bg-emerald-100 px-3 py-1 rounded-full text-sm">
                  Save 60%
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-8">
                per person / all-inclusive package
              </p>

              <div className="space-y-4 mb-8 text-left">
                <div className="flex justify-between text-sm py-2 border-b border-slate-200">
                  <span className="text-slate-500 italic">Guide Type</span>
                  <span className="font-bold">Fully Guided</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-slate-200">
                  <span className="text-slate-500 italic">Group Size</span>
                  <span className="font-bold">Max 15</span>
                </div>
              </div>

              <button className="w-full bg-primary text-white font-bold py-5 rounded-2xl hover:bg-primary/90 transition-all shadow-lg active:scale-95">
                Complete Booking
              </button>

              <p className="mt-4 text-sm text-slate-600 flex items-center justify-center gap-2">
                <MapPin size={12} /> Flexible cancellation available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetail;
