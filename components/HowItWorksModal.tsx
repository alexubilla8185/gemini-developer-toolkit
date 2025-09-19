import React from 'react';

interface HowItWorksModalProps {
  onClose: () => void;
}

const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-it-works-title"
    >
      <div 
        className="bg-surface rounded-lg shadow-2xl border border-border w-full max-w-lg m-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="how-it-works-title" className="text-xl font-bold text-text">
            How It Works
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
          <p>This toolkit uses Google's Gemini AI to help you generate code and other developer assets. For the best results, be descriptive and clear in your prompts.</p>
          <h3 className="font-semibold text-text">Tips for UI Component Generation:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Be Specific:</strong> Instead of "a button," try "a primary action button with a solid teal background and white text."</li>
            <li><strong>Mention State:</strong> Describe hover states or active states, e.g., "the button should get slightly darker on hover."</li>
            <li><strong>Include Content:</strong> Specify text for labels, buttons, and placeholders for better context.</li>
            <li><strong>Think Responsively:</strong> Mention how it should look on mobile vs. desktop if it's important, e.g., "a two-column layout on desktop that stacks on mobile."</li>
          </ul>
           <h3 className="font-semibold text-text">Tips for Regex & Cron Generation:</h3>
            <p>Provide clear, unambiguous descriptions of the pattern or schedule you need. The AI is trained to understand natural language and convert it into the correct format.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksModal;