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

  const [pedestrians, setPedestrians] = useState({
    Northbound: 'No', Southbound: 'No', Eastbound: 'No', Westbound: 'No'
  });

  const [pedestrianTimings, setPedestrianTimings] = useState({
    Northbound: { go: 1, red: 3 },
    Southbound: { go: 1, red: 3 },
    Eastbound: { go: 1, red: 3 },
    Westbound: { go: 1, red: 3 }
  });

  const toggleDirection = (dir) => {
    setDirections(prev => ({ ...prev, [dir]: !prev[dir] }));
  };

  const setPedestrian = (dir, value) => {
    setPedestrians(prev => ({ ...prev, [dir]: value }));
  };

  const updatePedestrianTiming = (dir, field, value) => {
    setPedestrianTimings(prev => ({
      ...prev,
      [dir]: { ...prev[dir], [field]: Number(value) }
    }));
  };

  const addLane = (dir) => {
    setLaneConfigs(prev => {
      const current = prev[dir] || [];
      const nextId = current.length > 0 ? Math.max(...current.map(l => l.id)) + 1 : 1;
      
      // Set default timings for new lane: Go=1, Amber=3, Red=3
      setPhaseTimings(prevTimings => ({
        ...prevTimings,
        [`${dir}-${nextId}`]: { go: 1, amber: 3, red: 3 }
      }));

      return { ...prev, [dir]: [...current, { id: nextId, type: 'Straight' }] };
    });
  };

  const removeLane = (dir, id) => {
    setLaneConfigs(prev => ({
      ...prev,
      [dir]: prev[dir].filter(l => l.id !== id)
    }));
    setPhaseTimings(prev => {
      const updated = { ...prev };
      delete updated[`${dir}-${id}`];
      return updated;
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
    const getAxisCycle = (dir1, dir2) => {
      const getDirMetrics = (dir) => {
        const lanes = laneConfigs[dir] || [];
        if (!directions[dir] || lanes.length === 0) return { l: 0, s: 0, max: 0, prot: false };
        
        let lMax = 0;
        let sMax = 0;
        lanes.forEach(lane => {
          const t = phaseTimings[`${dir}-${lane.id}`] || { go: 0, amber: 0, red: 0 };
          const total = t.go + t.amber + t.red;
          if (lane.type === 'Left Turn') {
            if (total > lMax) lMax = total;
          } else {
            if (total > sMax) sMax = total;
          }
        });

        const max = Math.max(lMax, sMax);
        // Protected left turn condition: left turn exists and timing differs from through lanes
        const prot = lMax > 0 && sMax > 0 && lMax !== sMax;
        return { l: lMax, s: sMax, max, prot };
      };

      const m1 = getDirMetrics(dir1);
      const m2 = getDirMetrics(dir2);

      // Dedicated left turn phases occur when both opposing directions require protected left turns (e.g. Del Rosario 4-way)
      if (m1.prot && m2.prot) {
        return m1.l + m2.l + Math.max(m1.s, m2.s);
      }

      // Otherwise, traffic movements run concurrently bounded by the maximum timing of this street (e.g. Clark x Friendship T-intersection)
      return Math.max(m1.max, m2.max);
    };

    const totalCycle = getAxisCycle('Northbound', 'Southbound') + getAxisCycle('Eastbound', 'Westbound');

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

      if (pedestrians[dir] === 'Yes') {
        const p = pedestrianTimings[dir] || { go: 0, red: 0 };
        const stopTime = Math.max(0, totalCycle - p.go);
        stats.push({
          key: `${dir}-pedestrian`,
          label: `${dir.substring(0, 2).toUpperCase()} Pedestrian (Crossing)`,
          stop: stopTime,
          goPct: totalCycle ? (p.go / totalCycle) * 100 : 0,
          amPct: 0,
          rePct: totalCycle ? (stopTime / totalCycle) * 100 : 0,
        });
      }
    });
    return { maxCycle: totalCycle, stats };
  }, [directions, laneConfigs, phaseTimings, pedestrians, pedestrianTimings]);

  return (
    <SimulationContext.Provider value={{
      roadName, setRoadName,
      directions, toggleDirection,
      laneConfigs, addLane, removeLane, updateLaneType,
      phaseTimings, updateTiming,
      pedestrians, setPedestrian,
      pedestrianTimings, updatePedestrianTiming,
      results
    }}>
      {children}
    </SimulationContext.Provider>
  );
}
