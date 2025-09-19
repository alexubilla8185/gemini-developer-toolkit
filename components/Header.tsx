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
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
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
            onClick={() => setActiveTool(Tool.Waitlist)}
            className={navButtonClasses(Tool.Waitlist)}
          >
            Coming Soon
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;