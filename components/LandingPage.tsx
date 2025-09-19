import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../constants';
import { MadeByTekguyz } from './MadeByTekguyz';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background font-sans text-text flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-secondary via-teal-400 to-sky-400 text-transparent bg-clip-text">
              Your AI-Powered
            </span>
            <br />
            Frontend Co-pilot.
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-8">
            Web Check AI is a modern toolkit for developers. Leverage the power of Google's Gemini API to generate React components, create regular expressions, and accelerate your workflow.
          </p>
          <Link
            to="/app"
            className="inline-flex items-center justify-center px-8 py-4 font-semibold text-background bg-secondary rounded-lg shadow-lg text-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-secondary transition-transform transform hover:scale-105"
          >
            Launch the Toolkit
          </Link>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-text-muted border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
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
      <MadeByTekguyz theme="dark" />
    </div>
  );
};

export default LandingPage;