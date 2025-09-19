import React from 'react';
import { ICONS } from '../constants';

interface HowItWorksModalProps {
  onClose: () => void;
}

const Section: React.FC<{ title: string; icon: JSX.Element; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div>
        <div className="flex items-center gap-3 mb-2">
            <span className="text-secondary">{icon}</span>
            <h3 className="font-bold text-lg text-text">{title}</h3>
        </div>
        <div className="pl-9 space-y-2 border-l-2 border-border/50 ml-3">{children}</div>
    </div>
);

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
        className="bg-surface rounded-lg shadow-2xl border border-border w-full max-w-2xl m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 id="how-it-works-title" className="text-xl font-bold text-text">
            How It Works
          </h2>
          <button 
            onClick={onClose}
            className="text-text-muted hover:text-text p-1 rounded-full"
            aria-label="Close modal"
          >
            {ICONS.CLOSE}
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto text-sm text-text-muted space-y-6">
          <p>This toolkit uses Google's Gemini AI to help you work faster. The key to great results is a great prompt. Be descriptive, specific, and clear about what you want.</p>
          
          <Section title="UI Component Generator" icon={ICONS.WAND}>
            <p>Describe the user interface you want to create. The more detail you provide, the closer the result will be to your vision.</p>
            <div className="space-y-1">
                <p><strong>Good prompt:</strong> "a button"</p>
                <p><strong>Better prompt:</strong> "A primary action button with a solid teal background, white text, rounded corners, and a slight shadow. It should get slightly darker on hover."</p>
            </div>
             <h4 className="font-semibold text-text pt-2">Pro-Tips:</h4>
            <ul className="list-disc list-inside space-y-1 text-text-muted">
                <li><strong>Mention State:</strong> Describe hover, focus, or disabled states.</li>
                <li><strong>Include Content:</strong> Specify text for labels, buttons, and placeholders.</li>
                <li><strong>Think Responsively:</strong> Mention layout changes for mobile vs. desktop.</li>
            </ul>
          </Section>

          <Section title="Regex Generator" icon={ICONS.WAND}>
            <p>Provide a clear, unambiguous description of the text pattern you need to match. The AI will handle the complex syntax.</p>
            <div className="space-y-1">
                <p><strong>Good prompt:</strong> "email"</p>
                <p><strong>Better prompt:</strong> "a standard email address that can include a subdomain"</p>
            </div>
          </Section>

          <Section title="Cron Generator" icon={ICONS.CLOCK}>
            <p>Describe any schedule in plain English, from simple to complex. The AI will convert it into a valid cron expression.</p>
            <div className="space-y-1">
                 <p><strong>Good prompt:</strong> "every monday"</p>
                 <p><strong>Better prompt:</strong> "at 2am on the first Monday of every month"</p>
            </div>
          </Section>

          <Section title="JSON Formatter" icon={ICONS.JSON_BRACKETS}>
            <p>This is a client-side tool. Paste any JSON data—even if it's messy—and click "Format & Validate". The tool will instantly beautify it and highlight any syntax errors.</p>
          </Section>

          <Section title="Your Collection" icon={ICONS.STAR}>
            <p>Liked a result? Click the <strong>Save to Collection</strong> button to store it in your browser's local storage. Access all your saved items anytime from the "Collection" page.</p>
          </Section>

        </div>
      </div>
    </div>
  );
};

export default HowItWorksModal;
