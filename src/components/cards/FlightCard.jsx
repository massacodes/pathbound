import React from "react";
import { Link } from "react-router-dom";

function FlightCard({ flights }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {flights.map((flight) => (
        <div
          key={flight.id}
          className="bg-white rounded-2xl overflow-hidden shadow-md border border-emerald-900/40 group hover:shadow-xl transition-shadow cursor-pointer"
        >
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

          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-ink">
                {flight.destination}
              </h3>
            </div>
            <p className="text-sm text-ink/60 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Direct Flight • {flight.duration}
            </p>
            <Link
              to={`/booking/${flight.id}`}
              className="w-full py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FlightCard;
