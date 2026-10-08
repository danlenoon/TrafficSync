import React, { useContext } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { SimulationContext } from '../../SimulationContext';

export default function LanesSection() {
  const { directions, laneConfigs, addLane, removeLane, updateLaneType, pedestrians, setPedestrian, glassClarity, theme } = useContext(SimulationContext);

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

  const laneTypes = [
    'Left Turn',
    'Straight',
    'Right Turn',
    'U-Turn',
    'Straight & Right',
    'Left & Straight',
    'Left & Right',
    'Left & U-Turn',
    'Straight & U-Turn',
    'Right & U-Turn',
    'Left, Straight, & U-Turn',
    'U-Turn, Straight, & Right'
  ];

  const glassStyle = {
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    borderColor: 'var(--glass-border)',
    boxShadow: `0 20px 40px rgba(0, 0, 0, ${0.03 + glassClarity * 0.05})`,
    fontFamily: 'Arial, sans-serif'
  };

  const dropdownStyle = {
    backgroundColor: 'var(--input-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    borderColor: 'var(--glass-border)',
    fontFamily: 'Arial, sans-serif'
  };

  return (
    <section className="border p-8 rounded-3xl shadow-sm transition-all" style={glassStyle}>
      <div>
        <h2 className="text-xl font-black mb-2 flex items-center gap-3" style={{ fontFamily: 'Arial, sans-serif', color: 'var(--text-main)' }}>
          <span className="bg-gradient-to-tr from-blue-600 to-blue-500 text-white w-8 h-8 rounded-2xl flex items-center justify-center text-sm shadow-md shadow-blue-500/20">2</span>
          Lane Customization
        </h2>
        <p className="text-xs text-gray-600 font-medium ml-11 mb-6">Define individual lane turning geometries (Left Turn, Straight, Right Turn, U-Turn, and multi-movement combinations) and toggle pedestrian crossing requirements for each active direction.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.keys(directions).filter(d => directions[d]).map(dir => (
          <div key={dir} className="border rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md" style={glassStyle}>
            <div className="border-b p-4 flex flex-wrap justify-between items-center gap-3" style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--card-bg)' }}>
              <div className="flex items-center gap-3">
                <h3 className="font-extrabold text-base" style={{ fontFamily: 'Arial, sans-serif', color: 'var(--text-main)' }}>{dir}</h3>
                
                {/* Pedestrian Yes/No enclosed in a rounded card visible in both Light and Dark modes */}
                <div 
                  className="flex items-center gap-2.5 text-xs border px-5 py-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-main)' }}
                >
                  <span className="font-bold" style={{ color: 'var(--text-muted)' }}>Pedestrian:</span>
                  <button
                    type="button"
                    onClick={() => setPedestrian(dir, 'Yes')}
                    className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                      pedestrians[dir] === 'Yes' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'hover:opacity-80'
                    }`}
                    style={pedestrians[dir] !== 'Yes' ? { color: 'var(--text-main)' } : {}}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setPedestrian(dir, 'No')}
                    className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                      pedestrians[dir] !== 'Yes' ? 'bg-gray-200 text-gray-900 shadow-xs' : 'hover:opacity-80'
                    }`}
                    style={pedestrians[dir] === 'Yes' ? { color: 'var(--text-main)' } : {}}
                  >
                    No
                  </button>
                </div>
              </div>
              <button 
                onClick={() => addLane(dir)} 
                className="text-xs font-bold border px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5 transition-all hover:scale-[1.03] active:scale-95"
                style={{ ...dropdownStyle, color: 'var(--text-main)' }}
              >
                <Plus size={14}/> Add Lane
              </button>
            </div>
            <div className="p-4 space-y-3">
              {(laneConfigs[dir] || []).length === 0 ? (
                <p className="text-sm italic py-2" style={{ color: 'var(--text-muted)' }}>No lanes added yet.</p>
              ) : (
                laneConfigs[dir].map((lane, idx) => {
                  const arrow = getArrowSymbol(lane.type);
                  return (
                    <div key={lane.id} className="flex gap-3 items-center border p-3.5 rounded-2xl shadow-2xs transition-all hover:border-blue-300" style={dropdownStyle}>
                      {/* Circle beside Lane number fitting 1, 2, or 3 arrows in one single line */}
                      <div className="w-32 text-sm font-extrabold flex items-center gap-2.5" style={{ color: 'var(--text-main)' }}>
                        <span>Lane {idx + 1}</span>
                        <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-xs shrink-0 px-2 whitespace-nowrap">
                          {arrow}
                        </span>
                      </div>
                      
                      {/* Fully Custom Dropdown Menu with Centered Down Chevron */}
                      <div className="custom-dropdown flex-1">
                        <select 
                          value={lane.type}
                          onChange={e => updateLaneType(dir, lane.id, e.target.value)}
                          className="border rounded-full px-5 py-3 pr-10 text-sm font-bold shadow-md transition-all cursor-pointer"
                          style={{
                            ...dropdownStyle,
                            color: 'var(--text-main)',
                            width: '100%'
                          }}
                        >
                          {laneTypes.map(t => (
                            <option key={t} value={t} style={{ backgroundColor: theme === 'dark' ? '#121216' : '#ffffff', color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                              {t} ({getArrowSymbol(t)})
                            </option>
                          ))}
                        </select>
                      </div>

                      <button 
                        onClick={() => removeLane(dir, lane.id)}
                        className="p-2.5 transition-all rounded-full hover:bg-red-50 hover:text-red-600 text-gray-500 bg-white/95 border border-gray-200 shadow-2xs"
                        title="Remove Lane"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
