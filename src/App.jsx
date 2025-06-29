import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/NavbarSection/Navbar";
import Footer from "./components/FooterSection/Footer";
import Home from "./components/HomeSection/Home";
import About from "./components/AboutSection/About";
import Projects from "./components/ProjectsSection/Projects";
import Skills from "./components/SkillsSection/Skills";
import Resume from "./components/ResumeSection/Resume";
import Contact from "./components/ContactSection/Contact";
import PreLoader from "./components/PreLoader/PreLoader";
import usePreloader from "./hooks/usePreloader";
import "./App.css";

const Layout = ({ isLoading }) => (
  <div
    className={`flex flex-col min-h-screen bg-gradient-to-b from-primary via-secondary via-accent to-accent-dark transition-opacity duration-1000 ${
      isLoading ? "opacity-0" : "opacity-100"
    }`}
  >
    <div className="three-js-content">
      <main className="content-wrapper flex-1">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </div>
  </div>
);

const App = () => {
  const { progress, isLoading } = usePreloader();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout isLoading={isLoading} />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="skills" element={<Skills />} />
        <Route path="resume" element={<Resume />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    ),
    {
      future: {
        v7_startTransition: true,
      },
    }
  );

  return (
    <>
      <PreLoader progress={progress} isLoading={isLoading} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
