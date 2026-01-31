import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import FlightDetail from "./pages/FlightDetail";
import About from "./pages/About";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Stays on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/flight/:id" element={<FlightDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer /> {/* Stays on every page */}
    </BrowserRouter>
  );
}

export default App;
