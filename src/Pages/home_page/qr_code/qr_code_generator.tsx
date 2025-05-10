import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { FiDownload, FiX, FiCopy, FiEye, FiEyeOff } from 'react-icons/fi';
import { QrCode } from 'lucide-react';

// Simple encryption service (replace with proper crypto in production)
const encryptNumber = (number: string, shift = 3): string => {
  return number.split('').map((char, index) => {
    return String.fromCharCode(char.charCodeAt(0) + shift + (index % 3));
  }).join('');
};

// const decryptNumber = (encrypted: string, shift = 3): string => {
//   return encrypted.split('').map((char, index) => {
//     return String.fromCharCode(char.charCodeAt(0) - shift - (index % 3));
//   }).join('');
// };

const PhoneQRGenerator = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [showQr, setShowQr] = useState(false);
  // const [isCopied, setIsCopied] = useState(false);
  const [showEncrypted, setShowEncrypted] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  // African country codes with validation patterns
  const africanCountryCodes = [
    { 
      code: '237', 
      name: 'Cameroon',
      pattern: /^[2367]\d{8}$/, // Cameroon numbers start with 2,3,6,7
      example: '6XXXXXXXX'
    },
    { 
      code: '234', 
      name: 'Nigeria',
      pattern: /^[789]\d{9}$/,
      example: '7XXXXXXXXX'
    },
    { 
      code: '254', 
      name: 'Kenya',
      pattern: /^[17]\d{8}$/,
      example: '7XXXXXXXX'
    },
    { 
      code: '27', 
      name: 'South Africa',
      pattern: /^\d{9}$/,
      example: 'XXXXXXXXX'
    },
  ];

  const [selectedCountry, setSelectedCountry] = useState(africanCountryCodes[0]);

  const formatPhoneNumber = (number: string): string => {
    const digits = number.replace(/\D/g, '');
    
    if (digits.startsWith(selectedCountry.code)) {
      return digits;
    }
    
    if (digits.startsWith('0')) {
      return selectedCountry.code + digits.substring(1);
    }
    
    return selectedCountry.code + digits;
  };

  const validatePhoneNumber = (number: string): boolean => {
    const formatted = formatPhoneNumber(number);
    const localNumber = formatted.substring(selectedCountry.code.length);
    return selectedCountry.pattern.test(localNumber);
  };

  const generateQrCode = () => {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    
    if (!validatePhoneNumber(phoneNumber)) {
      alert(`Please enter a valid ${selectedCountry.name} number (${selectedCountry.example})`);
      return;
    }

    setQrValue(`tel:+${formattedNumber}`);
    setShowQr(true);
    // setIsCopied(false);
    setShowEncrypted(false);
  };

  const downloadQrCode = () => {
    try {
      const canvas = document.getElementById('phoneQrCode') as HTMLCanvasElement;
      if (!canvas) throw new Error('QR Code not found');
      
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-${selectedCountry.code}-${encryptNumber(phoneNumber)}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download QR code');
    }
  };

  const copyToClipboard = () => {
    const formatted = `+${formatPhoneNumber(phoneNumber)}`;
    navigator.clipboard.writeText(formatted)
      .then(() => {
        // setIsCopied(true);
        // setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => console.error('Copy failed:', err));
  };

  const displayNumber = showEncrypted 
    ? `+${formatPhoneNumber(phoneNumber)}` 
    : `+${selectedCountry.code}-${encryptNumber(phoneNumber.substring(1))}`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden p-6">
        <div className="flex items-center mb-6">
          <QrCode className="text-black text-2xl mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">Secure QR Code Generator</h1>
        </div>

        {/* Country Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={selectedCountry.code}
            onChange={(e) => {
              const country = africanCountryCodes.find(c => c.code === e.target.value);
              if (country) {
                setSelectedCountry(country);
                setShowQr(false);
              }
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            {africanCountryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} (+{country.code})
              </option>
            ))}
          </select>
        </div>

        {/* Phone Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
              +{selectedCountry.code}
            </span>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
              placeholder={selectedCountry.example}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              maxLength={selectedCountry.code === '237' ? 9 : 10}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {selectedCountry.name} format: {selectedCountry.example}
          </p>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateQrCode}
          disabled={!phoneNumber}
          className={`w-full py-3 px-4 rounded-md font-medium text-white mb-6 ${
            phoneNumber ? 'bg-black hover:bg-gray-500' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Generate Secure QR Code
        </button>

        {/* QR Code Display */}
        {showQr && (
          <div ref={qrRef} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Secure Contact QR</h2>
              <button 
                onClick={() => setShowQr(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-3 bg-white border-2 border-gray-800 rounded-md mb-4">
                <QRCodeCanvas
                  id="phoneQrCode"
                  value={qrValue}
                  size={180}
                  level="H"
                  fgColor="#1f2937"
                  bgColor="#ffffff"
                />
              </div>

              {/* Encrypted Number Display */}
              <div className="w-full mb-4">
                <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
                  <span className="font-mono text-sm">
                    {displayNumber}
                  </span>
                  <button
                    onClick={() => setShowEncrypted(!showEncrypted)}
                    className="text-gray-500 hover:text-gray-700 ml-2"
                    title={showEncrypted ? 'Hide number' : 'Show number'}
                  >
                    {showEncrypted ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  {showEncrypted ? 'Actual number' : 'Encrypted display'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md"
                >
                  <FiCopy size={16} /> Copy
                </button>
                <button
                  onClick={downloadQrCode}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  <FiDownload size={16} /> Download
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Information */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Security Features:</h3>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li>Phone numbers displayed in encrypted format by default</li>
            <li>QR codes contain direct dial links (tel: protocol)</li>
            <li>Country-specific number validation</li>
            <li>Downloaded filenames don't contain actual numbers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhoneQRGenerator;