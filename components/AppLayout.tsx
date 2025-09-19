import React, { useState } from 'react';
import Header from './Header';
import ComponentGenerator from './ComponentGenerator';
import RegexGenerator from './RegexGenerator';
import { Tool } from '../types';
import { ICONS } from '../constants';
import { MadeByTekguyz } from './MadeByTekguyz';
import AppSpecsModal from './AppSpecsModal';
import FooterLogo from './FooterLogo';

const AppLayout: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.Component);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans text-text flex flex-col">
      <Header activeTool={activeTool} setActiveTool={setActiveTool} />
      <main className="p-4 sm:p-6 md:p-8 flex-grow">
        {activeTool === Tool.Component && <ComponentGenerator />}
        {activeTool === Tool.Regex && <RegexGenerator />}
      </main>
      <footer className="text-center p-4 text-sm text-text-muted border-t border-border">
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-6">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="hover:text-text transition-colors">
                    {ICONS.GITHUB}
                </a>
                <FooterLogo onClick={() => setIsModalOpen(true)} />
            </div>
        </div>
      </footer>
      <MadeByTekguyz theme="dark" />
      {isModalOpen && <AppSpecsModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default AppLayout;