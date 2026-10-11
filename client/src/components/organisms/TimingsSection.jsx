import React, { useContext } from 'react';
import { User, ChevronUp, ChevronDown } from 'lucide-react';
import { SimulationContext } from '../../SimulationContext';

export default function TimingsSection() {
  const { directions, laneConfigs, phaseTimings, updateTiming, pedestrians, pedestrianTimings, updatePedestrianTiming, glassClarity } = useContext(SimulationContext);

  const getArrowSymbol = (type) => {
    switch (type) {
      case 'Left Turn': return '↰';
      case 'Right Turn': return '↱';
      case 'Straight': return '↑';
      case 'U-Turn': return '↩';
      case 'Left & Straight': return '↰ ↑';
      case 'Straight & Right': return '↑ ↱';
      case 'Left & Right': return '↰ ↱';
      case 'Left & U-Turn': return '↰ ↩';
      case 'Straight & U-Turn': return '↑ ↩';
      case 'Right & U-Turn': return '↱ ↩';
      case 'Left, Straight, & U-Turn': return '↰ ↑ ↩';
      case 'U-Turn, Straight, & Right': return '↩ ↑ ↱';
      default: return '↑';
    }
  };

  const glassStyle = {
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    borderColor: 'var(--glass-border)',
    boxShadow: `0 20px 40px rgba(0, 0, 0, ${0.03 + glassClarity * 0.05})`,
    fontFamily: 'Arial, sans-serif'
  };

  const tableHeaderStyle = {
    backgroundColor: 'var(--input-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    borderColor: 'var(--glass-border)',
    fontFamily: 'Arial, sans-serif'
  };

  // Helper custom oval up/down picker component with press-and-hold auto increment/decrement
  const OvalNumberPicker = ({ value, min = 0, onChange, colorScheme = 'green' }) => {
    const num = Number(value) || 0;
    const timerRef = React.useRef(null);
    const speedTimerRef = React.useRef(null);
    const isChangingRef = React.useRef(false);

    const stopChange = React.useCallback(() => {
      isChangingRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (speedTimerRef.current) {
        clearInterval(speedTimerRef.current);
        speedTimerRef.current = null;
      }
    }, []);

    const startChange = (delta) => {
      stopChange(); // Clear any existing timers first
      isChangingRef.current = true;
      let currentVal = Math.max(min, num + delta);
      onChange(currentVal);
      
      // Delay before rapid continuous change starts
      timerRef.current = setTimeout(() => {
        if (!isChangingRef.current) return;
        speedTimerRef.current = setInterval(() => {
          if (!isChangingRef.current) {
            stopChange();
            return;
          }
          currentVal = Math.max(min, currentVal + delta);
          onChange(currentVal);
        }, 80); // Quick tick every 80ms while held
      }, 350);
    };

    // Global mouseup/touchend listener to guarantee numbers STOP incrementing/decrementing immediately upon release anywhere
    React.useEffect(() => {
      const handleGlobalRelease = () => {
        if (isChangingRef.current) {
          stopChange();
        }
      };
      window.addEventListener('mouseup', handleGlobalRelease);
      window.addEventListener('touchend', handleGlobalRelease);
      window.addEventListener('touchcancel', handleGlobalRelease);
      return () => {
        stopChange();
        window.removeEventListener('mouseup', handleGlobalRelease);
        window.removeEventListener('touchend', handleGlobalRelease);
        window.removeEventListener('touchcancel', handleGlobalRelease);
      };
    }, [stopChange]);

    const colors = {
      green: {
        text: 'text-green-700',
        bg: 'bg-green-50/50 hover:bg-green-50',
        focus: 'focus-within:ring-green-400',
        btnHover: 'hover:bg-green-100 hover:text-green-800'
      },
      yellow: {
        text: 'text-yellow-600',
        bg: 'bg-yellow-50/50 hover:bg-yellow-50',
        focus: 'focus-within:ring-yellow-400',
        btnHover: 'hover:bg-yellow-100 hover:text-yellow-800'
      },
      red: {
        text: 'text-red-600',
        bg: 'bg-red-50/50 hover:bg-red-50',
        focus: 'focus-within:ring-red-400',
        btnHover: 'hover:bg-red-100 hover:text-red-800'
      }
    }[colorScheme] || {
      text: 'text-gray-800',
      bg: 'bg-gray-50',
      focus: 'focus-within:ring-blue-400',
      btnHover: 'hover:bg-gray-200'
    };

    return (
      <div 
        className={`w-36 h-12 rounded-full border border-gray-300/80 bg-white/95 px-3 flex items-center justify-between mx-auto shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-400 ${colors.focus}`}
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        <button
          type="button"
          onMouseDown={() => startChange(-1)}
          onMouseUp={stopChange}
          onMouseLeave={stopChange}
          onTouchStart={() => startChange(-1)}
          onTouchEnd={stopChange}
          className={`w-7 h-7 rounded-full flex items-center justify-center text-gray-500 transition-all duration-150 active:scale-90 select-none ${colors.btnHover}`}
          title="Decrease (Click or press & hold)"
        >
          <ChevronDown size={18} />
        </button>

        <input
          type="number"
          min={min}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`w-12 text-center font-black text-lg bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${colors.text}`}
        />

        <button
          type="button"
          onMouseDown={() => startChange(1)}
          onMouseUp={stopChange}
          onMouseLeave={stopChange}
          onTouchStart={() => startChange(1)}
          onTouchEnd={stopChange}
          className={`w-7 h-7 rounded-full flex items-center justify-center text-gray-500 transition-all duration-150 active:scale-90 select-none ${colors.btnHover}`}
          title="Increase (Click or press & hold)"
        >
          <ChevronUp size={18} />
        </button>
      </div>
    );
  };

  return (
    <section className="border p-8 rounded-3xl shadow-sm transition-all" style={glassStyle}>
      <div>
        <h2 className="text-xl font-black text-gray-900 mb-2 flex items-center gap-3" style={{ fontFamily: 'Arial, sans-serif' }}>
          <span className="bg-gradient-to-tr from-blue-600 to-blue-500 text-white w-8 h-8 rounded-2xl flex items-center justify-center text-sm shadow-md shadow-blue-500/20">4</span>
          Phase Timings Calculator
        </h2>
        <p className="text-xs text-gray-600 font-medium ml-11 mb-6">Specify precise Green Go (G), Caution (C), and Red Clearance (RC) intervals in seconds for every lane configuration and pedestrian crossing.</p>
      </div>

      <div className="border rounded-2xl shadow-sm overflow-hidden overflow-x-auto transition-all" style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--card-bg)' }}>
        <table className="w-full text-left min-w-[600px]">
          <thead className="border-b text-gray-800 text-sm font-extrabold" style={{ borderColor: 'var(--glass-border)', ...tableHeaderStyle }}>
            <tr>
              <th className="p-4" style={{ fontFamily: 'Arial, sans-serif' }}>Lane Configuration</th>
              <th className="p-4 text-center border-l" style={{ borderColor: 'var(--glass-border)', fontFamily: 'Arial, sans-serif' }}>Go (G)</th>
              <th className="p-4 text-center border-l" style={{ borderColor: 'var(--glass-border)', fontFamily: 'Arial, sans-serif' }}>Caution (C)</th>
              <th className="p-4 text-center border-l" style={{ borderColor: 'var(--glass-border)', fontFamily: 'Arial, sans-serif' }}>Red Clearance (RC)</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--glass-border)' }}>
            {Object.keys(directions).filter(d => directions[d]).map(dir => (
              <React.Fragment key={dir}>
                {(laneConfigs[dir] || []).map(lane => {
                  const key = `${dir}-${lane.id}`;
                  const t = phaseTimings[key] || { go: 1, amber: 3, red: 2 };
                  const arrow = getArrowSymbol(lane.type);
                  return (
                    <tr key={key} className="hover:bg-white/40 transition-colors">
                      <td className="p-4">
                        {/* Larger circle badge fitting 1, 2, or 3 arrows in one line */}
                        <div className="font-extrabold text-gray-900 flex items-center gap-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                          <span>{dir} Lane {lane.id}</span>
                          <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-xs shrink-0 px-1 whitespace-nowrap">
                            {arrow}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-gray-700 bg-white/90 border border-gray-200/80 inline-block px-3 py-0.5 rounded-full mt-1.5 shadow-2xs">
                          {lane.type}
                        </div>
                      </td>
                      <td className="p-4 border-l bg-green-50/20" style={{ borderColor: 'var(--glass-border)' }}>
                        <OvalNumberPicker
                          value={t.go ?? 1}
                          min={0}
                          colorScheme="green"
                          onChange={val => updateTiming(key, 'go', val)}
                        />
                      </td>
                      <td className="p-4 border-l bg-yellow-50/20" style={{ borderColor: 'var(--glass-border)' }}>
                        <OvalNumberPicker
                          value={t.amber ?? 3}
                          min={0}
                          colorScheme="yellow"
                          onChange={val => updateTiming(key, 'amber', val)}
                        />
                      </td>
                      <td className="p-4 border-l bg-red-50/20" style={{ borderColor: 'var(--glass-border)' }}>
                        <OvalNumberPicker
                          value={t.red ?? 2}
                          min={0}
                          colorScheme="red"
                          onChange={val => updateTiming(key, 'red', val)}
                        />
                      </td>
                    </tr>
                  );
                })}

                {/* Pedestrian row with Pedestrian Symbol AFTER the Pedestrian word */}
                {pedestrians[dir] === 'Yes' && (() => {
                  const p = pedestrianTimings[dir] || { go: 1, red: 2 };
                  return (
                    <tr className="bg-blue-50/30 hover:bg-blue-50/60 transition-colors">
                      <td className="p-4">
                        <div className="font-extrabold text-blue-900 flex items-center gap-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                          <span>{dir} Pedestrian</span>
                          <User size={16} className="text-blue-600 stroke-[2.5]" />
                        </div>
                        <div className="text-xs font-bold text-blue-700 bg-blue-100/90 border border-blue-200 inline-block px-3 py-0.5 rounded-full mt-1.5 shadow-2xs">Pedestrian Crossing</div>
                      </td>
                      <td className="p-4 border-l bg-green-50/20" style={{ borderColor: 'var(--glass-border)' }}>
                        <OvalNumberPicker
                          value={p.go ?? 1}
                          min={0}
                          colorScheme="green"
                          onChange={val => updatePedestrianTiming(dir, 'go', val)}
                        />
                      </td>
                      <td className="p-4 border-l bg-white/30 text-center text-gray-400 font-bold" style={{ borderColor: 'var(--glass-border)' }}>
                        —
                      </td>
                      <td className="p-4 border-l bg-red-50/20" style={{ borderColor: 'var(--glass-border)' }}>
                        <OvalNumberPicker
                          value={p.red ?? 2}
                          min={0}
                          colorScheme="red"
                          onChange={val => updatePedestrianTiming(dir, 'red', val)}
                        />
                      </td>
                    </tr>
                  );
                })()}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
