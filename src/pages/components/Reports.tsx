import { useEffect, useState} from 'react';
import { Plus, AlertTriangle, MapPin, Download, Filter } from 'lucide-react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import autoTable from 'jspdf-autotable';
import { useToast } from '../../Context/toastContext';
// import ReportPreview from './ReportPreview';

const Reports = () => {;
  const [reports, setReports] = useState([
    { 
      id: 1, 
      type: 'Leak Report', 
      location: 'Bamenda District 3',
      region: 'Northwest',
      reporter: 'SMS: +237-XXX-1234', 
      status: 'Pending', 
      priority: 'High', 
      date: '2025-06-06',
      estimatedLoss: '150L/hour',
      affectedHouseholds: 120,
      repairCost: '500,000 FCFA'
    },
    { 
      id: 2, 
      type: 'Supply Shortage', 
      location: 'Douala Central',
      region: 'Littoral', 
      reporter: 'Field Officer: Jean Mukete', 
      status: 'In Progress', 
      priority: 'High', 
      date: '2025-06-05',
      affectedArea: '3.5 km²',
      populationImpact: 5000,
      estimatedDuration: '48 hours'
    },
    { 
      id: 3, 
      type: 'Quality Issue', 
      location: 'Maroua Village Well',
      region: 'Far North', 
      reporter: 'Community Leader', 
      status: 'Resolved', 
      priority: 'High', 
      date: '2025-06-04',
      contaminationType: 'Bacterial',
      phLevel: 8.2,
      affectedUsers: 750
    },
    { 
      id: 4, 
      type: 'Leak Report', 
      location: 'Yaoundé District 5',
      region: 'Centre', 
      reporter: 'Maintenance Team', 
      status: 'Pending', 
      priority: 'Medium', 
      date: '2025-06-03',
      estimatedLoss: '75L/hour',
      affectedHouseholds: 45,
      repairCost: '250,000 FCFA'
    },
    {
      id: 5,
      type: 'Equipment Failure',
      location: 'Garoua Water Plant',
      region: 'North',
      reporter: 'Plant Supervisor',
      status: 'In Progress',
      priority: 'High',
      date: '2025-06-02',
      affectedArea: '2.1 km²',
      populationImpact: 3000,
      estimatedDuration: '24 hours'
    },
    {
      id: 6,
      type: 'Quality Issue',
      location: 'Bertoua Central',
      region: 'East',
      reporter: 'Health Inspector',
      status: 'Pending',
      priority: 'Medium',
      date: '2025-06-01',
      contaminationType: 'Chemical',
      phLevel: 6.5,
      affectedUsers: 450
    },
    {
      id: 7,
      type: 'Supply Shortage',
      location: 'Limbe Coast',
      region: 'Southwest',
      reporter: 'Local Authority',
      status: 'Resolved',
      priority: 'High',
      date: '2025-05-31',
      affectedArea: '4.0 km²',
      populationImpact: 6000,
      estimatedDuration: '72 hours'
    },
    {
      id: 8,
      type: 'Leak Report',
      location: 'Kribi Port Area',
      region: 'South',
      reporter: 'Port Authority',
      status: 'In Progress',
      priority: 'Medium',
      date: '2025-05-30',
      estimatedLoss: '100L/hour',
      affectedHouseholds: 80,
      repairCost: '350,000 FCFA'
    },
    {
      id: 9,
      type: 'Equipment Failure',
      location: 'Ngaoundéré Station',
      region: 'Adamawa',
      reporter: 'Technical Team',
      status: 'Pending',
      priority: 'High',
      date: '2025-05-29',
      affectedArea: '1.8 km²',
      populationImpact: 2500,
      estimatedDuration: '36 hours'
    },
    {
      id: 10,
      type: 'Quality Issue',
      location: 'Foumban District',
      region: 'West',
      reporter: 'Community Health Worker',
      status: 'In Progress',
      priority: 'Medium',
      date: '2025-05-28',
      contaminationType: 'Mineral',
      phLevel: 7.8,
      affectedUsers: 320
    },
    {
      id: 11,
      type: 'Leak Report',
      location: 'Bamenda District 1',
      region: 'Northwest',
      reporter: 'SMS: +237-XXX-5678',
      status: 'Pending',
      priority: 'High',
      date: '2025-05-27',
      estimatedLoss: '200L/hour',
      affectedHouseholds: 150,
      repairCost: '600,000 FCFA'
    },
    {
      id: 12,
      type: 'Supply Shortage',
      location: 'Douala District 4',
      region: 'Littoral',
      reporter: 'Field Officer: Marie Tamba',
      status: 'In Progress',
      priority: 'High',
      date: '2025-05-26',
      affectedArea: '2.8 km²',
      populationImpact: 4200,
      estimatedDuration: '36 hours'
    },
    {
      id: 13,
      type: 'Equipment Failure',
      location: 'Yaoundé District 2',
      region: 'Centre',
      reporter: 'Maintenance Supervisor',
      status: 'Resolved',
      priority: 'Medium',
      date: '2025-05-25',
      affectedArea: '1.5 km²',
      populationImpact: 1800,
      estimatedDuration: '12 hours'
    },
    {
      id: 14,
      type: 'Quality Issue',
      location: 'Mokolo District',
      region: 'Far North',
      reporter: 'Water Quality Team',
      status: 'Pending',
      priority: 'High',
      date: '2025-05-24',
      contaminationType: 'Bacterial',
      phLevel: 8.5,
      affectedUsers: 890
    },
    {
      id: 15,
      type: 'Leak Report',
      location: 'Buea Mountain Area',
      region: 'Southwest',
      reporter: 'Local Council',
      status: 'In Progress',
      priority: 'Medium',
      date: '2025-05-23',
      estimatedLoss: '120L/hour',
      affectedHouseholds: 95,
      repairCost: '400,000 FCFA'
    },
    {
      id: 16,
      type: 'Supply Shortage',
      location: 'Ebolowa Central',
      region: 'South',
      reporter: 'District Officer',
      status: 'Pending',
      priority: 'High',
      date: '2025-05-22',
      affectedArea: '3.2 km²',
      populationImpact: 4800,
      estimatedDuration: '60 hours'
    },
    {
      id: 17,
      type: 'Equipment Failure',
      location: 'Maroua North',
      region: 'Far North',
      reporter: 'Technical Support',
      status: 'Resolved',
      priority: 'Medium',
      date: '2025-05-21',
      affectedArea: '1.2 km²',
      populationImpact: 1500,
      estimatedDuration: '8 hours'
    },
    {
      id: 18,
      type: 'Quality Issue',
      location: 'Bafoussam District',
      region: 'West',
      reporter: 'Health Department',
      status: 'In Progress',
      priority: 'High',
      date: '2025-05-20',
      contaminationType: 'Chemical',
      phLevel: 6.8,
      affectedUsers: 670
    },
    {
      id: 19,
      type: 'Leak Report',
      location: 'Garoua District 2',
      region: 'North',
      reporter: 'Community Watch',
      status: 'Pending',
      priority: 'Medium',
      date: '2025-05-19',
      estimatedLoss: '85L/hour',
      affectedHouseholds: 60,
      repairCost: '280,000 FCFA'
    },
    {
      id: 20,
      type: 'Supply Shortage',
      location: 'Bertoua South',
      region: 'East',
      reporter: 'Regional Authority',
      status: 'In Progress',
      priority: 'High',
      date: '2025-05-18',
      affectedArea: '2.5 km²',
      populationImpact: 3800,
      estimatedDuration: '42 hours'
    }
    ]);

  const [newReport, setNewReport] = useState({
    type: '',
    location: '',
    reporter: '',
    description: '',
    priority: 'Medium'
  });
  const {showToast}=useToast()
  const [showNewReport, setShowNewReport] = useState(false);
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [regionFilter, setRegionFilter] = useState<string>('All');

  // --- FILTERED DATA LOGIC ---
  const uniqueRegions = Array.from(new Set(reports.map(r => r.region))).filter(Boolean);
  const filteredReports = regionFilter === 'All' ? reports : reports.filter(r => r.region === regionFilter);

  // Helper: Count by type and by status
  const typeCounts = filteredReports.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const statusCounts = filteredReports.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Helper: Metrics for visualizations
  const regionCounts = filteredReports.reduce((acc, r) => {
    acc[r.region] = (acc[r.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const priorityCounts = filteredReports.reduce((acc, r) => {
    acc[r.priority] = (acc[r.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const lossByDate = filteredReports.filter(r => r.estimatedLoss).map(r => ({
    date: r.date,
    loss: parseInt(String(r.estimatedLoss).replace(/[^\d]/g, '')) || 0
  }));
  const affectedByType = filteredReports.reduce((acc, r) => {
    if (r.affectedHouseholds) acc['Leak Report'] = (acc['Leak Report'] || 0) + r.affectedHouseholds;
    if (r.affectedUsers) acc['Quality Issue'] = (acc['Quality Issue'] || 0) + r.affectedUsers;
    if (r.populationImpact) acc[r.type] = (acc[r.type] || 0) + r.populationImpact;
    return acc;
  }, {} as Record<string, number>);

  const handleAddReport = () => {
    if (newReport.type && newReport.location && newReport.reporter) {
      let report: any = {
        id: reports.length + 1,
        ...newReport,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0]
      };

      // Add type-specific properties
      if (newReport.type === 'Leak Report') {
        report = {
          ...report,
          estimatedLoss: '0L/hour',
          affectedHouseholds: 0,
          repairCost: '0 FCFA'
        };
      } else if (newReport.type === 'Supply Shortage') {
        report = {
          ...report,
          affectedArea: '0 km²',
          populationImpact: 0,
          estimatedDuration: '0 hours'
        };
      } else if (newReport.type === 'Quality Issue') {
        report = {
          ...report,
          contaminationType: 'Unknown',
          phLevel: 7.0,
          affectedUsers: 0
        };
      }

      setReports([report, ...reports]);
      setNewReport({ type: '', location: '', reporter: '', description: '', priority: 'Medium' });
      setShowNewReport(false);
    }
  };

  const handleExportPDF = async () => {
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    pdf.setFontSize(18);
    pdf.text('Water Resource Report Summary', 40, 40);
    pdf.setFontSize(12);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 40, 65);

    // Add summary stats
    pdf.setFontSize(14);
    pdf.text('Summary:', 40, 95);
    pdf.setFontSize(12);
    let y = 115;
    Object.entries(typeCounts).forEach(([type, count]) => {
      pdf.text(`Type: ${type} - ${count} report(s)`, 60, y);
      y += 18;
    });
    y += 10;
    Object.entries(statusCounts).forEach(([status, count]) => {
      pdf.text(`Status: ${status} - ${count} report(s)`, 60, y);
      y += 18;
    });
    y += 10;
    Object.entries(regionCounts).forEach(([region, count]) => {
      pdf.text(`Region: ${region} - ${count} report(s)`, 60, y);
      y += 18;
    });
    y += 10;
    Object.entries(priorityCounts).forEach(([priority, count]) => {
      pdf.text(`Priority: ${priority} - ${count} report(s)`, 60, y);
      y += 18;
    });

    // --- CAPTURE VISUALIZATION CHARTS AS IMAGES ---
    // Wait for a short time to ensure charts are rendered
    await new Promise(res => setTimeout(res, 500));
    const chartType = document.getElementById('bar-chart-type');
    const chartRegion = document.getElementById('pie-chart-region');
    const chartPriority = document.getElementById('bar-chart-priority');
    const chartLoss = document.getElementById('line-chart-loss');
    const chartAffected = document.getElementById('bar-chart-affected');
    let chartY = y + 20;
    const addChart = async (
      chartDiv: HTMLElement | null,
      x: number,
      y: number,
      w: number,
      h: number
    ) => {
      if (chartDiv) {
        // Use html2canvas to capture the chart div as an image
        const canvas = await html2canvas(chartDiv, { backgroundColor: '#fff', scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', x, y, w, h);
      }
    };
    // Render charts in two rows
    await addChart(chartType, 40, chartY, 260, 100);
    await addChart(chartRegion, 320, chartY, 180, 100);
    await addChart(chartPriority, 520, chartY, 180, 100);
    chartY += 110;
    await addChart(chartLoss, 40, chartY, 340, 100);
    await addChart(chartAffected, 400, chartY, 300, 100);
    chartY += 110;

    // Add table with all fields
    autoTable(pdf, {
      startY: chartY + 10,
      head: [[
        'Type', 'Location', 'Region', 'Reporter', 'Priority', 'Status', 'Date', 'Loss', 'Households', 'Repair', 'Area', 'Pop', 'Duration', 'Contam.', 'pH', 'Users'
      ]],
      body: filteredReports.map(r => [
        r.type, r.location, r.region, r.reporter, r.priority, r.status, r.date,
        r.estimatedLoss || '', r.affectedHouseholds || '', r.repairCost || '',
        r.affectedArea || '', r.populationImpact || '', r.estimatedDuration || '',
        r.contaminationType || '', r.phLevel || '', r.affectedUsers || ''
      ]),
      theme: 'striped',
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 9 },
      margin: { left: 40, right: 40 },
      tableWidth: 'auto',
    });

    pdf.save('report-summary.pdf');
  };

  const handleExportCSV = () => {
    const csvRows = [
      ['Type', 'Location', 'Reporter', 'Priority', 'Status', 'Date'],
      ...filteredReports.map(r => [r.type, r.location, r.reporter, r.priority, r.status, r.date])
    ];
    const csvContent = csvRows.map(row => row.map(String).map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report-summary.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // const handleExportJSON = () => {
  //   const json = JSON.stringify(filteredReports, null, 2);
  //   const blob = new Blob([json], { type: 'application/json' });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'report-summary.json';
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // };

  const getPriorityColor = (priority:any) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  useEffect(()=>{
    setTimeout(()=>{
      showToast("New leak at Bamenda District 3 was just reported",{ type: 'warning' })
    },1000)
    setTimeout(()=>{
      showToast("Shortage at Douala Central was just reported",{ type: 'warning' })
    },2000)
  },[])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-y-3">
        <h2 className="text-xl font-semibold text-gray-900">Reports & Incidents</h2>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setShowNewReport(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </button>
          <button
            onClick={() => setShowReportPreview(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Generate Overview Report
          </button>
        </div>
      </div>

      {showNewReport && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Submit New Report</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select 
                title='reportType'
                value={newReport.type}
                onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="Leak Report">Leak Report</option>
                <option value="Maintenance">Maintenance Required</option>
                <option value="Quality Issue">Water Quality Issue</option>
                <option value="Supply Shortage">Supply Shortage</option>
                <option value="Equipment Failure">Equipment Failure</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input 
                type="text"
                value={newReport.location}
                onChange={(e) => setNewReport({...newReport, location: e.target.value})}
                placeholder="e.g., Bamenda District 3"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reporter</label>
              <input 
                type="text"
                value={newReport.reporter}
                onChange={(e) => setNewReport({...newReport, reporter: e.target.value})}
                placeholder="e.g., SMS: +237-XXX-1234 or Field Officer Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select 
                title='reportPriority'
                value={newReport.priority}
                onChange={(e) => setNewReport({...newReport, priority: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                value={newReport.description}
                onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                rows={3}
                placeholder="Detailed description of the issue..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button 
              onClick={() => setShowNewReport(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddReport}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit Report
            </button>
          </div>
        </div>
      )}

      {showReportPreview && (
        <div id="report-preview-pdf" className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-y-3">
            <h3 className="text-lg font-semibold">Report Summary</h3>
            <div className="flex gap-2 flex-wrap">
              <button onClick={handleExportPDF} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Export as PDF</button>
              <button onClick={handleExportCSV} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Export as CSV</button>
              {/* <button onClick={handleExportJSON} className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700">Export as JSON</button> */}
              <button onClick={() => setShowReportPreview(false)} className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700">Close</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div id="bar-chart-type">
              <BarChart
                xAxis={[{
                  id: 'type',
                  data: Object.keys(typeCounts),
                  label: 'Report Type',
                }]}
                series={[{
                  data: Object.values(typeCounts),
                  label: 'Count',
                }]}
                height={220}
              />
              <div className="text-center text-xs text-gray-500 mt-2">Reports by Type</div>
            </div>
            <div id="pie-chart-region">
              <PieChart
                series={[{
                  data: Object.entries(regionCounts).map(([region, value]) => ({ id: region, value, label: region })),
                  innerRadius: 40,
                  outerRadius: 80,
                  paddingAngle: 2,
                  cornerRadius: 4,
                }]}
                width={320}
                height={220}
              />
              <div className="text-center text-xs text-gray-500 mt-2">Reports by Region</div>
            </div>
            <div id="bar-chart-priority">
              <BarChart
                xAxis={[{
                  id: 'priority',
                  data: Object.keys(priorityCounts),
                  label: 'Priority',
                }]}
                series={[{
                  data: Object.values(priorityCounts),
                  label: 'Count',
                }]}
                height={220}
                colors={["#f59e42"]}
              />
              <div className="text-center text-xs text-gray-500 mt-2">Reports by Priority</div>
            </div>
            <div id="line-chart-loss">
              <LineChart
                xAxis={[{ data: lossByDate.map(d => d.date), label: 'Date' }]}
                series={[{ data: lossByDate.map(d => d.loss), label: 'Estimated Loss (L/hour)' }]}
                height={220}
              />
              <div className="text-center text-xs text-gray-500 mt-2">Estimated Water Loss Over Time</div>
            </div>
            <div id="bar-chart-affected">
              <BarChart
                xAxis={[{ id: 'affected', data: Object.keys(affectedByType), label: 'Type' }]}
                series={[{ data: Object.values(affectedByType), label: 'People/Households Impacted' }]}
                height={220}
              />
              <div className="text-center text-xs text-gray-500 mt-2">People/Households Impacted by Type</div>
            </div>
          </div>
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map(report => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{report.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{report.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{report.region}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{report.reporter}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{report.priority}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{report.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{report.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                      {report.estimatedLoss && <div>Loss: {report.estimatedLoss}</div>}
                      {report.affectedHouseholds && <div>Households: {report.affectedHouseholds}</div>}
                      {report.repairCost && <div>Repair: {report.repairCost}</div>}
                      {report.affectedArea && <div>Area: {report.affectedArea}</div>}
                      {report.populationImpact && <div>Pop: {report.populationImpact}</div>}
                      {report.estimatedDuration && <div>Duration: {report.estimatedDuration}</div>}
                      {report.contaminationType && <div>Contam.: {report.contaminationType}</div>}
                      {report.phLevel && <div>pH: {report.phLevel}</div>}
                      {report.affectedUsers && <div>Users: {report.affectedUsers}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-end items-center px-4 pt-4">
          <div className="relative">
            <button className="flex items-center px-2 py-1 text-gray-600 hover:text-blue-600 focus:outline-none" title="Filter by Region">
              <Filter className="w-5 h-5 mr-1" />
              <span className="text-xs">Filter</span>
            </button>
            <select
              title='region'
              value={regionFilter}
              onChange={e => setRegionFilter(e.target.value)}
              className="ml-2 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[100px]"
            >
              <option value="All">All Regions</option>
              {uniqueRegions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reporter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map(report => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
                      <span className="text-sm font-medium text-gray-900">{report.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{report.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.reporter}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      report.status === 'Pending' ? 'text-yellow-600 bg-yellow-100' :
                      report.status === 'In Progress' ? 'text-blue-600 bg-blue-100' :
                      'text-green-600 bg-green-100'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <ReportPreview showReportPreview={true} reports={reports} /> */}
    </div>
  );
};

export default Reports;