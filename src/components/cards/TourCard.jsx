import React from "react";
import { Link } from "react-router-dom";

function TourCard({ tour }) {
  if (!tour) return null;
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-emerald-900/40 group hover:shadow-xl transition-shadow cursor-pointer flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.destination}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        <div className="absolute top-4 right-4 bg-primary text-accent px-3 py-1 rounded-full text-sm font-bold">
          {tour.price}
        </div>
      </div>

      <div className="p-6 flex flex-row justify-between items-center gap-4 grow">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-ink truncate">
            {tour.destination}
          </h3>
          <p className="text-sm text-ink/60">{tour.country}</p>
          <p className="text-sm text-ink/60 flex items-center gap-2 mt-1">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Direct • {tour.duration}
          </p>
        </div>

        <Link
          to={`/tour/${tour.id}`}
          className="whitespace-nowrap px-4 py-2 border-2 border-primary text-primary text-sm font-bold rounded-lg hover:bg-primary hover:text-white transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default TourCard;
