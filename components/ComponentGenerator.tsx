import React, { useState, useCallback, useMemo } from 'react';
import { generateComponent } from '../services/geminiService';
import CodeBlock from './CodeBlock';
import LoadingSpinner from './LoadingSpinner';
import { ICONS } from '../constants';
import { useNotification } from '../context/NotificationContext';
import { useFavorites } from '../context/FavoritesContext';

// Moved helper function outside the component to prevent re-creation on every render.
const createIframeContent = (componentCode: string, theme: 'light' | 'dark') => {
  const isDark = theme === 'dark';
  return `
    <!DOCTYPE html>
    <html class="${isDark ? 'dark' : ''}">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            darkMode: 'class',
          }
        </script>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <style>
          body { 
            background-color: ${isDark ? '#0e1116' : '#f8fafc'};
            color: ${isDark ? '#e5e7eb' : '#111827'};
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 1rem;
            font-family: sans-serif;
          }
        </style>
      </head>
      <body>
        <div id="component-root"></div>
        <script type="text/babel">
          try {
            ${componentCode}
            const container = document.getElementById('component-root');
            const root = ReactDOM.createRoot(container);
            root.render(<GeneratedComponent />);
          } catch (e) {
            const root = document.getElementById('component-root');
            root.innerHTML = '<div style="color: red; font-family: monospace;"><b>Render Error:</b><br/>' + e.message + '</div>';
            console.error(e);
          }
        </script>
      </body>
    </html>
  `;
};

const ComponentGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  const { showNotification } = useNotification();
  const { addFavoriteComponent } = useFavorites();

  const handleSaveToFavorites = () => {
    if (!generatedCode || !prompt) return;
    addFavoriteComponent({
      id: crypto.randomUUID(),
      prompt,
      code: generatedCode,
      createdAt: new Date().toISOString(),
    });
    showNotification('Component saved to your collection!', 'success');
  };

  // Memoize the iframe content to prevent unnecessary re-renders.
  const iframeContent = useMemo(() => {
    if (!generatedCode) return '';
    return createIframeContent(generatedCode, previewTheme);
  }, [generatedCode, previewTheme]);

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
    setGeneratedCode('');
    setActiveTab('code'); // Default to code view while streaming

    try {
      await generateComponent(prompt, (chunk) => {
        setGeneratedCode((prevCode) => prevCode + chunk);
      });
    } catch (err: any) {
      const errorMessage = err.message || 'An unknown error occurred.';
      setError(errorMessage);
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
      setActiveTab('preview'); // Switch to preview once done
    }
  }, [prompt, showNotification]);
  
  const tabClasses = (tabName: 'preview' | 'code') => 
    `px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
      activeTab === tabName
        ? 'border-secondary text-text'
        : 'border-transparent text-text-muted hover:text-text'
    }`;

  const themeButtonClasses = (themeName: 'light' | 'dark') =>
    `p-2 rounded-md transition-colors ${
        previewTheme === themeName
        ? 'bg-primary text-secondary'
        : 'text-text-muted hover:bg-primary'
    }`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left Panel: Input */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-text mb-2">AI UI Component Generator</h2>
          <p className="text-text-muted">Describe the component you want to build. The more detailed your description, the better the result.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="component-prompt" className="sr-only">Component Description</label>
          <textarea
            id="component-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'A responsive navbar with a logo and three links', or 'a product card with an image and a buy button'."
            className="w-full h-32 p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none transition-shadow"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 font-semibold text-background bg-secondary rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-secondary disabled:bg-surface disabled:text-text-muted disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <LoadingSpinner /> : ICONS.WAND}
            <span className="ml-2">{isLoading ? 'Generating...' : 'Generate Component'}</span>
          </button>
        </form>
      </div>

      {/* Right Panel: Output */}
      <div className="lg:col-span-3 bg-surface rounded-lg border border-border min-h-[60vh] flex flex-col">
        {isLoading && !generatedCode ? (
          <div className="flex flex-col items-center justify-center h-full text-text-muted p-8">
            <LoadingSpinner />
            <p className="mt-4 text-sm">AI is creating your component...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <h3 className="font-semibold text-danger">Generation Failed</h3>
            <div role="alert" className="mt-2 text-sm text-danger bg-danger/10 p-4 rounded-md w-full">{error}</div>
          </div>
        ) : generatedCode || isLoading ? (
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-center border-b border-border px-2">
                <div role="tablist" aria-label="Output view tabs" className="flex">
                    <button id="preview-tab" role="tab" aria-selected={activeTab === 'preview'} aria-controls="preview-panel" onClick={() => setActiveTab('preview')} className={tabClasses('preview')}>Live Preview</button>
                    <button id="code-tab" role="tab" aria-selected={activeTab === 'code'} aria-controls="code-panel" onClick={() => setActiveTab('code')} className={tabClasses('code')}>Code</button>
                </div>
                <div className="flex items-center space-x-2">
                    {activeTab === 'preview' && (
                        <div className="flex items-center space-x-1 mr-2 bg-background p-1 rounded-lg">
                            <button onClick={() => setPreviewTheme('light')} className={themeButtonClasses('light')} aria-label="Switch to light theme">
                                {ICONS.SUN}
                            </button>
                            <button onClick={() => setPreviewTheme('dark')} className={themeButtonClasses('dark')} aria-label="Switch to dark theme">
                                {ICONS.MOON}
                            </button>
                        </div>
                    )}
                    {!isLoading && generatedCode && (
                         <button onClick={handleSaveToFavorites} className="flex items-center gap-1.5 p-2 text-sm text-text-muted hover:text-secondary transition-colors" aria-label="Save to collection">
                            {ICONS.STAR}
                        </button>
                    )}
                </div>
            </div>
            <div className="flex-grow relative bg-background rounded-b-lg">
                <div
                    id="preview-panel"
                    role="tabpanel"
                    aria-labelledby="preview-tab"
                    hidden={activeTab !== 'preview'}
                    className={`w-full h-full rounded-b-lg overflow-hidden ${previewTheme === 'light' ? 'bg-gray-100' : 'bg-background'}`}
                >
                    <iframe
                      srcDoc={iframeContent}
                      title="Component Preview"
                      className="w-full h-full border-0"
                      sandbox="allow-scripts"
                    />
                </div>
                <div
                    id="code-panel"
                    role="tabpanel"
                    aria-labelledby="code-tab"
                    hidden={activeTab !== 'code'}
                    className="absolute inset-0 overflow-auto"
                >
                    <CodeBlock code={generatedCode} />
                </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-text-muted p-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-background rounded-full mb-4">
              {ICONS.WAND}
            </div>
            <h3 className="text-lg font-semibold text-text">Your generated component will appear here</h3>
            <p className="mt-1 text-sm">Describe what you want to build, and watch the magic happen.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentGenerator;
