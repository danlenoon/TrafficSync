import React, { useContext } from 'react';
import { Activity, Sliders } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SimulationContext } from '../../SimulationContext';

export default function Navbar() {
  const { glassClarity, setGlassClarity } = useContext(SimulationContext);

  return (
    <header 
      className="border-b px-6 py-4 flex flex-col sm:flex-row items-center justify-between shrink-0 sticky top-0 z-50 transition-all shadow-md gap-4"
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'var(--card-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        borderColor: 'var(--glass-border)'
      }}
    >
      <Link to="/" className="flex items-center gap-3.5 cursor-pointer group">
        <div className="bg-gradient-to-tr from-blue-600 to-blue-500 text-white p-3.5 rounded-full group-hover:from-blue-700 group-hover:to-blue-600 transition-all shadow-lg shadow-blue-500/30 group-hover:scale-105">
          <Activity size={24} strokeWidth={2.5} />
        </div>
        <span className="font-black text-2xl tracking-tight text-gray-900" style={{ fontFamily: 'Arial, sans-serif' }}>TrafficSync</span>
      </Link>

      {/* iOS Liquid Glass Custom Visual Slider positioned on top-right with wider spacing */}
      <div className="flex items-center gap-6 ml-auto">
        <div 
          className="flex items-center gap-4 px-6 py-3 rounded-full border shadow-sm transition-all hover:shadow-md"
          style={{
            backgroundColor: 'var(--input-bg)',
            backdropFilter: 'blur(var(--glass-blur))',
            borderColor: 'var(--glass-border)'
          }}
        >
          <Sliders size={16} className="text-blue-600 shrink-0" />
          <div className="flex items-center gap-3.5">
            <span className="text-sm font-extrabold text-gray-400 select-none hover:text-gray-700 transition-colors" title="Ultra Clear">○</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={glassClarity} 
              onChange={(e) => setGlassClarity(Number(e.target.value))}
              className="w-44 sm:w-60 cursor-pointer h-2 bg-gray-200/80 rounded-full shadow-inner border border-white/90 transition-all"
              title="Adjust Liquid Glass clarity and tint"
            />
            <span className="text-sm font-extrabold text-blue-600 select-none hover:text-blue-700 transition-colors" title="Ultra Tinted">✦</span>
          </div>
        </div>
      </div>
    </header>
  );
}
