import React, { useState, useRef, useEffect } from 'react';
import { BarChart2, PieChart, LineChart, Download, MapPin, Filter } from 'lucide-react';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';

interface Asset {
  id: number;
  asset_name: string;
  region: string;
  type: string;
  condition_status: string;
  last_maintenance_date: string;
  district_id: string;
  capacity_m3_per_day: number;
}

const mockAssets: Asset[] = [
  { id: 1, asset_name: 'Bamenda Reservoir', region: 'Northwest', type: 'Reservoir', condition_status: 'Good', last_maintenance_date: '2025-06-01', district_id: 'D1', capacity_m3_per_day: 5000 },
  { id: 2, asset_name: 'Douala Pump Station', region: 'Littoral', type: 'Pump Station', condition_status: 'Needs Repair', last_maintenance_date: '2025-05-20', district_id: 'D2', capacity_m3_per_day: 3000 },
  { id: 3, asset_name: 'Yaoundé Treatment Plant', region: 'Centre', type: 'Treatment Plant', condition_status: 'Good', last_maintenance_date: '2025-06-05', district_id: 'D3', capacity_m3_per_day: 8000 },
  { id: 4, asset_name: 'Maroua Well', region: 'Far North', type: 'Well', condition_status: 'Critical', last_maintenance_date: '2025-04-15', district_id: 'D4', capacity_m3_per_day: 1200 }
];

const InfrastructureAssets: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [regionFilter, setRegionFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState('');
  const chartRefs:any = {
    bar: useRef<HTMLCanvasElement | null>(null),
    pie: useRef<HTMLCanvasElement | null>(null),
    line: useRef<HTMLCanvasElement | null>(null)
  };

  // Filtered data
  const filteredAssets = assets.filter(a =>
    (regionFilter === 'All' || a.region === regionFilter) &&
    (typeFilter === 'All' || a.type === typeFilter)
  );

  // Unique regions and types for dropdowns
  const regions = ['All', ...Array.from(new Set(assets.map(a => a.region)))];
  const types = ['All', ...Array.from(new Set(assets.map(a => a.type)))];

  // Summary metrics
  const totalAssets = filteredAssets.length;
  const totalCapacity = filteredAssets.reduce((sum, a) => sum + a.capacity_m3_per_day, 0);
  const avgCapacity = totalAssets ? totalCapacity / totalAssets : 0;

  // Chart data
  const regionCounts = regions.slice(1).map(region =>
    filteredAssets.filter(a => a.region === region).length
  );
  const typeCounts = types.slice(1).map(type =>
    filteredAssets.filter(a => a.type === type).length
  );
  // const conditionCounts = Array.from(new Set(assets.map(a => a.condition_status))).map(status =>
  //   filteredAssets.filter(a => a.condition_status === status).length
  // );
  const assetNames = filteredAssets.map(a => a.asset_name);
  const capacityData = filteredAssets.map(a => a.capacity_m3_per_day);

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
            label: 'Assets by Region',
            data: regionCounts,
            backgroundColor: '#2563eb'
          }]
        },
        options: { plugins: { legend: { display: false } } }
      });
    }
    // Pie chart (by type)
    if (chartRefs.pie.current) {
      chartRefs.pie.current.chartInstance = new Chart(chartRefs.pie.current, {
        type: 'pie',
        data: {
          labels: types.slice(1),
          datasets: [{
            label: 'Assets by Type',
            data: typeCounts,
            backgroundColor: ['#22c55e', '#f59e42', '#ef4444', '#a3a3a3']
          }]
        }
      });
    }
    // Line chart (capacity)
    if (chartRefs.line.current) {
      chartRefs.line.current.chartInstance = new Chart(chartRefs.line.current, {
        type: 'line',
        data: {
          labels: assetNames,
          datasets: [
            {
              label: 'Capacity (m³/day)',
              data: capacityData,
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
  }, [regionFilter, typeFilter, assets]);

  // Export handlers
  const handleExportCSV = () => {
    try {
      const csvRows = [
        'ID,Name,Region,Type,Condition,Last Maintenance,District,Capacity (m3/day)',
        ...filteredAssets.map(a =>
          `${a.id},"${a.asset_name}",${a.region},${a.type},${a.condition_status},${a.last_maintenance_date},${a.district_id},${a.capacity_m3_per_day}`
        )
      ];
      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'infrastructure_assets.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setExportError('CSV export failed.');
    }
  };

  // const handleExportJSON = () => {
  //   try {
  //     const blob = new Blob([JSON.stringify(filteredAssets, null, 2)], { type: 'application/json' });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'infrastructure_assets.json';
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
      doc.text('Infrastructure Assets Report', 14, 16);
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
      filteredAssets.forEach((a, i) => {
        doc.text(`${a.id} | ${a.asset_name} | ${a.region} | ${a.type} | ${a.condition_status} | ${a.last_maintenance_date} | ${a.district_id} | ${a.capacity_m3_per_day}`, 14, tableY + i * 7);
      });
      doc.save('infrastructure_assets_report.pdf');
    } catch (e) {
      setExportError('PDF export failed.');
    }
    setExporting(false);
  };
  useEffect(()=>{
      setAssets(mockAssets)
    },[])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-y-3">
        <h2 className="text-xl font-semibold text-gray-900">Infrastructure Assets Management</h2>
        <div className="flex space-x-3 ">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700" onClick={handleExportPDF} disabled={exporting} title="Export as PDF">
            <Download className="h-4 w-4 mr-2" />
            Export as PDF
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700" onClick={handleExportCSV} title="Export as CSV">
            <Download className="h-4 w-4 mr-2" />
            Export as CSV
          </button>
          {/* <button className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700" onClick={handleExportJSON} title="Export as JSON">
            <Download className="h-4 w-4 mr-2" />
            JSON
          </button> */}
        </div>
      </div>
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
        <label htmlFor="type-filter" className="flex items-center text-sm font-medium text-gray-700">
          <Filter className="h-4 w-4 mr-1" />
          Type:
        </label>
        <select
          id="type-filter"
          title="Filter by type"
          className="border rounded px-2 py-1"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
        >
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      {/* Summary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-xs text-gray-500">Total Assets</div>
          <div className="text-2xl font-bold">{totalAssets}</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-xs text-gray-500">Total Capacity (m³/day)</div>
          <div className="text-2xl font-bold">{totalCapacity.toLocaleString()}</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-xs text-gray-500">Avg. Capacity</div>
          <div className="text-2xl font-bold">{avgCapacity.toFixed(1)}</div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="flex items-center mb-2"><BarChart2 className="h-5 w-5 mr-2 text-blue-600" />By Region</div>
          <canvas ref={chartRefs.bar} width={200} height={120} aria-label="Bar chart by region" />
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="flex items-center mb-2"><PieChart className="h-5 w-5 mr-2 text-green-600" />By Type</div>
          <canvas ref={chartRefs.pie} width={200} height={120} aria-label="Pie chart by type" />
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="flex items-center mb-2"><LineChart className="h-5 w-5 mr-2 text-yellow-600" />Capacity</div>
          <canvas ref={chartRefs.line} width={200} height={120} aria-label="Line chart capacity" />
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
                  Asset Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  District
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity (m³/day)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map(asset => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{asset.asset_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.condition_status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.last_maintenance_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.district_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.capacity_m3_per_day.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureAssets;
