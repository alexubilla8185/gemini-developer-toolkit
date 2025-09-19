import React from 'react';
import WaitlistForm from './WaitlistForm';

const Waitlist: React.FC = () => {
  const futureTools = [
    {
        name: 'AI Site Auditor',
        description: 'Get a comprehensive, AI-powered audit of your website for performance, SEO, and accessibility, complete with actionable code snippets.'
    },
    {
        name: 'Automated Test Center',
        description: 'Describe user flows in plain English and our AI will generate ready-to-use test scripts for Cypress and Playwright.'
    },
    {
        name: 'AI Code Refactor',
        description: 'Paste your legacy code and our AI will refactor it for performance and readability, explaining every change.'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 animate-fade-in py-16 sm:py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight text-text sm:text-5xl mb-4">What's Next?</h2>
        <p className="text-lg text-text-muted">Join the waitlist for our next generation of AI-powered developer tools.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {futureTools.map((tool) => (
          <div key={tool.name} className="bg-surface p-6 rounded-lg border border-border hover:border-secondary transition-colors duration-300 transform hover:-translate-y-1">
            <h4 className="font-bold text-lg text-text mb-2">{tool.name}</h4>
            <p className="text-sm text-text-muted leading-relaxed">{tool.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface p-8 rounded-xl shadow-2xl border border-border">
        <WaitlistForm />
      </div>

    </div>
  );
};

export default Waitlist;