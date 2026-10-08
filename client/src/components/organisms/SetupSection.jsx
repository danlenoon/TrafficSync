import React, { useContext } from 'react';
import { SimulationContext } from '../../SimulationContext';

export default function SetupSection() {
  const { 
    roadName, setRoadName, 
    directions, toggleDirection, 
    glassClarity
  } = useContext(SimulationContext);

  const glassStyle = {
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    borderColor: 'var(--glass-border)',
    boxShadow: `0 20px 40px rgba(0, 0, 0, ${0.03 + glassClarity * 0.05})`,
    fontFamily: 'Arial, sans-serif'
  };

  return (
    <section className="border p-8 rounded-3xl shadow-sm space-y-6 transition-all" style={glassStyle}>
      <div>
        <h2 className="text-xl font-black text-gray-900 flex items-center gap-3" style={{ fontFamily: 'Arial, sans-serif' }}>
          <span className="bg-gradient-to-tr from-blue-600 to-blue-500 text-white w-8 h-8 rounded-2xl flex items-center justify-center text-sm shadow-md shadow-blue-500/20">1</span>
          Intersection Setup
        </h2>
        <p className="text-xs text-gray-600 font-medium mt-1 ml-11">Configure the baseline intersection name and select active operational directional approaches (Northbound, Southbound, Eastbound, Westbound).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-extrabold text-gray-700 mb-2 uppercase tracking-wider">Intersection Name</label>
          <input 
            type="text" 
            autoComplete="off"
            value={roadName}
            onChange={e => setRoadName(e.target.value)}
            placeholder="Enter intersection name..."
            className="w-full border border-gray-300/80 rounded-full px-6 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90 backdrop-blur-md text-gray-900 font-bold shadow-md transition-all"
            style={{ fontFamily: 'Arial, sans-serif' }}
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-gray-700 mb-2 uppercase tracking-wider">Directions</label>
          <div className="grid grid-cols-2 gap-3">
            {Object.keys(directions).map(dir => (
              <label 
                key={dir} 
                className={`flex items-center gap-3 p-3.5 border rounded-full cursor-pointer transition-all duration-300 shadow-2xs hover:scale-[1.02] ${
                  directions[dir] 
                    ? 'border-blue-500 bg-blue-50/90 backdrop-blur-md text-blue-900 shadow-blue-500/15' 
                    : 'border-gray-200/80 bg-white/70 hover:bg-white/90 text-gray-700'
                }`}
              >
                <input 
                  type="checkbox" 
                  checked={directions[dir]}
                  onChange={() => toggleDirection(dir)}
                  className="w-5 h-5 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="font-bold text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>{dir}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
