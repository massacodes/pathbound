import React from "react";
import "../index.css";

function Explore() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100">
      <h1 className="text-4xl font-bold text-center mt-20">Explore Flights</h1>
      <p className="max-w-3xl mx-auto mt-6 text-center text-lg text-slate-600 px-6">
        Discover a world of possibilities with our extensive flight options.
        Whether you're planning a quick getaway or a long-haul adventure, our
        Explore page is your gateway to finding the perfect flight that suits
        your needs and budget.
      </p>
    </div>
  );
}

export default Explore;
