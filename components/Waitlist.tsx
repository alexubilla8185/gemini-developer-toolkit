import React, { useState, useCallback } from 'react';
import { ICONS } from '../constants';
import LoadingSpinner from './LoadingSpinner';

const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate a network request
    setTimeout(() => {
      console.log(`Waitlist submission: ${email}`);
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  }, [email, isLoading]);
  
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
        {isSubmitted ? (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-2xl font-bold text-text">You're on the list!</h3>
            <p className="mt-2 text-text-muted">Thank you for joining. We'll send you an email as soon as we're ready to launch.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter your email address"
                  className="flex-grow w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none transition-shadow text-text placeholder-text-muted"
                  disabled={isLoading}
                  aria-label="Email Address"
                  aria-describedby="email-error"
                />
                {error && <p id="email-error" className="mt-2 text-sm text-danger">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 font-semibold text-background bg-secondary rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-secondary disabled:bg-surface disabled:text-text-muted disabled:cursor-not-allowed transition-colors shrink-0"
            >
                {isLoading ? <LoadingSpinner /> : ICONS.PAPER_PLANE }
                <span className="ml-2">{isLoading ? 'Joining...' : 'Join Waitlist'}</span>
            </button>
          </form>
        )}
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