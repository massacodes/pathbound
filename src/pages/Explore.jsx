import React, { useState, useEffect } from "react";
import { fetchFlights } from "../services/mockTravelApi";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/ui/SearchBar";

const Explore = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(
    location.state?.initialQuery || "",
  );

  // Fetch initial "featured" deals on load
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchFlights(searchQuery);
    setFlights(data);
    setLoading(false);
  };

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
            onSearch={loadData}
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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Simple Loading Skeleton */}
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-80 bg-gray-200 animate-pulse rounded-2xl"
              ></div>
            ))}
          </div>
        ) : (
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
                  <button className="w-full py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition">
                    View Availability
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Explore;
