import React, { useContext, useState } from 'react';
import { ChevronLeft, Activity, Save, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import SetupSection from '../components/organisms/SetupSection';
import LanesSection from '../components/organisms/LanesSection';
import PhaseBuilderSection from '../components/organisms/PhaseBuilderSection';
import TimingsSection from '../components/organisms/TimingsSection';
import { SimulationContext } from '../SimulationContext';

export default function SimulationEditor() {
  const navigate = useNavigate();
  const { roadName, directions, laneConfigs, pedestrians, phases, saveCurrentSimulation, glassClarity } = useContext(SimulationContext);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showBackDialog, setShowBackDialog] = useState(false);

  const hasUnsavedChanges = roadName.trim().length > 0 || Object.values(directions).some(Boolean);

  const handleBackClick = () => {
    if (hasUnsavedChanges && !saved) {
      setShowBackDialog(true);
    } else {
      navigate('/');
    }
  };

  const handleSave = () => {
    const hasIntersectionName = roadName.trim().length > 0;
    const hasActiveDir = Object.values(directions).some(Boolean);
    const hasLanesOrPed = Object.keys(directions).some(d => directions[d] && ((laneConfigs[d] || []).length > 0 || pedestrians[d] === 'Yes'));
    if (!hasIntersectionName || !hasActiveDir || !hasLanesOrPed) {
      setErrorMsg('Please provide an intersection name, select at least 1 direction, and add at least 1 lane or pedestrian crossing.');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }
    saveCurrentSimulation();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCalculate = () => {
    const hasIntersectionName = roadName.trim().length > 0;
    const hasActiveDir = Object.values(directions).some(Boolean);
    const hasLanesOrPed = Object.keys(directions).some(d => directions[d] && ((laneConfigs[d] || []).length > 0 || pedestrians[d] === 'Yes'));
    const hasAtLeastTwoPhases = phases.length >= 2;
    const allPhasesHaveGo = phases.length >= 2 && phases.every(p => Object.values(p.lights).some(l => l === 'green'));

    if (!hasIntersectionName) {
      setErrorMsg('Validation Error: Please provide an intersection name.');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }
    if (!hasActiveDir) {
      setErrorMsg('Validation Error: Please select at least 1 direction.');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }
    if (!hasLanesOrPed) {
      setErrorMsg('Validation Error: Please add at least 1 lane (or select pedestrian crossing).');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }
    if (!hasAtLeastTwoPhases) {
      setErrorMsg('Validation Error: There must be at least 2 phases configured in the Interactive Traffic Light Phase Builder.');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }
    if (!allPhasesHaveGo) {
      setErrorMsg('Validation Error: At least each phase must have a green go signal configured.');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }

    navigate('/results');
  };

  const glassStyle = {
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    borderColor: 'var(--glass-border)',
    boxShadow: `0 20px 40px rgba(0, 0, 0, ${0.03 + glassClarity * 0.05})`,
    fontFamily: 'Arial, sans-serif'
  };

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-right-4 relative" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Unsaved Changes Warning Modal dynamically adapting to Liquid Glass blur */}
      {showBackDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in" style={{ backdropFilter: `blur(${glassClarity * 12}px)` }}>
          <div 
            className="max-w-md w-full p-8 rounded-3xl border shadow-2xl space-y-6 animate-in zoom-in-95"
            style={glassStyle}
          >
            <h3 className="text-xl font-black">Unsaved Changes</h3>
            <p className="text-sm font-medium text-gray-600">You have unsaved changes in your simulation. Are you sure you want to leave without saving?</p>
            <div className="flex gap-3 justify-end pt-2">
              <Button onClick={() => setShowBackDialog(false)} variant="outline" className="rounded-full">
                Cancel
              </Button>
              <Button onClick={() => navigate('/')} variant="primary" className="rounded-full bg-red-600 hover:bg-red-700 shadow-red-500/25">
                Leave without saving
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Notification Friendly Popup Pill dynamically adapting to Liquid Glass blur */}
      {errorMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4">
          <div 
            className="px-8 py-3.5 rounded-full shadow-2xl font-extrabold text-sm border flex items-center gap-3 backdrop-blur-xl"
            style={{
              backgroundColor: 'var(--card-bg)',
              backdropFilter: 'blur(var(--glass-blur))',
              borderColor: 'var(--glass-border)',
              color: 'var(--text-main)',
              boxShadow: `0 20px 40px rgba(0, 0, 0, ${0.1 + glassClarity * 0.1})`
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span>{errorMsg}</span>
          </div>
        </div>
      )}

      {/* iOS 27 Liquid Glass Back Button with Left Chevron */}
      <button 
        onClick={handleBackClick} 
        className="px-5 py-2.5 rounded-full border shadow-sm flex items-center gap-2.5 font-bold text-gray-800 transition-all duration-300 hover:scale-[1.03] active:scale-95 group mb-6 w-fit"
        style={{
          backgroundColor: 'var(--input-bg)',
          backdropFilter: 'blur(var(--glass-blur))',
          borderColor: 'var(--glass-border)',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <ChevronLeft size={16} className="text-blue-600 transition-transform group-hover:-translate-x-1" />
        <span>Back to Dashboard</span>
      </button>
      
      <div 
        className="p-8 rounded-3xl border mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 transition-all"
        style={glassStyle}
      >
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>Simulation Editor</h1>
          <p className="text-gray-600 font-medium">Configure your intersection geometry, lanes, and phase timings.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button onClick={handleSave} variant="outline" className="flex-1 sm:flex-none">
            {saved ? <><Check size={18} /> Saved!</> : <><Save size={18} /> Save</>}
          </Button>
          <Button onClick={handleCalculate} variant="accent" className="flex-1 sm:flex-none justify-center">
            <Activity size={18} /> Calculate Cycle
          </Button>
        </div>
      </div>

      <div className="space-y-8 pb-12">
        <SetupSection />
        <LanesSection />
        <PhaseBuilderSection />
        <TimingsSection />
      </div>
    </div>
  );
}
