import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Resume", path: "/resume" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0f0f23]/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Link to="/">
              <img
                className="h-12 w-auto"
                src="/src/assets/Logo/LogoName.png"
                alt="Logo"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Bar */}
            <div className="relative">
              <motion.div
                initial={false}
                animate={isSearchOpen ? "open" : "closed"}
                variants={{
                  open: { width: "300px" },
                  closed: { width: "40px" },
                }}
                className="flex items-center"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${
                    isSearchOpen ? "w-full pl-4 pr-10" : "w-0"
                  } h-10 bg-[#1a0033]/50 rounded-full outline-none transition-all duration-300 text-white placeholder-gray-400`}
                />
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-white hover:text-purple-400 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </motion.div>
            </div>

            {/* Navigation Links */}
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative group ${
                  location.pathname === item.path
                    ? "text-purple-400"
                    : "text-white"
                }`}
              >
                <span className="font-orbitron text-sm tracking-wider">
                  {item.name}
                </span>
                <span
                  className={`absolute -bottom-2 left-0 w-full h-0.5 bg-purple-400 transform origin-left transition-transform duration-300 ${
                    location.pathname === item.path
                      ? "scale-x-100"
                      : "scale-x-0"
                  } group-hover:scale-x-100`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center"
          >
            <div className="relative w-6 h-5">
              <span
                className={`absolute w-6 h-0.5 bg-white transform transition-all duration-300 ${
                  isOpen ? "rotate-45 top-2" : "rotate-0 top-0"
                }`}
              ></span>
              <span
                className={`absolute w-6 h-0.5 bg-white top-2 transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`absolute w-6 h-0.5 bg-white transform transition-all duration-300 ${
                  isOpen ? "-rotate-45 top-2" : "rotate-0 top-4"
                }`}
              ></span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0f0f23]/95 backdrop-blur-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 bg-[#1a0033]/50 rounded-full pl-4 pr-10 text-white placeholder-gray-400 outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>

              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 font-orbitron text-sm tracking-wider ${
                    location.pathname === item.path
                      ? "text-purple-400"
                      : "text-white hover:text-purple-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
