import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../types';
import Logo from './Logo';

interface HeaderProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTool, setActiveTool }) => {
  const navButtonClasses = (tool: Tool) => 
    `px-2 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 ${
      activeTool === tool
        ? 'text-secondary'
        : 'text-text-muted hover:text-text'
    }`;

  return (
    <header className="bg-background/90 backdrop-blur-sm sticky top-0 z-10 border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 md:px-8 py-3 flex justify-between items-center" aria-label="Main navigation">
        <Link to="/" aria-label="Go to homepage">
          <Logo />
        </Link>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setActiveTool(Tool.Component)}
            className={navButtonClasses(Tool.Component)}
          >
            UI Generator
          </button>
          <button
            onClick={() => setActiveTool(Tool.Regex)}
            className={navButtonClasses(Tool.Regex)}
          >
            Regex Generator
          </button>
          <button
            onClick={() => setActiveTool(Tool.Json)}
            className={navButtonClasses(Tool.Json)}
          >
            JSON Formatter
          </button>
          <button
            onClick={() => setActiveTool(Tool.Cron)}
            className={navButtonClasses(Tool.Cron)}
          >
            Cron Generator
          </button>
          <button
            onClick={() => setActiveTool(Tool.Favorites)}
            className={navButtonClasses(Tool.Favorites)}
          >
            Collection
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;