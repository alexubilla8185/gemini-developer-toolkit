import React, { useState } from 'react';
import Header from './components/Header';
import ComponentGenerator from './components/ComponentGenerator';
import RegexGenerator from './components/RegexGenerator';
import Waitlist from './components/Waitlist';
import { Tool } from './types';
import { ICONS } from './constants';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.Component);

  return (
    <div className="min-h-screen bg-background font-sans text-text">
      <Header activeTool={activeTool} setActiveTool={setActiveTool} />
      <main className="p-4 sm:p-6 md:p-8">
        {activeTool === Tool.Component && <ComponentGenerator />}
        {activeTool === Tool.Regex && <RegexGenerator />}
        {activeTool === Tool.Waitlist && <Waitlist />}
      </main>
      <footer className="text-center p-4 text-sm text-text-muted border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <p>Designed & Developed by Alejandro Ubilla</p>
            <div className="flex items-center space-x-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="hover:text-text transition-colors">
                    {ICONS.GITHUB}
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="hover:text-text transition-colors">
                    {ICONS.LINKEDIN}
                </a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;