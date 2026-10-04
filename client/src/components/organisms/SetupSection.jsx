import React, { useContext } from 'react';
import { SimulationContext } from '../../SimulationContext';

export default function SetupSection() {
  const { 
    roadName, setRoadName, 
    directions, toggleDirection, 
    cycleMode, setCycleMode, 
    customCycleLength, setCustomCycleLength 
  } = useContext(SimulationContext);

  return (
    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
        Intersection Setup & Cycle Customization
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Road/Intersection Name</label>
          <input 
            type="text" 
            value={roadName}
            onChange={e => setRoadName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-800 font-medium"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Active Directions</label>
          <div className="grid grid-cols-2 gap-3">
            {Object.keys(directions).map(dir => (
              <label key={dir} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${directions[dir] ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}>
                <input 
                  type="checkbox" 
                  checked={directions[dir]}
                  onChange={() => toggleDirection(dir)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className={`font-medium text-sm ${directions[dir] ? 'text-blue-800' : 'text-gray-600'}`}>{dir}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Cycle Phasing Mode & Customization */}
      <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Cycle Calculation & Signal Phasing Mode</label>
          <select
            value={cycleMode}
            onChange={e => setCycleMode(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-800 font-medium"
          >
            <option value="auto">Auto-Detect Phasing (Dynamic Conflict Detection)</option>
            <option value="delrosario">4-Way Dual-Protected Lefts (Del Rosario Standard)</option>
            <option value="clark">T-Intersection Concurrent Flow (Clark x Friendship Standard)</option>
            <option value="custom">Custom Manual Cycle Length (User Overridden)</option>
          </select>
        </div>

        {cycleMode === 'custom' ? (
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Custom Total Cycle Length (Seconds)</label>
            <div className="flex items-center gap-3">
              <input 
                type="number"
                min="10"
                max="1200"
                value={customCycleLength || ''}
                onChange={e => setCustomCycleLength(e.target.value)}
                className="w-full border border-blue-400 rounded-lg p-3 font-bold text-blue-900 bg-blue-50/30 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="font-bold text-gray-500 text-sm">sec</span>
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-lg text-xs text-blue-900 space-y-1">
            <span className="font-bold uppercase tracking-wider block text-blue-700">Active Cycle Calculation Logic:</span>
            {cycleMode === 'delrosario' && (
              <p>Models a 4-way intersection with isolated protected left-turn phases (e.g. Del Rosario - 345s cycle standard).</p>
            )}
            {cycleMode === 'clark' && (
              <p>Models a T-intersection with concurrent arterial and side-street movement flows (e.g. Clark x Friendship - 175s cycle standard).</p>
            )}
            {cycleMode === 'auto' && (
              <p>Dynamically detects phase conflicts and left-turn protection based on active directional timings.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
