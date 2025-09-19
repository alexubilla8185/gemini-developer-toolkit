import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../constants';
import { MadeByTekguyz } from './MadeByTekguyz';
import AppSpecsModal from './AppSpecsModal';
import FooterLogo from './FooterLogo';
import Waitlist from './Waitlist'; // Import the Waitlist component

const FeatureCard: React.FC<{ title: string; description: string; icon: JSX.Element }> = ({ title, description, icon }) => (
    <div className="bg-surface p-6 rounded-lg border border-border transition-all duration-300 hover:border-secondary hover:shadow-2xl transform hover:-translate-y-1">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary/10 text-secondary mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-text mb-2">{title}</h3>
        <p className="text-text-muted">{description}</p>
    </div>
);


const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans text-text flex flex-col">
        {/* Hero Section */}
        <main className="flex-grow flex items-center justify-center p-4 py-20 sm:py-32">
            <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
                    <span className="bg-gradient-to-r from-secondary via-teal-400 to-sky-400 text-transparent bg-clip-text">
                        Your AI-Powered
                    </span>
                    <br />
                    Frontend Co-pilot.
                </h1>
                <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10">
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
      
        {/* Features Section */}
        <section className="py-16 sm:py-24 bg-background border-t border-border">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
                <h2 className="text-center text-4xl font-bold tracking-tight text-text sm:text-5xl mb-12">
                    Key Features
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                   <FeatureCard 
                        title="UI Component Generator"
                        description="Describe the component you want in plain English. Our AI will generate the full React and Tailwind CSS code for you."
                        icon={ICONS.WAND}
                   />
                   <FeatureCard 
                        title="Regex Generator"
                        description="Struggling with complex patterns? Describe what you need to match, and get the regex and a detailed explanation instantly."
                        icon={ICONS.WAND}
                   />
                </div>
            </div>
        </section>

        {/* Waitlist Section */}
        <section className="px-4 sm:px-6 md:px-8 bg-surface border-t border-border">
            <Waitlist />
        </section>
      
        <footer className="text-center p-6 text-sm text-text-muted border-t border-border bg-background">
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

export default LandingPage;