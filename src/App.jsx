import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavbarSection/Navbar";
import Home from "./components/HomeSection/Home";
import About from "./components/AboutSection/About";
import Contact from "./components/ContactSection/Contact";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
