import React, { useState, useRef, useEffect } from 'react';
import {Droplets, AlertTriangle, MapPin,Upload, Download, BarChart2, PieChart, LineChart } from 'lucide-react';
import Chart from 'chart.js/auto';
// import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CsvToJsonUpload from './csv_upload/CsvToJsonUpload';
import OcrReader from './OcrReader';
import { useToast } from '../../Context/toastContext';

const WaterSources = () => {
  const {showToast}=useToast()
  const [waterSources, setWaterSources] = useState([
    { id: 1, name: 'Mefou Dam', region: 'Centre', type: 'Reservoir', capacity: 100000, currentLevel: 40000, status: 'Active', lastUpdate: '2025-06-05' },
    { id: 2, name: 'Bamenda Borehole 1', region: 'Northwest', type: 'Borehole', capacity: 5000, currentLevel: 3200, status: 'Active', lastUpdate: '2025-06-04' },
    { id: 3, name: 'Douala Treatment Plant', region: 'Littoral', type: 'Treatment Plant', capacity: 200000, currentLevel: 180000, status: 'Active', lastUpdate: '2025-06-06' },
    { id: 4, name: 'Maroua Well Complex', region: 'Far North', type: 'Well', capacity: 8000, currentLevel: 2400, status: 'Critical', lastUpdate: '2025-06-03' }
  ]);
  const [regionFilter, setRegionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importStep, setImportStep] = useState<'choose'|'csv'|'pdf'>('choose');
  const [newSource, setNewSource] = useState({
    name: '', region: '', type: '', capacity: '', currentLevel: '', status: '', lastUpdate: ''
  });
  const [importError, setImportError] = useState('');
  type ChartRef = {
    current: (HTMLCanvasElement & { chartInstance?: Chart }) | null;
  };
  useEffect(()=>{
    setWaterSources(waterSources)
    setTimeout(()=>{
      showToast("Maroua Well's' water level is very low",{ type: 'error' })
    },1000)
  },[])
  const chartRefs = {
    bar: useRef<ChartRef['current']>(null),
    pie: useRef<ChartRef['current']>(null),
    line: useRef<ChartRef['current']>(null)
  };
  // Filtered data
  const filteredSources = waterSources.filter(ws =>
    (regionFilter === 'All' || ws.region === regionFilter) &&
    (statusFilter === 'All' || ws.status === statusFilter)
  );

  // Unique regions and statuses for dropdowns
  const regions = ['All', ...Array.from(new Set(waterSources.map(ws => ws.region)))];
  const statuses = ['All', ...Array.from(new Set(waterSources.map(ws => ws.status)))];

  // Summary metrics
  const totalSources = filteredSources.length;
  const totalCapacity = filteredSources.reduce((sum, ws) => sum + ws.capacity, 0);
  const totalCurrent = filteredSources.reduce((sum, ws) => sum + ws.currentLevel, 0);
  const avgUtilization = totalSources ? (totalCurrent / totalCapacity) * 100 : 0;

  // Chart data
  const regionCounts = regions.slice(1).map(region =>
    filteredSources.filter(ws => ws.region === region).length
  );
  // const typeCounts = Array.from(new Set(waterSources.map(ws => ws.type))).map(type =>
  //   filteredSources.filter(ws => ws.type === type).length
  // );
  const statusCounts = statuses.slice(1).map(status =>
    filteredSources.filter(ws => ws.status === status).length
  );
  const capacityData = filteredSources.map(ws => ws.capacity);
  const currentLevelData = filteredSources.map(ws => ws.currentLevel);
  const sourceNames = filteredSources.map(ws => ws.name);

  // Chart rendering
  React.useEffect(() => {
    // Destroy previous charts if any
    Object.values(chartRefs).forEach(ref => {
      const chart = ref.current as any;
      if (chart && chart.chartInstance) {
        chart.chartInstance.destroy();
      }
    });
    // Bar chart (by region)
    if (chartRefs.bar.current) {
      chartRefs.bar.current.chartInstance = new Chart(chartRefs.bar.current, {
        type: 'bar',
        data: {
          labels: regions.slice(1),
          datasets: [{
            label: 'Sources by Region',
            data: regionCounts,
            backgroundColor: '#2563eb'
          }]
        },
        options: { plugins: { legend: { display: false } } }
      });
    }
    // Pie chart (by status)
    if (chartRefs.pie.current) {
      chartRefs.pie.current.chartInstance = new Chart(chartRefs.pie.current, {
        type: 'pie',
        data: {
          labels: statuses.slice(1),
          datasets: [{
            label: 'Sources by Status',
            data: statusCounts,
            backgroundColor: ['#22c55e', '#f59e42', '#ef4444', '#a3a3a3']
          }]
        }
      });
    }
    // Line chart (capacity vs. current)
    if (chartRefs.line.current) {
      chartRefs.line.current.chartInstance = new Chart(chartRefs.line.current, {
        type: 'line',
        data: {
          labels: sourceNames,
          datasets: [
            {
              label: 'Capacity',
              data: capacityData,
              borderColor: '#2563eb',
              fill: false
            },
            {
              label: 'Current Level',
              data: currentLevelData,
              borderColor: '#22c55e',
              fill: false
            }
          ]
        }
      });
    }
    // Cleanup
    return () => {
      Object.values(chartRefs).forEach(ref => {
        if (ref.current && ref.current.chartInstance) {
          ref.current.chartInstance.destroy();
        }
      });
    };
  }, [regionFilter, statusFilter, waterSources]);

  // Export handlers
  const handleExportCSV = () => {
    try {
      const csvRows = [
        'ID,Name,Region,Type,Capacity,Current Level,Status,Last Update',
        ...filteredSources.map(ws =>
          `${ws.id},"${ws.name}",${ws.region},${ws.type},${ws.capacity},${ws.currentLevel},${ws.status},${ws.lastUpdate}`
        )
      ];
      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'water_sources.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setExportError('CSV export failed.');
    }
  };

  // const handleExportJSON = () => {
  //   try {
  //     const blob = new Blob([JSON.stringify(filteredSources, null, 2)], { type: 'application/json' });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'water_sources.json';
  //     a.click();
  //     URL.revokeObjectURL(url);
  //   } catch (e) {
  //     setExportError('JSON export failed.');
  //   }
  // };

  const handleExportPDF = async () => {
    setExporting(true);
    setExportError('');
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      doc.setFontSize(16);
      doc.text('Water Sources Report', 14, 16);
      // Capture charts
      let y = 24;
      for (const key of ['bar', 'pie', 'line'] as const) {
        const canvas = chartRefs[key].current;
        if (canvas) {
          const imgData = canvas.toDataURL('image/png');
          doc.addImage(imgData, 'PNG', 14, y, 80, 40);
          y += 44;
        }
      }
      // Table
      doc.setFontSize(12);
      doc.text('Data Table:', 14, y + 6);
      let tableY = y + 12;
      filteredSources.forEach((ws, i) => {
        doc.text(`${ws.id} | ${ws.name} | ${ws.region} | ${ws.type} | ${ws.capacity} | ${ws.currentLevel} | ${ws.status} | ${ws.lastUpdate}`, 14, tableY + i * 7);
      });
      doc.save('water_sources_report.pdf');
    } catch (e) {
      setExportError('PDF export failed.');
    }
    setExporting(false);
  };

  const getStatusColor = (status:any) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'Maintenance': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  {/* Add useEffect to set width via CSS variable */}
  {React.useEffect(() => {
    document.querySelectorAll('.progress-bar-fill').forEach((el, idx) => {
      const width = document.querySelectorAll('.progress-bar-fill')[idx]?.getAttribute('data-width');
      if (width) {
        (el as HTMLElement).style.setProperty('--progress-width', `${width}%`);
      }
    });
  }, [filteredSources])}
  const handleCsvExtract = (parsedData: any[]) => {
    const mapped = parsedData.map((ws: any, idx: number) => ({
      id: waterSources.length + idx + 1,
      name: ws.name || ws.Name || '',
      region: ws.region || ws.Region || '',
      type: ws.type || ws.Type || '',
      capacity: Number(ws.capacity || ws.Capacity || 0),
      currentLevel: Number(ws.currentLevel || ws['Current Level'] || 0),
      status: ws.status || ws.Status || '',
      lastUpdate: ws.lastUpdate || ws['Last Update'] || ''
    }));
    setWaterSources([...mapped, ...waterSources]);
    setShowImportModal(false);
    setImportStep('choose');
    setImportError('');
  };
  const handleAddSource = () => {
    if (!newSource.name || !newSource.region || !newSource.type || !newSource.capacity || !newSource.currentLevel || !newSource.status || !newSource.lastUpdate) {
      setImportError('All fields are required.');
      return;
    }
    setWaterSources([
      {
        id: waterSources.length + 1,
        name: newSource.name,
        region: newSource.region,
        type: newSource.type,
        capacity: Number(newSource.capacity),
        currentLevel: Number(newSource.currentLevel),
        status: newSource.status,
        lastUpdate: newSource.lastUpdate
      },
      ...waterSources
    ]);
    setShowAddModal(false);
    setNewSource({ name: '', region: '', type: '', capacity: '', currentLevel: '', status: '', lastUpdate: '' });
    setImportError('');
  };
  const handleOcrExtract = (text: string) => {
    try {
      const lines = text.split('\n').filter(l => l.trim().length > 0);
      if (lines.length < 2) throw new Error('No table data found.');
      const headers = lines[0].split(/,|\s{2,}/).map(h => h.trim());
      const data = lines.slice(1).map(line => {
        const cols = line.split(/,|\s{2,}/);
        const obj: any = {};
        headers.forEach((h, i) => { obj[h] = cols[i]; });
        return obj;
      });
      handleCsvExtract(data);
    } catch (e) {
      setImportError('Failed to extract table from OCR text. Please check the format.');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-y-3">
        <h2 className="text-xl font-semibold text-gray-900">Water Sources Management</h2>
        <div className="flex space-x-3 flex-wrap gap-y-3">
          <button type="button" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={() => setShowAddModal(true)} aria-label="Add Source">
            + Add Source
          </button>
          <button type="button" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700" onClick={() => { setShowImportModal(true); setImportStep('choose'); }} aria-label="Import Data">
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700" onClick={handleExportPDF} disabled={exporting} title="Export as PDF">
            <Download className="h-4 w-4 mr-2" />
            Export as PDF
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700" onClick={handleExportCSV} title="Export as CSV">
            <Download className="h-4 w-4 mr-2" />
            Export as CSV
          </button>
        </div>
      </div>
      {/* Add Source Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#00000066] h-screen bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-2">
            <h3 className="text-lg font-semibold mb-4">Add New Water Source</h3>
            <div className="space-y-3">
              <input className="w-full border rounded px-2 py-1" placeholder="Source Name" value={newSource.name} onChange={e => setNewSource({ ...newSource, name: e.target.value })} />
              <input className="w-full border rounded px-2 py-1" placeholder="Region" value={newSource.region} onChange={e => setNewSource({ ...newSource, region: e.target.value })} />
              <input className="w-full border rounded px-2 py-1" placeholder="Type" value={newSource.type} onChange={e => setNewSource({ ...newSource, type: e.target.value })} />
              <input className="w-full border rounded px-2 py-1" type="number" placeholder="Capacity (L)" value={newSource.capacity} onChange={e => setNewSource({ ...newSource, capacity: e.target.value })} />
              <input className="w-full border rounded px-2 py-1" type="number" placeholder="Current Level" value={newSource.currentLevel} onChange={e => setNewSource({ ...newSource, currentLevel: e.target.value })} />
              <input className="w-full border rounded px-2 py-1" placeholder="Status" value={newSource.status} onChange={e => setNewSource({ ...newSource, status: e.target.value })} />
              <input className="w-full border rounded px-2 py-1" placeholder="Last Update (YYYY-MM-DD)" value={newSource.lastUpdate} onChange={e => setNewSource({ ...newSource, lastUpdate: e.target.value })} />
              {importError && <div className="text-red-600 text-sm">{importError}</div>}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button type="button" className="px-4 py-2 border rounded" onClick={() => { setShowAddModal(false); setImportError(''); }}>Cancel</button>
              <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleAddSource}>Add</button>
            </div>
          </div>
        </div>
      )}
      {/* Import Data Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-[#00000066] h-screen bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-2">
            <h3 className="text-lg font-semibold mb-4">Import Water Sources</h3>
            {importStep === 'choose' && (
              <div className="space-y-4">
                <button type="button" className="w-full px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setImportStep('csv')}>Import from CSV</button>
                <button type="button" className="w-full px-4 py-2 bg-indigo-600 text-white rounded" onClick={() => setImportStep('pdf')}>Import from PDF/Image (OCR)</button>
                <button type="button" className="w-full px-4 py-2 border rounded" onClick={() => setShowImportModal(false)}>Cancel</button>
              </div>
            )}
            {importStep === 'csv' && (
              <div>
                <CsvToJsonUpload onDataParsed={handleCsvExtract} />
                <div className="flex justify-end mt-4 space-x-2">
                  <button type="button" className="px-4 py-2 border rounded" onClick={() => setImportStep('choose')}>Back</button>
                  <button type="button" className="px-4 py-2 border rounded" onClick={() => setShowImportModal(false)}>Close</button>
                </div>
              </div>
            )}
            {importStep === 'pdf' && (
              <div>
                <OcrReader />
                <div className="flex flex-col mt-2">
                  <label htmlFor="ocr-textarea" className="text-sm font-medium">Paste extracted table text here (CSV or table):</label>
                  <textarea id="ocr-textarea" className="w-full border rounded p-2 mt-1" rows={4} placeholder="Paste table here..." onBlur={e => handleOcrExtract(e.target.value)} />
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <button type="button" className="px-4 py-2 border rounded" onClick={() => setImportStep('choose')}>Back</button>
                  <button type="button" className="px-4 py-2 border rounded" onClick={() => setShowImportModal(false)}>Close</button>
                </div>
                {importError && <div className="text-red-600 text-sm mt-2">{importError}</div>}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Filters */}
      <div className="flex space-x-4 items-center flex-wrap gap-y-3">
        <label htmlFor="region-filter" className="flex items-center text-sm font-medium text-gray-700">
          <MapPin className="h-4 w-4 mr-1" />
          Region:
        </label>
        <select
          id="region-filter"
          title="Filter by region"
          className="border rounded px-2 py-1"
          value={regionFilter}
          onChange={e => setRegionFilter(e.target.value)}
        >
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
        <label htmlFor="status-filter" className="flex items-center text-sm font-medium text-gray-700">
          <AlertTriangle className="h-4 w-4 mr-1" />
          Status:
        </label>
        <select
          id="status-filter"
          title="Filter by status"
          className="border rounded px-2 py-1"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      {/* Summary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-xs text-gray-500">Total Sources</div>
          <div className="text-2xl font-bold">{totalSources}</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-xs text-gray-500">Total Capacity (L)</div>
          <div className="text-2xl font-bold">{totalCapacity.toLocaleString()}</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-xs text-gray-500">Avg. Utilization</div>
          <div className="text-2xl font-bold">{avgUtilization.toFixed(1)}%</div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="flex items-center mb-2"><BarChart2 className="h-5 w-5 mr-2 text-blue-600" />By Region</div>
          <canvas ref={chartRefs.bar} width={200} height={120} aria-label="Bar chart by region" />
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="flex items-center mb-2"><PieChart className="h-5 w-5 mr-2 text-green-600" />By Status</div>
          <canvas ref={chartRefs.pie} width={200} height={120} aria-label="Pie chart by status" />
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="flex items-center mb-2"><LineChart className="h-5 w-5 mr-2 text-yellow-600" />Capacity vs. Current</div>
          <canvas ref={chartRefs.line} width={200} height={120} aria-label="Line chart capacity vs current" />
        </div>
      </div>
      {/* Error notification */}
      {exportError &&<div className="text-red-600 font-medium">{exportError}</div>}
      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity (L)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSources.map(source => (
                <tr key={source.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Droplets className="h-5 w-5 text-blue-500 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{source.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{source.region}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {source.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {source.capacity.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2 progress-bar-bg">
                        <div 
                          className="bg-blue-600 h-2 rounded-full progress-bar-fill" 
                          data-width={(source.currentLevel / source.capacity) * 100}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">
                        {((source.currentLevel / source.capacity) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(source.status)}`}>
                      {source.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {source.lastUpdate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .progress-bar-bg { background-color: #e5e7eb; }
        .progress-bar-fill { transition: width 0.5s; width: var(--progress-width, 0%); }
      `}</style>
      
    </div>
  );
};

export default WaterSources;