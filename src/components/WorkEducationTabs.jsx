// src/components/WorkEducationTabs.jsx
import React, { useState } from 'react';
import { BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/solid';
import Timeline from './Timeline';
import { workData, educationData } from '../data/constants';

export default function WorkEducationTabs() {
  const [tab, setTab] = useState('work');

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* ——— Tab Bar ——— */}
      <div className="flex bg-[#06121B] rounded-lg overflow-hidden">
        <button
          onClick={() => setTab('work')}
          className={`
            flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold
            cursor-pointer transition
            ${tab === 'work'
              ? 'bg-[#0E2D44] text-cyan-400'
              : 'text-gray-400 hover:bg-[#0A1F2E]'}`}
        >
          <BriefcaseIcon className="h-5 w-5" />
          Career
        </button>
        <button
          onClick={() => setTab('edu')}
          className={`
            flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold
            cursor-pointer transition
            ${tab === 'edu'
              ? 'bg-[#0E2D44] text-cyan-400'
              : 'text-gray-400 hover:bg-[#0A1F2E]'}`}
        >
          <AcademicCapIcon className="h-5 w-5" />
          Education
        </button>
      </div>

      {/* ——— Content Panel ——— */}
      <div className="bg-transparent backdrop-blur-md border border-gray-700 rounded-xl p-8 mt-2">
        <Timeline data={tab === 'work' ? workData : educationData} />
      </div>
    </div>
  );
}
