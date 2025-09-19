import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../types';
import Logo from './Logo';
import { ICONS } from '../constants';
import Tooltip from './Tooltip';

interface HeaderProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  onHowItWorksClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTool, setActiveTool, onHowItWorksClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileLinkClick = (tool: Tool) => {
    setActiveTool(tool);
    setIsMobileMenuOpen(false);
  };

  const navButtonClasses = (tool: Tool) => 
    `px-2 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 ${
      activeTool === tool
        ? 'text-secondary'
        : 'text-text-muted hover:text-text'
    }`;
    
  const mobileNavButtonClasses = (tool: Tool) => 
    `block w-full text-left px-4 py-3 text-base font-medium rounded-md transition-colors duration-200 ${
      activeTool === tool
        ? 'bg-secondary text-background'
        : 'text-text-muted hover:bg-surface hover:text-text'
    }`;

  return (
    <header className="bg-background/90 backdrop-blur-sm sticky top-0 z-20 border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 md:px-8" aria-label="Main navigation">
        <div className="flex justify-between items-center py-3">
            <Link to="/" aria-label="Go to homepage" onClick={() => setIsMobileMenuOpen(false)}>
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 sm:space-x-2">
              <button onClick={() => setActiveTool(Tool.Component)} className={navButtonClasses(Tool.Component)}>UI Generator</button>
              <button onClick={() => setActiveTool(Tool.Regex)} className={navButtonClasses(Tool.Regex)}>Regex Generator</button>
              <button onClick={() => setActiveTool(Tool.Json)} className={navButtonClasses(Tool.Json)}>JSON Formatter</button>
              <button onClick={() => setActiveTool(Tool.Cron)} className={navButtonClasses(Tool.Cron)}>Cron Generator</button>
              <button onClick={() => setActiveTool(Tool.Favorites)} className={navButtonClasses(Tool.Favorites)}>Collection</button>
              <div className="border-l border-border h-6 mx-2"></div>
              <Tooltip text="How it works">
                  <button onClick={onHowItWorksClick} className="p-2 text-text-muted hover:text-text rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-secondary" aria-label="Open help modal">
                    {ICONS.QUESTION_MARK}
                  </button>
                </Tooltip>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-text-muted hover:text-text rounded-md"
                    aria-controls="mobile-menu"
                    aria-expanded={isMobileMenuOpen}
                    aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
                >
                    {isMobileMenuOpen ? ICONS.CLOSE : ICONS.HAMBURGER}
                </button>
            </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
            <div id="mobile-menu" className="md:hidden pb-4">
                <div className="flex flex-col space-y-1">
                    <button onClick={() => handleMobileLinkClick(Tool.Component)} className={mobileNavButtonClasses(Tool.Component)}>UI Generator</button>
                    <button onClick={() => handleMobileLinkClick(Tool.Regex)} className={mobileNavButtonClasses(Tool.Regex)}>Regex Generator</button>
                    <button onClick={() => handleMobileLinkClick(Tool.Json)} className={mobileNavButtonClasses(Tool.Json)}>JSON Formatter</button>
                    <button onClick={() => handleMobileLinkClick(Tool.Cron)} className={mobileNavButtonClasses(Tool.Cron)}>Cron Generator</button>
                    <button onClick={() => handleMobileLinkClick(Tool.Favorites)} className={mobileNavButtonClasses(Tool.Favorites)}>Collection</button>
                     <div className="border-t border-border pt-4 mt-2">
                        <button onClick={() => { onHowItWorksClick(); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 w-full text-left px-4 py-3 text-base font-medium text-text-muted hover:bg-surface hover:text-text rounded-md">
                            {ICONS.QUESTION_MARK}
                            <span>How it works</span>
                        </button>
                    </div>
                </div>
            </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
