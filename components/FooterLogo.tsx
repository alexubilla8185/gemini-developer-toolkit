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
        width="28" 
        height="28" 
        viewBox="0 0 24 24"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="text-text-muted group-hover:text-secondary transition-colors duration-300"
      >
        <title>Web Check AI Logomark</title>
        <path
            d="M12 2L4 6V18L12 22L20 18V6L12 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8 12L11 15L16 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default FooterLogo;