import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavbarSection/Navbar";
import Footer from "./components/FooterSection/Footer";
import Home from "./components/HomeSection/Home";
import About from "./components/AboutSection/About";
import Projects from "./components/ProjectsSection/Projects";
import Skills from "./components/SkillsSection/Skills";
import Resume from "./components/ResumeSection/Resume";
import Contact from "./components/ContactSection/Contact";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-primary via-secondary via-accent to-accent-dark">
        <div className="three-js-content">
          <main className="content-wrapper flex-1">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
