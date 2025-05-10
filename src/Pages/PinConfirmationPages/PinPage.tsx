import React, { useState, useRef, useEffect } from 'react';

const ModernPinConfirmation = () => {
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  // Auto-focus the next input when a digit is entered
  useEffect(() => {
    if (activeInput < 4 && pin[activeInput] && inputRefs.current[activeInput + 1]) {
      inputRefs.current[activeInput + 1]?.focus();
      setActiveInput(activeInput + 1);
    }
  }, [pin, activeInput]);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      setError('');
    } else if (value === '') {
      const newPin = [...pin];
      newPin[index] = '';
      setPin(newPin);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').replace(/\D/g, '');
    if (pasteData.length === 4) {
      setPin(pasteData.split('').slice(0, 4));
      inputRefs.current[3]?.focus();
      setActiveInput(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin.some(digit => !digit)) {
      setError('Please complete the 4-digit PIN');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      console.log('Verified PIN:', pin.join(''));
      alert('Transfer confirmed successfully!');
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Confirm Transfer PIN</h2>
          <p className="text-gray-500 mt-2">Enter your 4-digit security PIN</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between space-x-3">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={el => {
                  if (el) inputRefs.current[index] = el;
                }}
                type="password"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                onFocus={() => setActiveInput(index)}
                className={`w-16 h-16 text-3xl text-center font-semibold border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black ${
                  activeInput === index ? 'border-black' : 'border-gray-200'
                } ${error ? 'border-red-400' : ''} bg-gray-50 hover:bg-gray-100`}
                inputMode="numeric"
                autoFocus={index === 0}
                disabled={isLoading}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center animate-pulse">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || pin.some(digit => !digit)}
            className={`w-full py-3.5 px-4 bg-black text-white rounded-lg font-medium shadow-md hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 flex items-center justify-center ${
              isLoading ? 'opacity-90' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Confirming...
              </>
            ) : (
              'Confirm Transfer'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Forgot your PIN? <a href="#" className="text-black hover:underline font-medium">Reset it</a></p>
        </div>
      </div>
    </div>
  );
};

export default ModernPinConfirmation;