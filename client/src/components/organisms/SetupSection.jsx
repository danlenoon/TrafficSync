import React, { useContext } from 'react';
import { SimulationContext } from '../../SimulationContext';

export default function SetupSection() {
  const { roadName, setRoadName, directions, toggleDirection } = useContext(SimulationContext);

  return (
    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
        Intersection Setup
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
    </section>
  );
}
