import React from "react";

/**
 * FeatureCard Component
 * Displays a core benefit for the consumer.
 */

function FeatureCard({ title, desc, iconSrc }) {
  return (
    <div className="flex flex-col items-center text-center p-8 group border-2 border-primary rounded-2xl">
      <img
        src={iconSrc}
        alt=""
        className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform duration-300"
      />
      <p className="text-xl font-bold text-slate-900 mb-3">{title}</p>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default FeatureCard;
