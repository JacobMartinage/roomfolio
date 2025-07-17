// src/components/Timeline.jsx
import React from "react";

export default function Timeline({ data = [] }) {
  if (!data.length) return null;

  return (
    <ul className="relative ml-4 border-l-2 border-gray-600/40">
      {data.map((item, idx) => (
        <li
          key={idx}
          className="relative pl-16 pb-8 last:pb-0" /* ← increased left padding */
        >
          {/* dot on the left border */}
          <span className="absolute -left-[6px] top-4 h-3 w-3 bg-cyan-400 rounded-full" />

          {/* optional logo */}
          {item.logo && (
            <img
              src={item.logo}
              alt={`${item.org} logo`}
              className="absolute -left-[32.3px] top-2 h-16 w-16 rounded-full
                         border-2 border-cyan-400 object-cover bg-[#13161C]"
            />
          )}

          {/* date */}
          <time className="block text-sm text-cyan-300">{item.range}</time>

          {/* organization / institution */}
          <h3 className="mt-0 flex items-center gap-2">
            <span className="text-lg font-semibold text-white">{item.org}</span>
          </h3>

          {item.title && (
            <p className="text-sm text-gray-300 mb-0">{item.title}</p>
          )}

          {item.location && (
            <p className="text-xs text-gray-500 mb-1">{item.location}</p>
          )}

          {/* work bullets */}
          {item.bullets && (
            <ul className="list-disc ml-5 space-y-1 text-sm text-gray-400 mb-1">
              {item.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}

          {/* education organizations */}
          {item.organizations && (
            <>
              <p className="text-xs font-medium text-gray-400 mb-1">
                Organizations:
              </p>
              <ul className="list-disc ml-5 space-y-1 text-sm text-gray-400 mb-2">
                {item.organizations.map((org) => (
                  <li key={org}>{org}</li>
                ))}
              </ul>
            </>
          )}

          {/* education courses */}
          {item.courses && (
            <>
              <p className="text-xs font-medium text-gray-400 mb-1">
                Relevant Courses:
              </p>
              <ul className="list-disc ml-5 space-y-1 text-sm text-gray-400">
                {item.courses.map((course) => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
