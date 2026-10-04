import React, { useContext } from 'react';
import { Plus, Trash2, User } from 'lucide-react';
import { SimulationContext } from '../../SimulationContext';

export default function SetupSection() {
  const { 
    roadName, setRoadName, 
    directions, toggleDirection, 
    laneConfigs,
    pedestrians,
    phases, addPhase, removePhase, togglePhaseLight
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

  return (
    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
        Intersection Setup & Interactive Signal Phasing Builder
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Intersection Name</label>
          <input 
            type="text" 
            value={roadName}
            onChange={e => setRoadName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-800 font-medium"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Directions</label>
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

      {/* Interactive Phase Builder */}
      <div className="pt-4 border-t border-gray-100 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Interactive Traffic Light Phase Builder</h3>
            <p className="text-xs text-gray-500">Add or remove phases. Click individual lane signals or pedestrian signals to toggle between Green (Walk) and Red (Don't Walk).</p>
          </div>
          <button 
            type="button" 
            onClick={addPhase}
            className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg flex items-center gap-1 shadow-sm transition-colors"
          >
            <Plus size={15} /> Add Phase
          </button>
        </div>

        <div className="space-y-4">
          {phases.map((phase, idx) => (
            <div key={phase.id} className="bg-gray-50/60 border border-gray-200 p-4 rounded-xl shadow-2xs space-y-3">
              <div className="flex justify-between items-center border-b border-gray-200/60 pb-2.5">
                <span className="font-bold text-sm text-gray-800 bg-white border border-gray-200 px-3 py-1 rounded-lg shadow-2xs">Phase {idx + 1}</span>

                <button 
                  type="button"
                  onClick={() => removePhase(phase.id)}
                  disabled={phases.length <= 1}
                  className="p-1.5 text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                  title="Remove Phase"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activeDirections.length === 0 ? (
                  <p className="text-xs text-gray-400 italic col-span-full py-2">No active directions selected above.</p>
                ) : (
                  activeDirections.map(dir => {
                    const pedKey = `${dir}_pedestrian`;
                    const isPedGreen = phase.lights[pedKey] === 'green';
                    const hasPed = pedestrians[dir] === 'Yes';
                    const lanes = laneConfigs[dir] || [];

                    return (
                      <div key={dir} className="p-3.5 rounded-xl border bg-white border-gray-200 flex flex-col gap-3 shadow-2xs">
                        <div className="font-bold text-xs text-gray-800 border-b border-gray-100 pb-1.5 flex justify-between items-center">
                          <span>{dir} ({dir.charAt(0)})</span>
                          <span className="text-[10px] text-gray-400 font-normal">{lanes.length} Lane(s)</span>
                        </div>

                        {/* Individual Lane Signals */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {lanes.length === 0 ? (
                            <p className="text-[11px] text-gray-400 italic col-span-full">No lanes added in Lane Customization.</p>
                          ) : (
                            lanes.map(lane => {
                              const laneKey = `${dir}-${lane.id}`;
                              // Default phase 1 lanes to green, others to red if unconfigured
                              const isLaneGreen = phase.lights[laneKey] ? phase.lights[laneKey] === 'green' : (phase.id === 1);
                              const arrowDisplay = getArrowSymbol(lane.type);

                              return (
                                <div 
                                  key={lane.id}
                                  onClick={() => togglePhaseLight(phase.id, laneKey)}
                                  className={`p-2 rounded-lg border text-center cursor-pointer transition-all select-none flex flex-col items-center justify-between gap-1.5 ${
                                    isLaneGreen 
                                      ? 'bg-green-50/90 border-green-300 hover:border-green-400' 
                                      : 'bg-red-50/90 border-red-200 hover:border-red-300'
                                  }`}
                                  title={`Click to toggle Lane ${lane.id} signal`}
                                >
                                  <div className="text-[10px] font-bold text-gray-600">L{lane.id} ({lane.type})</div>
                                  
                                  <div className="w-10 bg-gray-900 rounded-xl p-1 flex flex-col items-center gap-1 shadow-inner border border-gray-800">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-sm transition-all ${
                                      !isLaneGreen 
                                        ? 'bg-red-500 text-white shadow-[0_0_8px_rgba(239,68,68,0.9)] scale-105' 
                                        : 'bg-red-950/60 text-red-900/40'
                                    }`}>
                                      {arrowDisplay}
                                    </div>

                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-sm transition-all ${
                                      isLaneGreen 
                                        ? 'bg-green-500 text-white shadow-[0_0_8px_rgba(34,197,94,0.9)] scale-105' 
                                        : 'bg-green-950/60 text-green-900/40'
                                    }`}>
                                      {arrowDisplay}
                                    </div>
                                  </div>

                                  <div className={`text-[9px] font-bold uppercase tracking-wider ${isLaneGreen ? 'text-green-700' : 'text-red-700'}`}>
                                    {isLaneGreen ? 'GO' : 'STOP'}
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>

                        {/* Pedestrian Signal (Green for Walk, Red for Stop) */}
                        {hasPed && (
                          <div 
                            onClick={() => togglePhaseLight(phase.id, pedKey)}
                            className={`mt-1 p-2 rounded-lg border text-center cursor-pointer transition-all select-none flex items-center justify-between px-3 ${
                              isPedGreen 
                                ? 'bg-green-50/90 border-green-300 hover:border-green-400' 
                                : 'bg-red-50/90 border-red-200 hover:border-red-300'
                            }`}
                            title="Click to toggle pedestrian signal"
                          >
                            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                              <User size={15} /> Pedestrian Crossing
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="w-14 bg-gray-900 rounded-lg p-1 flex items-center justify-center gap-1 shadow-inner border border-gray-800">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                  !isPedGreen 
                                    ? 'bg-red-500 text-white shadow-[0_0_6px_rgba(239,68,68,0.9)]' 
                                    : 'bg-red-950/60 text-red-900/40'
                                }`}>
                                  <User size={12} className="stroke-[2.5]" />
                                </div>

                                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                  isPedGreen 
                                    ? 'bg-green-500 text-white shadow-[0_0_6px_rgba(34,197,94,0.9)]' 
                                    : 'bg-green-950/60 text-green-900/40'
                                }`}>
                                  <User size={12} className="stroke-[2.5]" />
                                </div>
                              </div>

                              <div className={`text-[10px] font-bold uppercase tracking-wider w-12 text-right ${isPedGreen ? 'text-green-700' : 'text-red-700'}`}>
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
      </div>
    </section>
  );
}
