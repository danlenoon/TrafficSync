import React, { useContext } from 'react';
import { User } from 'lucide-react';
import { SimulationContext } from '../../SimulationContext';

export default function TimingsSection() {
  const { directions, laneConfigs, phaseTimings, updateTiming, pedestrians, pedestrianTimings, updatePedestrianTiming, glassClarity } = useContext(SimulationContext);

  const getArrowSymbol = (type) => {
    switch (type) {
      case 'Left Turn': return '↰';
      case 'Right Turn': return '↱';
      case 'Straight': return '↑';
      case 'U-Turn': return '↩';
      case 'Left & Straight': return '↰ ↑';
      case 'Straight & Right': return '↑ ↱';
      case 'Left & Right': return '↰ ↱';
      case 'Left & U-Turn': return '↰ ↩';
      case 'Straight & U-Turn': return '↑ ↩';
      case 'Right & U-Turn': return '↱ ↩';
      case 'Left, Straight, & U-Turn': return '↰ ↑ ↩';
      case 'U-Turn, Straight, & Right': return '↩ ↑ ↱';
      default: return '↑';
    }
  };

  const glassStyle = {
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    borderColor: 'var(--glass-border)',
    boxShadow: `0 20px 40px rgba(0, 0, 0, ${0.03 + glassClarity * 0.05})`,
    fontFamily: 'Arial, sans-serif'
  };

  const tableHeaderStyle = {
    backgroundColor: 'var(--input-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    borderColor: 'var(--glass-border)',
    fontFamily: 'Arial, sans-serif'
  };

  return (
    <section className="border p-8 rounded-3xl shadow-sm transition-all" style={glassStyle}>
      <div>
        <h2 className="text-xl font-black text-gray-900 mb-2 flex items-center gap-3" style={{ fontFamily: 'Arial, sans-serif' }}>
          <span className="bg-gradient-to-tr from-blue-600 to-blue-500 text-white w-8 h-8 rounded-2xl flex items-center justify-center text-sm shadow-md shadow-blue-500/20">4</span>
          Phase Timings Calculator
        </h2>
        <p className="text-xs text-gray-600 font-medium ml-11 mb-6">Specify precise Green Go (G), Amber Caution (A), and Red Clearance (R) intervals in seconds for every lane configuration and pedestrian crossing.</p>
      </div>

      <div className="border rounded-2xl shadow-sm overflow-hidden overflow-x-auto transition-all" style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--card-bg)' }}>
        <table className="w-full text-left min-w-[600px]">
          <thead className="border-b text-gray-800 text-sm font-extrabold" style={{ borderColor: 'var(--glass-border)', ...tableHeaderStyle }}>
            <tr>
              <th className="p-4" style={{ fontFamily: 'Arial, sans-serif' }}>Lane Configuration</th>
              <th className="p-4 text-center border-l" style={{ borderColor: 'var(--glass-border)', fontFamily: 'Arial, sans-serif' }}>Go (G)</th>
              <th className="p-4 text-center border-l" style={{ borderColor: 'var(--glass-border)', fontFamily: 'Arial, sans-serif' }}>Amber (A)</th>
              <th className="p-4 text-center border-l" style={{ borderColor: 'var(--glass-border)', fontFamily: 'Arial, sans-serif' }}>Red Clearance (R)</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--glass-border)' }}>
            {Object.keys(directions).filter(d => directions[d]).map(dir => (
              <React.Fragment key={dir}>
                {(laneConfigs[dir] || []).map(lane => {
                  const key = `${dir}-${lane.id}`;
                  const t = phaseTimings[key] || { go: 1, amber: 3, red: 2 };
                  const arrow = getArrowSymbol(lane.type);
                  return (
                    <tr key={key} className="hover:bg-white/40 transition-colors">
                      <td className="p-4">
                        {/* Larger circle badge fitting 1, 2, or 3 arrows in one line */}
                        <div className="font-extrabold text-gray-900 flex items-center gap-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                          <span>{dir.charAt(0)} Lane {lane.id}</span>
                          <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-xs shrink-0 px-1 whitespace-nowrap">
                            {arrow}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-gray-700 bg-white/90 border border-gray-200/80 inline-block px-3 py-0.5 rounded-full mt-1.5 shadow-2xs">
                          {lane.type}
                        </div>
                      </td>
                      <td className="p-4 border-l bg-green-50/30" style={{ borderColor: 'var(--glass-border)' }}>
                        <input 
                          type="number" min="0" value={t.go ?? ''} onChange={e => updateTiming(key, 'go', e.target.value)}
                          className="w-full max-w-[100px] px-4 py-2.5 border border-gray-300/85 rounded-full text-center mx-auto block bg-white font-extrabold text-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition-all" 
                          style={{ fontFamily: 'Arial, sans-serif' }}
                        />
                      </td>
                      <td className="p-4 border-l bg-yellow-50/30" style={{ borderColor: 'var(--glass-border)' }}>
                        <input 
                          type="number" min="0" value={t.amber ?? 3} onChange={e => updateTiming(key, 'amber', e.target.value)}
                          className="w-full max-w-[100px] px-4 py-2.5 border border-gray-300/85 rounded-full text-center mx-auto block bg-white font-extrabold text-yellow-600 focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-sm transition-all" 
                          style={{ fontFamily: 'Arial, sans-serif' }}
                        />
                      </td>
                      <td className="p-4 border-l bg-red-50/30" style={{ borderColor: 'var(--glass-border)' }}>
                        <input 
                          type="number" min="0" value={t.red ?? 2} onChange={e => updateTiming(key, 'red', e.target.value)}
                          className="w-full max-w-[100px] px-4 py-2.5 border border-gray-300/85 rounded-full text-center mx-auto block bg-white font-extrabold text-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none shadow-sm transition-all" 
                          title="Red clearance interval in seconds"
                          style={{ fontFamily: 'Arial, sans-serif' }}
                        />
                      </td>
                    </tr>
                  );
                })}

                {/* Pedestrian row with Pedestrian Symbol AFTER the Pedestrian word */}
                {pedestrians[dir] === 'Yes' && (() => {
                  const p = pedestrianTimings[dir] || { go: 1, red: 2 };
                  return (
                    <tr className="bg-blue-50/30 hover:bg-blue-50/60 transition-colors">
                      <td className="p-4">
                        <div className="font-extrabold text-blue-900 flex items-center gap-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                          <span>{dir.charAt(0)} Pedestrian</span>
                          <User size={16} className="text-blue-600 stroke-[2.5]" />
                        </div>
                        <div className="text-xs font-bold text-blue-700 bg-blue-100/90 border border-blue-200 inline-block px-3 py-0.5 rounded-full mt-1.5 shadow-2xs">Pedestrian Crossing</div>
                      </td>
                      <td className="p-4 border-l bg-green-50/30" style={{ borderColor: 'var(--glass-border)' }}>
                        <input 
                          type="number" min="0"
                          value={p.go ?? ''} 
                          onChange={e => updatePedestrianTiming(dir, 'go', e.target.value)}
                          className="w-full max-w-[100px] px-4 py-2.5 border border-gray-300/85 rounded-full text-center mx-auto block bg-white font-extrabold text-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition-all" 
                          style={{ fontFamily: 'Arial, sans-serif' }}
                        />
                      </td>
                      <td className="p-4 border-l bg-white/30 text-center text-gray-400 font-bold" style={{ borderColor: 'var(--glass-border)' }}>
                        —
                      </td>
                      <td className="p-4 border-l bg-red-50/30" style={{ borderColor: 'var(--glass-border)' }}>
                        <input 
                          type="number" min="0"
                          value={p.red ?? 2} 
                          onChange={e => updatePedestrianTiming(dir, 'red', e.target.value)}
                          className="w-full max-w-[100px] px-4 py-2.5 border border-gray-300/85 rounded-full text-center mx-auto block bg-white font-extrabold text-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none shadow-sm transition-all"
                          style={{ fontFamily: 'Arial, sans-serif' }}
                        />
                      </td>
                    </tr>
                  );
                })()}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
