import React, { createContext, useState, useMemo } from 'react';

export const SimulationContext = createContext(null);

export function SimulationProvider({ children }) {
  const [roadName, setRoadName] = useState('');
  const [directions, setDirections] = useState({
    Northbound: false, Southbound: false, Eastbound: false, Westbound: false
  });
  
  const [laneConfigs, setLaneConfigs] = useState({
    Northbound: [],
    Southbound: [],
    Eastbound: [],
    Westbound: []
  });
  
  const [phaseTimings, setPhaseTimings] = useState({});

  const [pedestrians, setPedestrians] = useState({
    Northbound: 'No', Southbound: 'No', Eastbound: 'No', Westbound: 'No'
  });

  const [pedestrianTimings, setPedestrianTimings] = useState({
    Northbound: { go: 1, red: 3 },
    Southbound: { go: 1, red: 3 },
    Eastbound: { go: 1, red: 3 },
    Westbound: { go: 1, red: 3 }
  });

  const [cycleMode, setCycleMode] = useState('auto');
  const [customCycleLength, setCustomCycleLength] = useState(300);

  const [savedSimulations, setSavedSimulations] = useState(() => {
    try {
      const saved = localStorage.getItem('trafficsync_saved_simulations');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
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

  const resetSimulation = () => {
    setRoadName('');
    setDirections({ Northbound: false, Southbound: false, Eastbound: false, Westbound: false });
    setLaneConfigs({ Northbound: [], Southbound: [], Eastbound: [], Westbound: [] });
    setPhaseTimings({});
    setPedestrians({ Northbound: 'No', Southbound: 'No', Eastbound: 'No', Westbound: 'No' });
    setPedestrianTimings({ Northbound: { go: 1, red: 3 }, Southbound: { go: 1, red: 3 }, Eastbound: { go: 1, red: 3 }, Westbound: { go: 1, red: 3 } });
    setCycleMode('auto');
    setCustomCycleLength(300);
  };

  const loadSimulation = (sim) => {
    if (!sim) return;
    setRoadName(sim.roadName || sim.title || '');
    setDirections(sim.directions || { Northbound: false, Southbound: false, Eastbound: false, Westbound: false });
    setLaneConfigs(sim.laneConfigs || { Northbound: [], Southbound: [], Eastbound: [], Westbound: [] });
    setPhaseTimings(sim.phaseTimings || {});
    setPedestrians(sim.pedestrians || { Northbound: 'No', Southbound: 'No', Eastbound: 'No', Westbound: 'No' });
    setPedestrianTimings(sim.pedestrianTimings || { Northbound: { go: 1, red: 3 }, Southbound: { go: 1, red: 3 }, Eastbound: { go: 1, red: 3 }, Westbound: { go: 1, red: 3 } });
    setCycleMode(sim.cycleMode || 'auto');
    setCustomCycleLength(sim.customCycleLength || 300);
  };

  const deleteSimulation = (id) => {
    setSavedSimulations(prev => {
      const updated = prev.filter(s => s.id !== id);
      try {
        localStorage.setItem('trafficsync_saved_simulations', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const saveCurrentSimulation = () => {
    const simId = Date.now().toString();
    const title = roadName.trim() || 'Untitled Intersection';
    const activeLanesCount = results.stats.length;
    const cycleLength = results.maxCycle;

    const newSim = {
      id: simId,
      title,
      roadName: title,
      directions: { ...directions },
      laneConfigs: JSON.parse(JSON.stringify(laneConfigs)),
      phaseTimings: JSON.parse(JSON.stringify(phaseTimings)),
      pedestrians: { ...pedestrians },
      pedestrianTimings: JSON.parse(JSON.stringify(pedestrianTimings)),
      cycleMode,
      customCycleLength,
      lanesCount: activeLanesCount,
      cycleLength,
      savedAt: new Date().toLocaleDateString()
    };

    setSavedSimulations(prev => {
      const updated = [newSim, ...prev.filter(s => s.title !== newSim.title)];
      try {
        localStorage.setItem('trafficsync_saved_simulations', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    return newSim;
  };

  // Derived results
  const results = useMemo(() => {
    const getDirMetrics = (dir) => {
      const lanes = laneConfigs[dir] || [];
      if (!directions[dir] || lanes.length === 0) return { l: 0, s: 0, max: 0, prot: false };
      
      let lMax = 0;
      let sMax = 0;
      lanes.forEach(lane => {
        const t = phaseTimings[`${dir}-${lane.id}`] || { go: 0, amber: 0, red: 0 };
        const total = t.go + t.amber + t.red;
        if (lane.type && lane.type.includes('Left')) {
          if (total > lMax) lMax = total;
        } else {
          if (total > sMax) sMax = total;
        }
      });

      const max = Math.max(lMax, sMax);
      const prot = lMax > 0 && sMax > 0 && lMax !== sMax;
      return { l: lMax, s: sMax, max, prot };
    };

    let totalCycle = 0;

    if (cycleMode === 'custom') {
      totalCycle = Number(customCycleLength) || 0;
    } else if (cycleMode === 'delrosario') {
      const ns1 = getDirMetrics('Northbound');
      const ns2 = getDirMetrics('Southbound');
      const ew1 = getDirMetrics('Eastbound');
      const ew2 = getDirMetrics('Westbound');

      const nsCycle = (ns1.l > 0 && ns2.l > 0) ? (ns1.l + ns2.l + Math.max(ns1.s, ns2.s)) : Math.max(ns1.max, ns2.max);
      const ewCycle = (ew1.l > 0 && ew2.l > 0) ? (ew1.l + ew2.l + Math.max(ew1.s, ew2.s)) : Math.max(ew1.max, ew2.max);
      totalCycle = nsCycle + ewCycle;
    } else if (cycleMode === 'clark') {
      const ns1 = getDirMetrics('Northbound');
      const ns2 = getDirMetrics('Southbound');
      const ew1 = getDirMetrics('Eastbound');
      const ew2 = getDirMetrics('Westbound');

      const nsMax = Math.max(ns1.max, ns2.max);
      const ewMax = Math.max(ew1.max, ew2.max);
      totalCycle = nsMax + ewMax;
    } else {
      // Auto-detect heuristic
      const getAxisCycle = (dir1, dir2) => {
        const m1 = getDirMetrics(dir1);
        const m2 = getDirMetrics(dir2);
        if (m1.prot && m2.prot) {
          return m1.l + m2.l + Math.max(m1.s, m2.s);
        }
        return Math.max(m1.max, m2.max);
      };
      totalCycle = getAxisCycle('Northbound', 'Southbound') + getAxisCycle('Eastbound', 'Westbound');
    }

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
  }, [directions, laneConfigs, phaseTimings, pedestrians, pedestrianTimings, cycleMode, customCycleLength]);

  return (
    <SimulationContext.Provider value={{
      roadName, setRoadName,
      directions, toggleDirection,
      laneConfigs, addLane, removeLane, updateLaneType,
      phaseTimings, updateTiming,
      pedestrians, setPedestrian,
      pedestrianTimings, updatePedestrianTiming,
      cycleMode, setCycleMode,
      customCycleLength, setCustomCycleLength,
      results,
      savedSimulations,
      saveCurrentSimulation,
      deleteSimulation,
      loadSimulation,
      resetSimulation
    }}>
      {children}
    </SimulationContext.Provider>
  );
}
