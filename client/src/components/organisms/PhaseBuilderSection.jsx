import React, { useContext, useState } from 'react';
import { Plus, Trash2, User } from 'lucide-react';
import { SimulationContext } from '../../SimulationContext';

export default function PhaseBuilderSection() {
  const { 
    directions, laneConfigs, pedestrians, 
    phases, addPhase, removePhase, togglePhaseLight, 
    glassClarity
  } = useContext(SimulationContext);

  // Track animating lane states: { [`${phaseId}-${laneKey}`]: true }
  const [animatingLanes, setAnimatingLanes] = useState({});

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

  const handleLaneClick = (phaseId, laneKey, isCurrentlyGreen) => {
    if (isCurrentlyGreen) {
      // Transition from Green -> Amber animation -> Red
      const animKey = `${phaseId}-${laneKey}`;
      setAnimatingLanes(prev => ({ ...prev, [animKey]: true }));
      
      setTimeout(() => {
        setAnimatingLanes(prev => {
          const updated = { ...prev };
          delete updated[animKey];
          return updated;
        });
        togglePhaseLight(phaseId, laneKey);
      }, 700);
    } else {
      // Instant transition Red/Off -> Green
      togglePhaseLight(phaseId, laneKey);
    }
  };

  const activeDirections = Object.keys(directions || {}).filter(d => directions[d]);

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
        <h2 className="text-xl font-black text-gray-900 mb-2 flex items-center gap-3" style={{ fontFamily: 'Arial, sans-serif' }}>
          <span className="bg-gradient-to-tr from-blue-600 to-blue-500 text-white w-8 h-8 rounded-2xl flex items-center justify-center text-sm shadow-md shadow-blue-500/20">3</span>
          Interactive Traffic Light Phase Builder
        </h2>
        <p className="text-xs text-gray-600 font-medium ml-11">Construct visual signal phases dynamically by toggling directional lane lights and pedestrian signals between GO (Green) and STOP (Red) states for each signal phase interval.</p>
      </div>

      <div className="space-y-6">
        {(phases || []).map((phase, idx) => (
          <div key={phase.id} className="border p-4 sm:p-5 rounded-2xl shadow-sm space-y-4 transition-all" style={{ backgroundColor: 'var(--input-bg)', backdropFilter: 'blur(var(--glass-blur))', borderColor: 'var(--glass-border)' }}>
            <div className="flex justify-between items-center border-b pb-3" style={{ borderColor: 'var(--glass-border)' }}>
              <span className="font-extrabold text-xs text-gray-900 bg-white border border-gray-200 px-3.5 py-1.5 rounded-full shadow-2xs">Phase {idx + 1}</span>

              {/* Trash can delete button enclosed in a circular button design with smooth interactive hover */}
              <button 
                type="button"
                onClick={() => removePhase(phase.id)}
                className="p-2.5 text-gray-400 hover:text-red-600 bg-white/95 border border-gray-200 rounded-full transition-all duration-300 shadow-2xs hover:bg-red-50 hover:border-red-300 hover:scale-110 active:scale-95 group/trash"
                title="Remove Phase"
              >
                <Trash2 size={16} className="transition-transform group-hover/trash:rotate-12" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {activeDirections.length === 0 ? (
                <p className="text-xs text-gray-400 italic col-span-full py-2">No active directions selected in Intersection Setup.</p>
              ) : (
                activeDirections.map(dir => {
                  const pedKey = `${dir}_pedestrian`;
                  // Unconfigured pedestrian signal is off by default until clicked
                  const pedState = (phase.lights || {})[pedKey]; // undefined, 'green', 'red'
                  const isPedGreen = pedState === 'green';
                  const isPedRed = pedState === 'red';
                  const hasPed = pedestrians && pedestrians[dir] === 'Yes';
                  const lanes = (laneConfigs && laneConfigs[dir]) || [];
                  const laneCountText = lanes.length === 1 ? '1 Lane' : `${lanes.length} Lanes`;
                  const dirArrow = getDirectionArrow(dir);

                  return (
                    <div key={dir} className="p-4 rounded-2xl border flex flex-col gap-3 shadow-sm transition-all hover:shadow-md" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--glass-border)' }}>
                      <div className="font-extrabold text-xs text-gray-900 border-b pb-2 flex justify-between items-center" style={{ borderColor: 'var(--glass-border)' }}>
                        <span className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                            {dirArrow}
                          </span>
                          <span>{dir}</span>
                        </span>
                        <span className="text-[11px] text-gray-500 font-bold">{laneCountText}</span>
                      </div>

                      {/* Individual Lane Signals (3-Bulb Housing: Red, Amber, Green) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {lanes.length === 0 ? (
                          <p className="text-[11px] text-gray-400 italic col-span-full">No lanes added in Lane Customization.</p>
                        ) : (
                          lanes.map(lane => {
                            const laneKey = `${dir}-${lane.id}`;
                            const laneState = (phase.lights || {})[laneKey]; // undefined = unconfigured / turned off
                            const isLaneGreen = laneState === 'green';
                            const isLaneRed = laneState === 'red';
                            const isAmberAnimating = animatingLanes[`${phase.id}-${laneKey}`];
                            const arrowDisplay = getArrowSymbol(lane.type);

                            // Sizing horizontal light housing:
                            const arrowCount = arrowDisplay.split(' ').filter(Boolean).length;
                            const lightHousingWidthClass = arrowCount === 1 
                              ? 'w-20 max-w-[85px]' 
                              : (arrowCount === 2 
                                ? 'w-28 max-w-[120px]' 
                                : 'w-36 max-w-[155px]');

                            return (
                              <div 
                                key={lane.id}
                                onClick={() => handleLaneClick(phase.id, laneKey, isLaneGreen)}
                                className={`p-3.5 rounded-2xl border text-center cursor-pointer transition-all duration-200 select-none flex flex-col items-center justify-between gap-2.5 hover:scale-[1.02] shadow-2xs ${
                                  isAmberAnimating
                                    ? 'bg-yellow-50/90 border-yellow-300/80'
                                    : (isLaneGreen 
                                      ? 'bg-green-50/90 border-green-300/80 hover:border-green-400' 
                                      : (isLaneRed 
                                        ? 'bg-red-50/90 border-red-200/80 hover:border-red-300'
                                        : 'bg-gray-100/80 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/40'))
                                }`}
                              >
                                <div className="text-xs font-extrabold text-gray-800">Lane {lane.id} ({lane.type})</div>
                                
                                {/* 3-Bulb Housing with Dynamic Horizontal Width */}
                                <div className={`${lightHousingWidthClass} bg-gray-900 rounded-3xl p-2 flex flex-col items-center gap-1.5 shadow-inner border border-gray-800 transition-all duration-300`}>
                                  {/* Red Light */}
                                  <div className={`w-full h-8 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all whitespace-nowrap px-1.5 ${
                                    isLaneRed && !isAmberAnimating
                                      ? 'bg-red-500 text-white shadow-[0_0_8px_rgba(239,68,68,0.9)]'
                                      : 'bg-red-950/60 text-red-900/40'
                                  }`}>
                                    {arrowDisplay}
                                  </div>

                                  {/* Amber Light */}
                                  <div className={`w-full h-8 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all whitespace-nowrap px-1.5 ${
                                    isAmberAnimating
                                      ? 'bg-yellow-400 text-yellow-950 shadow-[0_0_10px_rgba(250,204,21,0.9)] animate-pulse'
                                      : 'bg-yellow-950/60 text-yellow-900/40'
                                  }`}>
                                    {arrowDisplay}
                                  </div>

                                  {/* Green Light */}
                                  <div className={`w-full h-8 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all whitespace-nowrap px-1.5 ${
                                    isLaneGreen && !isAmberAnimating
                                      ? 'bg-green-500 text-white shadow-[0_0_8px_rgba(34,197,94,0.9)]'
                                      : 'bg-green-950/60 text-green-900/40'
                                  }`}>
                                    {arrowDisplay}
                                  </div>
                                </div>

                                <div className={`text-[11px] font-extrabold uppercase tracking-wider ${
                                  isAmberAnimating 
                                    ? 'text-yellow-600 animate-pulse' 
                                    : (isLaneGreen 
                                      ? 'text-green-700' 
                                      : (isLaneRed 
                                        ? 'text-red-700' 
                                        : 'text-gray-400 italic'))
                                }`}>
                                  {isAmberAnimating 
                                    ? 'CAUTION' 
                                    : (isLaneGreen 
                                      ? 'GO' 
                                      : (isLaneRed 
                                        ? 'STOP' 
                                        : 'UNCONFIGURED'))}
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
                              : (isPedRed 
                                ? 'bg-red-50/90 border-red-200/80 hover:border-red-300'
                                : 'bg-gray-100/80 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/40')
                          }`}
                        >
                          <div className="flex items-center gap-2 text-xs font-extrabold text-gray-800">
                            <User size={16} /> Pedestrian Crossing
                          </div>
                          
                          <div className="flex items-center gap-2.5">
                            <div className="w-24 bg-gray-900 rounded-full p-1.5 flex items-center justify-center gap-1.5 shadow-inner border border-gray-800">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                isPedRed 
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

                            <div className={`text-[11px] font-extrabold uppercase tracking-wider w-24 text-right ${
                              isPedGreen 
                                ? 'text-green-700' 
                                : (isPedRed 
                                  ? 'text-red-700' 
                                  : 'text-gray-400 italic text-[10px]')
                            }`}>
                              {isPedGreen ? 'GO' : (isPedRed ? 'STOP' : 'UNCONFIGURED')}
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

      {/* Add Phase button positioned at the bottom of the card, wider on mobile */}
      <div className="pt-2 flex justify-center w-full">
        <button 
          type="button" 
          onClick={addPhase}
          className="text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-9 sm:px-8 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.03] active:scale-95 w-full xs:w-auto max-w-xs"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          <Plus size={16} /> Add Phase
        </button>
      </div>
    </section>
  );
}
