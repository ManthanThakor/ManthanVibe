import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-purple-600">
          Hello Manthan! 🚀
        </h1>
        <p className="mt-2 text-gray-500">
          Tailwind CSS via Vite plugin is working!
        </p>
      </div>
      <h1 className="text-3xl font-bold underline">Vite + React</h1>
    </>
  );
}

export default App;
