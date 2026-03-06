import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import { fetchTourById } from "../services/mockTravelApi";

const TourDetail = () => {
  const [tour, setTour] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

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
          alt={tour.destination}
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
        {/* Back Button Overlay */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/40 transition flex items-center gap-2"
        >
          <ChevronLeft size={20} /> Back to All Journeys
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN: TOUR INFO & ITINERARY */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header Section */}
            <section>
              <h1 className="text-4xl font-serif font-bold text-primary mb-2">
                Explore {tour.destination}
              </h1>
              <p className="text-xl text-slate-600 mb-5">
                {tour.country} in {tour.duration} Days,{" "}
                {Math.round(tour.duration - 1)} Nights in Destination
              </p>
              <div className="flex gap-1 mb-11">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={
                      i < Math.round(tour.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-yellow-400"
                    }
                  />
                ))}
              </div>

              <p className="text-lg text-ink/70 leading-relaxed">
                Experience the soul of {tour.country}. From historic
                architecture to world-class cuisine, your journey starts the
                moment you board. Every detail is curated to perfection.
              </p>
            </section>

            <hr className="border-slate-300" />

            {/* Details Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-slate-100">
              <div className="flex flex-col pl-7">
                <div className="border-b-slate-300 border-b-2 py-6">
                  Reviews
                </div>
                <div className="border-b-slate-300 border-b-2 py-6">
                  Tour Code
                </div>
                <div className="border-b-slate-300 border-b-2 py-6">
                  Physical Rating
                </div>
                <div className="border-b-slate-300 border-b-2 py-6">
                  Interests
                </div>
              </div>
            </section>

            {/* Itinerary Section */}
            <section>
              <h3 className="text-3xl font-serif font-bold text-primary mb-8">
                Itinerary
              </h3>
              <div className="space-y-0 ml-4 border-l-2 border-slate-200">
                {[1, 2, 3].map((day) => (
                  <div key={day} className="relative pb-10 pl-10 last:pb-0">
                    {/* Timeline Dot */}
                    <div className="absolute top-1 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-sm" />

                    <div className="flex items-center gap-3 text-sm font-bold text-emerald-700 uppercase tracking-widest mb-1">
                      <Clock size={16} /> Day {day}
                    </div>
                    <h4 className="text-xl font-bold text-ink mb-2">
                      Arrival & Exploration
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      Check-in to your boutique hotel. Meet your local guide for
                      a welcome dinner and an evening orientation walk through
                      the historic district.
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-slate-100/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
              <p className="text-slate-400 line-through text-lg">
                From ${Math.round(tour.price * 1.6)}
              </p>
              <div className="flex flex-col items-center gap-1 my-4">
                <h2 className="text-5xl font-bold text-primary">
                  ${tour.price}
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

              <p className="mt-4 text-xs text-slate-400 flex items-center justify-center gap-2">
                <MapPin size={12} /> Flexible cancellation available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
