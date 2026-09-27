import React from 'react';
import { Map, Settings2 } from 'lucide-react';

export default function SimulationCard({ title, lanesCount, cycleLength, onClick }) {
  return (
    <div onClick={onClick} className="bg-white border border-gray-200 p-5 rounded-xl hover:shadow-md hover:border-blue-300 cursor-pointer transition-all group">
      <div className="h-28 bg-blue-50 rounded-lg mb-4 flex items-center justify-center text-blue-200 group-hover:bg-blue-100 transition-colors">
        <Map size={40} />
      </div>
      <h3 className="font-bold text-gray-800 text-lg truncate">{title}</h3>
      <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
        <Settings2 size={14} /> {lanesCount} Lanes • {cycleLength}s Cycle
      </p>
    </div>
  );
}
