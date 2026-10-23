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
    <section className="border p-4 sm:p-8 rounded-3xl shadow-sm space-y-6 transition-all" style={glassStyle}>
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
            name="intersection_road_title"
            id="intersection_road_title"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-lpignore="true"
            data-form-type="other"
            value={roadName}
            onChange={e => setRoadName(e.target.value)}
            placeholder="Enter intersection name..."
            className="w-full border border-gray-300/80 rounded-full px-5 py-3 sm:px-6 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90 backdrop-blur-md text-gray-900 font-bold shadow-md transition-all text-sm sm:text-base"
            style={{ fontFamily: 'Arial, sans-serif' }}
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-gray-700 mb-2 uppercase tracking-wider">Directions</label>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3">
            {Object.keys(directions).map(dir => (
              <label 
                key={dir} 
                className={`flex items-center gap-3 p-3 sm:p-3.5 border rounded-full cursor-pointer transition-all duration-300 shadow-2xs hover:scale-[1.02] ${
                  directions[dir] 
                    ? 'bg-blue-50/90 border-blue-400 text-blue-900 shadow-blue-500/10' 
                    : 'bg-white/90 border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                  directions[dir] ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
                }`}>
                  {directions[dir] && (
                    <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20">
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                    </svg>
                  )}
                </div>
                <input 
                  type="checkbox" 
                  checked={directions[dir]} 
                  onChange={() => toggleDirection(dir)}
                  style={{ display: 'none' }}
                />
                <span className="text-xs sm:text-sm font-extrabold select-none truncate">{dir}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
