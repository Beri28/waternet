import React, { useState } from 'react';
import Papa from 'papaparse';

interface CsvToJsonUploadProps {
  onDataParsed: (data: any[]) => void;
}

const CsvToJsonUpload: React.FC<CsvToJsonUploadProps> = ({ onDataParsed }) => {
  const [csvText, setCsvText] = useState('');
  const [parseError, setParseError] = useState('');
  const [parsedData, setParsedData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParseError('');
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setParsedData(results.data as any[]);
          onDataParsed(results.data as any[]);
        },
        error: (err) => setParseError('CSV parse error: ' + err.message)
      });
    }
  };

  const handleParseText = () => {
    setParseError('');
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setParsedData(results.data as any[]);
        onDataParsed(results.data as any[]);
      },
      error: (err:any) => setParseError('CSV parse error: ' + err.message)
    });
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded shadow">
      <h3 className="font-semibold mb-2">Upload CSV or Paste Data</h3>
      <input name='file' title='file' type="file" accept=".csv,text/csv" onChange={handleFileUpload} className="mb-2" />
      <div className="my-2">or</div>
      <textarea
        className="w-full border rounded p-2 mb-2"
        rows={4}
        placeholder="Paste CSV or text data here..."
        value={csvText}
        onChange={e => setCsvText(e.target.value)}
      />
      <button onClick={handleParseText} className="px-3 py-1 bg-blue-600 text-white rounded mr-2">Parse Text</button>
      {parseError && <div className="text-red-600 mt-2">{parseError}</div>}
      {parsedData.length > 0 && (
        <div className="mt-4">
          <div className="font-semibold mb-1">Parsed JSON:</div>
          <pre className="bg-white p-2 rounded border max-h-40 overflow-auto text-xs">{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CsvToJsonUpload;
