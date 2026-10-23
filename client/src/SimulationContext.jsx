import React, { createContext, useState, useMemo, useEffect } from 'react';

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
    Northbound: { go: 1, red: 2 },
    Southbound: { go: 1, red: 2 },
    Eastbound: { go: 1, red: 2 },
    Westbound: { go: 1, red: 2 }
  });

  // Phases state for Interactive Phase Builder (starts empty/unconfigured)
  const [phases, setPhases] = useState([]);

  // iOS 27 Liquid Glass slider state (persisted in localStorage)
  const [glassClarity, setGlassClarity] = useState(() => {
    try {
      const saved = localStorage.getItem('trafficsync_glass_clarity');
      return saved !== null ? Number(saved) : 0.5;
    } catch (e) {
      return 0.5;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('trafficsync_glass_clarity', glassClarity);
    } catch (e) {}
  }, [glassClarity]);

  const resetAll = () => {
    try {
      localStorage.removeItem('trafficsync_saved_simulations');
      localStorage.removeItem('trafficsync_glass_clarity');
    } catch (e) {}
    setSavedSimulations([]);
    setGlassClarity(0.5);
    resetSimulation();
  };

  // Dynamically update root CSS custom properties for crystal clear vs tinted adaptation
  useEffect(() => {
    const root = document.documentElement;
    const alpha = 0.1 + glassClarity * 0.85;
    const blur = glassClarity * 24;
    const borderAlpha = 0.15 + glassClarity * 0.65;
    const cardAlpha = 0.08 + glassClarity * 0.8; // Ultra clear is near transparent crystal clear (no fixed gray/white)
    const inputAlpha = 0.15 + glassClarity * 0.75;

    root.style.setProperty('--glass-alpha', alpha);
    root.style.setProperty('--glass-blur', `${blur}px`);
    root.style.setProperty('--glass-border', `rgba(255, 255, 255, ${borderAlpha})`);
    root.style.setProperty('--card-bg', `rgba(255, 255, 255, ${cardAlpha})`);
    root.style.setProperty('--input-bg', `rgba(255, 255, 255, ${inputAlpha})`);
    document.body.style.background = 'linear-gradient(135deg, #e8eff5 0%, #d2dbe5 100%)';
    document.body.style.color = '#1f2937';
  }, [glassClarity]);

  const [savedSimulations, setSavedSimulations] = useState(() => {
    try {
      const saved = localStorage.getItem('trafficsync_saved_simulations');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [hasBeenSaved, setHasBeenSaved] = useState(false);

  const toggleDirection = (dir) => {
    setDirections(prev => ({ ...prev, [dir]: !prev[dir] }));
  };

  const setPedestrian = (dir, value) => {
    setPedestrians(prev => ({ ...prev, [dir]: value }));
  };

  const updatePedestrianTiming = (dir, field, value) => {
    let numVal;
    if (value === '' || value === null || value === undefined) {
      numVal = field === 'go' ? 1 : 0;
    } else {
      const parsed = parseInt(value, 10);
      if (isNaN(parsed)) {
        numVal = field === 'go' ? 1 : 0;
      } else if (field === 'go') {
        numVal = Math.min(9999, Math.max(1, parsed));
      } else {
        numVal = Math.min(9999, Math.max(0, parsed));
      }
    }
    setPedestrianTimings(prev => ({
      ...prev,
      [dir]: { ...prev[dir], [field]: numVal }
    }));
  };

  const addLane = (dir) => {
    setLaneConfigs(prev => {
      const current = prev[dir] || [];
      const nextId = current.length > 0 ? Math.max(...current.map(l => l.id)) + 1 : 1;
      
      // Default timings: Go=1 (minimum 1), Amber=3, Red Clearance=2
      setPhaseTimings(prevTimings => ({
        ...prevTimings,
        [`${dir}-${nextId}`]: { go: 1, amber: 3, red: 2 }
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
      const current = prev[key] || { go: 1, amber: 3, red: 2 };
      let numVal;
      if (value === '' || value === null || value === undefined) {
        numVal = field === 'go' ? 1 : 0;
      } else {
        const parsed = parseInt(value, 10);
        if (isNaN(parsed)) {
          numVal = field === 'go' ? 1 : 0;
        } else if (field === 'go') {
          numVal = Math.min(9999, Math.max(1, parsed));
        } else {
          numVal = Math.min(9999, Math.max(0, parsed));
        }
      }
      return {
        ...prev,
        [key]: { ...current, [field]: numVal }
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
    setPhases(prev => prev.filter(p => p.id !== id));
  };

  const updatePhaseDuration = (id, duration) => {
    setPhases(prev => prev.map(p => p.id === id ? { ...p, duration: Math.max(1, Number(duration) || 0) } : p));
  };

  const togglePhaseLight = (phaseId, lightKey) => {
    setPhases(prev => prev.map(p => {
      if (p.id !== phaseId) return p;
      const current = p.lights[lightKey];
      // When unconfigured/off, first click toggles to green.
      // Next click toggles to red. Next click toggles to off/green.
      let next;
      if (!current || current === 'off') next = 'green';
      else if (current === 'green') next = 'red';
      else if (current === 'red') next = 'green';
      else next = 'green';

      return {
        ...p,
        lights: { ...p.lights, [lightKey]: next }
      };
    }));
  };

  const resetSimulation = () => {
    setRoadName('');
    setDirections({ Northbound: false, Southbound: false, Eastbound: false, Westbound: false });
    setLaneConfigs({ Northbound: [], Southbound: [], Eastbound: [], Westbound: [] });
    setPhaseTimings({});
    setPedestrians({ Northbound: 'No', Southbound: 'No', Eastbound: 'No', Westbound: 'No' });
    setPedestrianTimings({
      Northbound: { go: 1, red: 2 },
      Southbound: { go: 1, red: 2 },
      Eastbound: { go: 1, red: 2 },
      Westbound: { go: 1, red: 2 }
    });
    setPhases([]);
    setHasBeenSaved(false);
  };

  const loadSimulation = (sim) => {
    if (!sim) return;
    setRoadName(sim.roadName || sim.title || '');
    setDirections(sim.directions || { Northbound: false, Southbound: false, Eastbound: false, Westbound: false });
    setLaneConfigs(sim.laneConfigs || { Northbound: [], Southbound: [], Eastbound: [], Westbound: [] });
    setPhaseTimings(sim.phaseTimings || {});
    setPedestrians(sim.pedestrians || { Northbound: 'No', Southbound: 'No', Eastbound: 'No', Westbound: 'No' });
    setPedestrianTimings(sim.pedestrianTimings || {
      Northbound: { go: 1, red: 2 },
      Southbound: { go: 1, red: 2 },
      Eastbound: { go: 1, red: 2 },
      Westbound: { go: 1, red: 2 }
    });
    if (sim.phases) setPhases(sim.phases);
    setHasBeenSaved(true);
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
      phases: JSON.parse(JSON.stringify(phases)),
      lanesCount: activeLanesCount,
      cycleLength,
      savedAt: `${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })}`
    };

    setSavedSimulations(prev => {
      const updated = [newSim, ...prev.filter(s => s.title !== newSim.title)];
      try {
        localStorage.setItem('trafficsync_saved_simulations', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    setHasBeenSaved(true);
    return newSim;
  };

  // Derived results based on dynamic phase clearance model and exact user clearance equations
  const results = useMemo(() => {
    let intersectionCycle = 0;
    const phaseDurations = [];

    if (phases.length > 0) {
      // Calculate each phase's duration based on transitioning movements that clear at the end of that phase
      phases.forEach((p, pIdx) => {
        const nextPhase = phases[(pIdx + 1) % phases.length];

        // Find movements that are green in phase p
        const greenMovements = [];
        Object.keys(directions).filter(d => directions[d]).forEach(dir => {
          (laneConfigs[dir] || []).forEach(lane => {
            const key = `${dir}-${lane.id}`;
            if (p.lights && p.lights[key] === 'green') {
              const continuesNext = nextPhase && nextPhase.lights && nextPhase.lights[key] === 'green';
              const t = phaseTimings[key] || { go: 1, amber: 3, red: 2 };
              greenMovements.push({
                key,
                type: 'lane',
                continuesNext,
                go: Math.max(1, Number(t.go) || 1),
                amber: Math.max(0, Number(t.amber) !== undefined ? Number(t.amber) : 3),
                red: Math.max(0, Number(t.red) !== undefined ? Number(t.red) : 2)
              });
            }
          });

          if (pedestrians[dir] === 'Yes' && p.lights && p.lights[`${dir}_pedestrian`] === 'green') {
            const pedKey = `${dir}_pedestrian`;
            const continuesNext = nextPhase && nextPhase.lights && nextPhase.lights[pedKey] === 'green';
            const pt = pedestrianTimings[dir] || { go: 1, red: 2 };
            greenMovements.push({
              key: pedKey,
              type: 'pedestrian',
              continuesNext,
              go: Math.max(1, Number(pt.go) || 1),
              amber: 0,
              red: Math.max(0, Number(pt.red) !== undefined ? Number(pt.red) : 2)
            });
          }
        });

        if (greenMovements.length === 0) {
          const fallbackDur = Math.max(1, Number(p.duration) || 6);
          phaseDurations.push(fallbackDur);
          return;
        }

        // Movements ending in this phase determine the clearance requirements
        const endingMovements = greenMovements.filter(m => !m.continuesNext);
        const refMovements = endingMovements.length > 0 ? endingMovements : greenMovements;

        // Find the nominal go for concurrent transitioning movements
        const minEndingGo = Math.min(...refMovements.map(m => m.go));
        const maxAmber = Math.max(...refMovements.map(m => m.amber));
        const maxRed = Math.max(...refMovements.map(m => m.red));

        const phaseDur = minEndingGo + maxAmber + maxRed;
        phaseDurations.push(phaseDur);
      });

      intersectionCycle = phaseDurations.reduce((sum, d) => sum + d, 0);
    } else {
      let totalSum = 0;
      Object.keys(directions).filter(d => directions[d]).forEach(dir => {
        (laneConfigs[dir] || []).forEach(lane => {
          const key = `${dir}-${lane.id}`;
          const t = phaseTimings[key] || { go: 1, amber: 3, red: 2 };
          const goSec = Math.max(1, Number(t.go) || 1);
          const amberSec = Math.max(0, Number(t.amber) || 3);
          const stopSec = Math.max(0, Number(t.red) !== undefined ? Number(t.red) : 2);
          totalSum += (goSec + amberSec + stopSec);
        });
        if (pedestrians[dir] === 'Yes') {
          const p = pedestrianTimings[dir] || { go: 1, red: 2 };
          const pedGo = Math.max(1, Number(p.go) || 1);
          const pedRed = Math.max(0, Number(p.red) !== undefined ? Number(p.red) : 2);
          totalSum += (pedGo + pedRed);
        }
      });
      intersectionCycle = totalSum;
    }

    const stats = [];
    Object.keys(directions).filter(d => directions[d]).forEach(dir => {
      (laneConfigs[dir] || []).forEach(lane => {
        const key = `${dir}-${lane.id}`;
        const t = phaseTimings[key] || { go: 1, amber: 3, red: 2 };
        
        const goSec = Math.max(1, Number(t.go) || 1);
        const amberSec = Math.max(0, Number(t.amber) || 3);
        const stopSec = Math.max(0, intersectionCycle - goSec - amberSec);

        stats.push({
          key,
          label: `${dir} Lane ${lane.id} (${lane.type})`,
          go: goSec,
          amber: amberSec,
          stop: stopSec,
          cycleLength: intersectionCycle,
          goPct: intersectionCycle ? (goSec / intersectionCycle) * 100 : 0,
          amPct: intersectionCycle ? (amberSec / intersectionCycle) * 100 : 0,
          rePct: intersectionCycle ? (stopSec / intersectionCycle) * 100 : 0,
        });
      });

      if (pedestrians[dir] === 'Yes') {
        const p = pedestrianTimings[dir] || { go: 1, red: 2 };
        const pedGo = Math.max(1, Number(p.go) || 1);
        const pedStop = Math.max(0, intersectionCycle - pedGo);

        stats.push({
          key: `${dir}-pedestrian`,
          label: `${dir} Pedestrian (Crossing)`,
          go: pedGo,
          amber: 0,
          stop: pedStop,
          cycleLength: intersectionCycle,
          goPct: intersectionCycle ? (pedGo / intersectionCycle) * 100 : 0,
          amPct: 0,
          rePct: intersectionCycle ? (pedStop / intersectionCycle) * 100 : 0,
        });
      }
    });

    return { maxCycle: intersectionCycle, stats };
  }, [directions, laneConfigs, phaseTimings, pedestrians, pedestrianTimings, phases]);

  return (
    <SimulationContext.Provider value={{
      roadName, setRoadName,
      directions, toggleDirection,
      laneConfigs, addLane, removeLane, updateLaneType,
      phaseTimings, updateTiming,
      pedestrians, setPedestrian,
      pedestrianTimings, updatePedestrianTiming,
      phases, addPhase, removePhase, updatePhaseDuration, togglePhaseLight,
      results,
      savedSimulations,
      saveCurrentSimulation,
      deleteSimulation,
      loadSimulation,
      resetSimulation,
      resetAll,
      glassClarity, setGlassClarity,
      hasBeenSaved
    }}>
      {children}
    </SimulationContext.Provider>
  );
}
