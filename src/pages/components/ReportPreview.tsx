import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import Papa from 'papaparse';

interface ReportPreviewProps {
  showReportPreview:boolean
  reports: Array<any>;
}
 // @mui/x-charts @mui/x-data-grid @mui/system jspdf jspdf-autotable html2canvas react-to-pdf
const ReportPreview: React.FC<ReportPreviewProps> = ({ reports,showReportPreview }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [csvText, setCsvText] = useState('');
  const [parseError, setParseError] = useState('');

  const handleGeneratePreview = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current);
      setImageUrl(canvas.toDataURL('image/png'));
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'report-preview.png';
      link.click();
    }
  };

  // CSV file upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParseError('');
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setParsedData(results.data as any[]);
        },
        error: (err) => setParseError('CSV parse error: ' + err.message)
      });
    }
  };

  // CSV/text area parse handler
  const handleParseText = () => {
    setParseError('');
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setParsedData(results.data as any[]);
      },
      error: (err:any) => setParseError('CSV parse error: ' + err.message)
    });
  };

  // Example send to backend (replace with your API call)
  const handleSendToBackend = () => {
    // Example: send parsedData to backend
    alert('Ready to send to backend: ' + JSON.stringify(parsedData, null, 2));
    // TODO: Replace with actual API call
  };

  return (
    <div>
      {/* CSV Upload & Text Parse UI */}
      <div className="mb-6 p-4 bg-gray-50 rounded shadow">
        <h3 className="font-semibold mb-2">Upload CSV or Paste Data</h3>
        <input title='file' type="file" accept=".csv,text/csv" placeholder='Click here to upload file' onChange={handleFileUpload} className="mb-2 bg-slate-300 p-4 rounded-sm" />
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
            <button onClick={handleSendToBackend} className="px-3 py-1 bg-green-600 text-white rounded mt-2">Send to Backend</button>
          </div>
        )}
      </div>
      {showReportPreview &&
      <div ref={previewRef} className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-bold mb-2">Report Preview</h2>
        {/* Simple Chart Visualization */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Reports by Type</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: 120, gap: 12 }}>
            {(() => {
              // Count reports by type
              const typeCounts: Record<string, number> = {};
              reports.forEach(r => {
                typeCounts[r.type] = (typeCounts[r.type] || 0) + 1;
              });
              const max = Math.max(...Object.values(typeCounts), 1);
              return Object.entries(typeCounts).map(([type, count]) => (
                <div key={type} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{
                    height: `${(count / max) * 80 + 20}px`,
                    background: '#2563eb',
                    borderRadius: 6,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: 14,
                    marginBottom: 4
                  }}>
                    {count}
                  </div>
                  <div style={{ fontSize: 12, color: '#374151', marginTop: 2 }}>{type}</div>
                </div>
              ));
            })()}
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap">{report.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.reporter}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.priority}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleGeneratePreview} className="px-4 py-2 bg-blue-600 text-white rounded mr-2 mt-4">Generate Preview</button>
      </div>
      }
      {imageUrl && (
        <>
          <div className="my-4">
            <img src={imageUrl} alt="Report Preview" className="border rounded shadow" />
          </div>
          <button onClick={handleDownload} className="px-4 py-2 bg-green-600 text-white rounded">Download as Image</button>
        </>
      )}
    </div>
  );
};

export default ReportPreview;
