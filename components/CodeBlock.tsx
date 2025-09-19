import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
    });
  };
  
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="bg-surface rounded-lg relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-primary text-text-muted hover:text-text rounded-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:ring-2 focus:ring-secondary"
        aria-label={isCopied ? "Code copied to clipboard" : "Copy code to clipboard"}
      >
        {isCopied ? ICONS.CHECK : ICONS.COPY}
      </button>
      <pre className="p-4 text-sm overflow-x-auto text-text rounded-lg">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;