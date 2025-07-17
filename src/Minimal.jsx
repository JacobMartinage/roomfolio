// src/Minimal.jsx
import React, { useEffect } from "react";
import { useNavigate }       from "react-router-dom";
import WorkEducationTabs     from "./components/WorkEducationTabs";
import SkillCloud            from "./components/SkillCloud";
import Projects              from "./components/Projects";
import { contact }           from "./data/constants";
import "./index.css";

export default function Minimal() {
  const nav = useNavigate();

  useEffect(() => {
    const onKey = (e) => e.key.toLowerCase() === "t" && nav("/room");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-10 py-16 px-6">
        <div className="flex-1 space-y-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
            {contact.name}
            <span className="text-cyan-400">.</span>
          </h1>
          <div className="text-gray-400 text-sm sm:text-base space-y-1">
            <p>{contact.email} • {contact.phone}</p>
            <p>
              <a href={`https://${contact.website}`} className="underline">
                {contact.website}
              </a>{" "}
              •{" "}
              <a href={`https://${contact.linkedin}`} className="underline">
                LinkedIn
              </a>{" "}
              • {contact.location}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => nav("/room")}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 
                         text-white text-lg font-semibold 
                         rounded-lg shadow-lg transition"
            >
              View in 3D🚀
            </button>
            <a
              href="/Jacob_Martinage_Resume.pdf"
              className="px-8 py-4 bg-[#0A1F2E] hover:bg-[#0E2D44] 
                         text-gray-300 text-lg font-semibold 
                         rounded-lg shadow-lg transition"
            >
              Download Résumé
            </a>
          </div>
        </div>

        {/* optional headshot */}
        <img
          src="/images/headshot.png"
          alt={contact.name}
          className="w-32 h-32 rounded-lg object-cover border-2 border-cyan-400/40"
        />
      </header>

      {/* Tabs & Skills */}
      <main className="flex-1 space-y-16 pb-24">
        <WorkEducationTabs />
        <Projects />
        <SkillCloud />
      </main>

      <footer className="text-center text-xs text-gray-500 pb-6">
        Built with React & Tailwind • Press{" "}
        <kbd className="px-1 bg-gray-700 rounded">T</kbd> to toggle views
      </footer>
    </div>
  );
}
