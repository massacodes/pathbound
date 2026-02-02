import React from "react";

// This simulates the interface where the API is triggered.

function SearchBar({ query, setQuery, onSearch }) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex flex-col md:flex-row gap-4 bg-white p-2 rounded-2xl shadow-xl">
        <input
          type="text"
          placeholder="Search destinations"
          className="flex-1 p-4 rounded-xl focus:outline-none text-ink"
          value={query}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={onSearch}
          className="bg-accent text-primary font-bold px-8 py-4 rounded-xl hover:brightness-105 transition"
        >
          Search Deals
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
