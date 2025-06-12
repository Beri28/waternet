import React, { useState, useEffect, createContext, useContext } from 'react';
import OcrReader from './components/OcrReader';
import { Droplets, Menu } from 'lucide-react';
import ReportPreview from './components/ReportPreview';
import {Avatar, Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';

// --- Global Tailwind CSS (usually in index.css or main.css) ---
// This would typically be imported from a CSS file. For this self-contained immersive,
// we'll imagine it's loaded.
// <style>
// @tailwind base;
// @tailwind components;
// @tailwind utilities;
// </style>

// --- Lucide React Icons (Directly embedded SVGs for standalone nature of this immersive) ---
const HomeIcon:React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);
const GaugeIcon:React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 14v4"></path>
    <path d="M8.5 12.5l1.5 1.5"></path>
    <path d="M15.5 12.5l-1.5 1.5"></path>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
    <path d="M12 6a6 6 0 0 0-6 6"></path>
  </svg>
);
const UploadCloudIcon:React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"></polyline>
    <line x1="12" y1="12" x2="12" y2="21"></line>
    <path d="M20.39 18.39A5 5 0 0 0 18 10h-1.26A8 8 0 1 0 3 16.3"></path>
    <polyline points="16 16 12 12 8 16"></polyline>
  </svg>
);
// const ListChecksIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M16 11V7l-4 4L8 7v4"></path>
//     <path d="M16 17V13l-4 4L8 13v4"></path>
//     <path d="M22 11V3H2v8"></path>
//     <path d="M22 21v-8H2v8"></path>
//   </svg>
// );
// const CheckCircle2Icon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
//     <path d="M9 12l2 2l4-4"></path>
//   </svg>
// );
const PackageIcon:React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"></path>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
    <path d="M3 15v-2a4 4 0 0 1 4-4h2"></path>
    <path d="M18 15v-2a4 4 0 0 0-4-4h-2"></path>
    <path d="M15 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
  </svg>
);
// const FlaskConicalIcon:React.FC<React.SVGProps<SVGSVGElement>> = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M14.4 20A7 7 0 0 1 5 17.5V11h14.4v6.5A7 7 0 0 1 9.6 20"></path>
//     <path d="M22 14H2"></path>
//     <path d="M17 19.5L12 22l-5-2.5"></path>
//     <path d="M12 2v9"></path>
//   </svg>
// );
const AlertTriangleIcon:React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

// Custom Water Droplet Logo SVG (reused from landing page)
// const WaterDropletLogo:React.FC<React.SVGProps<SVGSVGElement>> = () => (
//   <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M12 2.69L11.83 2C8.68 2.36 6 4.81 6 8.5S12 22 12 22s6-13.5 6-17.5S15.32 2.36 12.17 2L12 2.69z" fill="currentColor" opacity="0.8"/>
//     <path d="M10 5.69L9.83 5C7.68 5.36 6 7.81 6 10.5S10 20 10 20s4-9 4-12S12.32 5.36 10.17 5L10 5.69z" fill="currentColor" opacity="0.6"/>
//   </svg>
// );

// --- Utility Functions (reused) ---
const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-CM', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// const formatCurrency = (amount: number, currency = 'XAF') => {
//   return new Intl.NumberFormat('en-CM', {
//     style: 'currency',
//     currency: currency,
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(amount);
// };

// --- Context for User Authentication and Global State (Mock) ---
interface AuthContextType {
  isAuthenticated: boolean;
  userId: UUID | null; // This will be the field officer's user_id
  login: (userId: UUID) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userId: null,
  login: () => {},
  logout: () => {},
  isLoading: false
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<UUID | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      const storedUserId = localStorage.getItem('fieldOfficerUserId');
      if (storedUserId) {
        setIsAuthenticated(true);
        setUserId(storedUserId);
      }
      setIsLoading(false);
    }, 500);
  }, []);

  const login = (id: UUID) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setUserId(id);
      localStorage.setItem('fieldOfficerUserId', id);
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(false);
      setUserId(null);
      localStorage.removeItem('fieldOfficerUserId');
      setIsLoading(false);
    }, 500);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// --- Type Definitions (Reused from Admin App, some extended for Field Officer context) ---
type UUID = string; // Using string for UUIDs in TypeScript

type UserRole = 'Administrator' | 'Planner' | 'Field Officer' | 'NGO User';
type AssetCondition = 'Good' | 'Fair' | 'Poor' | 'Critical' | 'Decommissioned';
type LeakSeverity = 'Minor' | 'Moderate' | 'Major' | 'Critical';
type ReportStatus = 'Reported' | 'Under Investigation' | 'Resolved' | 'Closed' | 'False Report' | 'Mitigated';
type OrgType = 'Government' | 'NGO' | 'Private';

interface Region { region_id: UUID; region_name: string; }
interface District { district_id: UUID; district_name: string; region_id: UUID; }
interface Village { village_id: UUID; village_name: string; district_id: UUID; population_count: number; }

interface Organization {
  org_id: UUID;
  org_name: string;
  org_type: OrgType;
  contact_email?: string;
  phone_number?: string;
}

interface User { // This is the field officer's account in the main system
  user_id: UUID;
  username: string;
  email?: string;
  full_name: string;
  role: UserRole;
  org_id: UUID;
  is_active: boolean;
  last_login?: string;
  created_at: string;
}

interface WaterSourceType { source_type_id: number; type_name: string; }
interface WaterSource {
  source_id: UUID;
  source_name: string;
  source_type_id: number;
  location_geom: string;
  village_id?: UUID;
  status?: string;
}

interface InfrastructureAssetType { asset_type_id: number; type_name: string; }
interface InfrastructureAsset {
  asset_id: UUID;
  asset_name: string;
  asset_type_id: number;
  installation_date?: string;
  last_maintenance_date?: string;
  condition_status?: AssetCondition;
  location_geom: string;
  district_id: UUID;
  capacity_m3_per_day?: number;
  created_at: string;
}

interface MeterReading {
  reading_id: UUID;
  meter_asset_id: UUID;
  reading_date: string;
  volume_consumed_liters: number;
  reported_by_user_id: UUID; // Field Officer's user_id
  created_at: string;
}

interface LeakReport {
  leak_id: UUID;
  report_date: string;
  location_description?: string;
  severity: LeakSeverity;
  status: ReportStatus;
  resolution_date?: string;
  estimated_water_loss_liters_per_day?: number;
  reported_by_village_id?: UUID;
  assigned_to_user_id?: UUID; // Crucial for field officer assignments
  infrastructure_asset_id?: UUID;
  created_at: string;
}

interface WaterQualityTest {
  test_id: UUID;
  test_date: string;
  water_source_id?: UUID;
  infrastructure_asset_id?: UUID;
  testing_lab?: string;
  ph_level?: number;
  chlorine_level_mg_per_l?: number;
  coliform_count_cfu_per_100ml?: number;
  other_parameters?: Record<string, any>; // JSONB
  tested_by_user_id?: UUID; // Field Officer's user_id
  created_at: string;
}

// --- Mock Data (Extended from Admin, focused on Field Officer relevance) ---
const mockData = {
  users: [
    {
      user_id: 'user-003',
      username: 'field_officer_douala',
      email: 'marie.ngono@camwater.cm',
      full_name: 'Marie Ngono',
      role: 'Field Officer',
      org_id: 'org-camwater',
      is_active: true,
      last_login: '2024-06-07T14:15:00Z',
      created_at: '2023-03-20T10:30:00Z',
    },
    {
      user_id: 'user-004',
      username: 'field',
      email: 'paul.ngono@camwater.cm',
      full_name: 'Paul Ngono',
      role: 'Field Officer',
      org_id: 'org-camwater',
      is_active: true,
      last_login: '2024-06-07T14:15:00Z',
      created_at: '2023-03-20T10:30:00Z',
    },
    {
      user_id: 'user-005', // Another field officer for demo
      username: 'field_officer_yaounde',
      email: 'joseph.menga@camwater.cm',
      full_name: 'Joseph Menga',
      role: 'Field Officer',
      org_id: 'org-camwater',
      is_active: true,
      last_login: '2024-06-07T09:00:00Z',
      created_at: '2023-04-01T11:00:00Z',
    },
  ] as User[],
  organizations: [
    {
      org_id: 'org-camwater',
      org_name: 'CAMWATER',
      org_type: 'Government',
      contact_email: 'contact@camwater.cm',
      phone_number: '+23724222222',
    },
  ] as Organization[],
  regions: [
    { region_id: 'reg-centre', region_name: 'Centre' },
    { region_id: 'reg-littoral', region_name: 'Littoral' },
  ] as Region[],
  districts: [
    { district_id: 'dist-yaounde', district_name: 'Yaounde I', region_id: 'reg-centre' },
    { district_id: 'dist-douala', district_name: 'Douala V', region_id: 'reg-littoral' },
  ] as District[],
  villages: [
    { village_id: 'vil-mendong', village_name: 'Mendong', district_id: 'dist-yaounde', population_count: 50000 },
    { village_id: 'vil-bonaberi', village_name: 'Bonaberi', district_id: 'dist-douala', population_count: 75000 },
    { village_id: 'vil-ndogbong', village_name: 'Ndogbong', district_id: 'dist-douala', population_count: 40000 },
  ] as Village[],
  waterSourceTypes: [
    { source_type_id: 1, type_name: 'River' },
    { source_type_id: 3, type_name: 'Well' },
  ] as WaterSourceType[],
  waterSources: [
    {
      source_id: 'source-001',
      source_name: 'Wouri River Intake',
      source_type_id: 1,
      location_geom: 'POINT(9.6 4.0)', // Near Douala
      village_id: 'vil-bonaberi',
      status: 'Operational',
    },
    {
      source_id: 'source-002',
      source_name: 'Mendong Well 1',
      source_type_id: 3,
      location_geom: 'POINT(11.55 4.06)', // Near Yaounde
      village_id: 'vil-mendong',
      status: 'Operational',
    },
  ] as WaterSource[],
  infrastructureAssetTypes: [
    { asset_type_id: 1, type_name: 'Pipeline' },
    { asset_type_id: 2, type_name: 'Pump Station' },
    { asset_type_id: 5, type_name: 'Meter' },
  ] as InfrastructureAssetType[],
  infrastructureAssets: [
    {
      asset_id: 'meter-douala-001',
      asset_name: 'Meter DLA-001',
      asset_type_id: 5, // Meter
      installation_date: '2022-01-01',
      last_maintenance_date: '2023-06-15',
      condition_status: 'Good',
      location_geom: 'POINT(9.75 4.05)',
      district_id: 'dist-douala',
      created_at: '2022-01-01T00:00:00Z',
    },
    {
      asset_id: 'meter-douala-002',
      asset_name: 'Meter DLA-002',
      asset_type_id: 5,
      installation_date: '2022-03-01',
      last_maintenance_date: '2023-09-20',
      condition_status: 'Fair',
      location_geom: 'POINT(9.76 4.06)',
      district_id: 'dist-douala',
      created_at: '2022-03-01T00:00:00Z',
    },
    {
      asset_id: 'meter-yaounde-001',
      asset_name: 'Meter YDE-001',
      asset_type_id: 5,
      installation_date: '2021-05-10',
      last_maintenance_date: '2024-01-05',
      condition_status: 'Good',
      location_geom: 'POINT(11.51 3.87)',
      district_id: 'dist-yaounde',
      created_at: '2021-05-10T00:00:00Z',
    },
    {
      asset_id: 'pipe-douala-main',
      asset_name: 'Douala Main Supply Pipe',
      asset_type_id: 1, // Pipeline
      installation_date: '2000-01-01',
      last_maintenance_date: '2023-10-01',
      condition_status: 'Fair',
      location_geom: 'LINESTRING(9.70 4.00, 9.80 4.10)',
      district_id: 'dist-douala',
      created_at: '2000-01-01T00:00:00Z',
    },
  ] as InfrastructureAsset[],
  meterReadings: [
    { reading_id: 'mr-fo-001', meter_asset_id: 'meter-douala-001', reading_date: '2024-05-28', volume_consumed_liters: 8500, reported_by_user_id: 'user-003', created_at: '2024-05-28T10:00:00Z' },
    { reading_id: 'mr-fo-002', meter_asset_id: 'meter-douala-002', reading_date: '2024-05-29', volume_consumed_liters: 7200, reported_by_user_id: 'user-003', created_at: '2024-05-29T11:00:00Z' },
    { reading_id: 'mr-fo-003', meter_asset_id: 'meter-yaounde-001', reading_date: '2024-05-30', volume_consumed_liters: 9100, reported_by_user_id: 'user-005', created_at: '2024-05-30T14:00:00Z' },
  ] as MeterReading[],
  leakReports: [
    {
      leak_id: 'leak-fo-001',
      report_date: '2024-06-01',
      location_description: 'Major burst on main pipe in Bonaberi, near market.',
      severity: 'Major',
      status: 'Under Investigation',
      resolution_date: undefined,
      estimated_water_loss_liters_per_day: 5000,
      reported_by_village_id: 'vil-bonaberi',
      assigned_to_user_id: 'user-003', // Assigned to Marie Ngono
      infrastructure_asset_id: 'pipe-douala-main',
      created_at: '2024-06-01T09:00:00Z',
    },
    {
      leak_id: 'leak-fo-002',
      report_date: '2024-05-25',
      location_description: 'Minor leak near Meter DLA-002 property.',
      severity: 'Minor',
      status: 'Reported',
      resolution_date: undefined,
      estimated_water_loss_liters_per_day: 100,
      reported_by_village_id: 'vil-ndogbong',
      assigned_to_user_id: 'user-003', // Assigned to Marie Ngono
      infrastructure_asset_id: 'meter-douala-002',
      created_at: '2024-05-25T11:30:00Z',
    },
    {
      leak_id: 'leak-fo-003',
      report_date: '2024-05-10',
      location_description: 'Resolved leak at Yaounde I residential street.',
      severity: 'Moderate',
      status: 'Resolved',
      resolution_date: '2024-05-12',
      estimated_water_loss_liters_per_day: 800,
      reported_by_village_id: 'vil-mendong',
      assigned_to_user_id: 'user-005', // Assigned to Joseph Menga
      infrastructure_asset_id: undefined,
      created_at: '2024-05-10T15:00:00Z',
    },
  ] as LeakReport[],
  waterQualityTests: [
    {
      test_id: 'wqtest-fo-001',
      test_date: '2024-06-02',
      water_source_id: 'source-001',
      infrastructure_asset_id: undefined,
      testing_lab: 'Field Kit',
      ph_level: 7.1,
      chlorine_level_mg_per_l: 0.7,
      coliform_count_cfu_per_100ml: 0,
      other_parameters: { turbidity: 'low' },
      tested_by_user_id: 'user-003',
      created_at: '2024-06-02T08:30:00Z',
    },
    {
      test_id: 'wqtest-fo-002',
      test_date: '2024-06-01',
      water_source_id: undefined,
      infrastructure_asset_id: 'meter-douala-001',
      testing_lab: 'Field Kit',
      ph_level: 6.9,
      chlorine_level_mg_per_l: 0.6,
      coliform_count_cfu_per_100ml: 5, // Slight coliform
      other_parameters: {},
      tested_by_user_id: 'user-003',
      created_at: '2024-06-01T15:00:00Z',
    },
  ] as WaterQualityTest[],
};

// --- Mock API Service (Extended for Field Officer functionality) ---
const mockApi = {
  fetchEntities<T>(entityType: keyof typeof mockData): Promise<T[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData[entityType] as T[]);
      }, 500);
    });
  },

  fetchEntityById<T extends { [key: string]: any }>(
    entityType: keyof typeof mockData,
    id: UUID,
    idKey: keyof T
  ): Promise<T | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const entity = (mockData[entityType] as unknown as T[]).find((item) => item[idKey] === id);
        resolve(entity);
      }, 500);
    });
  },

  fetchAssignedLeaks(fieldOfficerId: UUID): Promise<LeakReport[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const assignedLeaks = mockData.leakReports.filter(
          (leak) => leak.assigned_to_user_id === fieldOfficerId && leak.status !== 'Resolved' && leak.status !== 'Closed'
        );
        resolve(assignedLeaks);
      }, 500);
    });
  },

  createMeterReading(newReading: Omit<MeterReading, 'reading_id' | 'created_at'>): Promise<MeterReading> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fullReading: MeterReading = {
          ...newReading,
          reading_id: `mr-${Math.random().toString(36).substring(2, 9)}`,
          created_at: new Date().toISOString(),
        };
        mockData.meterReadings.push(fullReading);
        resolve(fullReading);
      }, 500);
    });
  },

  bulkCreateMeterReadings(readings: Omit<MeterReading, 'reading_id' | 'created_at'>[]): Promise<MeterReading[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const createdReadings: MeterReading[] = readings.map(r => ({
          ...r,
          reading_id: `mr-bulk-${Math.random().toString(36).substring(2, 9)}`,
          created_at: new Date().toISOString(),
        }));
        mockData.meterReadings.push(...createdReadings);
        resolve(createdReadings);
      }, 1500); // Longer delay for bulk
    });
  },

  updateLeakReportStatus(
    leakId: UUID,
    newStatus: ReportStatus,
    resolutionDetails?: { resolutionDate?: string; description?: string }
  ): Promise<LeakReport | undefined> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockData.leakReports.findIndex((leak) => leak.leak_id === leakId);
        if (index > -1) {
          const updatedLeak = {
            ...mockData.leakReports[index],
            status: newStatus,
            resolution_date: resolutionDetails?.resolutionDate || (newStatus === 'Resolved' || newStatus === 'Closed' ? new Date().toISOString().split('T')[0] : undefined),
            location_description: resolutionDetails?.description || mockData.leakReports[index].location_description, // Update description if provided
          };
          mockData.leakReports[index] = updatedLeak;
          resolve(updatedLeak);
        } else {
          reject(new Error('Leak report not found.'));
        }
      }, 500);
    });
  },

  updateAssetCondition(assetId: UUID, newCondition: AssetCondition, lastMaintenanceDate?: string): Promise<InfrastructureAsset | undefined> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockData.infrastructureAssets.findIndex(asset => asset.asset_id === assetId);
        if (index > -1) {
          const updatedAsset = {
            ...mockData.infrastructureAssets[index],
            condition_status: newCondition,
            last_maintenance_date: lastMaintenanceDate || new Date().toISOString().split('T')[0],
          };
          mockData.infrastructureAssets[index] = updatedAsset;
          resolve(updatedAsset);
        } else {
          reject(new Error('Asset not found.'));
        }
      }, 500);
    });
  },

  createWaterQualityTest(newTest: Omit<WaterQualityTest, 'test_id' | 'created_at'>): Promise<WaterQualityTest> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fullTest: WaterQualityTest = {
          ...newTest,
          test_id: `wqt-${Math.random().toString(36).substring(2, 9)}`,
          created_at: new Date().toISOString(),
        };
        mockData.waterQualityTests.push(fullTest);
        resolve(fullTest);
      }, 500);
    });
  },
};


// --- Material-UI style components (simplified with Tailwind) ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'danger';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  className,
  ...props
}) => {
  let baseStyles = 'font-semibold rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75';
  
  switch (size) {
    case 'small':
      baseStyles += ' px-3 py-1.5 text-sm';
      break;
    case 'large':
      baseStyles += ' px-6 py-3 text-lg';
      break;
    case 'medium':
    default:
      baseStyles += ' px-4 py-2 text-base';
      break;
  }

  switch (variant) {
    case 'secondary':
      baseStyles += ' bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500';
      break;
    case 'outlined':
      baseStyles += ' border border-blue-500 text-blue-600 hover:bg-blue-50 focus:ring-blue-500';
      break;
    case 'danger':
      baseStyles += ' bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
    case 'primary':
    default:
      baseStyles += ' bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
      break;
  }

  return (
    <button className={`${baseStyles} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  type?: string; // Extend to include 'textarea'
  rows?: number; // Add rows prop for textarea
}

const Input: React.FC<InputProps> = ({ label, error, className, type = 'text', ...props }) => {
  const commonClasses = `shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
    error ? 'border-red-500' : 'border-gray-300'
  }`;

  return (
    <div className={`mb-4 ${className || ''}`}>
      {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      {type === 'textarea' ? (
        <textarea className={`${commonClasses} h-24 resize-y`} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input type={type} className={commonClasses} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

const Select: React.FC<SelectProps> = ({ label, error, options, className, ...props }) => {
  return (
    <div className={`mb-4 ${className || ''}`}>
      {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <select
        className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

interface TableProps<T> {
  data: T[];
  columns: { header: string; accessor: keyof T | ((item: T) => React.ReactNode); }[];
  keyAccessor: keyof T;
}

const Table = <T extends object>({ data, columns, keyAccessor }: TableProps<T>) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-600 p-4 bg-white rounded-lg shadow">No data available.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr key={String(item[keyAccessor]) || rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {typeof column.accessor === 'function' ? column.accessor(item) : String(item[column.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto transform transition-all scale-100 opacity-100">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        {actions && (
          <div className="flex justify-end p-4 border-t border-gray-200">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};


// --- Layouts ---
interface FieldOfficerLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  userId: UUID | null;
  logout: () => void;
}

const FieldOfficerLayout: React.FC<FieldOfficerLayoutProps> = ({
  children,
  currentPage,
  setCurrentPage,
  userId,
  logout
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentFieldOfficer = mockData.users.find(u => u.user_id === userId);

  const navigationItems = [
    { name: 'Dashboard', icon: <HomeIcon />, page: 'field-dashboard' },
    { name: 'Single Reading', icon: <GaugeIcon />, page: 'single-meter-reading' },
    { name: 'Bulk Readings', icon: <UploadCloudIcon />, page: 'bulk-meter-reading' },
    { name: 'Leak Assignments', icon: <AlertTriangleIcon />, page: 'leak-assignments' },
    { name: 'Asset Inspections', icon: <PackageIcon />, page: 'asset-inspections' },
    // { name: 'Water Quality Samples', icon: <FlaskConicalIcon />, page: 'water-quality-samples' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-blue-100 text-white w-64 p-6 space-y-6 transform md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-800 mr-3" />
              <h1 className="text-2xl font-bold text-blue-800">WaterNet</h1>
            </div>
            <h1 className="text-base font-bold text-blue-800 ml-12 mt-2">Field Officer</h1>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>{' '}
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
        <div className="pt-4 border-t border-blue-700 absolute bottom-6">
          <div className="text-sm text-blue-800 mb-2 flex">Logged in as:
          <div className="text-sm font-semibold text-blue-800 mb-2">{currentFieldOfficer?.full_name || 'Field Officer'}</div>
          </div>
          {/* <div className="text-xs text-blue-300 break-words mb-4">User ID: {userId}</div> */}
          <Button onClick={logout} variant="outlined" size="small" className="w-full border-blue-400 text-blue-100 hover:bg-blue-700 hover:text-white">
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <div className='flex items-center'>
            <div className="md:hidden">
              <Menu onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 capitalize ml-2">{currentPage.replace('-', ' ')}</h2>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="text-gray-700 hidden md:flex">Hello, {currentFieldOfficer?.full_name.split(' ')[0]}!</span>
            <Avatar>{currentFieldOfficer?.full_name[0]}</Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};


// --- Pages ---

const FieldOfficerLoginPage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Simple password for mock
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    setError('');
    if (!username || !password) {
      setError('Please enter username and password.');
      return;
    }

    // Mock login logic: Find field officer by username and check mock password
    const foundOfficer = mockData.users.find(
      (u) => u.username === username && u.role === 'Field Officer'
    );

    if (foundOfficer && password === 'field') { // Using 'field' as a mock password
      login(foundOfficer.user_id);
      setCurrentPage('field-dashboard');
    } else {
      setError('Invalid username or password. Use "field_officer_douala" or "field_officer_yaounde" with password "field".');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center gap-x-2 justify-center mb-3">
          <Droplets />
          <h1 className="text-3xl font-bold text-center text-gray-800">WaterNet</h1>
        </div>
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Field Officer Login</h2>
        {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</p>}
        <Input
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <Button onClick={handleLogin} disabled={isLoading} className="w-full mt-6">
          {isLoading ? 'Logging In...' : 'Login'}
        </Button>
        <p className="text-center text-sm text-gray-600 mt-6">
          Hint: Use `field or `field_officer_yaounde` with password `field`.
        </p>
      </div>
    </div>
  );
};


const FieldOfficerDashboardPage: React.FC<{setCurrentPage:(page: string) => void;}> = ({setCurrentPage}) => {
  const { userId } = useAuth();
  const [assignedLeaksCount, setAssignedLeaksCount] = useState<number>(0);
  const [recentReadingsCount, setRecentReadingsCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const assignedLeaks = await mockApi.fetchAssignedLeaks(userId);
        setAssignedLeaksCount(assignedLeaks.length);

        const allReadings = await mockApi.fetchEntities<MeterReading>('meterReadings');
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const recentReadings = allReadings.filter(
          (r) => r.reported_by_user_id === userId && new Date(r.created_at) > oneMonthAgo
        );
        setRecentReadingsCount(recentReadings.length);

      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (loading) return <div className="text-center p-6 text-gray-700">Loading dashboard data...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  if (!userId) return <div className="text-center p-6 text-gray-700">Please log in to view your dashboard.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
        <AlertTriangleIcon className="text-orange-500 mb-3 w-12 h-12" />
        <h3 className="text-xl font-semibold text-gray-700">Assigned Leaks</h3>
        <p className="text-4xl font-bold text-orange-700">{assignedLeaksCount}</p>
        <p className="text-gray-500 text-sm mt-1">Pending action</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
        <PackageIcon className="text-blue-600 mb-3 w-12 h-12" />
        <h3 className="text-xl font-semibold text-gray-700">Asset inspections (Last 30 Days)</h3>
        <p className="text-4xl font-bold text-blue-800">{recentReadingsCount}</p>
        <p className="text-gray-500 text-sm mt-1">Infastructures and assets inspected</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
        <GaugeIcon className="text-blue-600 mb-3 w-12 h-12" />
        <h3 className="text-xl font-semibold text-gray-700">Readings (Last 30 Days)</h3>
        <p className="text-4xl font-bold text-blue-800">{recentReadingsCount}</p>
        <p className="text-gray-500 text-sm mt-1">Meter readings uploaded</p>
      </div>

      {/* Add more dashboard cards as needed */}
      <div className="lg:col-span-3 bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button variant="primary" size="large" onClick={() => {setCurrentPage('single-meter-reading')}}>Upload Single Reading</Button>
          <Button variant="secondary" size="large" onClick={() => {setCurrentPage('bulk-meter-reading')}}>Bulk Upload Readings</Button>
          <Button variant="outlined" size="large" onClick={() => {setCurrentPage('leak-assignments')}}>View My Leak Assignments</Button>
        </div>
      </div>
      <OcrReader />
    </div>
  );
};


const SingleMeterReadingUploadPage: React.FC = () => {
  const { userId } = useAuth();
  const [meterAssetId, setMeterAssetId] = useState<UUID>('');
  const [volume, setVolume] = useState<number | ''>('');
  const [readingDate, setReadingDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputFormatText,setInputFormatText]=useState<boolean>(true)

  const availableMeters = mockData.infrastructureAssets.filter(asset => asset.asset_type_id === 5); // Only meters

  useEffect(() => {
    if (availableMeters.length > 0 && !meterAssetId) {
      setMeterAssetId(availableMeters[0].asset_id);
    }
  }, [availableMeters, meterAssetId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!userId || !meterAssetId || volume === '' || volume <= 0) {
      setError('Please select a meter, and enter a valid positive volume.');
      return;
    }
    setLoading(true);
    try {
      const newReading: Omit<MeterReading, 'reading_id' | 'created_at'> = {
        meter_asset_id: meterAssetId,
        reading_date: readingDate,
        volume_consumed_liters: volume,
        reported_by_user_id: userId,
      };
      await mockApi.createMeterReading(newReading);
      setMessage('Meter reading submitted successfully!');
      setVolume('');
      setReadingDate(new Date().toISOString().split('T')[0]);
      setMeterAssetId(availableMeters[0]?.asset_id || ''); // Reset to first available
    } catch (err) {
      console.error('Failed to submit meter reading:', err);
      setError('Failed to submit meter reading. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!userId) return <div className="text-center p-6 text-gray-700">Please log in to submit a meter reading.</div>;
  if (availableMeters.length === 0) return <div className="text-center p-6 text-red-600">No meters available for readings.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Upload Single Meter Reading</h2>
      {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">{message}</div>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</div>}

      <Box>
        <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{display:'flex',alignItems:'center',justifyContent:'center',padding:'0 .25em'}}
        >
            <FormControlLabel
                value="yes"
                name="inputFormat"
                onChange={()=>{setInputFormatText(!inputFormatText)}}
                control={<Radio checked={!inputFormatText} />}
                label="Upload snapshot of meter"
                sx={{width:'45%'}}
            />
            <FormControlLabel
                value="no"
                name="openForAdmissions"
                onChange={()=>{setInputFormatText(!inputFormatText)}}
                control={
                    <Radio checked={inputFormatText} />
                }
                label="Enter readings manually"
                sx={{width:'45%'}}
            />
        </RadioGroup>
      </Box>
      {inputFormatText? 
      <form onSubmit={handleSubmit}>
        <Select
          label="Select Meter"
          value={meterAssetId}
          onChange={(e) => setMeterAssetId(e.target.value as UUID)}
          options={availableMeters.map(meter => ({ value: meter.asset_id, label: `${meter.asset_name} (ID: ${meter.asset_id})` }))}
          required
        />
        <Input
          label="Reading Date"
          type="date"
          value={readingDate}
          onChange={(e) => setReadingDate(e.target.value)}
          required
        />
        <Input
          label="Volume Consumed (Liters)"
          type="number"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value) || '')}
          placeholder="Enter the reading from the meter"
          min="1"
          required
        />
        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Reading'}
        </Button>
      </form>
      :
      <OcrReader />
      }
    </div>
  );
};


const BulkMeterReadingUploadPage: React.FC = () => {
  const { userId } = useAuth();
  // const [csvInput, setCsvInput] = useState('');
  // const [message, setMessage] = useState<string | null>(null);
  // const [error, setError] = useState<string | null>(null);

  if (!userId) return <div className="text-center p-6 text-gray-700">Please log in to upload meter readings.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Bulk Upload Meter Readings</h2>
      {/* {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4 whitespace-pre-wrap">{message}</div>} */}
      {/* {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 whitespace-pre-wrap">{error}</div>} */}
      <ReportPreview showReportPreview={false} reports={[]} />
    </div>
  );
};


const LeakAssignmentsPage: React.FC = () => {
  const { userId } = useAuth();
  const [assignedLeaks, setAssignedLeaks] = useState<LeakReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeak, setSelectedLeak] = useState<LeakReport | null>(null);
  const [resolutionStatus, setResolutionStatus] = useState<ReportStatus>('Under Investigation');
  const [resolutionDescription, setResolutionDescription] = useState<string>('');

  const fetchAssignedLeaks = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const leaks = await mockApi.fetchAssignedLeaks(userId);
      setAssignedLeaks(leaks);
    } catch (err) {
      console.error('Failed to fetch assigned leaks:', err);
      setError('Failed to load assigned leak reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedLeaks();
  }, [userId]);

  const handleOpenResolutionModal = (leak: LeakReport) => {
    setSelectedLeak(leak);
    setResolutionStatus(leak.status); // Pre-fill with current status
    setResolutionDescription(leak.location_description || ''); // Pre-fill
    setIsModalOpen(true);
  };

  const handleUpdateLeakStatus = async () => {
    if (!selectedLeak || !resolutionStatus) {
      setError('No leak selected or status not set.');
      return;
    }
    setError(null);
    try {
      await mockApi.updateLeakReportStatus(selectedLeak.leak_id, resolutionStatus, {
        description: resolutionDescription,
        resolutionDate: (resolutionStatus === 'Resolved' || resolutionStatus === 'Closed' || resolutionStatus === 'False Report' || resolutionStatus === 'Mitigated') ? new Date().toISOString().split('T')[0] : undefined,
      });
      setIsModalOpen(false);
      setSelectedLeak(null);
      fetchAssignedLeaks(); // Refresh the list
    } catch (err) {
      console.error('Failed to update leak status:', err);
      setError('Failed to update leak status.');
    }
  };

  const columns = [
    { header: 'Report Date', accessor: (leak: LeakReport) => formatDate(leak.report_date) },
    { header: 'Location', accessor: (leak: LeakReport) => leak.location_description || 'N/A' },
    { header: 'Severity', accessor: (leak: LeakReport) => leak.severity },
    { header: 'Status', accessor: (leak: LeakReport) => leak.status },
    {
      header: 'Actions',
      accessor: (leak: LeakReport) => (
        <Button size="small" variant="primary" onClick={() => handleOpenResolutionModal(leak)}>
          Update Status
        </Button>
      ),
    },
  ];

  if (loading) return <div className="text-center p-6 text-gray-700">Loading your leak assignments...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  if (!userId) return <div className="text-center p-6 text-gray-700">Please log in to view your leak assignments.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">My Leak Assignments</h2>
      <Table data={assignedLeaks} columns={columns} keyAccessor="leak_id" />

      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Update Leak Status: ${selectedLeak?.leak_id}`}
        actions={
          <>
            <Button variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateLeakStatus} disabled={loading}>
              {loading ? 'Updating...' : 'Save Changes'}
            </Button>
          </>
        }
      >
        {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</p>}
        {selectedLeak && (
          <>
            <p className="text-gray-700 text-sm mb-4">
              **Original Location:** {selectedLeak.location_description}
            </p>
            <Select
              label="New Status"
              value={resolutionStatus}
              onChange={(e) => setResolutionStatus(e.target.value as ReportStatus)}
              options={[
                { value: 'Under Investigation', label: 'Under Investigation' },
                { value: 'Mitigated', label: 'Mitigated (Temporary fix)' },
                { value: 'Resolved', label: 'Resolved (Permanent fix)' },
                { value: 'False Report', label: 'False Report' },
                { value: 'Closed', label: 'Closed (No further action needed)' },
              ]}
              required
            />
            <Input
              label="Resolution Notes / Current Observation"
              type="textarea"
              value={resolutionDescription}
              onChange={(e) => setResolutionDescription(e.target.value)}
              placeholder="Describe the current situation or actions taken."
            />
          </>
        )}
      </Dialog>
    </div>
  );
};


const AssetInspectionsPage: React.FC = () => {
  const { userId } = useAuth();
  const [assets, setAssets] = useState<InfrastructureAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<InfrastructureAsset | null>(null);
  const [newCondition, setNewCondition] = useState<AssetCondition>('Good');
  const [lastMaintenanceDate, setLastMaintenanceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [message, setMessage] = useState<string | null>(null);

  const fetchAssets = async () => {
    setLoading(true);
    setError(null);
    try {
      // For field officers, assume they inspect all types of assets
      const fetchedAssets = await mockApi.fetchEntities<InfrastructureAsset>('infrastructureAssets');
      setAssets(fetchedAssets);
    } catch (err) {
      console.error('Failed to fetch assets:', err);
      setError('Failed to load assets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleOpenInspectionModal = (asset: InfrastructureAsset) => {
    setSelectedAsset(asset);
    setNewCondition(asset.condition_status || 'Good'); // Pre-fill
    setLastMaintenanceDate(asset.last_maintenance_date || new Date().toISOString().split('T')[0]); // Pre-fill
    setIsModalOpen(true);
    setMessage(null); // Clear previous message
  };

  const handleSubmitInspection = async () => {
    if (!selectedAsset || !newCondition) {
      setError('No asset selected or condition not set.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await mockApi.updateAssetCondition(selectedAsset.asset_id, newCondition, lastMaintenanceDate);
      setMessage('Asset inspection updated successfully!');
      setIsModalOpen(false);
      setSelectedAsset(null);
      fetchAssets(); // Refresh list
    } catch (err) {
      console.error('Failed to update asset condition:', err);
      setError('Failed to update asset condition. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'Asset Name', accessor: (asset: InfrastructureAsset) => asset.asset_name },
    { header: 'Type', accessor: (asset: InfrastructureAsset) =>
        mockData.infrastructureAssetTypes.find(t => t.asset_type_id === asset.asset_type_id)?.type_name || 'N/A'
    },
    { header: 'Current Condition', accessor: (asset: InfrastructureAsset) => asset.condition_status || 'N/A' },
    { header: 'Last Maintenance', accessor: (asset: InfrastructureAsset) => asset.last_maintenance_date ? formatDate(asset.last_maintenance_date) : 'N/A' },
    {
      header: 'Actions',
      accessor: (asset: InfrastructureAsset) => (
        <Button size="small" variant="secondary" onClick={() => handleOpenInspectionModal(asset)}>
          Inspect
        </Button>
      ),
    },
  ];

  if (loading) return <div className="text-center p-6 text-gray-700">Loading infrastructure assets...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  if (!userId) return <div className="text-center p-6 text-gray-700">Please log in to manage asset inspections.</div>;


  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Infrastructure Asset Inspections</h2>
      {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">{message}</div>}
      <Table data={assets} columns={columns} keyAccessor="asset_id" />

      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Inspect Asset: ${selectedAsset?.asset_name}`}
        actions={
          <>
            <Button variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitInspection} disabled={loading}>
              {loading ? 'Submitting...' : 'Save Inspection'}
            </Button>
          </>
        }
      >
        {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</p>}
        {selectedAsset && (
          <>
            <Select
              label="Condition Status"
              value={newCondition}
              onChange={(e) => setNewCondition(e.target.value as AssetCondition)}
              options={[
                { value: 'Good', label: 'Good' },
                { value: 'Fair', label: 'Fair' },
                { value: 'Poor', label: 'Poor' },
                { value: 'Critical', label: 'Critical' },
                { value: 'Decommissioned', label: 'Decommissioned' },
              ]}
              required
            />
            <Input
              label="Last Maintenance Date"
              type="date"
              value={lastMaintenanceDate}
              onChange={(e) => setLastMaintenanceDate(e.target.value)}
              required
            />
             <p className="text-sm text-gray-600 mt-2">
              Note: This date will be updated upon saving the inspection.
            </p>
          </>
        )}
      </Dialog>
    </div>
  );
};


const WaterQualitySamplesPage: React.FC = () => {
  const { userId } = useAuth();
  const [tests, setTests] = useState<WaterQualityTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTest, setNewTest] = useState<Partial<WaterQualityTest>>({
    test_date: new Date().toISOString().split('T')[0],
    ph_level: 7.0,
    chlorine_level_mg_per_l: 0.5,
    coliform_count_cfu_per_100ml: 0,
    testing_lab: 'Field Kit',
    water_source_id: '', // No default selected
    infrastructure_asset_id: '', // No default selected
    other_parameters: {},
  });
  const [message, setMessage] = useState<string | null>(null);

  const fetchTests = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const fetchedTests = (await mockApi.fetchEntities<WaterQualityTest>('waterQualityTests'))
                           .filter(t => t.tested_by_user_id === userId); // Only show tests by current FO
      setTests(fetchedTests.sort((a,b) => new Date(b.test_date).getTime() - new Date(a.test_date).getTime()));
    } catch (err) {
      console.error('Failed to fetch water quality tests:', err);
      setError('Failed to load water quality tests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setNewTest(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmitNewTest = async () => {
    if (!userId || (!newTest.water_source_id && !newTest.infrastructure_asset_id) || !newTest.test_date) {
      setError('Please select a water source or infrastructure asset, and a test date.');
      return;
    }
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      await mockApi.createWaterQualityTest({
        ...newTest,
        tested_by_user_id: userId,
      } as Omit<WaterQualityTest, 'test_id' | 'created_at'>);
      setMessage('Water quality test submitted successfully!');
      setIsModalOpen(false);
      setNewTest({ // Reset form
        test_date: new Date().toISOString().split('T')[0],
        ph_level: 7.0,
        chlorine_level_mg_per_l: 0.5,
        coliform_count_cfu_per_100ml: 0,
        testing_lab: 'Field Kit',
        water_source_id: '',
        infrastructure_asset_id: '',
        other_parameters: {},
      });
      fetchTests();
    } catch (err) {
      console.error('Failed to add water quality test:', err);
      setError('Failed to add water quality test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'Test Date', accessor: (test: WaterQualityTest) => formatDate(test.test_date) },
    { header: 'Location', accessor: (test: WaterQualityTest) => {
        if (test.water_source_id) {
          return mockData.waterSources.find(s => s.source_id === test.water_source_id)?.source_name;
        }
        if (test.infrastructure_asset_id) {
          return mockData.infrastructureAssets.find(a => a.asset_id === test.infrastructure_asset_id)?.asset_name;
        }
        return 'N/A';
      }
    },
    { header: 'pH', accessor: (test: WaterQualityTest) => test.ph_level?.toString() || 'N/A' },
    { header: 'Chlorine (mg/L)', accessor: (test: WaterQualityTest) => test.chlorine_level_mg_per_l?.toString() || 'N/A' },
    { header: 'Coliform (CFU/100ml)', accessor: (test: WaterQualityTest) => test.coliform_count_cfu_per_100ml?.toString() || 'N/A' },
    { header: 'Lab', accessor: (test: WaterQualityTest) => test.testing_lab || 'N/A' },
  ];

  if (loading) return <div className="text-center p-6 text-gray-700">Loading water quality tests...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  if (!userId) return <div className="text-center p-6 text-gray-700">Please log in to view water quality samples.</div>;


  const allWaterSources = mockData.waterSources;
  const allInfrastructureAssets = mockData.infrastructureAssets;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">My Water Quality Samples</h2>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsModalOpen(true)}>Add New Sample</Button>
      </div>
      {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">{message}</div>}
      <Table data={tests} columns={columns} keyAccessor="test_id" />

      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record New Water Quality Sample"
        actions={
          <>
            <Button variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitNewTest} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Sample'}
            </Button>
          </>
        }
      >
        {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</p>}
        <Input
          label="Test Date"
          type="date"
          name="test_date"
          value={newTest.test_date}
          onChange={handleInputChange}
          required
        />
        <Select
          label="Water Source (Optional)"
          name="water_source_id"
          value={newTest.water_source_id || ''}
          onChange={handleInputChange}
          options={[{ value: '', label: 'Select a Water Source' }, ...allWaterSources.map(s => ({ value: s.source_id, label: s.source_name }))]}
        />
        <Select
          label="Infrastructure Asset (Optional)"
          name="infrastructure_asset_id"
          value={newTest.infrastructure_asset_id || ''}
          onChange={handleInputChange}
          options={[{ value: '', label: 'Select an Asset' }, ...allInfrastructureAssets.map(a => ({ value: a.asset_id, label: `${a.asset_name} (${mockData.infrastructureAssetTypes.find(t => t.asset_type_id === a.asset_type_id)?.type_name || 'Asset'})`}))]}
        />
        <Input
          label="pH Level"
          type="number"
          name="ph_level"
          value={newTest.ph_level}
          onChange={handleInputChange}
          step="0.01"
          placeholder="e.g., 7.0"
        />
        <Input
          label="Chlorine Level (mg/L)"
          type="number"
          name="chlorine_level_mg_per_l"
          value={newTest.chlorine_level_mg_per_l}
          onChange={handleInputChange}
          step="0.01"
          placeholder="e.g., 0.5"
        />
        <Input
          label="Coliform Count (CFU/100ml)"
          type="number"
          name="coliform_count_cfu_per_100ml"
          value={newTest.coliform_count_cfu_per_100ml}
          onChange={handleInputChange}
          min="0"
          placeholder="e.g., 0"
        />
        <Input
          label="Testing Method / Kit"
          type="text"
          name="testing_lab"
          value={newTest.testing_lab}
          onChange={handleInputChange}
          placeholder="e.g., Field Kit, Portable Tester"
        />
      </Dialog>
    </div>
  );
};


const FieldOfficerNotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-700">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist for Field Officers.</p>
    </div>
  );
};


// --- Main App Component ---
function App() {
  const { isAuthenticated, userId, isLoading, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('field-dashboard'); // Default field officer page

  // Effect to handle initial page load or authentication changes
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // If authenticated, ensure we are on a valid field officer page, default to dashboard
        const validPages = [
          'field-dashboard',
          'single-meter-reading',
          'bulk-meter-reading',
          'leak-assignments',
          'asset-inspections',
          'water-quality-samples',
        ];
        if (!validPages.includes(currentPage)) {
          setCurrentPage('field-dashboard');
        }
      } else {
        // If not authenticated, always go to login page
        setCurrentPage('field-login');
      }
    }
  }, [isLoading, isAuthenticated, currentPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white text-xl">
        Loading Field Officer application...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <FieldOfficerLoginPage setCurrentPage={setCurrentPage} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'field-dashboard':
        return <FieldOfficerDashboardPage setCurrentPage={setCurrentPage} />;
      case 'single-meter-reading':
        return <SingleMeterReadingUploadPage />;
      case 'bulk-meter-reading':
        return <BulkMeterReadingUploadPage />;
      case 'leak-assignments':
        return <LeakAssignmentsPage />;
      case 'asset-inspections':
        return <AssetInspectionsPage />;
      case 'water-quality-samples':
        return <WaterQualitySamplesPage />;
      default:
        return <FieldOfficerNotFoundPage />;
    }
  };

  return (
    <FieldOfficerLayout
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      userId={userId}
      logout={logout}
    >
      {renderPage()}
    </FieldOfficerLayout>
  );
}

// Wrap the App component with AuthProvider for context to be available
export default function FieldWorker() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
