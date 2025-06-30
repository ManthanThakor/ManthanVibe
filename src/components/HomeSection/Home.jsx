import React from "react";
import Animated3DBackground from "./Animated3DBackground";

const coreAbilities = [
  { label: "Frontend Development", value: "95%" },
  { label: "UI/UX Design", value: "88%" },
  { label: "Animation & GSAP", value: "92%" },
  { label: "Three.js & WebGL", value: "85%" },
];

const services = [
  {
    icon: "💻",
    title: "Web Development",
    desc: "Building responsive, high-performance websites and web apps with modern frameworks.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    desc: "Designing intuitive, beautiful interfaces and seamless user experiences.",
  },
  {
    icon: "🌀",
    title: "3D & Animation",
    desc: "Creating interactive 3D scenes and smooth animations using Three.js, GSAP, and WebGL.",
  },
  {
    icon: "✨",
    title: "Creative Coding",
    desc: "Experimenting with generative art, visual effects, and creative web projects.",
  },
];

const projects = [
  {
    title: "Cosmic Portfolio",
    desc: "An immersive space-themed portfolio showcasing advanced GSAP animations and interactive 3D elements.",
    demo: "#",
    code: "#",
  },
  {
    title: "Neural Network Visualizer",
    desc: "Interactive visualization of neural networks with real-time training data and cosmic particle effects.",
    demo: "#",
    code: "#",
  },
  {
    title: "Quantum Chat",
    desc: "Real-time chat application with quantum-inspired encryption and stellar UI animations.",
    demo: "#",
    code: "#",
  },
  {
    title: "Stellar Music Player",
    desc: "Music player with 3D visualizations and space-themed interface design.",
    demo: "#",
    code: "#",
  },
];

const Home = () => {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Animated3DBackground />
      {/* Decorative Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-32 right-20 w-12 h-12 bg-pink-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 text-center relative z-10 pt-32 pb-32">
        <div className="max-w-3xl mx-auto">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Creative Developer crafting{" "}
            <span className="text-blue-400">immersive digital experiences</span>{" "}
            in the cosmic void
          </h1>
          {/* Subheadline */}
          <p className="text-lg md:text-2xl text-white/80 mb-4 font-light">
            Transforming ideas into interactive realities through code, design,
            and a touch of cosmic magic. Welcome to my digital universe.
          </p>
          {/* Journey/Tagline */}
          <p className="text-base md:text-lg text-white/60 mb-8 italic">
            Since 2019, I've been navigating the vast expanse of web
            development, transforming caffeine into code and ideas into
            interactive experiences.
          </p>
          {/* Core Abilities */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {coreAbilities.map((item) => (
              <div
                key={item.label}
                className="bg-white/10 border border-white/10 rounded-xl px-5 py-3 text-white text-sm md:text-base shadow backdrop-blur"
              >
                <span className="font-semibold">{item.label}</span>
                <span className="ml-2 text-blue-300">{item.value}</span>
              </div>
            ))}
          </div>
          {/* Services Section */}
          <div className="mt-16 mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-white/10 border border-white/10 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-sm">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Featured Projects Section */}
          <div className="mt-16 mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/10 rounded-2xl p-6 flex flex-col items-start shadow-lg hover:scale-105 transition-transform duration-300 text-left"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">{project.desc}</p>
                  <div className="flex gap-4 mt-auto">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-gray-200 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold transition"
                    >
                      Code
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button
              onClick={() => handleScrollTo("projects")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition"
            >
              Explore Projects
            </button>
            <button
              onClick={() => handleScrollTo("contact")}
              className="bg-white hover:bg-gray-200 text-blue-700 px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition"
            >
              Get In Touch
            </button>
          </div>
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
