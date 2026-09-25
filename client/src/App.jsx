import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Social from "./pages/Social.jsx";
import Consultation from "./pages/Consultation.jsx";
import Pricing from "./pages/Pricing.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/social" element={<Social />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
}
