import React, { useState, useCallback } from 'react';
import { ICONS } from '../constants';
import LoadingSpinner from './LoadingSpinner';
import { useNotification } from '../context/NotificationContext';

const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      const errorMessage = 'Please enter a valid email address.';
      setError(errorMessage);
      showNotification(errorMessage, 'error');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
        const response = await fetch('/.netlify/functions/waitlist-signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Something went wrong.');
        }

        setIsSubmitted(true);
        showNotification("You're on the list! We'll be in touch.", 'success');

    } catch (err: any) {
        setError(err.message);
        showNotification(err.message, 'error');
    } finally {
        setIsLoading(false);
    }
  }, [email, isLoading, showNotification]);

  if (isSubmitted) {
    return (
      <div className="text-center" role="status" aria-live="polite">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-2xl font-bold text-text">You're on the list!</h3>
        <p className="mt-2 text-text-muted">We'll notify you when we launch.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start gap-4">
      <div className="w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Enter your email address"
            className="flex-grow w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none transition-shadow text-text placeholder-text-muted"
            disabled={isLoading}
            aria-label="Email Address"
            aria-describedby="email-error"
          />
          {error && <p id="email-error" className="mt-2 text-sm text-danger">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 font-semibold text-background bg-secondary rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-secondary disabled:bg-surface disabled:text-text-muted disabled:cursor-not-allowed transition-colors shrink-0"
      >
          {isLoading ? <LoadingSpinner /> : ICONS.PAPER_PLANE }
          <span className="ml-2">{isLoading ? 'Joining...' : 'Join Waitlist'}</span>
      </button>
    </form>
  );
};

export default WaitlistForm;