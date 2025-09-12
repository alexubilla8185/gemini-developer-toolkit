import React, { useState, useCallback } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { ICONS } from '../constants';

const SiteAuditor: React.FC = () => {
    const [siteUrl, setSiteUrl] = useState('');
    const [auditResult, setAuditResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAudit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!siteUrl.trim()) {
            setError('Please enter a valid URL.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setAuditResult(null);

        try {
            const response = await fetch('/.netlify/functions/run-audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: siteUrl }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to run the audit. Please try again.');
            }
            
            setAuditResult(data.summary);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [siteUrl]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Panel: Input */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-text mb-2">AI Site Auditor</h2>
                    <p className="text-text-muted">Enter a URL to receive a comprehensive, AI-powered audit of your website's performance, SEO, and accessibility.</p>
                </div>
                <form onSubmit={handleAudit} className="space-y-4">
                    <input
                        type="url"
                        value={siteUrl}
                        onChange={(e) => setSiteUrl(e.target.value)}
                        placeholder="e.g., https://example.com"
                        className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none transition-shadow"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 font-semibold text-background bg-secondary rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-secondary disabled:bg-surface disabled:text-text-muted disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? <LoadingSpinner /> : null}
                        <span className={isLoading ? 'ml-2' : ''}>{isLoading ? 'Auditing...' : 'Audit Site'}</span>
                    </button>
                </form>
            </div>

            {/* Right Panel: Output */}
            <div className="lg:col-span-3 bg-surface rounded-lg border border-border min-h-[60vh] flex flex-col p-6">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full text-text-muted p-8">
                        <LoadingSpinner />
                        <p className="mt-4 text-sm">Auditing your site... This may take a moment.</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <h3 className="font-semibold text-danger">Audit Failed</h3>
                        <p className="mt-2 text-sm text-danger bg-danger/10 p-4 rounded-md w-full">{error}</p>
                    </div>
                ) : auditResult ? (
                    <div className="w-full h-full overflow-y-auto">
                        <pre className="whitespace-pre-wrap font-sans text-text-sm leading-relaxed">{auditResult}</pre>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-text-muted p-8 text-center">
                        <div className="w-16 h-16 flex items-center justify-center bg-background rounded-full mb-4 text-secondary">
                           {ICONS.ANALYTICS}
                        </div>
                        <h3 className="text-lg font-semibold text-text">Your site audit report will appear here</h3>
                        <p className="mt-1 text-sm">Enter a URL to begin.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SiteAuditor;
