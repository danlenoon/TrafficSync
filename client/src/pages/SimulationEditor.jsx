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
  const { roadName, directions, laneConfigs, pedestrians, phases, saveCurrentSimulation, glassClarity, hasBeenSaved } = useContext(SimulationContext);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showBackDialog, setShowBackDialog] = useState(false);

  const hasUnsavedChanges = roadName.trim().length > 0 || Object.values(directions).some(Boolean);

  const handleBackClick = () => {
    if (hasUnsavedChanges && !hasBeenSaved) {
      setShowBackDialog(true);
    } else {
      navigate('/');
    }
  };

  const handleSave = () => {
    const hasIntersectionName = roadName.trim().length > 0;
    const hasActiveDir = Object.values(directions).some(Boolean);
    const totalLanesCount = Object.keys(directions).reduce((acc, dir) => acc + (laneConfigs[dir] || []).length, 0);

    if (!hasIntersectionName || !hasActiveDir || totalLanesCount === 0) {
      setErrorMsg('Validation Error: You must provide an intersection name, select at least 1 direction, and configure at least 1 lane.');
      setTimeout(() => setErrorMsg(''), 7000);
      return;
    }
    saveCurrentSimulation();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCalculate = () => {
    const hasIntersectionName = roadName.trim().length > 0;
    const hasActiveDir = Object.values(directions).some(Boolean);
    const totalLanesCount = Object.keys(directions).reduce((acc, dir) => acc + (laneConfigs[dir] || []).length, 0);

    if (!hasIntersectionName) {
      setErrorMsg('Validation Error: Please provide an intersection name.');
      setTimeout(() => setErrorMsg(''), 7000);
      return;
    }
    if (!hasActiveDir) {
      setErrorMsg('Validation Error: Please select at least 1 direction.');
      setTimeout(() => setErrorMsg(''), 7000);
      return;
    }
    if (totalLanesCount === 0) {
      setErrorMsg('Validation Error: You must configure at least one lane in Lane Customization.');
      setTimeout(() => setErrorMsg(''), 7000);
      return;
    }
    if (phases.length < 2) {
      setErrorMsg('Validation Error: There must be at least 2 phases configured in the Interactive Traffic Light Phase Builder.');
      setTimeout(() => setErrorMsg(''), 7000);
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

  // Light appearance for popups when in ultra clear Liquid Glass (matching Dashboard modals)
  const popupBg = glassClarity < 0.3 ? 'rgba(255, 255, 255, 0.95)' : 'var(--card-bg)';
  const popupTextColor = glassClarity < 0.3 ? '#1f2937' : 'var(--text-main)';

  const popupStyle = {
    backgroundColor: popupBg,
    backdropFilter: `blur(${glassClarity * 16}px)`,
    borderColor: glassClarity < 0.3 ? 'rgba(209, 213, 219, 0.8)' : 'var(--glass-border)',
    color: popupTextColor
  };

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-right-4 relative" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Unsaved Changes Warning Modal unified with Delete & Reset All modal color appearance */}
      {showBackDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in" style={{ backdropFilter: `blur(${glassClarity * 12}px)` }}>
          <div 
            className="max-w-md w-full p-8 rounded-3xl border shadow-2xl space-y-6 animate-in zoom-in-95"
            style={popupStyle}
          >
            <h3 className="text-xl font-black">Unsaved Changes</h3>
            <p className="text-sm font-medium opacity-85">You have unsaved changes in your simulation. Are you sure you want to leave without saving?</p>
            <div className="flex gap-3 justify-end pt-2">
              <Button onClick={() => setShowBackDialog(false)} variant="outline" className="rounded-full">
                Cancel
              </Button>
              <Button onClick={() => navigate('/')} variant="danger" className="rounded-full">
                Leave without saving
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Notification Friendly Popup Pill (Stays 7s, clickable to dismiss without hover title) */}
      {errorMsg && (
        <div 
          onClick={() => setErrorMsg('')}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 cursor-pointer group"
        >
          <div 
            className="px-8 py-3.5 rounded-full shadow-2xl font-extrabold text-sm border flex items-center gap-3 backdrop-blur-xl transition-all group-hover:scale-[1.02]"
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
          <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Arial, sans-serif', color: 'var(--text-main)' }}>Simulation Editor</h1>
          <p className="font-medium" style={{ color: 'var(--text-muted)' }}>Configure your intersection geometry, lanes, and phase timings.</p>
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
