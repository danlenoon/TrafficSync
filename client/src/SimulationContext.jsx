import React, { createContext, useState, useMemo } from 'react';

export const SimulationContext = createContext(null);

export function SimulationProvider({ children }) {
  const [roadName, setRoadName] = useState('Main St');
  const [directions, setDirections] = useState({
    Northbound: true, Southbound: true, Eastbound: false, Westbound: false
  });
  
  const [laneConfigs, setLaneConfigs] = useState({
    Northbound: [{ id: 1, type: 'Left Turn' }, { id: 2, type: 'Straight' }],
    Southbound: [{ id: 1, type: 'Straight' }, { id: 2, type: 'Straight' }]
  });
  
  const [phaseTimings, setPhaseTimings] = useState({
    'Northbound-1': { go: 15, amber: 3, red: 2 },
    'Northbound-2': { go: 45, amber: 3, red: 2 },
    'Southbound-1': { go: 45, amber: 3, red: 2 },
    'Southbound-2': { go: 45, amber: 3, red: 2 }
  });

  const toggleDirection = (dir) => {
    setDirections(prev => ({ ...prev, [dir]: !prev[dir] }));
  };

  const addLane = (dir) => {
    setLaneConfigs(prev => {
      const current = prev[dir] || [];
      return { ...prev, [dir]: [...current, { id: current.length + 1, type: 'Straight' }] };
    });
  };

  const updateLaneType = (dir, id, type) => {
    setLaneConfigs(prev => ({
      ...prev,
      [dir]: prev[dir].map(l => l.id === id ? { ...l, type } : l)
    }));
  };

  const updateTiming = (key, field, value) => {
    setPhaseTimings(prev => {
      const current = prev[key] || { go: 0, amber: 0, red: 0 };
      return {
        ...prev,
        [key]: { ...current, [field]: Number(value) }
      };
    });
  };

  // Derived results
  const results = useMemo(() => {
    let totalCycle = 0;
    
    Object.keys(directions).filter(d => directions[d]).forEach(dir => {
      let maxDirTime = 0;
      (laneConfigs[dir] || []).forEach(lane => {
        const key = `${dir}-${lane.id}`;
        const t = phaseTimings[key] || { go: 0, amber: 0, red: 0 };
        const laneActiveTime = t.go + t.amber + t.red;
        if (laneActiveTime > maxDirTime) {
          maxDirTime = laneActiveTime;
        }
      });
      totalCycle += maxDirTime;
    });

    const stats = [];
    Object.keys(directions).filter(d => directions[d]).forEach(dir => {
      (laneConfigs[dir] || []).forEach(lane => {
        const key = `${dir}-${lane.id}`;
        const t = phaseTimings[key] || { go: 0, amber: 0, red: 0 };
        
        const stopTime = Math.max(0, totalCycle - t.go - t.amber);
        
        stats.push({
          key,
          label: `${dir.substring(0, 2).toUpperCase()} Lane ${lane.id} (${lane.type})`,
          stop: stopTime,
          goPct: totalCycle ? (t.go / totalCycle) * 100 : 0,
          amPct: totalCycle ? (t.amber / totalCycle) * 100 : 0,
          rePct: totalCycle ? (stopTime / totalCycle) * 100 : 0,
        });
      });
    });
    return { maxCycle: totalCycle, stats };
  }, [directions, laneConfigs, phaseTimings]);

  return (
    <SimulationContext.Provider value={{
      roadName, setRoadName,
      directions, toggleDirection,
      laneConfigs, addLane, updateLaneType,
      phaseTimings, updateTiming,
      results
    }}>
      {children}
    </SimulationContext.Provider>
  );
}
