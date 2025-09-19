import React, { useState, useCallback } from 'react';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setError('Input cannot be empty.');
      setOutput('');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      setOutput('');
    }
  }, [input]);

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="space-y-8">
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">JSON Formatter & Validator</h2>
            <p className="mt-3 text-lg text-text-muted">Paste your JSON data to format, beautify, and validate it instantly.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[60vh]">
            {/* Input Area */}
            <div className="flex flex-col">
                <label htmlFor="json-input" className="text-sm font-medium text-text-muted mb-2">Input JSON</label>
                <textarea
                    id="json-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Paste your JSON here...'
                    className="w-full h-full flex-grow p-4 bg-background border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none transition-shadow font-mono text-sm"
                />
            </div>

            {/* Output Area */}
            <div className="flex flex-col">
                <label htmlFor="json-output" className="text-sm font-medium text-text-muted mb-2">Formatted Output</label>
                 <div className="w-full h-full flex-grow p-4 bg-surface border border-border rounded-lg font-mono text-sm relative overflow-auto">
                    {error ? (
                        <pre className="text-danger whitespace-pre-wrap">{error}</pre>
                    ) : (
                        <pre className="text-text whitespace-pre-wrap">{output}</pre>
                    )}
                 </div>
            </div>
        </div>
        <div className="flex items-center justify-center space-x-4">
            <button
                onClick={handleFormat}
                className="inline-flex items-center justify-center px-6 py-3 font-semibold text-background bg-secondary rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-secondary transition-colors"
            >
                Format & Validate
            </button>
            <button
                onClick={handleClear}
                className="inline-flex items-center justify-center px-6 py-3 font-semibold text-text bg-primary rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-secondary transition-colors"
            >
                Clear
            </button>
        </div>
    </div>
  );
};

export default JsonFormatter;