import React, { useContext, useState } from 'react';
import { Save, BarChart3, Check, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import { SimulationContext } from '../SimulationContext';

export default function Results() {
  const navigate = useNavigate();
  const { roadName, directions, results, saveCurrentSimulation, resetSimulation, glassClarity, hasBeenSaved } = useContext(SimulationContext);
  const [saved, setSaved] = useState(false);
  const [hoverData, setHoverData] = useState(null); // { text, x, y }
  const [showBackDialog, setShowBackDialog] = useState(false);

  const handleSave = () => {
    saveCurrentSimulation();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleBackToDashboard = () => {
    if (!hasBeenSaved) {
      setShowBackDialog(true);
    } else {
      resetSimulation();
      navigate('/');
    }
  };

  const glassStyle = {
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    borderColor: 'var(--glass-border)',
    boxShadow: `0 20px 40px rgba(0, 0, 0, ${0.03 + glassClarity * 0.05})`,
    fontFamily: 'Arial, sans-serif'
  };

  // Light appearance for popups when in ultra clear Liquid Glass (matching Dashboard & Editor modals)
  const popupBg = glassClarity < 0.3 ? 'rgba(255, 255, 255, 0.95)' : 'var(--card-bg)';
  const popupTextColor = glassClarity < 0.3 ? '#1f2937' : 'var(--text-main)';

  const popupStyle = {
    backgroundColor: popupBg,
    backdropFilter: `blur(${glassClarity * 16}px)`,
    borderColor: glassClarity < 0.3 ? 'rgba(209, 213, 219, 0.8)' : 'var(--glass-border)',
    color: popupTextColor
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in relative" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Unsaved Changes Warning Modal unified with Delete & Reset All modal color appearance */}
      {showBackDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in" style={{ backdropFilter: `blur(${glassClarity * 12}px)` }}>
          <div 
            className="max-w-md w-full p-8 rounded-3xl border shadow-2xl space-y-6 animate-in zoom-in-95"
            style={popupStyle}
          >
            <h3 className="text-xl font-black">Unsaved Changes</h3>
            <p className="text-sm font-medium opacity-85">You have unsaved changes in your simulation. Are you sure you want to leave without saving?</p>
            <div className="flex gap-3 justify-end pt-2">
              <Button onClick={() => setShowBackDialog(false)} variant="outline" className="rounded-full">
                Cancel
              </Button>
              <Button onClick={() => { resetSimulation(); navigate('/'); }} variant="danger" className="rounded-full">
                Leave without saving
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic circular bar popup displayed directly above or below where the user hovers/clicks */}
      {hoverData && (
        <div 
          className="fixed z-50 bg-blue-600 text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-2xl pointer-events-none border border-blue-400/50 flex items-center gap-2 backdrop-blur-xl animate-in fade-in zoom-in-95"
          style={{ 
            left: hoverData.x, 
            top: hoverData.y > 160 ? hoverData.y - 12 : hoverData.y + 24,
            transform: hoverData.y > 160 ? 'translate(-50%, -100%)' : 'translate(-50%, 0)'
          }}
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
          <span>{hoverData.text}</span>
        </div>
      )}

      {/* Top Navigation Row: Back to Simulation Editor (Left) | Dashboard (Center) | Save (Right) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 mb-6">
        <div className="flex justify-start">
          <button 
            onClick={() => navigate('/editor')} 
            className="px-5 py-2.5 rounded-full border shadow-sm flex items-center gap-2.5 font-bold text-gray-800 transition-all duration-300 hover:scale-[1.03] active:scale-95 group"
            style={{
              backgroundColor: 'var(--input-bg)',
              backdropFilter: 'blur(var(--glass-blur))',
              borderColor: 'var(--glass-border)',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            <ChevronLeft size={16} className="text-blue-600 transition-transform group-hover:-translate-x-1" />
            <span>Back to Simulation Editor</span>
          </button>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleBackToDashboard} 
            className="px-5 py-2.5 rounded-full border shadow-sm flex items-center gap-2.5 font-bold text-gray-800 transition-all duration-300 hover:scale-[1.03] active:scale-95 group"
            style={{
              backgroundColor: 'var(--input-bg)',
              backdropFilter: 'blur(var(--glass-blur))',
              borderColor: 'var(--glass-border)',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            <span>Dashboard</span>
          </button>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} variant="primary" className="rounded-full shadow-md">
            {saved ? <><Check size={18} /> Saved!</> : <><Save size={18} /> Save</>}
          </Button>
        </div>
      </div>

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
            <h3 className="font-extrabold text-gray-900 text-xl" style={{ fontFamily: 'Arial, sans-serif' }}>Lane Phase Breakdown</h3>
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
                      Total Stop: <span className="font-extrabold text-red-600">{stat.stop}s</span> ({stat.rePct.toFixed(2)}%)
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
                            text: `Total Go: ${stat.go}s (${stat.goPct.toFixed(2)}%)`,
                            x: rect.left + rect.width / 2,
                            y: rect.top
                          });
                        }}
                        onMouseLeave={() => setHoverData(null)}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoverData({
                            text: `Total Go: ${stat.go}s (${stat.goPct.toFixed(2)}%)`,
                            x: rect.left + rect.width / 2,
                            y: rect.top
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
                            text: `Total Caution: ${stat.amber}s (${stat.amPct.toFixed(2)}%)`,
                            x: rect.left + rect.width / 2,
                            y: rect.top
                          });
                        }}
                        onMouseLeave={() => setHoverData(null)}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoverData({
                            text: `Total Caution: ${stat.amber}s (${stat.amPct.toFixed(2)}%)`,
                            x: rect.left + rect.width / 2,
                            y: rect.top
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
                            text: `Total Stop: ${stat.stop}s (${stat.rePct.toFixed(2)}%)`,
                            x: rect.left + rect.width / 2,
                            y: rect.top
                          });
                        }}
                        onMouseLeave={() => setHoverData(null)}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoverData({
                            text: `Total Stop: ${stat.stop}s (${stat.rePct.toFixed(2)}%)`,
                            x: rect.left + rect.width / 2,
                            y: rect.top
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
