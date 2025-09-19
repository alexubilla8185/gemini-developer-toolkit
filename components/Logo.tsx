import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 40" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Web Check AI Logo"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#05BDBA', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#05BDBA', stopOpacity: 0.7 }} />
        </linearGradient>
      </defs>
      <text 
        x="0" 
        y="30" 
        fontFamily="Arial, sans-serif" 
        fontSize="30" 
        fontWeight="bold" 
        fill="#e5e7eb"
        letterSpacing="-1"
      >
        Web Check
      </text>
      <text 
        x="155" 
        y="30" 
        fontFamily="Arial, sans-serif" 
        fontSize="30" 
        fontWeight="bold" 
        fill="url(#logo-gradient)"
      >
        AI
      </text>
    </svg>
  );
};

export default Logo;
