import React, { useState, useCallback } from 'react';
import { generateCron } from '../services/geminiService';
import CodeBlock from './CodeBlock';
import LoadingSpinner from './LoadingSpinner';
import type { CronResponse } from '../types';
import { ICONS } from '../constants';
import { useNotification } from '../context/NotificationContext';
import Tooltip from './Tooltip';

const CronGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<CronResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      const errorMessage = 'Prompt cannot be empty.';
      setError(errorMessage);
      showNotification(errorMessage, 'error');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await generateCron(prompt);
      setResult(response);
    } catch (err: any) {
      const errorMessage = err.message || 'An unknown error occurred.';
      setError(errorMessage);
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, showNotification]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left Panel: Input */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-text mb-2">AI Cron Job Generator</h2>
          <p className="text-text-muted">Describe a schedule in plain English, and the AI will generate the cron expression and an explanation.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="cron-prompt" className="sr-only">Cron Description</label>
          <textarea
            id="cron-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'every 5 minutes', or 'at 2am on the first Monday of every month'."
            className="w-full h-32 p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none transition-shadow"
            disabled={isLoading}
          />
          <Tooltip text="Generate cron expression using AI">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 font-semibold text-background bg-secondary rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-secondary disabled:bg-surface disabled:text-text-muted disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? <LoadingSpinner /> : ICONS.CLOCK}
              <span className="ml-2">{isLoading ? 'Generating...' : 'Generate Cron'}</span>
            </button>
          </Tooltip>
        </form>
      </div>

      {/* Right Panel: Output */}
      <div className="lg:col-span-3 bg-surface rounded-lg border border-border min-h-[60vh] flex flex-col p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-text-muted p-8">
            <LoadingSpinner />
            <p className="mt-4 text-sm">AI is crafting your cron expression...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <h3 className="font-semibold text-danger">Generation Failed</h3>
            <div role="alert" className="mt-2 text-sm text-danger bg-danger/10 p-4 rounded-md w-full">{error}</div>
          </div>
        ) : result ? (
          <div className="space-y-6 animate-fade-in">
             <div>
                <h3 className="font-semibold text-text">Generated Cron Expression</h3>
            </div>
            <CodeBlock code={result.cronString} />
            <div>
              <h3 className="font-semibold mb-2 text-text">Explanation</h3>
              <div className="p-4 bg-background border border-border rounded-lg whitespace-pre-wrap text-sm leading-relaxed text-text">
                {result.explanation}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-text-muted p-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-background rounded-full mb-4">
              {ICONS.CLOCK}
            </div>
            <h3 className="text-lg font-semibold text-text">Your cron expression will appear here</h3>
            <p className="mt-1 text-sm">Describe the schedule you need to automate.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CronGenerator;