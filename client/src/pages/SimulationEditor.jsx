import React, { useContext, useState } from 'react';
import { ArrowLeft, Activity, Save, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import SetupSection from '../components/organisms/SetupSection';
import LanesSection from '../components/organisms/LanesSection';
import TimingsSection from '../components/organisms/TimingsSection';
import { SimulationContext } from '../SimulationContext';

export default function SimulationEditor() {
  const navigate = useNavigate();
  const { saveCurrentSimulation } = useContext(SimulationContext);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveCurrentSimulation();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-right-4">
      <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-2 w-fit font-medium">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Simulation Editor</h1>
          <p className="text-gray-500">Configure your intersection geometry, lanes, and phase timings.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button onClick={handleSave} variant="outline" className="flex-1 sm:flex-none">
            {saved ? <><Check size={18} /> Saved!</> : <><Save size={18} /> Save</>}
          </Button>
          <Button onClick={() => navigate('/results')} variant="accent" className="flex-1 sm:flex-none justify-center">
            <Activity size={18} /> Calculate Cycle
          </Button>
        </div>
      </div>

      <div className="space-y-8 pb-12">
        <SetupSection />
        <LanesSection />
        <TimingsSection />
      </div>
    </div>
  );
}
