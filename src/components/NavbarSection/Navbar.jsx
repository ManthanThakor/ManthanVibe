import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="relative z-50 w-full py-3 px-6 flex items-center justify-between bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20">
      {/* Cosmic/Neon Animated Background (optional, can be enhanced with canvas/particles later) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-purple-700/30 via-pink-500/20 to-blue-500/30 blur-2xl animate-pulse" />
      </div>
      {/* Logo */}
      <Link to="/" className="relative z-10 flex items-center group">
        <span className="mr-3">
          {/* Unique SVG Logo with animation */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,0,255,0.7)]"
          >
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="#1a1a2e"
              stroke="#fff"
              strokeWidth="3"
            />
            <path
              d="M32 16L38 32L32 48L26 32Z"
              fill="#fff"
              stroke="#ff00cc"
              strokeWidth="2"
            />
            <circle
              cx="32"
              cy="32"
              r="6"
              fill="#ff00cc"
              className="animate-pulse"
            />
          </svg>
        </span>
        <span className="text-2xl font-extrabold tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,0,255,0.7)] select-none">
          ManthanVibe
        </span>
      </Link>
      {/* Nav Links */}
      <ul className="relative z-10 flex space-x-8 text-lg font-semibold">
        {[
          { to: "/", label: "Home" },
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact" },
        ].map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`relative px-2 py-1 transition-all duration-300 text-white/90 hover:text-pink-400 focus:text-pink-400
                before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-1 before:bg-gradient-to-r before:from-pink-500 before:to-blue-500 before:rounded-full before:transition-all before:duration-500 hover:before:w-full hover:before:opacity-100 before:opacity-0
                ${
                  location.pathname === to
                    ? "text-pink-400 before:w-full before:opacity-100"
                    : ""
                }
              `}
            >
              <span className="relative z-10">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
