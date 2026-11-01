import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle({ showLabel = false, className = "" }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // Sync across tabs/windows or other instances
    window.dispatchEvent(new CustomEvent("paws-theme-change", { detail: theme }));
  }, [theme]);

  useEffect(() => {
    const handleSync = (e) => {
      if (e.detail && (e.detail === "dark" || e.detail === "light")) {
        setTheme(e.detail);
      }
    };
    window.addEventListener("paws-theme-change", handleSync);
    return () => window.removeEventListener("paws-theme-change", handleSync);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Activate light theme" : "Activate dark theme"}
      title={isDark ? "Switch to daylight mode" : "Switch to nocturnal mode"}
      className={`relative inline-flex items-center justify-center gap-2 p-2.5 rounded-pill border border-rule/80 bg-paper hover:bg-paper-2 text-ink transition-colors hover-lift press-down focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus shadow-xs ${className}`}
    >
      <span className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <FaSun className="w-4 h-4 text-accent transition-transform duration-200 rotate-0" />
        ) : (
          <FaMoon className="w-3.5 h-3.5 text-accent-2 transition-transform duration-200 rotate-0" />
        )}
      </span>
      {showLabel && (
        <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}

