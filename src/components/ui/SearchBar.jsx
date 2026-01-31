import React from "react";

const SearchBar = ({ query, setQuery, onSearch }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-4 rounded-2xl shadow-2xl border border-slate-200 flex flex-col md:flex-row gap-4">
      {/* Destination */}
      <div className="flex-1 text-left px-4 py-2 border-r border-slate-300">
        <label className="block text-xs font-bold uppercase text-ink mb-1">
          Destination
        </label>
        <input
          type="text"
          placeholder="Where to?"
          className="w-full outline-none text-lg font-medium bg-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Travel Dates */}
      <div className="flex-1 text-left px-4 py-2">
        <label className="block text-xs font-bold uppercase text-ink mb-1">
          Travel Dates
        </label>
        <input
          type="text"
          placeholder="Add dates"
          className="w-full outline-none text-lg font-medium bg-transparent"
        />
      </div>

      {/* Action Button */}
      <button
        className="bg-primary hover:bg-[#043124] text-accent px-10 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        onClick={onSearch}
      >
        <span>Find Deals</span>
      </button>
    </div>
  );
};

export default SearchBar;
