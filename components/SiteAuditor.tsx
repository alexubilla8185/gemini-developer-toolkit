import React from 'react';
import WaitlistForm from './WaitlistForm';
import { ICONS } from '../constants';

const SiteAuditor: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Panel: Input */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-text mb-2">AI Site Auditor</h2>
                    <p className="text-text-muted">Enter a URL to receive a comprehensive, AI-powered audit of your website's performance, SEO, and accessibility.</p>
                </div>
                <div className="space-y-4">
                    <input
                        type="url"
                        placeholder="e.g., https://example.com"
                        className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none transition-shadow"
                        disabled
                    />
                    <button
                        type="button"
                        disabled
                        className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 font-semibold text-background bg-secondary rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-secondary disabled:bg-surface disabled:text-text-muted disabled:cursor-not-allowed transition-colors"
                    >
                        <span>Audit Site</span>
                    </button>
                </div>
            </div>

            {/* Right Panel: Output */}
            <div className="lg:col-span-3 bg-surface rounded-lg border border-border min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-background rounded-full mb-4 text-secondary">
                   {ICONS.ANALYTICS}
                </div>
                <h3 className="text-xl font-bold text-text">Feature Coming Soon!</h3>
                <p className="mt-2 text-text-muted max-w-md">The AI Site Auditor is currently in development. Join the waitlist to be the first to know when it's available.</p>
                <div className="mt-6 w-full max-w-lg">
                    <WaitlistForm />
                </div>
            </div>
        </div>
    );
};

export default SiteAuditor;