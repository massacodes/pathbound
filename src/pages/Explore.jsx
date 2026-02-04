import React, { useState, useEffect, useCallback } from "react";
import { fetchFlights } from "../services/mockTravelApi";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/ui/SearchBar";
import FlightCard from "../components/cards/FlightCard";

function Explore() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(
    location.state?.initialQuery || "",
  );

  const loadDeals = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFlights(searchQuery);
      setFlights(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    loadDeals();
  }, [loadDeals]);

  return (
    <div className="min-h-screen bg-surface">
      {/* Search Header */}
      <div className="bg-primary pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl text-accent mb-6">
            Find Your Next Adventure
          </h1>
          <SearchBar
            query={searchQuery}
            setQuery={setSearchQuery}
            onSearch={loadDeals}
          />
        </div>
      </div>

      {/* Results Section */}
      <main className="max-w-7xl mx-auto py-16 px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-serif text-primary">
              Live Travel Deals
            </h2>
            <p className="text-ink/60">
              Real-time pricing from PathBound partners
            </p>
          </div>
          <span className="text-sm font-medium text-ink/40">
            {flights.length} results found
          </span>
        </div>

        {flights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {flights.map((flight) => (
              <FlightCard key={flight.id} data={flight} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-2xl font-serif text-primary mb-2">
              No journeys found
            </h3>
            <p className="text-ink/60 mb-8">
              We couldn't find any flights to "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                loadDeals();
              }}
              className="text-primary font-bold underline decoration-accent decoration-2"
            >
              View all available destinations
            </button>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Simple Loading Skeleton */}
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-80 bg-gray-200 animate-pulse rounded-2xl"
              ></div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Explore;
