// src/components/SkillCloud.jsx
import React from "react";
import { skills } from "../data/constants";

export default function SkillCloud() {
  // combine languages + tools into a single list
  const allSkills = [...skills.languages, ...skills.tools];

  return (
    <section className="max-w-5xl mx-auto px-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {allSkills.map((s) => (
          <span
            key={s}
            className="px-3 py-1 rounded-lg bg-[#1D1F26] text-gray-300 text-sm"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
