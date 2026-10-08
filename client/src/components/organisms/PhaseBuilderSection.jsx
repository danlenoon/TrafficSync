import React, { useContext } from 'react';
import { Plus, Trash2, User } from 'lucide-react';
import { SimulationContext } from '../../SimulationContext';

export default function PhaseBuilderSection() {
  const { 
    directions, 
    laneConfigs,
    pedestrians,
    phases, addPhase, removePhase, togglePhaseLight,
    glassClarity
  } = useContext(SimulationContext);

  const activeDirections = Object.keys(directions).filter(d => directions[d]);

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

  const getDirectionArrow = (dir) => {
    switch (dir) {
      case 'Northbound': return '↑';
      case 'Southbound': return '↓';
      case 'Eastbound': return '→';
      case 'Westbound': return '←';
      default: return '•';
    }
  };

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
        <h2 className="text-xl font-black text-gray-900 flex items-center gap-3 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
          <span className="bg-gradient-to-tr from-blue-600 to-blue-500 text-white w-8 h-8 rounded-2xl flex items-center justify-center text-sm shadow-md shadow-blue-500/20">3</span>
          Interactive Traffic Light Phase Builder
        </h2>
        <p className="text-xs text-gray-600 font-medium ml-11">Construct visual signal phases dynamically by toggling directional lane lights and pedestrian signals between GO (Green) and STOP (Red) states for each signal phase interval.</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div></div>
        <button 
          type="button" 
          onClick={addPhase}
          className="text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.03] active:scale-95"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          <Plus size={16} /> Add Phase
        </button>
      </div>

      <div className="space-y-4">
        {phases.map((phase, idx) => (
          <div key={phase.id} className="border p-5 rounded-2xl shadow-sm space-y-4 transition-all" style={{ backgroundColor: 'var(--input-bg)', backdropFilter: 'blur(var(--glass-blur))', borderColor: 'var(--glass-border)' }}>
            <div className="flex justify-between items-center border-b pb-3" style={{ borderColor: 'var(--glass-border)' }}>
              <span className="font-extrabold text-xs text-gray-900 bg-white border border-gray-200 px-3.5 py-1.5 rounded-full shadow-2xs">Phase {idx + 1}</span>

              {/* Trash can delete button enclosed in a circular button design */}
              <button 
                type="button"
                onClick={() => removePhase(phase.id)}
                className="p-2.5 text-gray-500 hover:text-red-600 bg-white/95 border border-gray-200 rounded-full transition-all shadow-2xs hover:bg-red-50"
                title="Remove Phase"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {activeDirections.length === 0 ? (
                <p className="text-xs text-gray-400 italic col-span-full py-2">No active directions selected in Intersection Setup.</p>
              ) : (
                activeDirections.map(dir => {
                  const pedKey = `${dir}_pedestrian`;
                  const isPedGreen = phase.lights[pedKey] === 'green';
                  const hasPed = pedestrians[dir] === 'Yes';
                  const lanes = laneConfigs[dir] || [];
                  const laneCountText = lanes.length === 1 ? '1 Lane' : `${lanes.length} Lanes`;
                  const dirArrow = getDirectionArrow(dir);

                  return (
                    <div key={dir} className="p-4 rounded-2xl border flex flex-col gap-3 shadow-sm transition-all hover:shadow-md" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--glass-border)' }}>
                      <div className="font-extrabold text-xs text-gray-900 border-b pb-2 flex justify-between items-center" style={{ borderColor: 'var(--glass-border)' }}>
                        <span className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                            {dirArrow}
                          </span>
                          <span>{dir} ({dir.charAt(0)})</span>
                        </span>
                        <span className="text-[11px] text-gray-500 font-bold">{laneCountText}</span>
                      </div>

                      {/* Individual Lane Signals (Larger Circular Light Bulbs fitting 1, 2, or 3 arrows in one line) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {lanes.length === 0 ? (
                          <p className="text-[11px] text-gray-400 italic col-span-full">No lanes added in Lane Customization.</p>
                        ) : (
                          lanes.map(lane => {
                            const laneKey = `${dir}-${lane.id}`;
                            const isLaneGreen = phase.lights[laneKey] ? phase.lights[laneKey] === 'green' : (phase.id === 1);
                            const arrowDisplay = getArrowSymbol(lane.type);

                            return (
                              <div 
                                key={lane.id}
                                onClick={() => togglePhaseLight(phase.id, laneKey)}
                                className={`p-3.5 rounded-2xl border text-center cursor-pointer transition-all duration-200 select-none flex flex-col items-center justify-between gap-2.5 hover:scale-[1.02] shadow-2xs ${
                                  isLaneGreen 
                                    ? 'bg-green-50/90 border-green-300/80 hover:border-green-400' 
                                    : 'bg-red-50/90 border-red-200/80 hover:border-red-300'
                                }`}
                                title={`Click to toggle Lane ${lane.id} signal`}
                              >
                                <div className="text-xs font-extrabold text-gray-800">Lane {lane.id} ({lane.type})</div>
                                
                                {/* Larger Circular Light Bulbs Housing fitting multiple arrows in one line */}
                                <div className="w-full max-w-[140px] bg-gray-900 rounded-3xl p-2 flex flex-col items-center gap-2 shadow-inner border border-gray-800">
                                  <div className={`w-full h-10 rounded-full flex items-center justify-center font-black text-sm sm:text-base transition-all whitespace-nowrap px-2 ${
                                    !isLaneGreen 
                                      ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.9)] scale-105' 
                                      : 'bg-red-950/60 text-red-900/40'
                                  }`}>
                                    {arrowDisplay}
                                  </div>

                                  <div className={`w-full h-10 rounded-full flex items-center justify-center font-black text-sm sm:text-base transition-all whitespace-nowrap px-2 ${
                                    isLaneGreen 
                                      ? 'bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.9)] scale-105' 
                                      : 'bg-green-950/60 text-green-900/40'
                                  }`}>
                                    {arrowDisplay}
                                  </div>
                                </div>

                                <div className={`text-[11px] font-extrabold uppercase tracking-wider ${isLaneGreen ? 'text-green-700' : 'text-red-700'}`}>
                                  {isLaneGreen ? 'GO' : 'STOP'}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Pedestrian Signal */}
                      {hasPed && (
                        <div 
                          onClick={() => togglePhaseLight(phase.id, pedKey)}
                          className={`mt-1 p-3.5 rounded-2xl border text-center cursor-pointer transition-all duration-200 select-none flex items-center justify-between px-4 hover:scale-[1.01] shadow-2xs ${
                            isPedGreen 
                              ? 'bg-green-50/90 border-green-300/80 hover:border-green-400' 
                              : 'bg-red-50/90 border-red-200/80 hover:border-red-300'
                          }`}
                          title="Click to toggle pedestrian signal"
                        >
                          <div className="flex items-center gap-2 text-xs font-extrabold text-gray-800">
                            <User size={16} /> Pedestrian Crossing
                          </div>
                          
                          <div className="flex items-center gap-2.5">
                            <div className="w-24 bg-gray-900 rounded-full p-1.5 flex items-center justify-center gap-1.5 shadow-inner border border-gray-800">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                !isPedGreen 
                                  ? 'bg-red-500 text-white shadow-[0_0_6px_rgba(239,68,68,0.9)]' 
                                  : 'bg-red-950/60 text-red-900/40'
                              }`}>
                                <User size={14} className="stroke-[2.5]" />
                              </div>

                              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                isPedGreen 
                                  ? 'bg-green-500 text-white shadow-[0_0_6px_rgba(34,197,94,0.9)]' 
                                  : 'bg-green-950/60 text-green-900/40'
                              }`}>
                                <User size={14} className="stroke-[2.5]" />
                              </div>
                            </div>

                            <div className={`text-[11px] font-extrabold uppercase tracking-wider w-12 text-right ${isPedGreen ? 'text-green-700' : 'text-red-700'}`}>
                              {isPedGreen ? 'WALK' : 'STOP'}
                            </div>
                          </div>
                        </div>
                      )}
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
