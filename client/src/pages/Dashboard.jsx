import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import SimulationCard from '../components/molecules/SimulationCard';

export default function Dashboard() {
  const navigate = useNavigate();

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <SimulationCard 
          title="Main St & 1st Ave"
          lanesCount={4}
          cycleLength={120}
          onClick={() => navigate('/results')}
        />
      </div>
    </div>
  );
}
