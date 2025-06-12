import React, { useEffect, useState } from 'react';
import {
  Droplets, Users, BarChart3, Bell, Search,
  Plus, Edit, Eye, Filter, Download,
  AlertTriangle, CheckCircle, XCircle, TrendingUp, TrendingDown, Map, Database, Waves, Gauge,
  Package,
  Droplet,
  AlertTriangleIcon,
  FlaskConicalIcon,
  UploadCloudIcon,
  DollarSignIcon,
  ClipboardListIcon,
  Menu
} from 'lucide-react';
import { Button, HomeIcon } from './citizen';
import { BudgetAllocationsPage, NotFoundPage, SurveyDataPage } from './App2';
import WaterSources from './components/WaterSource';
import Reports from './components/Reports';
import InfrastructureAssets from './components/InfrastructureAssets';
import MeterReadings from './components/MeterReadings';
import QualityTests from './components/QualityTests';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material';
// import { UserRole } from './App2';

// Types
interface WaterSource {
  id: string;
  name: string;
  type: 'borehole' | 'river' | 'reservoir' | 'well';
  location: { lat: number; lng: number };
  village: string;
  region: string;
  status: 'active' | 'maintenance' | 'inactive';
  capacity: number;
  currentLevel: number;
  lastUpdated: string;
  quality: 'good' | 'fair' | 'poor';
}

interface ReportData {
  id: string;
  reportedBy: string;
  type: 'leak' | 'contamination' | 'shortage' | 'maintenance';
  location: string;
  description: string;
  status: 'pending' | 'investigating' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  dateReported: string;
}

interface DashboardStats {
  totalSources: number;
  activeSources: number;
  pendingReports: number;
  waterQuality: number;
  accessRate: number;
  nrwRate: number;
}

// Sample data
export const sampleWaterSources: WaterSource[] = [
  {
    id: '1',
    name: 'Douala Main Reservoir',
    type: 'reservoir',
    location: { lat: 4.0435, lng: 9.7095 },
    village: 'Douala',
    region: 'Littoral',
    status: 'active',
    capacity: 50000,
    currentLevel: 42000,
    lastUpdated: '2025-06-07T10:30:00Z',
    quality: 'good'
  },
  {
    id: '2',
    name: 'Bamenda Borehole 1',
    type: 'borehole',
    location: { lat: 5.9597, lng: 10.1453 },
    village: 'Bamenda',
    region: 'Northwest',
    status: 'maintenance',
    capacity: 5000,
    currentLevel: 3200,
    lastUpdated: '2025-06-06T14:20:00Z',
    quality: 'fair'
  },
  {
    id: '3',
    name: 'Sangmelima River Intake',
    type: 'river',
    location: { lat: 2.9333, lng: 11.9833 },
    village: 'Sangmelima',
    region: 'South',
    status: 'active',
    capacity: 15000,
    currentLevel: 12500,
    lastUpdated: '2025-06-07T08:15:00Z',
    quality: 'good'
  }
];

export const sampleReports: ReportData[] = [
  {
    id: '1',
    reportedBy: 'Village Chief - Ngaoundéré',
    type: 'leak',
    location: 'Pipeline Section 12-A',
    description: 'Major water leak detected on main distribution line',
    status: 'investigating',
    priority: 'high',
    dateReported: '2025-06-07T09:00:00Z'
  },
  {
    id: '2',
    reportedBy: 'SMS Report - *123#',
    type: 'shortage',
    location: 'Bertoua District',
    description: 'Community well running dry for 3 days',
    status: 'pending',
    priority: 'medium',
    dateReported: '2025-06-06T16:30:00Z'
  }
];

const regions = [
  'Adamaoua', 'Centre', 'East', 'Far North', 'Littoral',
  'North', 'Northwest', 'South', 'Southwest', 'West'
];

// --- Layouts ---
interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  // userRole: UserRole | null;
  // logout: () => void;
  // currentUserId: string | null;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  currentPage,
  setCurrentPage,
  // userRole,
  // logout,
  // currentUserId
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const currentCitizen = mockData.citizenAccounts.find(c => c.citizen_id === citizenId);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [waterSources, setWaterSources] = useState<WaterSource[]>(sampleWaterSources);
  const [reports, setReports] = useState<ReportData[]>(sampleReports);
  
  useEffect(()=>{
    setWaterSources(sampleWaterSources)
    setReports(sampleReports)
  },[])

  const stats: DashboardStats = {
    totalSources: waterSources.length,
    activeSources: waterSources.filter(s => s.status === 'active').length,
    pendingReports: reports.filter(r => r.status === 'pending').length,
    waterQuality: 87,
    accessRate: 68,
    nrwRate: 32
  };

  const navigationItems = [
    { name: 'Dashboard', icon: <HomeIcon />, page: 'dashboard', roles: ['Administrator', 'Planner', 'Field Officer', 'NGO User'] },
    // { name: 'Users', icon: <UsersIcon />, page: 'users', roles: ['Administrator'] },
    { name: 'Infrastructure Assets', icon: <Package />, page: 'infrastructure-assets', roles: ['Administrator', 'Planner', 'Field Officer'] },
    { name: 'Water Sources', icon: <Droplet />, page: 'water-sources', roles: ['Administrator', 'Planner', 'Field Officer', 'NGO User'] },
    { name: 'Meter Readings', icon: <ClipboardListIcon />, page: 'meter-readings', roles: ['Field Officer'] },
    { name: 'Reports & Incidents', icon: <AlertTriangleIcon />, page: 'reports', roles: ['Administrator', 'Field Officer'] },
    { name: 'Water Quality Tests', icon: <FlaskConicalIcon />, page: 'water-quality-tests', roles: ['Administrator', 'Planner', 'NGO User'] },
    { name: 'Survey Data', icon: <UploadCloudIcon />, page: 'survey-data', roles: ['NGO User'] },
    { name: 'Budget Allocations', icon: <DollarSignIcon />, page: 'budget-allocations', roles: ['Administrator', 'Planner'] },
  ];
  const navigate=useNavigate()
  return (
    <div className="flex h-screen bg-gray-100 font-sans">

      {/* Sidebar */}
      <aside
        className={`fixed overflow-auto scrollbar-hidden inset-y-0 left-0 bg-blue-100 text-white w-64 p-6 space-y-6 transform md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{scrollbarWidth:'none'}}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-800 mr-3" />
              <h1 className="text-2xl font-bold text-blue-800">WaterNet</h1>
            </div>
            <h1 className="text-base font-bold text-blue-800 ml-12">Admin</h1>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>{''}
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.page}>
                <a
                  href="#"
                  onClick={() => { setCurrentPage(item.page); setIsSidebarOpen(false); }}
                  className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
                    currentPage === item.page
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-800 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pt-4 border-t border-blue-700">
          <div className="text-sm text-blue-800 mb-2">Logged in as:Admin</div>
          {/* <div className="text-xs text-blue-300 break-words mb-4">Account ID: {currentUserId}</div> */}
          <Button onClick={()=>{navigate('/')}} variant="outlined" size="small" className="w-full border-blue-400 text-blue-100 hover:bg-blue-700 hover:text-white">
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <div className='flex items-center'>
            {/* Sidebar Toggle for Mobile */}
            <div className="md:hidden">
              <Menu onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 capitalize ml-2">{currentPage.replace('-', ' ')}</h2>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search water sources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                title='region'
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell size={20} />
                <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {stats.pendingReports}
                </div>
              </button>
            </div>
          </div>
          <div className="md:hidden">
              <Avatar>A</Avatar>
              {/* <Menu onClick={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
            </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 md:p-8 p-4 ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default function WaterManagementDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [waterSources, setWaterSources] = useState<WaterSource[]>(sampleWaterSources);
  const [reports, setReports] = useState<ReportData[]>(sampleReports);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState<WaterSource | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  useEffect(()=>{
    setWaterSources(sampleWaterSources)
    setReports(sampleReports)
    setSelectedRegion('')
    setSearchTerm('')
  },[])

  const stats: DashboardStats = {
    totalSources: waterSources.length,
    activeSources: waterSources.filter(s => s.status === 'active').length,
    pendingReports: reports.filter(r => r.status === 'pending').length,
    waterQuality: 87,
    accessRate: 68,
    nrwRate: 32
  };

  const filteredSources = waterSources.filter(source => {
    const matchesRegion = !selectedRegion || source.region === selectedRegion;
    const matchesSearch = !searchTerm || 
      source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.village.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const StatCard = ({ title, value, change, icon: Icon, color }: {
    title: string;
    value: string | number;
    change?: string;
    icon: any;
    color: string;
  }) => (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 ${
              change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {change.startsWith('+') ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="ml-1 text-sm">{change}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const WaterSourceCard = ({ source }: { source: WaterSource }) => (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg mr-3 ${
            source.type === 'reservoir' ? 'bg-blue-100' :
            source.type === 'borehole' ? 'bg-cyan-100' :
            source.type === 'river' ? 'bg-teal-100' : 'bg-indigo-100'
          }`}>
            {source.type === 'reservoir' ? <Database size={20} className="text-blue-600" /> :
             source.type === 'borehole' ? <Gauge size={20} className="text-cyan-600" /> :
             source.type === 'river' ? <Waves size={20} className="text-teal-600" /> :
             <Droplets size={20} className="text-indigo-600" />}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{source.name}</h3>
            <p className="text-sm text-gray-600">{source.village}, {source.region}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          source.status === 'active' ? 'bg-green-100 text-green-800' :
          source.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {source.status}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Capacity</span>
          <span className="font-medium">{source.capacity.toLocaleString()}L</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Current Level</span>
          <span className="font-medium">{source.currentLevel.toLocaleString()}L</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              (source.currentLevel / source.capacity) > 0.7 ? 'bg-green-500' :
              (source.currentLevel / source.capacity) > 0.3 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${(source.currentLevel / source.capacity) * 100}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Quality</span>
          <div className={`flex items-center ${
            source.quality === 'good' ? 'text-green-600' :
            source.quality === 'fair' ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {source.quality === 'good' ? <CheckCircle size={16} /> :
             source.quality === 'fair' ? <AlertTriangle size={16} /> :
             <XCircle size={16} />}
            <span className="ml-1 text-sm capitalize">{source.quality}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button 
            onClick={() => setSelectedSource(source)}
            className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            <Eye size={16} className="inline mr-1" />
            View
          </button>
          <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
            <Edit size={16} className="inline mr-1" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );

  const ReportCard = ({ report }: { report: ReportData }) => (
    <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg mr-3 ${
            report.priority === 'high' ? 'bg-red-100' :
            report.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
          }`}>
            <AlertTriangle size={16} className={
              report.priority === 'high' ? 'text-red-600' :
              report.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
            } />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 capitalize">{report.type}</h4>
            <p className="text-sm text-gray-600">{report.location}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          report.status === 'resolved' ? 'bg-green-100 text-green-800' :
          report.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {report.status}
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-3">{report.description}</p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>By: {report.reportedBy}</span>
        <span>{new Date(report.dateReported).toLocaleDateString()}</span>
      </div>
    </div>
  );

  const SimpleMap = () => (
    <div className="bg-white rounded-lg md:p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 p-3">Water Sources Map</h3>
      <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg h-96 overflow-hidden">
        {/* Simulated map background */}
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#cbd5e1" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Simulated water sources on map */}
        {filteredSources.map((source, index) => (
          <div
            key={source.id}
            className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform ${
              source.status === 'active' ? 'bg-green-500' :
              source.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{
              left: `${20 + (index * 80) % 300}px`,
              top: `${50 + (index * 60) % 200}px`
            }}
            title={`${source.name} - ${source.village}`}
          />
        ))}
        
        {/* Map legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
          <h4 className="font-medium text-gray-900 mb-2 text-sm">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Active</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>Maintenance</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>Inactive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="min-h-screen" style={{scrollbarWidth:'none'}}>
        
              <div className="max-w-7xl mx-auto ">
                <div className="flex space-x-4 mb-8">
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                    { id: 'map', label: 'Map View of water sources', icon: Map }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSection(tab.id)}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeSection === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon size={20} className="mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </div>
        

                {activeSection === 'dashboard' && (
                  <div className="space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <StatCard
                        title="Total Water Sources"
                        value={stats.totalSources}
                        change="+3 this month"
                        icon={Droplets}
                        color="bg-blue-500"
                      />
                      <StatCard
                        title="Active Sources"
                        value={stats.activeSources}
                        change="+2 this week"
                        icon={CheckCircle}
                        color="bg-green-500"
                      />
                      <StatCard
                        title="Pending Reports"
                        value={stats.pendingReports}
                        change="-5 from last week"
                        icon={AlertTriangle}
                        color="bg-yellow-500"
                      />
                      <StatCard
                        title="Water Quality Index"
                        value={`${stats.waterQuality}%`}
                        change="+2% this month"
                        icon={Gauge}
                        color="bg-cyan-500"
                      />
                      <StatCard
                        title="Rural Access Rate"
                        value={`${stats.accessRate}%`}
                        change="+1.5% this quarter"
                        icon={Users}
                        color="bg-indigo-500"
                      />
                      <StatCard
                        title="Non-Revenue Water"
                        value={`${stats.nrwRate}%`}
                        change="-3% this quarter"
                        icon={TrendingDown}
                        color="bg-red-500"
                      />
                    </div>
        
                    {/* Recent Reports */}
                    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
                        <button
                          onClick={() => {
                            // setActiveSection('reports')
                            setCurrentPage('reports')
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View All
                        </button>
                      </div>
                      <div className="space-y-4">
                        {reports.slice(0, 3).map(report => (
                          <ReportCard key={report.id} report={report} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
        

                {activeSection === 'sources' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">Water Sources</h2>
                      <button
                        // onClick={() => setShowAddModal(true)}
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 shadow-lg"
                      >
                        <Plus size={20} className="inline mr-2" />
                        Add Source
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredSources.map(source => (
                        <WaterSourceCard key={source.id} source={source} />
                      ))}
                    </div>
                  </div>
                )}
        
                {activeSection === 'reports' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">Water Reports</h2>
                      <div className="flex space-x-2">
                        <button className="bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                          <Filter size={20} className="inline mr-2" />
                          Filter
                        </button>
                        <button className="bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                          <Download size={20} className="inline mr-2" />
                          Export
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {reports.map(report => (
                        <ReportCard key={report.id} report={report} />
                      ))}
                    </div>
                  </div>
                )}
        
                {activeSection === 'map' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Water Sources Map</h2>
                    <SimpleMap />
                  </div>
                )}
              </div>
        
              {selectedSource && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">{selectedSource.name}</h3>
                        <button
                          onClick={() => setSelectedSource(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <XCircle size={24} />{''}
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <p className="mt-1 text-sm text-gray-900 capitalize">{selectedSource.type}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <p className="mt-1 text-sm text-gray-900 capitalize">{selectedSource.status}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Village</label>
                            <p className="mt-1 text-sm text-gray-900">{selectedSource.village}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Region</label>
                            <p className="mt-1 text-sm text-gray-900">{selectedSource.region}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Capacity</label>
                            <p className="mt-1 text-sm text-gray-900">{selectedSource.capacity.toLocaleString()}L</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Current Level</label>
                            <p className="mt-1 text-sm text-gray-900">{selectedSource.currentLevel.toLocaleString()}L</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Quality</label>
                            <p className="mt-1 text-sm text-gray-900 capitalize">{selectedSource.quality}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                            <p className="mt-1 text-sm text-gray-900">
                              {new Date(selectedSource.lastUpdated).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Capacity Utilization</label>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                              className={`h-4 rounded-full ${
                                (selectedSource.currentLevel / selectedSource.capacity) > 0.7 ? 'bg-green-500' :
                                (selectedSource.currentLevel / selectedSource.capacity) > 0.3 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${(selectedSource.currentLevel / selectedSource.capacity) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {Math.round((selectedSource.currentLevel / selectedSource.capacity) * 100)}% utilized
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-6">
                        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Edit Source
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                          Generate Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
        </div>
        );
      case 'infrastructure-assets':
        return <InfrastructureAssets />;
      case 'water-sources':
        return  <WaterSources />;
      case 'meter-readings':
            return <MeterReadings />;
      case 'reports':
        return <Reports />;
      case 'water-quality-tests':
        return <QualityTests />;
      case 'budget-allocations':
        return <BudgetAllocationsPage />;
      case 'survey-data':
        return <SurveyDataPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <DashboardLayout
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        // userRole={userRole}
        // logout={logout}
        // currentUserId={currentUserId}
    >

      {renderPage()}
    </DashboardLayout>
  );
}