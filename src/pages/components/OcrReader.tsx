import React, { useRef, useState } from 'react';
// @ts-ignore
import Tesseract from 'tesseract.js';

const OcrReader: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setOcrText('');
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOcr = async () => {
    if (!image) return;
    setLoading(true);
    setError('');
    setOcrText('');
    try {
      const result = await Tesseract.recognize(image, 'eng', {
        logger: () => {
          // Optionally handle progress
        }
      });
      setOcrText(result.data.text);
    } catch (e: any) {
      setError('OCR failed: ' + (e.message || e.toString()));
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">OCR Reader</h2>
      <input
        title='file'
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="mb-4 bg-slate-300 p-4 rounded-sm w-full"
      />
      {image && (
        <div className="mb-4">
          <img src={image} alt="Uploaded" className="max-w-full max-h-64 border rounded" />
        </div>
      )}
      {image &&
      <div>
        <button
          onClick={handleOcr}
          disabled={!image || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
        >
          {loading ? 'Processing...' : 'Extract Text'}
        </button>
      </div>
      }
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {ocrText && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Extracted Text:</h3>
          <pre className="bg-gray-100 p-2 rounded border text-sm whitespace-pre-wrap">{ocrText}</pre>
        </div>
      )}
    </div>
  );
};

export default OcrReader;
