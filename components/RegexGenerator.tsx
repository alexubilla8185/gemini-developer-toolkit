import React, { useState, useCallback } from 'react';
import { generateRegex } from '../services/geminiService';
import CodeBlock from './CodeBlock';
import LoadingSpinner from './LoadingSpinner';
import type { RegexResponse } from '../types';
import { ICONS } from '../constants';
import { useNotification } from '../context/NotificationContext';
import { useFavorites } from '../context/FavoritesContext';
import Tooltip from './Tooltip';

const RegexGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<RegexResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();
  const { addFavoriteRegex } = useFavorites();

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
      const response = await generateRegex(prompt);
      setResult(response);
    } catch (err: any) {
      const errorMessage = err.message || 'An unknown error occurred.';
      setError(errorMessage);
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, showNotification]);

  const handleSaveToFavorites = () => {
    if (!result || !prompt) return;
    addFavoriteRegex({
      id: crypto.randomUUID(),
      prompt,
      pattern: result.pattern,
      explanation: result.explanation,
      createdAt: new Date().toISOString(),
    });
    showNotification('Regex saved to your collection!', 'success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left Panel: Input */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-text mb-2">AI Regex Generator</h2>
          <p className="text-text-muted">Describe the pattern you want to match, and the AI will generate the regex and a detailed explanation.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="regex-prompt" className="sr-only">Regex Description</label>
          <textarea
            id="regex-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'a valid email address', or 'a password with at least 8 characters, one number, and one uppercase letter'."
            className="w-full h-32 p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none transition-shadow"
            disabled={isLoading}
          />
          <Tooltip text="Generate regex using AI">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 font-semibold text-background bg-secondary rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-secondary disabled:bg-surface disabled:text-text-muted disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? <LoadingSpinner /> : ICONS.WAND}
              <span className="ml-2">{isLoading ? 'Generating...' : 'Generate Regex'}</span>
            </button>
          </Tooltip>
        </form>
      </div>

      {/* Right Panel: Output */}
      <div className="lg:col-span-3 bg-surface rounded-lg border border-border min-h-[60vh] flex flex-col p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-text-muted p-8">
            <LoadingSpinner />
            <p className="mt-4 text-sm">AI is crafting your regex...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <h3 className="font-semibold text-danger">Generation Failed</h3>
            <div role="alert" className="mt-2 text-sm text-danger bg-danger/10 p-4 rounded-md w-full">{error}</div>
          </div>
        ) : result ? (
          <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center">
                <h3 className="font-semibold text-text">Generated Regex Pattern</h3>
                <Tooltip text="Save to collection">
                  <button onClick={handleSaveToFavorites} className="flex items-center gap-1.5 p-2 text-sm text-text-muted hover:text-secondary transition-colors" aria-label="Save to collection">
                      {ICONS.STAR}
                      <span>Save</span>
                  </button>
                </Tooltip>
            </div>
            <CodeBlock code={result.pattern} />
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
              {ICONS.WAND}
            </div>
            <h3 className="text-lg font-semibold text-text">Your regex will appear here</h3>
            <p className="mt-1 text-sm">Describe the text pattern you need to match.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegexGenerator;