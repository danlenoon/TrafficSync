import React, { useContext, useState } from 'react';
import { Save, BarChart3, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import { SimulationContext } from '../SimulationContext';

export default function Results() {
  const navigate = useNavigate();
  const { roadName, directions, results, saveCurrentSimulation, resetSimulation, glassClarity } = useContext(SimulationContext);
  const [saved, setSaved] = useState(false);
  const [hoverData, setHoverData] = useState(null); // { text, x, y }

  const handleSave = () => {
    saveCurrentSimulation();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDone = () => {
    resetSimulation();
    navigate('/');
  };

  const glassStyle = {
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    borderColor: 'var(--glass-border)',
    boxShadow: `0 20px 40px rgba(0, 0, 0, ${0.03 + glassClarity * 0.05})`,
    fontFamily: 'Arial, sans-serif'
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in relative" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Tiny circular bar popup displayed directly above where the user hovers/clicks the green, amber, or red line */}
      {hoverData && (
        <div 
          className="fixed z-50 bg-blue-600 text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-2xl pointer-events-none transform -translate-x-1/2 -translate-y-full border border-blue-400/50 flex items-center gap-2 backdrop-blur-xl animate-in fade-in zoom-in-95"
          style={{ left: hoverData.x, top: hoverData.y }}
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
          <span>{hoverData.text}</span>
        </div>
      )}

      <div 
        className="p-8 rounded-3xl border mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all"
        style={glassStyle}
      >
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>Cycle Results Summary</h1>
          <p className="text-gray-600 font-medium">
            Detailed signal timing evaluation and phase breakdown for <strong className="text-gray-900">{roadName || 'Intersection'}</strong>. Review green go durations, caution intervals, and total stop clearances where red dominates.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button onClick={() => navigate('/editor')} variant="outline" className="flex-1 sm:flex-none">
            Edit
          </Button>
          <Button onClick={handleSave} variant="outline" className="flex-1 sm:flex-none">
            {saved ? <><Check size={18} /> Saved!</> : <><Save size={18} /> Save</>}
          </Button>
          <Button onClick={handleDone} variant="primary" className="flex-1 sm:flex-none">
            Done
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full pb-6">
        
        {/* Left Col: Master Cycle */}
        <div 
          className="lg:col-span-4 border rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center transition-all"
          style={glassStyle}
        >
          {/* Rounded circle container instead of rounded rectangle */}
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4 shadow-inner border border-blue-100">
            <BarChart3 size={40} className="opacity-90" />
          </div>
          <div className="text-gray-500 text-xs font-extrabold uppercase tracking-widest mb-2">Total Cycle Length</div>
          <div className="text-7xl font-black text-gray-900 mb-6 tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            {results.maxCycle}<span className="text-2xl text-blue-600 font-extrabold ml-1">s</span>
          </div>
          
          <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-white/60 text-left space-y-2 shadow-sm">
            <div className="text-xs text-gray-500 uppercase font-extrabold mb-1">Intersection Setup Overview</div>
            <div className="font-bold text-gray-800 text-sm flex justify-between">
              <span>Directions Active:</span>
              <span className="text-blue-600">{Object.keys(directions).filter(d => directions[d]).length}</span>
            </div>
            <div className="font-bold text-gray-800 text-sm flex justify-between">
              <span>Lanes Configured:</span>
              <span className="text-blue-600">{results.stats.length}</span>
            </div>
          </div>
        </div>

        {/* Right Col: Lane Breakdown */}
        <div 
          className="lg:col-span-8 border rounded-3xl p-8 shadow-sm flex flex-col transition-all relative"
          style={glassStyle}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-extrabold text-gray-900 text-xl" style={{ fontFamily: 'Arial, sans-serif' }}>Lane Phase Breakdown (Dominant Red Stop)</h3>
          </div>
          
          <div className="overflow-y-auto space-y-4 flex-1 pr-2">
            {results.stats.map(stat => (
              <div 
                key={stat.key} 
                className="p-5 border border-white/70 bg-white/60 backdrop-blur-md rounded-2xl hover:border-blue-300 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <div className="font-black text-gray-900 text-base" style={{ fontFamily: 'Arial, sans-serif' }}>{stat.label}</div>
                    <div className="text-xs text-gray-600 mt-0.5 font-medium">
                      Total Stop: <span className="font-extrabold text-red-600">{stat.stop}s</span> ({stat.rePct.toFixed(1)}%)
                    </div>
                  </div>
                </div>
                  
                  {/* Visual Bar with Norman Window Structure Geometry and direct hover popup */}
                  <div className="w-full h-5 bg-gray-200/85 rounded-full overflow-hidden flex shadow-inner p-0.5 border border-white/80 group">
                    {stat.go > 0 && (
                      <div 
                        className="bg-green-500 h-full transition-all duration-300 cursor-pointer hover:brightness-110 hover:scale-y-125 rounded-l-full rounded-r-none shadow-2xs" 
                        style={{ width: `${stat.goPct}%` }} 
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoverData({
                            text: `Go Time: ${stat.go}s (${stat.goPct.toFixed(1)}%)`,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 10
                          });
                        }}
                        onMouseLeave={() => setHoverData(null)}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoverData({
                            text: `Go Time: ${stat.go}s (${stat.goPct.toFixed(1)}%)`,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 10
                          });
                        }}
                      ></div>
                    )}
                    {stat.amber > 0 && (
                      <div 
                        className="bg-yellow-400 h-full transition-all duration-300 cursor-pointer hover:brightness-110 hover:scale-y-125 rounded-none shadow-2xs" 
                        style={{ width: `${stat.amPct}%` }} 
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoverData({
                            text: `Amber Caution: ${stat.amber}s (${stat.amPct.toFixed(1)}%)`,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 10
                          });
                        }}
                        onMouseLeave={() => setHoverData(null)}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoverData({
                            text: `Amber Caution: ${stat.amber}s (${stat.amPct.toFixed(1)}%)`,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 10
                          });
                        }}
                      ></div>
                    )}
                    {stat.stop > 0 && (
                      <div 
                        className="bg-red-500 h-full transition-all duration-300 cursor-pointer hover:brightness-110 hover:scale-y-125 rounded-l-none rounded-r-full shadow-2xs" 
                        style={{ width: `${stat.rePct}%` }} 
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoverData({
                            text: `Total Stop: ${stat.stop}s (${stat.rePct.toFixed(1)}%)`,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 10
                          });
                        }}
                        onMouseLeave={() => setHoverData(null)}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoverData({
                            text: `Total Stop: ${stat.stop}s (${stat.rePct.toFixed(1)}%)`,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 10
                          });
                        }}
                      ></div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
