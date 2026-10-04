import React, { useContext, useState } from 'react';
import { Save, BarChart3, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import { SimulationContext } from '../SimulationContext';

export default function Results() {
  const navigate = useNavigate();
  const { roadName, directions, results, saveCurrentSimulation } = useContext(SimulationContext);
  const [saved, setSaved] = useState(false);

  const getDirAbbr = (dir) => dir.substring(0, 2).toUpperCase();

  const handleSave = () => {
    saveCurrentSimulation();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cycle Results Summary</h1>
          <p className="text-gray-500">
            Calculated cycle data for <strong>{roadName || 'Intersection'}</strong>
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button onClick={() => navigate('/editor')} variant="outline" className="flex-1 sm:flex-none">
            Edit
          </Button>
          <Button onClick={handleSave} variant="outline" className="flex-1 sm:flex-none">
            {saved ? <><Check size={18} /> Saved!</> : <><Save size={18} /> Save</>}
          </Button>
          <Button onClick={() => navigate('/')} variant="primary" className="flex-1 sm:flex-none">
            Done
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full pb-6">
        
        {/* Left Col: Master Cycle */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
          <BarChart3 size={48} className="text-blue-500 mb-4 opacity-80" />
          <div className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Total Cycle Length</div>
          <div className="text-6xl font-black text-gray-900 mb-6">{results.maxCycle}<span className="text-2xl text-gray-400 font-bold ml-1">s</span></div>
          
          <div className="w-full bg-gray-50 rounded-lg p-4 border border-gray-100 text-left space-y-1.5">
            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Intersection Setup</div>
            <div className="font-medium text-gray-800 text-sm">{Object.keys(directions).filter(d => directions[d]).length} Directions Active</div>
            <div className="font-medium text-gray-800 text-sm">{results.stats.length} Lanes Configured</div>
          </div>
        </div>

        {/* Right Col: Lane Breakdown */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
          <h3 className="font-bold text-gray-800 text-lg mb-6">Lane Phase Breakdown</h3>
          
          <div className="overflow-y-auto space-y-5 flex-1 pr-2">
            {results.stats.map(stat => (
              <div key={stat.key} className="p-4 border border-gray-100 bg-gray-50 rounded-lg hover:border-gray-200 transition-colors">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <div className="font-bold text-gray-800">{stat.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Wait time (Total Red Stop): <span className="font-bold text-red-500">{stat.stop}s</span>
                    </div>
                  </div>
                </div>
                  
                  {/* Visual Bar matching reference design: Green | Amber | Red */}
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
                    <div 
                      className="bg-green-500 h-full transition-all cursor-pointer hover:opacity-90" 
                      style={{ width: `${stat.goPct}%` }} 
                      title={`Go Time: ${stat.go}s (${stat.goPct.toFixed(1)}%)`}
                    ></div>
                    <div 
                      className="bg-yellow-400 h-full transition-all cursor-pointer hover:opacity-90" 
                      style={{ width: `${stat.amPct}%` }} 
                      title={`Amber Caution Time: ${stat.amber}s (${stat.amPct.toFixed(1)}%)`}
                    ></div>
                    <div 
                      className="bg-red-500 h-full transition-all cursor-pointer hover:opacity-90" 
                      style={{ width: `${stat.rePct}%` }} 
                      title={`Red Stop Time: ${stat.stop}s (${stat.rePct.toFixed(1)}%)`}
                    ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
