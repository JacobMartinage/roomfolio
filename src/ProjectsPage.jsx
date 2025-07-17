// src/ProjectsPage.jsx
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Projects               from "./components/Projects";
import { projectData }        from "./data/constants";
import "./index.css";

export default function ProjectsPage() {
  const nav = useNavigate();

  useEffect(() => {
    const onKey = (e) => e.key.toLowerCase() === "t" && nav("/");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0F1117]">
      <header className="relative w-full mt-10 max-w-5xl mx-auto py-8 px-6">
        {/* Centered title */}
        <h1
          className="absolute left-1/2 top-1/2 
                     -translate-x-1/2 -translate-y-1/2
                     text-4xl font-bold text-white"
        >
          All Projects
        </h1>

        {/* Pinned right */}
        <Link
          to="/"
          className="absolute right-6 top-1/2 -translate-y-1/2
                     px-4 py-2 bg-cyan-600 hover:bg-cyan-500
                     text-white rounded-lg shadow transition"
        >
          Back to Main
        </Link>
      </header>

      {/* Show all projects */}
      <main className="flex-1 pb-24 mt-10">
        <Projects limit={projectData.length} />
      </main>

      <footer className="text-center text-xs text-gray-500 pb-6">
        Built with React & Tailwind • Press{" "}
        <kbd className="px-1 bg-gray-700 rounded">T</kbd> to toggle views
      </footer>
    </div>
  );
}
