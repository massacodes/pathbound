import React, { useState, useCallback, useEffect } from "react";
import { fetchFlights } from "../services/mockTravelApi";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/ui/SearchBar";
import FlightCard from "../components/cards/FlightCard";
import mapIcon from "../assets/icons/map.svg";

function Explore() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Initialize search query from home page state if available, otherwise start with an empty string

  const [searchQuery, setSearchQuery] = useState(
    location.state?.initialQuery || "",
  );

  const loadDeals = useCallback(async (query) => {
    setSearchQuery(query);
    setLoading(true);
    try {
      const data = await fetchFlights(query);
      setFlights(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDeals(location.state?.initialQuery || "");
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Explore;
