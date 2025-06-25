import React from "react";
import Navbar from "./components/NavbarSection/Navbar";
import Footer from "./components/FooterSection/Footer";
import Home from "./components/HomeSection/Home";
import "./App.css";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="three-js-content">
        <main className="content-wrapper flex-1">
          <Navbar />
          <Home />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default App;
