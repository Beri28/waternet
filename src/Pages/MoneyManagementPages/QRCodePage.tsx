import React, { useState, useRef, useEffect } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import { Result } from '@zxing/library';
import { Header } from '../home_page/HomeScreen';

interface QRCodeScannerPageProps {}

const QRCodeScannerPage: React.FC<QRCodeScannerPageProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scannedPhoneNumber, setScannedPhoneNumber] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const qrCodeReader = useRef<BrowserQRCodeReader | null>(null);
  const controlsRef = useRef<any>(null);

  const initScanner = async () => {
    try {
      if (!qrCodeReader.current) {
        qrCodeReader.current = new BrowserQRCodeReader();
      }

      if (videoRef.current) {
        const devices = await BrowserQRCodeReader.listVideoInputDevices();
        if (devices.length === 0) {
          throw new Error('No video input devices found');
        }

        controlsRef.current = await qrCodeReader.current.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          (result: Result | undefined, error: Error | undefined) => {
            if (result) {
              const phoneNumber = extractPhoneNumber(result.getText());
              if (phoneNumber) {
                setScannedPhoneNumber(phoneNumber);
                setShowConfirmation(true);
                stopScanner();
              } else {
                setError('Invalid phone number format');
              }
            }
            if (error) {
              console.error('Scan error:', error);
            }
          }
        );
        
        setIsScanning(true);
        setIsLoading(false);
        setError(null);
      }
    } catch (err: any) {
      console.error('Error initializing QR code scanner:', err);
      setError(err.message || 'Could not access camera. Please ensure you have granted camera permissions.');
      setIsScanning(false);
      setIsLoading(false);
    }
  };

  const extractPhoneNumber = (text: string): string | null => {
    // Simple phone number validation - adjust as needed
    const phoneRegex = /^(\+?\d{10,15})$/;
    const cleanedText = text.trim();
    
    if (phoneRegex.test(cleanedText)) {
      return cleanedText;
    }
    return null;
  };

  const stopScanner = () => {
    if (controlsRef.current) {
      controlsRef.current.stop();
      controlsRef.current = null;
    }
    setIsScanning(false);
  };

  const handleConfirmPayment = () => {
    // Here you would typically call your payment API
    console.log(`Sending 2000 to ${scannedPhoneNumber}`);
    
    // Reset the scanner after payment
    setShowConfirmation(false);
    setScannedPhoneNumber(null);
    setIsLoading(true);
    setIsScanning(false);
  };

  const handleCancelPayment = () => {
    setShowConfirmation(false);
    setScannedPhoneNumber(null);
    setIsLoading(true);
    setIsScanning(false);
  };

  const handleRetryScan = () => {
    setScannedPhoneNumber(null);
    setError(null);
    setIsLoading(true);
    setIsScanning(false);
  };

  useEffect(() => {
    let isMounted = true;

    if (!isScanning && !scannedPhoneNumber && isMounted) {
      initScanner();
    }

    return () => {
      isMounted = false;
      stopScanner();
    };
  }, [isScanning, scannedPhoneNumber]);

  return (
    <div className="bg-gray-100 min-h-screen  p-6">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md relative">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">QR Code Scanner</h1>

          <div className="mb-4 flex justify-center items-center">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-.447.894L15 14M5 10l-4.553 2.276A1 1 0 003 15.382v-6.764a1 1 0 00.447-.894L9 10m5 0v2m0-4v2M9 11H3m12 0h6m-6-3v1m-3 9h1m0-7v1"
              />
            </svg> */}
            <span className="ml-2 text-lg text-gray-700">Scan a phone number QR code</span>
          </div>

          <div className="relative w-full aspect-square rounded-md overflow-hidden mb-4">
            {isLoading ? (
              <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 italic">
                Initializing scanner...
              </div>
            ) : error ? (
              <div className="absolute top-0 left-0 w-full h-full bg-red-100 flex flex-col items-center justify-center text-red-600 font-semibold p-4 text-center">
                {error}
                <button
                  onClick={handleRetryScan}
                  className="mt-4 bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-800"
                >
                  Try Again
                </button>
              </div>
            ) : scannedPhoneNumber ? (
              <div className="absolute top-0 left-0 w-full h-full bg-green-100 flex flex-col items-center justify-center text-green-600 font-semibold">
                Scan Successful!
              </div>
            ) : (
              <>
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                {isScanning && (
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-green-500 animate-pulse" />
                )}
              </>
            )}
          </div>

          {scannedPhoneNumber && !showConfirmation && (
            <button
              onClick={handleRetryScan}
              className="w-full bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-800"
            >
              Scan Again
            </button>
          )}

          {/* Confirmation Popup */}
          {showConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Confirm Payment</h2>
                <p className="mb-4">
                  Are you sure you want to send <span className="font-bold">2000</span> to <span className="font-bold">{scannedPhoneNumber}</span>?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCancelPayment}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeScannerPage;