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

  const [cycleMode, setCycleMode] = useState('delrosario');
  const [customCycleLength, setCustomCycleLength] = useState(300);

  // Phases state for Interactive Phase Builder
  const [phases, setPhases] = useState([
    { id: 1, duration: 30, lights: {} },
    { id: 2, duration: 30, lights: {} }
  ]);

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

  // Phase manipulation functions
  const addPhase = () => {
    setPhases(prev => {
      const nextId = prev.length > 0 ? Math.max(...prev.map(p => p.id)) + 1 : 1;
      return [...prev, {
        id: nextId,
        duration: 30,
        lights: {}
      }];
    });
  };

  const removePhase = (id) => {
    setPhases(prev => prev.length > 1 ? prev.filter(p => p.id !== id) : prev);
  };

  const updatePhaseDuration = (id, duration) => {
    setPhases(prev => prev.map(p => p.id === id ? { ...p, duration: Math.max(1, Number(duration) || 0) } : p));
  };

  const togglePhaseLight = (phaseId, lightKey) => {
    setPhases(prev => prev.map(p => {
      if (p.id !== phaseId) return p;
      const currentLight = p.lights[lightKey] || 'red';
      const nextLight = currentLight === 'green' ? 'red' : 'green';
      return {
        ...p,
        lights: { ...p.lights, [lightKey]: nextLight }
      };
    }));
  };

  const resetSimulation = () => {
    setRoadName('');
    setDirections({ Northbound: false, Southbound: false, Eastbound: false, Westbound: false });
    setLaneConfigs({ Northbound: [], Southbound: [], Eastbound: [], Westbound: [] });
    setPhaseTimings({});
    setPedestrians({ Northbound: 'No', Southbound: 'No', Eastbound: 'No', Westbound: 'No' });
    setPedestrianTimings({ Northbound: { go: 1, red: 3 }, Southbound: { go: 1, red: 3 }, Eastbound: { go: 1, red: 3 }, Westbound: { go: 1, red: 3 } });
    setCycleMode('delrosario');
    setCustomCycleLength(300);
    setPhases([
      { id: 1, duration: 30, lights: {} },
      { id: 2, duration: 30, lights: {} }
    ]);
  };

  const loadSimulation = (sim) => {
    if (!sim) return;
    setRoadName(sim.roadName || sim.title || '');
    setDirections(sim.directions || { Northbound: false, Southbound: false, Eastbound: false, Westbound: false });
    setLaneConfigs(sim.laneConfigs || { Northbound: [], Southbound: [], Eastbound: [], Westbound: [] });
    setPhaseTimings(sim.phaseTimings || {});
    setPedestrians(sim.pedestrians || { Northbound: 'No', Southbound: 'No', Eastbound: 'No', Westbound: 'No' });
    setPedestrianTimings(sim.pedestrianTimings || { Northbound: { go: 1, red: 3 }, Southbound: { go: 1, red: 3 }, Eastbound: { go: 1, red: 3 }, Westbound: { go: 1, red: 3 } });
    setCycleMode(sim.cycleMode || 'delrosario');
    setCustomCycleLength(sim.customCycleLength || 300);
    if (sim.phases) setPhases(sim.phases);
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
      phases: JSON.parse(JSON.stringify(phases)),
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
    // Calculate total intersection cycle length across all active lanes / phases
    let totalCycle = 0;

    if (cycleMode === 'phases') {
      totalCycle = phases.reduce((acc, p) => acc + (Number(p.duration) || 0), 0);
    }
    
    // Check if phaseTimings has explicit user-configured go, amber, red values
    let maxPhaseSum = 0;
    Object.keys(directions).filter(d => directions[d]).forEach(dir => {
      (laneConfigs[dir] || []).forEach(lane => {
        const key = `${dir}-${lane.id}`;
        const t = phaseTimings[key];
        if (t && (t.go || t.amber || t.red)) {
          const sum = (Number(t.go) || 0) + (Number(t.amber) || 0) + (Number(t.red) || 0);
          if (sum > maxPhaseSum) maxPhaseSum = sum;
        }
      });
    });

    if (maxPhaseSum > 0) {
      totalCycle = maxPhaseSum;
    } else if (totalCycle === 0) {
      totalCycle = Number(customCycleLength) || 300;
    }

    const stats = [];
    Object.keys(directions).filter(d => directions[d]).forEach(dir => {
      (laneConfigs[dir] || []).forEach(lane => {
        const key = `${dir}-${lane.id}`;
        const t = phaseTimings[key] || { go: 0, amber: 0, red: 0 };
        
        let goSec = t ? Number(t.go) || 0 : 0;
        let amberSec = t ? Number(t.amber) || 0 : 0;
        let stopSec = t ? Number(t.red) || 0 : 0;

        if (cycleMode === 'phases' && (!t || (!t.go && !t.red))) {
          const greenDuration = phases.reduce((acc, p) => {
            const lightState = p.lights[key] ?? (p.id === 1 ? 'green' : 'red');
            return lightState === 'green' ? acc + (Number(p.duration) || 0) : acc;
          }, 0);
          goSec = greenDuration;
          amberSec = 3;
          stopSec = Math.max(0, totalCycle - goSec - amberSec);
        } else if (!stopSec && totalCycle) {
          stopSec = Math.max(0, totalCycle - goSec - amberSec);
        }

        stats.push({
          key,
          label: `${dir.charAt(0)} Lane ${lane.id} (${lane.type})`,
          go: goSec,
          amber: amberSec,
          stop: stopSec,
          cycleLength: totalCycle,
          goPct: totalCycle ? (goSec / totalCycle) * 100 : 0,
          amPct: totalCycle ? (amberSec / totalCycle) * 100 : 0,
          rePct: totalCycle ? (stopSec / totalCycle) * 100 : 0,
        });
      });

      if (pedestrians[dir] === 'Yes') {
        const p = pedestrianTimings[dir] || { go: 0, red: 0 };
        const pedGo = Number(p.go) || 0;
        const pedRed = Math.max(0, totalCycle - pedGo);

        stats.push({
          key: `${dir}-pedestrian`,
          label: `${dir.charAt(0)} Pedestrian (Crossing)`,
          go: pedGo,
          amber: 0,
          stop: pedRed,
          cycleLength: totalCycle,
          goPct: totalCycle ? (pedGo / totalCycle) * 100 : 0,
          amPct: 0,
          rePct: totalCycle ? (pedRed / totalCycle) * 100 : 0,
        });
      }
    });

    return { maxCycle: totalCycle, stats };
  }, [directions, laneConfigs, phaseTimings, pedestrians, pedestrianTimings, cycleMode, customCycleLength, phases]);

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
      phases, addPhase, removePhase, updatePhaseDuration, togglePhaseLight,
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
