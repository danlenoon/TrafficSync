import React, { useContext, useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import SimulationCard from '../components/molecules/SimulationCard';
import { SimulationContext } from '../SimulationContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { savedSimulations, deleteSimulation, loadSimulation, glassClarity } = useContext(SimulationContext);
  const [deleteDialogId, setDeleteDialogId] = useState(null);

  const handleLoad = (sim) => {
    loadSimulation(sim);
    navigate('/editor');
  };

  const glassStyle = {
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    borderColor: 'var(--glass-border)',
    boxShadow: `0 20px 40px rgba(0, 0, 0, ${0.03 + glassClarity * 0.05})`,
    fontFamily: 'Arial, sans-serif'
  };

  // Light appearance for popups when in ultra clear Liquid Glass
  const popupBg = glassClarity < 0.3 ? 'rgba(255, 255, 255, 0.95)' : 'var(--card-bg)';
  const popupTextColor = glassClarity < 0.3 ? '#1f2937' : 'var(--text-main)';

  const popupStyle = {
    backgroundColor: popupBg,
    backdropFilter: `blur(${glassClarity * 16}px)`,
    borderColor: glassClarity < 0.3 ? 'rgba(209, 213, 219, 0.8)' : 'var(--glass-border)',
    color: popupTextColor
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in relative" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Deletion Confirmation Modal adapting to Liquid Glass blur and ultra clear light appearance */}
      {deleteDialogId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in" style={{ backdropFilter: `blur(${glassClarity * 12}px)` }}>
          <div 
            className="max-w-md w-full p-8 rounded-3xl border shadow-2xl space-y-6 animate-in zoom-in-95"
            style={popupStyle}
          >
            <h3 className="text-xl font-black">Delete Simulation?</h3>
            <p className="text-sm font-medium opacity-85">Are you sure you want to delete this saved simulation? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end pt-2">
              <Button onClick={() => setDeleteDialogId(null)} variant="outline" className="rounded-full">
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  deleteSimulation(deleteDialogId);
                  setDeleteDialogId(null);
                }} 
                variant="primary" 
                className="rounded-full bg-red-600 hover:bg-red-700 shadow-red-500/25"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <div 
        className="p-8 rounded-3xl border mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all"
        style={glassStyle}
      >
        <div>
          <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Arial, sans-serif', color: 'var(--text-main)' }}>Welcome back!</h1>
          <p className="font-medium" style={{ color: 'var(--text-muted)' }}>Design, calculate, and evaluate professional traffic intersection signal timings with precision.</p>
        </div>
        <Button onClick={() => navigate('/editor')} variant="primary">
          <Plus size={18} /> New Simulation
        </Button>
      </div>

      <h2 className="text-sm font-bold uppercase tracking-wider mb-4 px-1" style={{ color: 'var(--text-muted)' }}>Saved Simulations</h2>

      {savedSimulations.length === 0 ? (
        <div 
          className="p-12 rounded-3xl border text-center flex flex-col items-center justify-center my-2 transition-all"
          style={glassStyle}
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 border border-blue-100 shadow-inner">
            <Plus size={32} />
          </div>
          <h3 className="font-bold text-xl mb-1" style={{ fontFamily: 'Arial, sans-serif', color: 'var(--text-main)' }}>No Saved Simulations</h3>
          <p className="text-sm max-w-md mb-6 font-medium" style={{ color: 'var(--text-muted)' }}>You haven't created any simulations yet. Click below to start configuring intersection lanes and cycle timings.</p>
          <Button onClick={() => navigate('/editor')} variant="primary">
            <Plus size={18} /> Create First Simulation
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedSimulations.map((sim) => {
            const dirCount = sim.directions ? Object.values(sim.directions).filter(Boolean).length : 0;
            return (
              <SimulationCard
                key={sim.id}
                title={sim.title}
                lanesCount={sim.lanesCount}
                cycleLength={sim.cycleLength}
                savedAt={sim.savedAt}
                directionsCount={dirCount}
                onClick={() => handleLoad(sim)}
                onDelete={() => setDeleteDialogId(sim.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
