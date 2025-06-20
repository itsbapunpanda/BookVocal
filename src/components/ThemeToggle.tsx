import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle Dark Mode"
      title="Toggle Dark Mode"
      className="fixed top-4 right-4 z-50 flex items-center justify-between w-14 h-8 bg-gray-300 dark:bg-gray-700 rounded-full px-1 cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {/* Sun Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 text-yellow-400 transition-opacity duration-300 ${
          dark ? "opacity-0" : "opacity-100"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l1.414 1.414M6.05 6.05L4.636 4.636" />
      </svg>

      {/* Toggle Knob */}
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          dark ? "translate-x-6" : "translate-x-0"
        }`}
      />

      {/* Moon Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 text-gray-800 dark:text-yellow-300 ml-auto transition-opacity duration-300 ${
          dark ? "opacity-100" : "opacity-0"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M17.293 13.293a8 8 0 01-10.586-10.586A7 7 0 0017.293 13.293z" />
      </svg>
    </button>
  );
}
