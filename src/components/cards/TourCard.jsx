import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function TourCard({ tour }) {
  if (!tour) return null;
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-emerald-900/40 group hover:shadow-xl transition-shadow cursor-pointer flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.destination}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-6 flex flex-col justify-between grow">
        <div className="flex flex-1 min-w-0  flex-col mt-1">
          <h3 className="text-lg font-bold line-clamp-1 text-ink truncate">
            {tour.country}
          </h3>
          <div className="flex flex-row">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`size-4 mt-2 ${i < Math.round(tour.rating) ? "text-yellow-500 fill-yellow-500" : "text-yellow-500 "}`}
              />
            ))}
            <p className="ml-2 mt-1.5 text-sm text-ink/60">{tour.rating}</p>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-3">
          <p className="text-base text-ink/85 items-center mt-2">
            {tour.price}
          </p>
          <Link
            to={`/tour/${tour.id}`}
            className="whitespace-nowrap px-4 py-2 border-2 border-primary text-primary text-sm font-bold rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
