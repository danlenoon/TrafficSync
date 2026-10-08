import React, { useContext } from 'react';
import { Map, Settings2, Trash2, Calendar, Compass } from 'lucide-react';
import { SimulationContext } from '../../SimulationContext';

export default function SimulationCard({ title, lanesCount, cycleLength, savedAt, directionsCount, onClick, onDelete }) {
  const { glassClarity } = useContext(SimulationContext);

  return (
    <div 
      onClick={onClick} 
      className="border p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] group relative backdrop-blur-md flex flex-col justify-between"
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'var(--card-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        borderColor: 'var(--glass-border)',
        boxShadow: `0 10px 25px rgba(0, 0, 0, ${0.03 + glassClarity * 0.04})`,
        color: 'var(--text-main)'
      }}
    >
      {/* Trash delete button enclosed in a circle button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={(e) => { e.stopPropagation(); onDelete && onDelete(); }}
          className="p-2.5 rounded-full text-gray-500 hover:text-red-600 bg-white/95 hover:bg-red-50 transition-all shadow-sm border border-gray-200"
          style={{ fontFamily: 'Arial, sans-serif' }}
          title="Delete simulation"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div>
        <div className="h-24 bg-blue-50/80 backdrop-blur-sm rounded-xl mb-4 flex items-center justify-center text-blue-400 border border-blue-100/50">
          <Map size={32} />
        </div>
        <h3 className="font-bold text-lg truncate pr-12 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>{title}</h3>
        
        <div className="space-y-1.5 text-xs text-gray-600 font-medium mb-4">
          <div className="flex items-center gap-2">
            <Settings2 size={13} className="text-blue-600" />
            <span>{lanesCount} Configured Lanes</span>
          </div>
          <div className="flex items-center gap-2">
            <Compass size={13} className="text-blue-500" />
            <span>{directionsCount || 0} Directions Configured</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-gray-400" />
            <span>Saved on {savedAt || 'Recent'}</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-200/60 flex justify-between items-center text-xs font-bold">
        <span className="text-gray-500">Total Cycle:</span>
        <span className="bg-blue-600 text-white px-3 py-1 rounded-full shadow-xs">{cycleLength}s</span>
      </div>
    </div>
  );
}
