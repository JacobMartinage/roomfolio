// src/components/Projects.jsx
import React from "react";
import { Link } from "react-router-dom";
import { projectData } from "../data/constants";
import {
  ArrowRightIcon,
  GlobeAltIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

export default function Projects({ limit = 2 }) {
  const allCount = projectData.length;
  const featured = projectData.slice(0, limit);

  // only show the “view more” if we’re _not_ showing all
  const showViewMore = limit < allCount;

  return (
    <section className="max-w-5xl mx-auto px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
        {showViewMore && (
          <Link
            to="/projects"
            className="text-sm text-cyan-400 hover:underline inline-flex items-center gap-1"
          >
            view more <ArrowRightIcon className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {featured.map((p) => (
          <div
            key={p.name}
            className="bg-[#13161C] border border-[#242933] rounded-xl p-6
                       flex flex-col hover:shadow-lg transition-shadow"
          >
            {/* Optional image */}
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                className="rounded-lg mb-4 object-cover h-40 w-full"
              />
            )}

            {/* Title & Description */}
            <h3 className="text-xl font-semibold text-white mb-2">
              {p.name}
            </h3>
            <p className="text-gray-300 flex-1 mb-4">{p.desc}</p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 bg-[#0A1F2E] text-gray-300 rounded text-xs"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="mt-auto flex flex-wrap gap-3">
              {/* Live site */}
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5
                             bg-[#0E2D44] hover:bg-[#123047] text-sm text-cyan-300
                             rounded transition"
                >
                  <GlobeAltIcon className="h-4 w-4" /> Live
                </a>
              )}
              {/* GitHub source */}
              {p.source && (
                <a
                  href={p.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5
                             bg-[#0E2D44] hover:bg-[#123047] text-sm text-cyan-300
                             rounded transition"
                >
                  <CodeBracketIcon className="h-4 w-4" /> Source
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
);
}
