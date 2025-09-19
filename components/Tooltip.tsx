import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group">
      {children}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs whitespace-normal rounded-md bg-text px-3 py-1.5 text-center text-xs font-semibold text-background shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none z-30">
        {text}
      </span>
    </div>
  );
};

export default Tooltip;