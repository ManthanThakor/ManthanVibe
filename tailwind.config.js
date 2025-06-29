/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#0f0f23",
        secondary: "#1a0033",
        accent: "#1c113e",
        "accent-dark": "#180f35",
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
        "text-3d-entry":
          "text-3d-entry 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
      },
      keyframes: {
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "text-3d-entry": {
          "0%": {
            transform: "translateZ(-1000px) rotateY(-30deg)",
            opacity: "0",
          },
          "100%": {
            transform: "translateZ(0) rotateY(0)",
            opacity: "1",
          },
        },
      },
      textShadow: {
        "glow-sm": "0 0 2px var(--tw-shadow-color)",
        glow: "0 0 4px var(--tw-shadow-color)",
        "glow-md": "0 0 8px var(--tw-shadow-color)",
        "glow-lg": "0 0 16px var(--tw-shadow-color)",
        "3d": "2px 2px 0 var(--tw-shadow-color), 4px 4px 0 var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-glow-sm": {
          textShadow: "0 0 2px var(--tw-shadow-color)",
        },
        ".text-shadow-glow": {
          textShadow: "0 0 4px var(--tw-shadow-color)",
        },
        ".text-shadow-glow-md": {
          textShadow: "0 0 8px var(--tw-shadow-color)",
        },
        ".text-shadow-glow-lg": {
          textShadow: "0 0 16px var(--tw-shadow-color)",
        },
        ".text-shadow-3d": {
          textShadow:
            "2px 2px 0 var(--tw-shadow-color), 4px 4px 0 var(--tw-shadow-color)",
        },
        ".text-3d": {
          transform: "perspective(1000px)",
          transformStyle: "preserve-3d",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
