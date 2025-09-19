import React from 'react';

interface AppSpecsModalProps {
  onClose: () => void;
}

const AppSpecsModal: React.FC<AppSpecsModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-surface rounded-lg shadow-2xl border border-border w-full max-w-lg m-4 p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-xl font-bold text-text">
            App Specifications
          </h2>
          <button 
            onClick={onClose}
            className="text-text-muted hover:text-text"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="text-sm text-text-muted space-y-4">
          <p>This application is a modern web toolkit built with a high-performance stack, designed for developers.</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Frontend:</strong> React, TypeScript, Tailwind CSS</li>
            <li><strong>AI Backend:</strong> Google Gemini API (gemini-2.5-flash)</li>
            <li><strong>Hosting:</strong> Deployed via Netlify with serverless functions</li>
            <li><strong>Core Features:</strong> AI-powered UI component generation and regex creation.</li>
          </ul>
          <p>The entire user interface is designed to be responsive, accessible, and performant, providing a seamless experience across all devices.</p>
        </div>
      </div>
    </div>
  );
};

export default AppSpecsModal;
