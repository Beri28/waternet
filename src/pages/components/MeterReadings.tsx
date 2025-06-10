import React, { useState, useRef, useEffect } from 'react';
import { BarChart2, PieChart, LineChart, Download, Filter } from 'lucide-react';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';

interface MeterReading {
  id: number;
  meter_name: string;
  region: string;
  reading_date: string;
  volume_consumed_liters: number;
  reported_by: string;
  created_at: string;
}

const mockReadings: MeterReading[] = [
  { id: 1, meter_name: 'Bamenda Meter 1', region: 'Northwest', reading_date: '2025-06-01', volume_consumed_liters: 1200, reported_by: 'John Doe', created_at: '2025-06-01' },
  { id: 2, meter_name: 'Douala Meter 2', region: 'Littoral', reading_date: '2025-06-02', volume_consumed_liters: 950, reported_by: 'Jane Smith', created_at: '2025-06-02' },
  { id: 3, meter_name: 'Yaoundé Meter 3', region: 'Centre', reading_date: '2025-06-03', volume_consumed_liters: 1800, reported_by: 'Paul N.', created_at: '2025-06-03' },
  { id: 4, meter_name: 'Maroua Meter 4', region: 'Far North', reading_date: '2025-06-04', volume_consumed_liters: 700, reported_by: 'Alice B.', created_at: '2025-06-04' }
];

const MeterReadings: React.FC = () => {
  const [readings, setReadings] = useState<MeterReading[]>(mockReadings);
  const [regionFilter, setRegionFilter] = useState('All');
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState('');
  const chartRefs:any = {
    bar: useRef<HTMLCanvasElement | null>(null),
    pie: useRef<HTMLCanvasElement | null>(null),
    line: useRef<HTMLCanvasElement | null>(null)
  };

  // Filtered data
  const filteredReadings = readings.filter(r =>
    regionFilter === 'All' || r.region === regionFilter
  );

  // Unique regions for dropdown
  const regions = ['All', ...Array.from(new Set(readings.map(r => r.region)))];

  // Summary metrics
  const totalReadings = filteredReadings.length;
  const totalVolume = filteredReadings.reduce((sum, r) => sum + r.volume_consumed_liters, 0);
  const avgVolume = totalReadings ? totalVolume / totalReadings : 0;

  // Chart data
  const regionCounts = regions.slice(1).map(region =>
    filteredReadings.filter(r => r.region === region).length
  );
  const meterNames = filteredReadings.map(r => r.meter_name);
  const volumeData = filteredReadings.map(r => r.volume_consumed_liters);
  const dateLabels = filteredReadings.map(r => r.reading_date);

  // Chart rendering
  React.useEffect(() => {
    Object.values(chartRefs).forEach((ref:any) => {
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
            label: 'Readings by Region',
            data: regionCounts,
            backgroundColor: '#2563eb'
          }]
        },
        options: { plugins: { legend: { display: false } } }
      });
    }
    // Pie chart (by meter)
    if (chartRefs.pie.current) {
      chartRefs.pie.current.chartInstance = new Chart(chartRefs.pie.current, {
        type: 'pie',
        data: {
          labels: meterNames,
          datasets: [{
            label: 'Volume by Meter',
            data: volumeData,
            backgroundColor: ['#22c55e', '#f59e42', '#ef4444', '#a3a3a3']
          }]
        }
      });
    }
    // Line chart (volume over time)
    if (chartRefs.line.current) {
      chartRefs.line.current.chartInstance = new Chart(chartRefs.line.current, {
        type: 'line',
        data: {
          labels: dateLabels,
          datasets: [
            {
              label: 'Volume (Liters)',
              data: volumeData,
              borderColor: '#2563eb',
              fill: false
            }
          ]
        }
      });
    }
    return () => {
      Object.values(chartRefs).forEach((ref:any) => {
        if (ref.current && ref.current.chartInstance) {
          ref.current.chartInstance.destroy();
        }
      });
    };
  }, [regionFilter, readings]);

  // Export handlers
  const handleExportCSV = () => {
    try {
      const csvRows = [
        'ID,Meter Name,Region,Reading Date,Volume (Liters),Reported By,Created At',
        ...filteredReadings.map(r =>
          `${r.id},"${r.meter_name}",${r.region},${r.reading_date},${r.volume_consumed_liters},${r.reported_by},${r.created_at}`
        )
      ];
      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'meter_readings.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setExportError('CSV export failed.');
    }
  };

  const handleExportJSON = () => {
    try {
      const blob = new Blob([JSON.stringify(filteredReadings, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'meter_readings.json';
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
      doc.text('Meter Readings Report', 14, 16);
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
      filteredReadings.forEach((r, i) => {
        doc.text(`${r.id} | ${r.meter_name} | ${r.region} | ${r.reading_date} | ${r.volume_consumed_liters} | ${r.reported_by} | ${r.created_at}`, 14, tableY + i * 7);
      });
      doc.save('meter_readings_report.pdf');
    } catch (e) {
      setExportError('PDF export failed.');
    }
    setExporting(false);
  };
  useEffect(()=>{
    setReadings(mockReadings)
  },[])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Meter Readings Management</h2>
        <div className="flex space-x-3">
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
          <Filter className="h-4 w-4 mr-1" />
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
      </div>
      {/* Summary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-xs text-gray-500">Total Readings</div>
          <div className="text-2xl font-bold">{totalReadings}</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-xs text-gray-500">Total Volume (L)</div>
          <div className="text-2xl font-bold">{totalVolume.toLocaleString()}</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-xs text-gray-500">Avg. Volume</div>
          <div className="text-2xl font-bold">{avgVolume.toFixed(1)}</div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="flex items-center mb-2"><BarChart2 className="h-5 w-5 mr-2 text-blue-600" />By Region</div>
          <canvas ref={chartRefs.bar} width={200} height={120} aria-label="Bar chart by region" />
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="flex items-center mb-2"><PieChart className="h-5 w-5 mr-2 text-green-600" />By Meter</div>
          <canvas ref={chartRefs.pie} width={200} height={120} aria-label="Pie chart by meter" />
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="flex items-center mb-2"><LineChart className="h-5 w-5 mr-2 text-yellow-600" />Volume Over Time</div>
          <canvas ref={chartRefs.line} width={200} height={120} aria-label="Line chart volume over time" />
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
                  Meter Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reading Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume (Liters)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reported By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReadings.map(reading => (
                <tr key={reading.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reading.meter_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reading.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reading.reading_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reading.volume_consumed_liters.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reading.reported_by}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reading.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MeterReadings;
