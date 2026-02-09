import React from "react";
import { Link } from "react-router-dom";

function FlightCard({ flight }) {
  if (!flight) return null;
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-emerald-900/40 group hover:shadow-xl transition-shadow cursor-pointer flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img
          src={flight.image}
          alt={flight.destination}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        <div className="absolute top-4 right-4 bg-primary text-accent px-3 py-1 rounded-full text-sm font-bold">
          {flight.price}
        </div>
      </div>

      <div className="p-6 flex flex-row justify-between items-center gap-4 grow">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-ink truncate">
            {flight.destination}
          </h3>
          <p className="text-sm text-ink/60">{flight.country}</p>
          <p className="text-sm text-ink/60 flex items-center gap-2 mt-1">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Direct • {flight.duration}
          </p>
        </div>

        <Link
          to={`/booking/${flight.id}`}
          className="whitespace-nowrap px-4 py-2 border-2 border-primary text-primary text-sm font-bold rounded-lg hover:bg-primary hover:text-white transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default FlightCard;
