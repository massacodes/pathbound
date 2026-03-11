import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import TourDetail from "./pages/tourDetail";
import About from "./pages/About";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [tours, setTours] = useState(() => {
    try {
      const savedTours = localStorage.getItem("pathbound-tours");
      return savedTours ? JSON.parse(savedTours) : [];
    } catch (error) {
      console.error("Failed to read saved tours:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("pathbound-tours", JSON.stringify(tours));
  }, [tours]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home tours={tours} setTours={setTours} />} />
        <Route
          path="/destinations"
          element={<Destinations tours={tours} setTours={setTours} />}
        />
        <Route path="/tour/:id" element={<TourDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
