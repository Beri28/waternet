import React, { useState, useRef } from 'react';
import { Search, Plus, Users, Droplets, AlertTriangle, MapPin, Calendar, Database, Upload, Download, BarChart2, PieChart, LineChart, Filter } from 'lucide-react';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const WaterSources = () => {
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
  const chartRefs = {
    bar: useRef(null),
    pie: useRef(null),
    line: useRef(null)
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
  const typeCounts = Array.from(new Set(waterSources.map(ws => ws.type))).map(type =>
    filteredSources.filter(ws => ws.type === type).length
  );
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
      if (ref.current && ref.current.chartInstance) {
        ref.current.chartInstance.destroy();
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

  const handleExportJSON = () => {
    try {
      const blob = new Blob([JSON.stringify(filteredSources, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'water_sources.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setExportError('JSON export failed.');
    }
  };

  const handleExportPDF = async () => {
    setExporting(true);
    setExportError('');
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      doc.setFontSize(16);
      doc.text('Water Sources Report', 14, 16);
      // Capture charts
      let y = 24;
      for (const key of ['bar', 'pie', 'line']) {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Water Sources Management</h2>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700" onClick={handleExportPDF} disabled={exporting} title="Export as PDF">
            <Download className="h-4 w-4 mr-2" />
            PDF
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700" onClick={handleExportCSV} title="Export as CSV">
            <Download className="h-4 w-4 mr-2" />
            CSV
          </button>
          <button className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700" onClick={handleExportJSON} title="Export as JSON">
            <Download className="h-4 w-4 mr-2" />
            JSON
          </button>
        </div>
      </div>
      {/* Filters */}
      <div className="flex space-x-4 items-center">
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
      {exportError && <div className="text-red-600 font-medium">{exportError}</div>}
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
      {/* Add useEffect to set width via CSS variable */}
      {React.useEffect(() => {
        document.querySelectorAll('.progress-bar-fill').forEach((el, idx) => {
          const width = document.querySelectorAll('.progress-bar-fill')[idx]?.getAttribute('data-width');
          if (width) {
            (el as HTMLElement).style.setProperty('--progress-width', `${width}%`);
          }
        });
      }, [filteredSources])}
    </div>
  );
};

export default WaterSources;