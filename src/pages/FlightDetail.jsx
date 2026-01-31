import React from "react";

function FlightDetail() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100">
      <h1 className="text-4xl font-bold text-center mt-20">Flight Detail</h1>
      <p className="max-w-3xl mx-auto mt-6 text-center text-lg text-slate-600 px-6">
        Here you can find detailed information about your selected flight,
        including departure and arrival times, layovers, and in-flight
        amenities.
      </p>
    </div>
  );
}

export default FlightDetail;
