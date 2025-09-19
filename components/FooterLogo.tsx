import React from 'react';

interface FooterLogoProps {
  onClick: () => void;
}

const FooterLogo: React.FC<FooterLogoProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-secondary rounded-full"
      aria-label="View Application Specifications"
    >
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="text-text-muted group-hover:text-secondary transition-colors duration-300"
      >
        <title>Web Check AI Logomark</title>
        <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 16L14 20L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 17V19C22 20.6569 20.6569 22 19 22H13C11.3431 22 10 20.6569 10 19V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
      </svg>
    </button>
  );
};

export default FooterLogo;
