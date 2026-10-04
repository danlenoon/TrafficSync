import React, { useContext } from 'react';
import { SimulationContext } from '../../SimulationContext';

export default function TimingsSection() {
  const { directions, laneConfigs, phaseTimings, updateTiming, pedestrians, pedestrianTimings, updatePedestrianTiming } = useContext(SimulationContext);

  return (
    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
        Phase Timings Calculator
      </h2>
      <div className="border border-gray-200 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
            <tr>
              <th className="p-4 font-bold">Lane Configuration</th>
              <th className="p-4 font-bold text-center border-l border-gray-100">Go (G)</th>
              <th className="p-4 font-bold text-center border-l border-gray-100">Amber (A)</th>
              <th className="p-4 font-bold text-center border-l border-gray-100">Red Clearance (R)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Object.keys(directions).filter(d => directions[d]).map(dir => (
              <React.Fragment key={dir}>
                {(laneConfigs[dir] || []).map(lane => {
                  const key = `${dir}-${lane.id}`;
                  const t = phaseTimings[key] || { go: 0, amber: 0, red: 0 };
                  return (
                    <tr key={key} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-gray-800">{dir.charAt(0)} Lane {lane.id}</div>
                        <div className="text-xs font-medium text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded mt-1">{lane.type}</div>
                      </td>
                      <td className="p-4 border-l border-gray-100 bg-green-50/20">
                        <input 
                          type="number" value={t.go || ''} onChange={e => updateTiming(key, 'go', e.target.value)}
                          className="w-full max-w-[80px] p-2 border border-gray-300 rounded text-center mx-auto block bg-white font-bold text-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none" 
                        />
                      </td>
                      <td className="p-4 border-l border-gray-100 bg-yellow-50/20">
                        <input 
                          type="number" value={t.amber || ''} onChange={e => updateTiming(key, 'amber', e.target.value)}
                          className="w-full max-w-[80px] p-2 border border-gray-300 rounded text-center mx-auto block bg-white font-bold text-yellow-600 focus:ring-2 focus:ring-yellow-500 focus:outline-none" 
                        />
                      </td>
                      <td className="p-4 border-l border-gray-100 bg-red-50/20">
                        <input 
                          type="number" value={t.red || ''} onChange={e => updateTiming(key, 'red', e.target.value)}
                          className="w-full max-w-[80px] p-2 border border-gray-300 rounded text-center mx-auto block bg-white font-bold text-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none" 
                        />
                      </td>
                    </tr>
                  );
                })}

                {/* Pedestrian row — stop seconds = go + red (total pedestrian active time added to lane stop) */}
                {pedestrians[dir] === 'Yes' && (
                  <tr className="bg-blue-50/30 hover:bg-blue-50/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-blue-900">{dir.charAt(0)} Pedestrian</div>
                      <div className="text-xs font-semibold text-blue-700 bg-blue-100 inline-block px-2 py-0.5 rounded mt-1">Pedestrian Crossing</div>
                    </td>
                    <td className="p-4 border-l border-gray-100 bg-green-50/20">
                      <input 
                        type="number" 
                        value={pedestrianTimings[dir]?.go ?? ''} 
                        onChange={e => updatePedestrianTiming(dir, 'go', e.target.value)}
                        className="w-full max-w-[80px] p-2 border border-gray-300 rounded text-center mx-auto block bg-white font-bold text-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none" 
                      />
                    </td>
                    <td className="p-4 border-l border-gray-100 bg-gray-50/50 text-center text-gray-400 font-bold">
                      —
                    </td>
                    <td className="p-4 border-l border-gray-100 bg-red-50/20">
                      <input 
                        type="number" 
                        value={pedestrianTimings[dir]?.red ?? ''} 
                        onChange={e => updatePedestrianTiming(dir, 'red', e.target.value)}
                        className="w-full max-w-[80px] p-2 border border-gray-300 rounded text-center mx-auto block bg-white font-bold text-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none" 
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
