import React, { useContext } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import SimulationCard from '../components/molecules/SimulationCard';
import { SimulationContext } from '../SimulationContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { savedSimulations, deleteSimulation, loadSimulation } = useContext(SimulationContext);

  const handleLoad = (sim) => {
    loadSimulation(sim);
    navigate('/editor');
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Welcome back to TrafficSync</p>
        </div>
        <Button onClick={() => navigate('/editor')} variant="primary">
          <Plus size={18} /> New Simulation
        </Button>
      </div>

      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Saved Simulations</h2>

      {savedSimulations.length === 0 ? (
        <div className="bg-white p-10 rounded-xl border border-gray-200 text-center flex flex-col items-center justify-center my-2 shadow-sm">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 border border-blue-100">
            <Plus size={28} />
          </div>
          <h3 className="font-bold text-gray-800 text-lg mb-1">No Saved Simulations</h3>
          <p className="text-gray-500 text-sm max-w-md mb-6">You haven't created any simulations yet. Click below to start configuring intersection lanes and cycle timings.</p>
          <Button onClick={() => navigate('/editor')} variant="primary">
            <Plus size={18} /> Create First Simulation
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {savedSimulations.map((sim) => (
            <SimulationCard
              key={sim.id}
              title={sim.title}
              lanesCount={sim.lanesCount}
              cycleLength={sim.cycleLength}
              onClick={() => handleLoad(sim)}
              onDelete={() => deleteSimulation(sim.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
