import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
        <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="logo-gradient-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#05BDBA" />
                    <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
            </defs>
            <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" stroke="url(#logo-gradient-stroke)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 12L11 15L16 10" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
       <span className="font-bold text-lg tracking-tight text-text">Web Check AI</span>
    </div>
  );
};

export default Logo;
