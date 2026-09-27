import React, { useContext } from 'react';
import { Plus } from 'lucide-react';
import { SimulationContext } from '../../SimulationContext';

export default function LanesSection() {
  const { directions, laneConfigs, addLane, updateLaneType } = useContext(SimulationContext);

  return (
    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
        Lane Customization
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.keys(directions).filter(d => directions[d]).map(dir => (
          <div key={dir} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">{dir}</h3>
              <button onClick={() => addLane(dir)} className="text-xs font-bold bg-white border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 text-gray-700 shadow-sm flex items-center gap-1">
                <Plus size={14}/> Add Lane
              </button>
            </div>
            <div className="p-4 space-y-3">
              {(laneConfigs[dir] || []).length === 0 ? (
                <p className="text-sm text-gray-400 italic py-2">No lanes added yet.</p>
              ) : (
                laneConfigs[dir].map((lane, idx) => (
                  <div key={lane.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="w-16 text-sm font-bold text-gray-500">Lane {idx + 1}</div>
                    <select 
                      value={lane.type}
                      onChange={e => updateLaneType(dir, lane.id, e.target.value)}
                      className="flex-1 border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-gray-700 w-full"
                    >
                      <option>Left Turn</option>
                      <option>Straight</option>
                      <option>Right Turn</option>
                      <option>U-Turn</option>
                      <option>Straight & Right</option>
                    </select>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
