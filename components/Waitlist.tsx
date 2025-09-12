import React from 'react';
import WaitlistForm from './WaitlistForm';

const Waitlist: React.FC = () => {
  const futureTools = [
    {
        name: 'AI Site Auditor',
        description: 'Get a comprehensive, AI-powered audit of your website. We\'ll analyze performance, SEO, and accessibility, then provide plain-English recommendations and code snippets to fix issues.'
    },
    {
        name: 'Automated Test Center',
        description: 'Describe user flows in plain English and our AI will generate ready-to-use test scripts for Cypress and Playwright, saving your QA team hours of manual work.'
    },
    {
        name: 'AI Code Refactor',
        description: 'Paste your legacy code (JS, Python, etc.) and our AI will refactor it for performance, readability, and modern best practices, complete with explanations for every change.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text mb-2">The Future of Web Development is Coming</h2>
        <p className="text-text-muted text-lg">Join the waitlist to get exclusive early access to our next generation of AI-powered tools.</p>
      </div>

      <div className="bg-surface p-8 rounded-xl shadow-2xl border border-border">
        <WaitlistForm />
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 pt-6">
        {futureTools.map((tool) => (
          <div key={tool.name} className="bg-surface p-6 rounded-lg border border-border hover:border-secondary transition-colors duration-300">
            <h4 className="font-bold text-lg text-text mb-2">{tool.name}</h4>
            <p className="text-sm text-text-muted leading-relaxed">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Waitlist;