import React, { useState, useRef, useEffect } from 'react';
import { BarChart2, PieChart, LineChart, Download, Filter } from 'lucide-react';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';

interface QualityTest {
  id: number;
  location: string;
  region: string;
  test_date: string;
  contamination_type: string;
  ph_level: number;
  status: string;
  tested_by: string;
}

const mockTests: QualityTest[] = [
  { id: 1, location: 'Bamenda Well', region: 'Northwest', test_date: '2025-06-01', contamination_type: 'Bacterial', ph_level: 7.2, status: 'Safe', tested_by: 'John Doe' },
  { id: 2, location: 'Douala River', region: 'Littoral', test_date: '2025-06-02', contamination_type: 'Chemical', ph_level: 6.5, status: 'Unsafe', tested_by: 'Jane Smith' },
  { id: 3, location: 'Yaoundé Plant', region: 'Centre', test_date: '2025-06-03', contamination_type: 'Mineral', ph_level: 8.1, status: 'Safe', tested_by: 'Paul N.' },
  { id: 4, location: 'Maroua Well', region: 'Far North', test_date: '2025-06-04', contamination_type: 'Bacterial', ph_level: 8.5, status: 'Unsafe', tested_by: 'Alice B.' }
];

const QualityTests: React.FC = () => {
  const [tests, setTests] = useState<QualityTest[]>(mockTests);
  const [regionFilter, setRegionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState('');
  const chartRefs:any = {
    bar: useRef<HTMLCanvasElement | null>(null),
    pie: useRef<HTMLCanvasElement | null>(null),
    line: useRef<HTMLCanvasElement | null>(null)
  };

  // Filtered data
  const filteredTests = tests.filter(t =>
    (regionFilter === 'All' || t.region === regionFilter) &&
    (statusFilter === 'All' || t.status === statusFilter)
  );

  // Unique regions and statuses for dropdowns
  const regions = ['All', ...Array.from(new Set(tests.map(t => t.region)))];
  const statuses = ['All', ...Array.from(new Set(tests.map(t => t.status)))];

  // Summary metrics
  const totalTests = filteredTests.length;
  const avgPh = totalTests ? (filteredTests.reduce((sum, t) => sum + t.ph_level, 0) / totalTests) : 0;

  // Chart data
  const regionCounts = regions.slice(1).map(region =>
    filteredTests.filter(t => t.region === region).length
  );
  const contaminationTypes = Array.from(new Set(tests.map(t => t.contamination_type)));
  const contaminationCounts = contaminationTypes.map(type =>
    filteredTests.filter(t => t.contamination_type === type).length
  );
  const phData = filteredTests.map(t => t.ph_level);
  const testDates = filteredTests.map(t => t.test_date);

  // Chart rendering
  React.useEffect(() => {
    Object.values(chartRefs).forEach((ref:any )=> {
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
            label: 'Tests by Region',
            data: regionCounts,
            backgroundColor: '#2563eb'
          }]
        },
        options: { plugins: { legend: { display: false } } }
      });
    }
    // Pie chart (by contamination type)
    if (chartRefs.pie.current) {
      chartRefs.pie.current.chartInstance = new Chart(chartRefs.pie.current, {
        type: 'pie',
        data: {
          labels: contaminationTypes,
          datasets: [{
            label: 'By Contamination Type',
            data: contaminationCounts,
            backgroundColor: ['#22c55e', '#f59e42', '#ef4444', '#a3a3a3']
          }]
        }
      });
    }
    // Line chart (pH over time)
    if (chartRefs.line.current) {
      chartRefs.line.current.chartInstance = new Chart(chartRefs.line.current, {
        type: 'line',
        data: {
          labels: testDates,
          datasets: [
            {
              label: 'pH Level',
              data: phData,
              borderColor: '#2563eb',
              fill: false
            }
          ]
        }
      });
    }
    return () => {
      Object.values(chartRefs).forEach((ref:any )=> {
        if (ref.current && ref.current.chartInstance) {
          ref.current.chartInstance.destroy();
        }
      });
    };
  }, [regionFilter, statusFilter, tests]);

  // Export handlers
  const handleExportCSV = () => {
    try {
      const csvRows = [
        'ID,Location,Region,Test Date,Contamination Type,pH Level,Status,Tested By',
        ...filteredTests.map(t =>
          `${t.id},"${t.location}",${t.region},${t.test_date},${t.contamination_type},${t.ph_level},${t.status},${t.tested_by}`
        )
      ];
      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quality_tests.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setExportError('CSV export failed.');
    }
  };

  // const handleExportJSON = () => {
  //   try {
  //     const blob = new Blob([JSON.stringify(filteredTests, null, 2)], { type: 'application/json' });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'quality_tests.json';
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
      doc.text('Water Quality Tests Report', 14, 16);
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
      filteredTests.forEach((t, i) => {
        doc.text(`${t.id} | ${t.location} | ${t.region} | ${t.test_date} | ${t.contamination_type} | ${t.ph_level} | ${t.status} | ${t.tested_by}`, 14, tableY + i * 7);
      });
      doc.save('quality_tests_report.pdf');
    } catch (e) {
      setExportError('PDF export failed.');
    }
    setExporting(false);
  };
  useEffect(()=>{
    setTests(mockTests)
  },[])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-y-3">
        <h2 className="text-xl font-semibold text-gray-900">Water Quality Tests Management</h2>
        <div className="flex space-x-3 flex-wrap gap-y-2">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700" onClick={handleExportPDF} disabled={exporting} title="Export as PDF">
            <Download className="h-4 w-4 mr-2" />
            PDF
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700" onClick={handleExportCSV} title="Export as CSV">
            <Download className="h-4 w-4 mr-2" />
            CSV
          </button>
          {/* <button className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700" onClick={handleExportJSON} title="Export as JSON">
            <Download className="h-4 w-4 mr-2" />
            JSON
          </button> */}
        </div>
      </div>
      {/* Filters */}
      <div className="flex space-x-4 items-center ">
        <label htmlFor="region-filter" className="flex items-center text-sm font-medium text-gray-700">
          <Filter className="h-4 w-4 mr-1" />
          Region:
        
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
        </label>
        <label htmlFor="status-filter" className="flex items-center text-sm font-medium text-gray-700">
          <Filter className="h-4 w-4 mr-1" />
          Status:
        
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
        </label>
      </div>
      {/* Summary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-xs text-gray-500">Total Tests</div>
          <div className="text-2xl font-bold">{totalTests}</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-xs text-gray-500">Avg. pH Level</div>
          <div className="text-2xl font-bold">{avgPh.toFixed(2)}</div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="flex items-center mb-2"><BarChart2 className="h-5 w-5 mr-2 text-blue-600" />By Region</div>
          <canvas ref={chartRefs.bar} width={200} height={120} aria-label="Bar chart by region" />
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="flex items-center mb-2"><PieChart className="h-5 w-5 mr-2 text-green-600" />By Contamination Type</div>
          <canvas ref={chartRefs.pie} width={200} height={120} aria-label="Pie chart by contamination type" />
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="flex items-center mb-2"><LineChart className="h-5 w-5 mr-2 text-yellow-600" />pH Over Time</div>
          <canvas ref={chartRefs.line} width={200} height={120} aria-label="Line chart pH over time" />
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
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contamination Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  pH Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tested By
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTests.map(test => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{test.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.test_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.contamination_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.ph_level}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.tested_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QualityTests;
