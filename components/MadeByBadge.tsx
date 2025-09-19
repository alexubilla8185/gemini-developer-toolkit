import React, { useState } from 'react';
import AppSpecsModal from './AppSpecsModal';

const MadeByBadge: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <button 
                onClick={openModal}
                className="group flex items-center space-x-2 text-sm text-text-muted hover:text-text transition-colors duration-300"
                aria-label="View App Specifications by Tekguyz"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-secondary group-hover:animate-pulse"
                >
                    <path
                        d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M2 7L12 12M22 7L12 12M12 22V12M17 4.5L7 9.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span>Made by Tekguyz</span>
            </button>
            {isModalOpen && <AppSpecsModal onClose={closeModal} />}
        </>
    );
};

export default MadeByBadge;
