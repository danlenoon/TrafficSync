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
      setErrorMsg('Validation Error: Please select at least 1 active direction.');
      setTimeout(() => setErrorMsg(''), 7000);
      return;
    }
    if (totalLanesCount === 0) {
      setErrorMsg('Validation Error: Please add at least 1 lane in Lane Customization.');
      setTimeout(() => setErrorMsg(''), 7000);
      return;
    }

    const hasAtLeastTwoPhases = phases.length >= 2;
    if (!hasAtLeastTwoPhases) {
      setErrorMsg('Validation Error: There must be at least 2 phases configured in the Interactive Traffic Light Phase Builder.');
      setTimeout(() => setErrorMsg(''), 7000);
      return;
    }

    const allPhasesHaveGo = phases.every(p => Object.values(p.lights).some(l => l === 'green'));
    if (!allPhasesHaveGo) {
      setErrorMsg('Validation Error: At least each phase must have a green go signal configured.');
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

  // Dedicated dynamic style for the Back button inside the card adhering to Liquid Glass slider
  const backBtnGlassStyle = {
    backgroundColor: 'var(--input-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    borderColor: 'var(--glass-border)',
    color: 'var(--text-main)',
    fontFamily: 'Arial, sans-serif',
    boxShadow: `0 4px 14px rgba(0, 0, 0, ${0.04 + glassClarity * 0.08})`
  };

  // Popup styling adapting to Liquid Glass blur
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
      {/* Unsaved Changes Warning Modal dynamically adapting to Liquid Glass blur */}
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

      {/* Custom Notification Friendly Popup Pill dynamically adapting to Liquid Glass blur */}
      {errorMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 w-[92%] max-w-lg">
          <div 
            className="px-6 py-3.5 sm:px-8 rounded-full shadow-2xl font-extrabold text-xs sm:text-sm border flex items-center gap-3 backdrop-blur-xl transition-all"
            style={{
              backgroundColor: 'var(--card-bg)',
              backdropFilter: 'blur(var(--glass-blur))',
              borderColor: 'var(--glass-border)',
              color: 'var(--text-main)',
              boxShadow: `0 20px 40px rgba(0, 0, 0, ${0.1 + glassClarity * 0.1})`
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse shrink-0"></span>
            <span className="truncate sm:whitespace-normal">{errorMsg}</span>
          </div>
        </div>
      )}
      
      {/* Simulation Editor Card with Back button inside on the left and Right-Aligned Title & Subtitle */}
      <div 
        className="p-6 sm:p-8 rounded-3xl border mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 transition-all"
        style={glassStyle}
      >
        {/* Back to Dashboard Button inside the card on the left */}
        <button 
          onClick={handleBackClick} 
          className="px-5 py-2.5 rounded-full border flex items-center gap-2.5 font-bold transition-all duration-300 hover:scale-[1.03] active:scale-95 group shrink-0"
          style={backBtnGlassStyle}
        >
          <ChevronLeft size={16} className="text-blue-600 transition-transform group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </button>

        {/* Right-aligned Title & Subtitle */}
        <div className="text-left sm:text-right w-full sm:w-auto">
          <h1 className="text-2xl sm:text-3xl font-black mb-1" style={{ fontFamily: 'Arial, sans-serif', color: 'var(--text-main)' }}>Simulation Editor</h1>
          <p className="font-medium text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>Configure your intersection geometry, lanes, and phase timings.</p>
        </div>
      </div>

      <div className="space-y-8 pb-12">
        <SetupSection />
        <LanesSection />
        <PhaseBuilderSection />
        <TimingsSection />

        {/* Action Controls located directly below the Phase Timings Calculator */}
        <div 
          className="p-6 rounded-3xl border flex flex-col sm:flex-row justify-between items-center gap-4 transition-all shadow-md"
          style={glassStyle}
        >
          <div className="text-sm font-semibold text-center sm:text-left" style={{ color: 'var(--text-muted)' }}>
            Review your configurations above before saving or calculating cycle timings.
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
      </div>
    </div>
  );
}
