import React from 'react';
import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm sticky top-0 z-10">
      <Link to="/" className="flex items-center gap-3 cursor-pointer group">
        <div className="bg-blue-600 text-white p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
          <Activity size={20} strokeWidth={2.5} />
        </div>
        <span className="font-black text-xl tracking-tight text-gray-800">TrafficSync</span>
      </Link>
      <div className="flex gap-4">
        <div className="w-9 h-9 rounded-full bg-gray-200 border-2 border-white shadow-sm" aria-label="User Profile"></div>
      </div>
    </header>
  );
}
