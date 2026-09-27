import React from 'react';
import { ArrowLeft, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import SetupSection from '../components/organisms/SetupSection';
import LanesSection from '../components/organisms/LanesSection';
import TimingsSection from '../components/organisms/TimingsSection';

export default function SimulationEditor() {
  const navigate = useNavigate();

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
        <Button onClick={() => navigate('/results')} variant="accent" className="w-full sm:w-auto justify-center sticky top-4 z-20">
          <Activity size={18} /> Calculate Cycle
        </Button>
      </div>

      <div className="space-y-8 pb-12">
        <SetupSection />
        <LanesSection />
        <TimingsSection />
      </div>
    </div>
  );
}
