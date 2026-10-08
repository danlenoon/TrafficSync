import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/organisms/Navbar';
import Dashboard from './pages/Dashboard';
import SimulationEditor from './pages/SimulationEditor';
import Results from './pages/Results';
import { SimulationProvider } from './SimulationContext';

export default function App() {
  return (
    <SimulationProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
          <Navbar />
          <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/editor" element={<SimulationEditor />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </SimulationProvider>
  );
}
