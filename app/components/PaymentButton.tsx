"use client"
import React, { useState, useEffect, useRef } from 'react';

export default function PaymentButton() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverRef]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setShowPopover(!emailRegex.test(e.target.value));
  };

  const handlePayment = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setShowPopover(true);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/checkout/create-session", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_1OyEWZKks4pzFwyLtAjtw8P4',
          domainUrl: window.location.origin,
          email: email
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Payment initiation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex gap-2 position-relative my-4 mb-8' style={{ position: 'relative' }}>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
        disabled={loading}
        className='input'
      />
      {showPopover && (
        <div 
          ref={popoverRef}
          className="popover chat-bubble"
        >
          Please enter a valid email address. 😕
        </div>
      )}
      <button onClick={handlePayment} disabled={loading} className='btn px-4 border-radius'>
        {loading ? 'Processing...' : 'Get Real Prices'}
      </button>
    </div>
  );
}