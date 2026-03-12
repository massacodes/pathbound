import React, { useState } from "react";
import bgImage from "../assets/about-bg.jpg";
import checkmarkIcon from "../assets/icons/checkmark.svg";
import mapIcon from "../assets/icons/map.svg";
import envelopeIcon from "../assets/icons/envelope.svg";

function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log("Form Data:", formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-surface pt-20">
      {/* Hero Section */}
      <section
        className="px-6 py-16 text-center bg-primary min-h-[35vh] md:min-h-[60vh]"
        style={{
          paddingTop: "6rem",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-5xl text-accent mb-6">Our Journey</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
            At PathBound, we believe travel isn't just about the destination;
            it's about the stories you collect and the boundaries you push.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-5xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-serif text-3xl font-semibold text-primary mb-4">
            Get in Touch
          </h2>
          <p className="text-ink/60 mb-8">
            Have questions about a destination or a booking? Our team of travel
            architects is ready to help you plan your next escape.
          </p>
          <div className="space-y-4">
            <div className="flex flex-row">
              <img src={mapIcon} alt="Map Icon" className="mr-2 w-6 h-6" />
              <p className="flex items-center text-ink/80 font-medium">
                123 PathBound Way
              </p>
            </div>
            <div className="flex flex-row">
              <img
                src={envelopeIcon}
                alt="Message Icon"
                className="mr-3 w-6 h-6"
              />
              <p className="flex items-center text-ink/80 font-medium">
                info@pathbound.com
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-primary p-8 rounded-3xl shadow-xl border border-slate-100">
          {submitted ? (
            <div className="text-center py-12">
              <img
                src={checkmarkIcon}
                alt="Checkmark"
                className="mx-auto mb-6 w-12 h-12"
              />
              <h3 className="text-2xl font-bold text-accent">Message Sent!</h3>
              <p className="text-white">
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-base font-bold text-accent mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-accent outline-none"
                  placeholder="Your name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-base font-bold text-accent mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-accent outline-none"
                  placeholder="your@email.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-base font-bold text-accent mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows="4"
                  className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-accent outline-none"
                  placeholder="How can we help?"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-primary font-bold py-4 rounded-xl hover:bg-accent/90 transition shadow-lg"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default About;
