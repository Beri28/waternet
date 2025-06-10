
import React, { useState, useEffect } from 'react';
import AuthProvider, { useAuth } from '../Context/Auth2';

// --- Global Tailwind CSS (usually in index.css or main.css) ---
// This would typically be imported from a CSS file. For this self-contained immersive,
// we'll imagine it's loaded.
// <style>
// @tailwind base;
// @tailwind components;
// @tailwind utilities;
// </style>

// --- Lucide React Icons (for UI elements) ---
// Assuming lucide-react is available, or using inline SVGs as fallback
// For simplicity within this single file, we'll use inline SVGs or basic characters.
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);
export const PackageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"></path>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
    <path d="M3 15v-2a4 4 0 0 1 4-4h2"></path>
    <path d="M18 15v-2a4 4 0 0 0-4-4h-2"></path>
    <path d="M15 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
  </svg>
);
export const DropletIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69L11.83 2c-3.15-.36-5.83 2.1-5.83 5.5S12 22 12 22s5.83-14.81 5.83-14.81c0-3.4-2.68-5.86-5.83-5.5z"></path>
  </svg>
);
export const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);
export const ClipboardListIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <path d="M9 14h6"></path>
    <path d="M9 18h6"></path>
  </svg>
);
export const DollarSignIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);
export const FlaskConicalIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.4 20A7 7 0 0 1 5 17.5V11h14.4v6.5A7 7 0 0 1 9.6 20"></path>
    <path d="M22 14H2"></path>
    <path d="M17 19.5L12 22l-5-2.5"></path>
    <path d="M12 2v9"></path>
  </svg>
);
export const UploadCloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"></polyline>
    <line x1="12" y1="12" x2="12" y2="21"></line>
    <path d="M20.39 18.39A5 5 0 0 0 18 10h-1.26A8 8 0 1 0 3 16.3"></path>
    <polyline points="16 16 12 12 8 16"></polyline>
  </svg>
);


// --- Utility Functions ---
const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-CM', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatCurrency = (amount: number, currency = 'XAF') => {
  return new Intl.NumberFormat('en-CM', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0, // XAF has no minor unit
    maximumFractionDigits: 0,
  }).format(amount);
};


// --- Type Definitions (Mapping directly from database schema) ---
type UUID = string; // Using string for UUIDs in TypeScript

export type UserRole = 'Administrator' | 'Planner' | 'Field Officer' | 'NGO User';
type AssetCondition = 'Good' | 'Fair' | 'Poor' | 'Critical' | 'Decommissioned';
type LeakSeverity = 'Minor' | 'Moderate' | 'Major' | 'Critical';
type ReportStatus = 'Reported' | 'Under Investigation' | 'Resolved' | 'Closed' | 'False Report' | 'Mitigated';
type OrgType = 'Government' | 'NGO' | 'Private';

interface Region {
  region_id: UUID;
  region_name: string;
  geom: string; // WKT representation for simplicity in frontend mock
}

interface District {
  district_id: UUID;
  district_name: string;
  region_id: UUID;
  geom: string;
}

interface Village {
  village_id: UUID;
  village_name: string;
  district_id: UUID;
  population_count: number;
  geom: string;
}

interface Organization {
  org_id: UUID;
  org_name: string;
  org_type: OrgType;
  contact_email?: string;
  phone_number?: string;
}

interface User {
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

interface WaterSourceType {
  source_type_id: number;
  type_name: string;
}

interface WaterSource {
  source_id: UUID;
  source_name: string;
  source_type_id: number;
  location_geom: string;
  village_id?: UUID;
  capacity_liters?: number;
  status?: string;
  created_at: string;
}

interface InfrastructureAssetType {
  asset_type_id: number;
  type_name: string;
}

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

interface MaintenanceLog {
  log_id: UUID;
  asset_id: UUID;
  maintenance_date: string;
  description?: string;
  issues_found?: string;
  resolution?: string;
  performed_by_user_id: UUID;
  next_due_date?: string;
  created_at: string;
}

interface MeterReading {
  reading_id: UUID;
  meter_asset_id: UUID;
  reading_date: string;
  volume_consumed_liters: number;
  reported_by_user_id: UUID;
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
  reported_by_village_id?: UUID; // Anonymized source
  assigned_to_user_id?: UUID;
  infrastructure_asset_id?: UUID;
  created_at: string;
}

interface ContaminationIncident {
  incident_id: UUID;
  report_date: string;
  source_location_geom: string;
  contaminant_type?: string;
  severity: LeakSeverity; // Reusing severity for contamination too
  status: ReportStatus;
  resolution_date?: string;
  affected_population_count?: number;
  reported_by_village_id: UUID;
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
  tested_by_user_id?: UUID;
  created_at: string;
}

interface SurveyData {
  survey_id: UUID;
  org_id: UUID;
  survey_date: string;
  village_id: UUID;
  water_access_rate_percent?: number;
  sanitation_status?: string;
  groundwater_level_meters?: number;
  other_survey_details?: Record<string, any>; // JSONB
  uploaded_by_user_id?: UUID;
  created_at: string;
}

interface BudgetAllocation {
  allocation_id: UUID;
  allocation_year: number;
  region_id: UUID;
  allocated_amount_xaf: number;
  spent_amount_xaf: number;
  approved_by_user_id: UUID;
  created_at: string;
}

// --- Mock API Service ---
// Simulates API calls with dummy data and artificial delay.
const mockData = {
  users: [
    {
      user_id: 'user-001',
      username: 'admin_user',
      email: 'admin@example.com',
      full_name: 'System Administrator',
      role: 'Administrator',
      org_id: 'org-camwater',
      is_active: true,
      last_login: '2024-06-07T10:00:00Z',
      created_at: '2023-01-01T08:00:00Z',
    },
    {
      user_id: 'user-002',
      username: 'planner_yaounde',
      email: 'planner.yaounde@minee.cm',
      full_name: 'Marc Ekwalla',
      role: 'Planner',
      org_id: 'org-minee',
      is_active: true,
      last_login: '2024-06-07T11:30:00Z',
      created_at: '2023-02-15T09:00:00Z',
    },
    {
      user_id: 'user-003',
      username: 'field_douala',
      email: 'field.douala@camwater.cm',
      full_name: 'Marie Ngono',
      role: 'Field Officer',
      org_id: 'org-camwater',
      is_active: true,
      last_login: '2024-06-07T14:15:00Z',
      created_at: '2023-03-20T10:30:00Z',
    },
    {
      user_id: 'user-004',
      username: 'ngo_wateraid',
      email: 'wateraid@ngo.org',
      full_name: 'Paul Biya Jr.',
      role: 'NGO User',
      org_id: 'org-wateraid',
      is_active: true,
      last_login: '2024-06-06T16:00:00Z',
      created_at: '2023-04-10T11:00:00Z',
    },
  ] as User[],
  organizations: [
    {
      org_id: 'org-minee',
      org_name: 'Ministry of Water Resources and Energy (MINEE)',
      org_type: 'Government',
      contact_email: 'info@minee.gov.cm',
      phone_number: '+23722222222',
    },
    {
      org_id: 'org-camwater',
      org_name: 'CAMWATER',
      org_type: 'Government',
      contact_email: 'contact@camwater.cm',
      phone_number: '+23724222222',
    },
    {
      org_id: 'org-wateraid',
      org_name: 'WaterAid Cameroon',
      org_type: 'NGO',
      contact_email: 'cameroon@wateraid.org',
      phone_number: '+23767777777',
    },
  ] as Organization[],
  regions: [
    {
      region_id: 'reg-centre',
      region_name: 'Centre',
      geom: 'POLYGON((11.0 4.0, 11.0 6.0, 12.0 6.0, 12.0 4.0, 11.0 4.0))',
    },
    {
      region_id: 'reg-littoral',
      region_name: 'Littoral',
      geom: 'POLYGON((9.5 3.5, 9.5 4.5, 10.5 4.5, 10.5 3.5, 9.5 3.5))',
    },
    {
      region_id: 'reg-northwest',
      region_name: 'Northwest',
      geom: 'POLYGON((10.0 5.5, 10.0 6.5, 11.0 6.5, 11.0 5.5, 10.0 5.5))',
    },
  ] as Region[],
  districts: [
    {
      district_id: 'dist-yaounde',
      district_name: 'Yaounde I',
      region_id: 'reg-centre',
      geom: 'POLYGON((11.5 3.8, 11.5 4.2, 11.8 4.2, 11.8 3.8, 11.5 3.8))',
    },
    {
      district_id: 'dist-douala',
      district_name: 'Douala V',
      region_id: 'reg-littoral',
      geom: 'POLYGON((9.6 3.9, 9.6 4.3, 9.9 4.3, 9.9 3.9, 9.6 3.9))',
    },
    {
      district_id: 'dist-bamenda',
      district_name: 'Bamenda I',
      region_id: 'reg-northwest',
      geom: 'POLYGON((10.1 5.6, 10.1 6.0, 10.4 6.0, 10.4 5.6, 10.1 5.6))',
    },
  ] as District[],
  villages: [
    {
      village_id: 'vil-mendong',
      village_name: 'Mendong',
      district_id: 'dist-yaounde',
      population_count: 50000,
      geom: 'POINT(11.56 4.05)',
    },
    {
      village_id: 'vil-bonaberi',
      village_name: 'Bonaberi',
      district_id: 'dist-douala',
      population_count: 75000,
      geom: 'POINT(9.68 4.03)',
    },
    {
      village_id: 'vil-nkwen',
      village_name: 'Nkwen',
      district_id: 'dist-bamenda',
      population_count: 30000,
      geom: 'POINT(10.25 5.75)',
    },
  ] as Village[],
  waterSourceTypes: [
    { source_type_id: 1, type_name: 'River' },
    { source_type_id: 2, type_name: 'Dam' },
    { source_type_id: 3, type_name: 'Well' },
    { source_type_id: 4, type_name: 'Borehole' },
    { source_type_id: 5, type_name: 'Spring' },
  ] as WaterSourceType[],
  waterSources: [
    {
      source_id: 'source-001',
      source_name: 'Sanaga River Intake',
      source_type_id: 1,
      location_geom: 'POINT(13.0 3.0)',
      village_id: undefined,
      capacity_liters: undefined,
      status: 'Operational',
      created_at: '2000-01-01T00:00:00Z',
    },
    {
      source_id: 'source-002',
      source_name: 'Mefou Dam',
      source_type_id: 2,
      location_geom: 'POINT(11.45 3.8)',
      village_id: undefined,
      capacity_liters: 1000000000, // 1 billion liters
      status: 'Operational',
      created_at: '1990-05-15T00:00:00Z',
    },
    {
      source_id: 'source-003',
      source_name: 'Nkwen Community Well',
      source_type_id: 3,
      location_geom: 'POINT(10.25 5.76)',
      village_id: 'vil-nkwen',
      capacity_liters: undefined,
      status: 'Operational',
      created_at: '2015-08-01T00:00:00Z',
    },
  ] as WaterSource[],
  infrastructureAssetTypes: [
    { asset_type_id: 1, type_name: 'Pipeline' },
    { asset_type_id: 2, type_name: 'Pump Station' },
    { asset_type_id: 3, type_name: 'Treatment Plant' },
    { asset_type_id: 4, type_name: 'Reservoir' },
    { asset_type_id: 5, type_name: 'Meter' },
  ] as InfrastructureAssetType[],
  infrastructureAssets: [
    {
      asset_id: 'asset-001',
      asset_name: 'Douala Main Treatment Plant',
      asset_type_id: 3, // Assuming 'Treatment Plant'
      installation_date: '2005-01-01',
      last_maintenance_date: '2024-05-20',
      condition_status: 'Good',
      location_geom: 'POINT(9.7758 4.0504)', // Example for Douala
      district_id: 'dist-douala',
      capacity_m3_per_day: 50000,
      created_at: '2005-01-01T00:00:00Z',
    },
    {
      asset_id: 'asset-002',
      asset_name: 'Yaounde Reservoir 1',
      asset_type_id: 4, // Assuming 'Reservoir'
      installation_date: '1998-03-10',
      last_maintenance_date: '2023-11-15',
      condition_status: 'Fair',
      location_geom: 'POINT(11.52 3.87)', // Example for Yaounde
      district_id: 'dist-yaounde',
      capacity_m3_per_day: 10000,
      created_at: '1998-03-10T00:00:00Z',
    },
    {
      asset_id: 'asset-003',
      asset_name: 'Bamenda Pipeline Segment A',
      asset_type_id: 1, // Assuming 'Pipeline'
      installation_date: '2010-06-01',
      last_maintenance_date: '2024-04-10',
      condition_status: 'Good',
      location_geom: 'LINESTRING(10.24 5.74, 10.26 5.78)', // Example line
      district_id: 'dist-bamenda',
      capacity_m3_per_day: undefined,
      created_at: '2010-06-01T00:00:00Z',
    },
    {
      asset_id: 'meter-001',
      asset_name: 'Mendong Meter 1',
      asset_type_id: 5, // Assuming 'Meter'
      installation_date: '2020-01-01',
      last_maintenance_date: '2023-09-01',
      condition_status: 'Good',
      location_geom: 'POINT(11.561 4.051)',
      district_id: 'dist-yaounde',
      capacity_m3_per_day: undefined,
      created_at: '2020-01-01T00:00:00Z',
    },
  ] as InfrastructureAsset[],
  maintenanceLogs: [
    {
      log_id: 'log-001',
      asset_id: 'asset-001',
      maintenance_date: '2024-05-20',
      description: 'Routine check and filter replacement.',
      issues_found: 'Minor pressure drop noted.',
      resolution: 'Adjusted pump settings.',
      performed_by_user_id: 'user-003', // field_douala
      next_due_date: '2024-07-20',
      created_at: '2024-05-20T10:00:00Z',
    },
    {
      log_id: 'log-002',
      asset_id: 'asset-002',
      maintenance_date: '2023-11-15',
      description: 'Leak detection system calibration.',
      issues_found: 'Calibration off by 5%.',
      resolution: 'Recalibrated system.',
      performed_by_user_id: 'user-003', // field_douala
      next_due_date: '2024-01-15', // Overdue
      created_at: '2023-11-15T10:00:00Z',
    },
  ] as MaintenanceLog[],
  meterReadings: [
    {
      reading_id: 'reading-001',
      meter_asset_id: 'meter-001',
      reading_date: '2024-05-31',
      volume_consumed_liters: 150000,
      reported_by_user_id: 'user-003', // field_douala
      created_at: '2024-05-31T18:00:00Z',
    },
    {
      reading_id: 'reading-002',
      meter_asset_id: 'meter-001',
      reading_date: '2024-04-30',
      volume_consumed_liters: 145000,
      reported_by_user_id: 'user-003',
      created_at: '2024-04-30T18:00:00Z',
    },
  ] as MeterReading[],
  leakReports: [
    {
      leak_id: 'leak-001',
      report_date: '2024-06-01',
      location_description: 'Near Bonaberi market, large pipe burst.',
      severity: 'Major',
      status: 'Reported',
      resolution_date: undefined,
      estimated_water_loss_liters_per_day: 5000,
      reported_by_village_id: 'vil-bonaberi',
      assigned_to_user_id: 'user-003',
      infrastructure_asset_id: 'asset-003', // Assuming a pipe asset is responsible
      created_at: '2024-06-01T09:00:00Z',
    },
    {
      leak_id: 'leak-002',
      report_date: '2024-05-10',
      location_description: 'Small leak near Mendong residential area.',
      severity: 'Minor',
      status: 'Resolved',
      resolution_date: '2024-05-12',
      estimated_water_loss_liters_per_day: 100,
      reported_by_village_id: 'vil-mendong',
      assigned_to_user_id: 'user-003',
      infrastructure_asset_id: undefined,
      created_at: '2024-05-10T11:00:00Z',
    },
  ] as LeakReport[],
  contaminationIncidents: [
    {
      incident_id: 'incident-001',
      report_date: '2024-05-25',
      source_location_geom: 'POINT(10.251 5.761)', // Near Nkwen Community Well
      contaminant_type: 'Coliform Bacteria',
      severity: 'Critical',
      status: 'Under Investigation',
      resolution_date: undefined,
      affected_population_count: 500,
      reported_by_village_id: 'vil-nkwen',
      created_at: '2024-05-25T08:00:00Z',
    },
  ] as ContaminationIncident[],
  waterQualityTests: [
    {
      test_id: 'wqtest-001',
      test_date: '2024-05-26',
      water_source_id: 'source-003', // Nkwen Community Well
      infrastructure_asset_id: undefined,
      testing_lab: 'Buea Regional Lab',
      ph_level: 6.8,
      chlorine_level_mg_per_l: 0.1, // Low chlorine
      coliform_count_cfu_per_100ml: 150, // High coliform
      other_parameters: { turbidity: 'high' },
      tested_by_user_id: 'user-004', // NGO User
      created_at: '2024-05-26T10:00:00Z',
    },
    {
      test_id: 'wqtest-002',
      test_date: '2024-06-01',
      water_source_id: undefined,
      infrastructure_asset_id: 'asset-001', // Douala Main Treatment Plant
      testing_lab: 'CAMWATER Central Lab',
      ph_level: 7.2,
      chlorine_level_mg_per_l: 0.8,
      coliform_count_cfu_per_100ml: 0,
      other_parameters: {},
      tested_by_user_id: 'user-002', // Planner
      created_at: '2024-06-01T14:00:00Z',
    },
  ] as WaterQualityTest[],
  surveyData: [
    {
      survey_id: 'survey-001',
      org_id: 'org-wateraid',
      survey_date: '2023-10-15',
      village_id: 'vil-nkwen',
      water_access_rate_percent: 65.0,
      sanitation_status: 'Unimproved',
      groundwater_level_meters: 15.2,
      other_survey_details: { notes: 'Community expressed need for more boreholes.' },
      uploaded_by_user_id: 'user-004',
      created_at: '2023-10-15T16:00:00Z',
    },
  ] as SurveyData[],
  budgetAllocations: [
    {
      allocation_id: 'budget-001',
      allocation_year: 2024,
      region_id: 'reg-centre',
      allocated_amount_xaf: 500000000, // 500 Million XAF
      spent_amount_xaf: 300000000,
      approved_by_user_id: 'user-002', // Planner
      created_at: '2024-01-01T00:00:00Z',
    },
    {
      allocation_id: 'budget-002',
      allocation_year: 2024,
      region_id: 'reg-littoral',
      allocated_amount_xaf: 700000000, // 700 Million XAF
      spent_amount_xaf: 650000000,
      approved_by_user_id: 'user-002',
      created_at: '2024-01-01T00:00:00Z',
    },
  ] as BudgetAllocation[],
};

const mockApi = {
  // Generic fetch for any entity type
  fetchEntities<T>(entityType: keyof typeof mockData): Promise<T[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData[entityType] as T[]);
      }, 500);
    });
  },

  // Specific fetch for a single entity by ID
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

  // Simulate creation
  createEntity<T extends { [key: string]: any }>(
    entityType: keyof typeof mockData,
    newEntity: T,
    idKey: keyof T
  ): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const withId = { ...newEntity, [idKey]: `new-${Math.random().toString(36).substring(2, 9)}` } as T;
        (mockData[entityType] as unknown as T[]).push(withId);
        resolve(withId);
      }, 500);
    });
  },

  // Simulate update
  updateEntity<T extends { [key: string]: any }>(
    entityType: keyof typeof mockData,
    id: UUID,
    updatedFields: Partial<T>,
    idKey: keyof T
  ): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = (mockData[entityType] as unknown as T[]).findIndex((item) => item[idKey] === id);
        if (index > -1) {
          const updatedEntity = { ...(mockData[entityType] as unknown as T[])[index], ...updatedFields };
          (mockData[entityType] as unknown as T[])[index] = updatedEntity;
          resolve(updatedEntity);
        } else {
          reject(new Error(`${String(entityType)} not found`));
        }
      }, 500);
    });
  },
  // Simulate delete
  deleteEntity<T extends { [key: string]: any }>(
    entityType: keyof typeof mockData,
    id: UUID,
    idKey: keyof T
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const initialLength = (mockData[entityType] as unknown as T[]).length;
        mockData[entityType] = (mockData[entityType] as unknown as T[]).filter(item => item[idKey] !== id) as any;
        if ((mockData[entityType] as unknown as T[]).length < initialLength) {
          resolve(true); // Deleted successfully
        } else {
          reject(new Error(`${String(entityType)} with ID ${id} not found`));
        }
      }, 500);
    });
  },
};


// --- Material-UI style components (simplified with Tailwind) ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined';
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
  
  // Size styles
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

  // Variant styles
  switch (variant) {
    case 'secondary':
      baseStyles += ' bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500';
      break;
    case 'outlined':
      baseStyles += ' border border-blue-500 text-blue-600 hover:bg-blue-50 focus:ring-blue-500';
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

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className={`mb-4 ${className || ''}`}>
      {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <input
        className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
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
interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  userRole: UserRole | null;
  logout: () => void;
  currentUserId: string | null;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  currentPage,
  setCurrentPage,
  userRole,
  logout,
  currentUserId
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', icon: <HomeIcon />, page: 'dashboard', roles: ['Administrator', 'Planner', 'Field Officer', 'NGO User'] },
    { name: 'Users', icon: <UsersIcon />, page: 'users', roles: ['Administrator'] },
    { name: 'Infrastructure Assets', icon: <PackageIcon />, page: 'infrastructure-assets', roles: ['Administrator', 'Planner', 'Field Officer'] },
    { name: 'Water Sources', icon: <DropletIcon />, page: 'water-sources', roles: ['Administrator', 'Planner', 'Field Officer', 'NGO User'] },
    { name: 'Meter Readings', icon: <ClipboardListIcon />, page: 'meter-readings', roles: ['Field Officer'] },
    { name: 'Leak Reports', icon: <AlertTriangleIcon />, page: 'leak-reports', roles: ['Administrator', 'Field Officer'] },
    { name: 'Water Quality Tests', icon: <FlaskConicalIcon />, page: 'water-quality-tests', roles: ['Administrator', 'Planner', 'NGO User'] },
    { name: 'Survey Data', icon: <UploadCloudIcon />, page: 'survey-data', roles: ['NGO User'] },
    { name: 'Budget Allocations', icon: <DollarSignIcon />, page: 'budget-allocations', roles: ['Administrator', 'Planner'] },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar Toggle for Mobile */}
      <div className="md:hidden p-4">
        <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)} variant="secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-blue-800 text-white w-64 p-6 space-y-6 transform md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-100">WaterNet Admin</h1>
          <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg> {' '}
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              userRole && item.roles.includes(userRole) && (
                <li key={item.page}>
                  <a
                    href="#"
                    onClick={() => { setCurrentPage(item.page); setIsSidebarOpen(false); }}
                    className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
                      currentPage === item.page
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </a>
                </li>
              )
            ))}
          </ul>
        </nav>
        <div className="pt-4 border-t border-blue-700">
          <div className="text-sm text-blue-200 mb-2">Logged in as: {userRole}</div>
          <div className="text-xs text-blue-300 break-words mb-4">User ID: {currentUserId}</div>
          <Button onClick={logout} variant="outlined" size="small" className="w-full border-blue-400 text-blue-100 hover:bg-blue-700 hover:text-white">
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">{currentPage.replace('-', ' ')}</h2>
          <div className="hidden md:block">
            {/* User info / profile dropdown could go here */}
            <span className="text-gray-700">Welcome, {userRole}!</span>
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

const LoginPage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleLogin = async (role: UserRole) => {
    setError('');
    // In a real app, you'd validate username/password against an API
    if (!username || !password) {
      setError('Please enter username and password.');
      return;
    }

    // Mock login based on role
    if (
      (role === 'Administrator' && username === 'admin' && password === 'admin') ||
      (role === 'Planner' && username === 'planner' && password === 'planner') ||
      (role === 'Field Officer' && username === 'field' && password === 'field') ||
      (role === 'NGO User' && username === 'ngo' && password === 'ngo')
    ) {
      login(role);
      setCurrentPage('dashboard');
    } else {
      setError('Invalid username or password for selected role.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 ">WaterNet Login</h2>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Button onClick={() => handleLogin('Administrator')} disabled={isLoading} className="w-full">
            {isLoading ? 'Logging In...' : 'Login as Admin'}
          </Button>
          <Button onClick={() => handleLogin('Planner')} disabled={isLoading} className="w-full" variant="secondary">
            {isLoading ? 'Logging In...' : 'Login as Planner'}
          </Button>
          <Button onClick={() => handleLogin('Field Officer')} disabled={isLoading} className="w-full" variant="outlined">
            {isLoading ? 'Logging In...' : 'Login as Field Officer'}
          </Button>
          <Button onClick={() => handleLogin('NGO User')} disabled={isLoading} className="w-full" variant="secondary">
            {isLoading ? 'Logging In...' : 'Login as NGO User'}
          </Button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          Hint: Use username/password as `admin/admin`, `planner/planner`, `field/field`, or `ngo/ngo`.
        </p>
      </div>
    </div>
  );
};

export const DashboardPage: React.FC = () => {
  const [assetCount, setAssetCount] = useState<number | null>(null);
  const [leakCount, setLeakCount] = useState<number | null>(null);
  const [budgetSpent, setBudgetSpent] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const assets = await mockApi.fetchEntities<InfrastructureAsset>('infrastructureAssets');
        setAssetCount(assets.length);

        const leaks = await mockApi.fetchEntities<LeakReport>('leakReports');
        setLeakCount(leaks.filter(l => l.status !== 'Resolved' && l.status !== 'Closed').length);

        const budgets = await mockApi.fetchEntities<BudgetAllocation>('budgetAllocations');
        const totalSpent = budgets.reduce((sum, b) => sum + b.spent_amount_xaf, 0);
        setBudgetSpent(totalSpent);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center p-6 text-gray-700">Loading dashboard data...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
        <PackageIcon className="text-blue-600 mb-3 w-12 h-12" />
        <h3 className="text-xl font-semibold text-gray-700">Total Assets</h3>
        <p className="text-4xl font-bold text-blue-800">{assetCount}</p>
        <p className="text-gray-500 text-sm mt-1">Infrastructure elements across Cameroon</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
        <AlertTriangleIcon className="text-red-600 mb-3 w-12 h-12" />
        <h3 className="text-xl font-semibold text-gray-700">Active Leak Reports</h3>
        <p className="text-4xl font-bold text-red-800">{leakCount}</p>
        <p className="text-gray-500 text-sm mt-1">Pending investigation or resolution</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
        <DollarSignIcon className="text-green-600 mb-3 w-12 h-12" />
        <h3 className="text-xl font-semibold text-gray-700">Total Budget Spent (2024)</h3>
        <p className="text-4xl font-bold text-green-800">{formatCurrency(budgetSpent || 0)}</p>
        <p className="text-gray-500 text-sm mt-1">Across all regions (XAF)</p>
      </div>

      {/* Add more dashboard cards as needed */}
      <div className="lg:col-span-3 bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Links & Information</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Monitor water quality in critical zones.</li>
          <li>Review latest survey data from rural communities.</li>
          <li>Track maintenance schedules for pump stations.</li>
        </ul>
      </div>
    </div>
  );
};

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await mockApi.fetchEntities<User>('users');
      setUsers(fetchedUsers);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveUser = async (user: User) => {
    try {
      if (user.user_id && editingUser) {
        await mockApi.updateEntity('users', user.user_id, user, 'user_id');
      } else {
        // In a real app, new user IDs are usually generated by backend
        await mockApi.createEntity('users', { ...user, user_id: '' }, 'user_id');
      }
      setIsModalOpen(false);
      setEditingUser(null);
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error('Failed to save user:', err);
      setError('Failed to save user.');
    }
  };

  const handleDeleteUser = async (userId: UUID) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await mockApi.deleteEntity('users', userId, 'user_id');
        fetchUsers();
      } catch (err) {
        console.error('Failed to delete user:', err);
        setError('Failed to delete user.');
      }
    }
  };

  const columns: { header: string; accessor: keyof User | ((item: User) => React.ReactNode); }[] = [
    { header: 'Full Name', accessor: 'full_name' as keyof User },
    { header: 'Username', accessor: 'username' as keyof User },
    { header: 'Email', accessor: 'email' as keyof User },
    { header: 'Role', accessor: 'role' as keyof User },
    { header: 'Organization ID', accessor: 'org_id' as keyof User },
    {
      header: 'Active',
      accessor: (user: User) => (user.is_active ? 'Yes' : 'No'),
    },
    {
      header: 'Created At',
      accessor: (user: User) => formatDate(user.created_at),
    },
    {
      header: 'Actions',
      accessor: (user: User) => (
        <div className="flex space-x-2">
          <Button size="small" variant="secondary" onClick={() => { setEditingUser(user); setIsModalOpen(true); }}>Edit</Button>
          <Button size="small" variant="primary" onClick={() => handleDeleteUser(user.user_id)}>Delete</Button>
        </div>
      ),
    },
  ];

  if (loading) return <div className="text-center p-6 text-gray-700">Loading users...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <Button onClick={() => { setEditingUser(null); setIsModalOpen(true); }}>Add New User</Button>
      </div>
      <Table data={users} columns={columns} keyAccessor="user_id" />

      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Add New User'}
        actions={
          <>
            <Button variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              // This is a simplified direct save, in a real form,
              // you'd handle form state and validation here.
              if (editingUser) {
                handleSaveUser(editingUser);
              } else {
                // Placeholder for new user creation, actual form data needed
                handleSaveUser({
                  user_id: '', // Will be generated by mockApi.createEntity
                  username: 'newuser' + Math.random().toString(36).substring(2, 5),
                  full_name: 'New User',
                  role: 'Field Officer', // Default role for new users
                  org_id: mockData.organizations[0]?.org_id || '',
                  is_active: true,
                  created_at: new Date().toISOString(),
                } as User);
              }
            }}>
              Save User
            </Button>
          </>
        }
      >
        {/* Simplified form within modal */}
        <Input
          label="Full Name"
          value={editingUser?.full_name || ''}
          onChange={(e) => setEditingUser(prev => prev ? { ...prev, full_name: e.target.value } : null)}
        />
        <Input
          label="Username"
          value={editingUser?.username || ''}
          onChange={(e) => setEditingUser(prev => prev ? { ...prev, username: e.target.value } : null)}
          disabled={!!editingUser?.user_id} // Username is read-only for existing users
        />
        <Input
          label="Email"
          type="email"
          value={editingUser?.email || ''}
          onChange={(e) => setEditingUser(prev => prev ? { ...prev, email: e.target.value } : null)}
        />
        <Select
          label="Role"
          value={editingUser?.role || 'Field Officer'}
          onChange={(e) => setEditingUser(prev => prev ? { ...prev, role: e.target.value as UserRole } : null)}
          options={[
            { value: 'Administrator', label: 'Administrator' },
            { value: 'Planner', label: 'Planner' },
            { value: 'Field Officer', label: 'Field Officer' },
            { value: 'NGO User', label: 'NGO User' },
          ]}
        />
        <Select
          label="Organization"
          value={editingUser?.org_id || mockData.organizations[0]?.org_id || ''}
          onChange={(e) => setEditingUser(prev => prev ? { ...prev, org_id: e.target.value } : null)}
          options={mockData.organizations.map(org => ({ value: org.org_id, label: org.org_name }))}
        />
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="isActive"
            checked={editingUser?.is_active || false}
            onChange={(e) => setEditingUser(prev => prev ? { ...prev, is_active: e.target.checked } : null)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
            Is Active
          </label>
        </div>
      </Dialog>
    </div>
  );
};

export const InfrastructureAssetsPage: React.FC = () => {
  const [assets, setAssets] = useState<InfrastructureAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = async () => {
    setLoading(true);
    setError(null);
    try {
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

  const columns: { header: string; accessor: keyof InfrastructureAsset | ((item: InfrastructureAsset) => React.ReactNode); }[] = [
    { header: 'Asset Name', accessor: 'asset_name' as keyof InfrastructureAsset },
    { header: 'Type', accessor: (asset: InfrastructureAsset) =>
        mockData.infrastructureAssetTypes.find(t => t.asset_type_id === asset.asset_type_id)?.type_name || 'N/A'
    },
    { header: 'Condition', accessor: 'condition_status' as keyof InfrastructureAsset },
    { header: 'Last Maintenance', accessor: (asset: InfrastructureAsset) => asset.last_maintenance_date ? formatDate(asset.last_maintenance_date) : 'N/A' },
    { header: 'District ID', accessor: 'district_id' as keyof InfrastructureAsset },
    { header: 'Capacity (m³/day)', accessor: (asset: InfrastructureAsset) => asset.capacity_m3_per_day || 'N/A' },
  ];

  if (loading) return <div className="text-center p-6 text-gray-700">Loading infrastructure assets...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Infrastructure Assets</h2>
      <Table data={assets} columns={columns} keyAccessor="asset_id" />
    </div>
  );
};

export const WaterSourcesPage: React.FC = () => {
  const [sources, setSources] = useState<WaterSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSources = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedSources = await mockApi.fetchEntities<WaterSource>('waterSources');
      setSources(fetchedSources);
    } catch (err) {
      console.error('Failed to fetch water sources:', err);
      setError('Failed to load water sources.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const columns = [
    { header: 'Source Name', accessor: 'source_name' as keyof WaterSource },
    { header: 'Type', accessor: (source: WaterSource) =>
        mockData.waterSourceTypes.find(t => t.source_type_id === source.source_type_id)?.type_name || 'N/A'
    },
    { header: 'Status', accessor: 'status' as keyof WaterSource },
    { header: 'Village', accessor: (source: WaterSource) =>
        mockData.villages.find(v => v.village_id === source.village_id)?.village_name || 'N/A'
    },
    { header: 'Capacity (liters)', accessor: (source: WaterSource) => source.capacity_liters?.toString() || 'N/A' },
    { header: 'Created At', accessor: (source: WaterSource) => formatDate(source.created_at) },
  ];

  if (loading) return <div className="text-center p-6 text-gray-700">Loading water sources...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Water Sources</h2>
      <Table data={sources} columns={columns} keyAccessor="source_id" />
    </div>
  );
};

export const MeterReadingsPage: React.FC = () => {
  const { currentUserId } = useAuth();
  const [readings, setReadings] = useState<MeterReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReading, setNewReading] = useState<Partial<MeterReading>>({
    meter_asset_id: mockData.infrastructureAssets.find(a => a.asset_type_id === 5)?.asset_id || '', // Pre-select first meter
    reading_date: new Date().toISOString().split('T')[0], // Today's date
    volume_consumed_liters: 0,
    reported_by_user_id: currentUserId || 'user-003', // Default to field_douala if no current user
  });

  const fetchReadings = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedReadings = await mockApi.fetchEntities<MeterReading>('meterReadings');
      setReadings(fetchedReadings);
    } catch (err) {
      console.error('Failed to fetch meter readings:', err);
      setError('Failed to load meter readings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReadings();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setNewReading(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmitNewReading = async () => {
    if (!newReading.meter_asset_id || !newReading.reading_date || newReading.volume_consumed_liters === undefined) {
      setError('Please fill all required fields.');
      return;
    }
    setError(null);
    try {
      await mockApi.createEntity('meterReadings', {
        ...newReading,
        created_at: new Date().toISOString(),
        reported_by_user_id: currentUserId || 'user-003', // Ensure reporter ID is set
      } as MeterReading, 'reading_id');
      setIsModalOpen(false);
      setNewReading({
        meter_asset_id: mockData.infrastructureAssets.find(a => a.asset_type_id === 5)?.asset_id || '',
        reading_date: new Date().toISOString().split('T')[0],
        volume_consumed_liters: 0,
        reported_by_user_id: currentUserId || 'user-003',
      });
      fetchReadings();
    } catch (err) {
      console.error('Failed to add meter reading:', err);
      setError('Failed to add meter reading.');
    }
  };

  const columns: { header: string; accessor: keyof MeterReading | ((item: MeterReading) => React.ReactNode); }[] = [
    { header: 'Meter Name', accessor: (reading: MeterReading) =>
        mockData.infrastructureAssets.find(a => a.asset_id === reading.meter_asset_id)?.asset_name || 'N/A'
    },
    { header: 'Reading Date', accessor: (reading: MeterReading) => formatDate(reading.reading_date) },
    { header: 'Volume (Liters)', accessor: 'volume_consumed_liters' as keyof MeterReading },
    { header: 'Reported By', accessor: (reading: MeterReading) =>
        mockData.users.find(u => u.user_id === reading.reported_by_user_id)?.full_name || 'N/A'
    },
    { header: 'Created At', accessor: (reading: MeterReading) => formatDate(reading.created_at) },
  ];

  if (loading) return <div className="text-center p-6 text-gray-700">Loading meter readings...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;

  const meterAssets = mockData.infrastructureAssets.filter(a => a.asset_type_id === 5);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Meter Readings</h2>
        <Button onClick={() => setIsModalOpen(true)}>Add New Reading</Button>
      </div>
      <Table data={readings} columns={columns} keyAccessor="reading_id" />

      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Meter Reading"
        actions={
          <>
            <Button variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitNewReading}>Submit Reading</Button>
          </>
        }
      >
        {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</p>}
        <Select
          label="Meter Asset"
          name="meter_asset_id"
          value={newReading.meter_asset_id}
          onChange={handleInputChange}
          options={meterAssets.map(asset => ({ value: asset.asset_id, label: asset.asset_name }))}
        />
        <Input
          label="Reading Date"
          type="date"
          name="reading_date"
          value={newReading.reading_date}
          onChange={handleInputChange}
        />
        <Input
          label="Volume Consumed (Liters)"
          type="number"
          name="volume_consumed_liters"
          value={newReading.volume_consumed_liters}
          onChange={handleInputChange}
        />
      </Dialog>
    </div>
  );
};


export const LeakReportsPage: React.FC = () => {
  const { currentUserId } = useAuth();
  const [reports, setReports] = useState<LeakReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReport, setNewReport] = useState<Partial<LeakReport>>({
    report_date: new Date().toISOString().split('T')[0],
    severity: 'Minor',
    status: 'Reported',
    reported_by_village_id: mockData.villages[0]?.village_id || '',
    location_description: '',
  });

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedReports = await mockApi.fetchEntities<LeakReport>('leakReports');
      setReports(fetchedReports);
    } catch (err) {
      console.error('Failed to fetch leak reports:', err);
      setError('Failed to load leak reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReport(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitNewReport = async () => {
    if (!newReport.report_date || !newReport.severity || !newReport.reported_by_village_id) {
      setError('Please fill all required fields.');
      return;
    }
    setError(null);
    try {
      await mockApi.createEntity('leakReports', {
        ...newReport,
        created_at: new Date().toISOString(),
        assigned_to_user_id: currentUserId, // Assign to current user if available
      } as LeakReport, 'leak_id');
      setIsModalOpen(false);
      setNewReport({
        report_date: new Date().toISOString().split('T')[0],
        severity: 'Minor',
        status: 'Reported',
        reported_by_village_id: mockData.villages[0]?.village_id || '',
        location_description: '',
      });
      fetchReports();
    } catch (err) {
      console.error('Failed to add leak report:', err);
      setError('Failed to add leak report.');
    }
  };

  const handleUpdateStatus = async (leak: LeakReport, newStatus: ReportStatus) => {
    try {
      await mockApi.updateEntity<LeakReport>('leakReports', leak.leak_id, {
        status: newStatus,
        resolution_date: newStatus === 'Resolved' || newStatus === 'Closed' || newStatus === 'False Report' ? new Date().toISOString().split('T')[0] : undefined,
      } as Partial<LeakReport>, 'leak_id');
      fetchReports();
    } catch (err) {
      console.error('Failed to update leak report status:', err);
      setError('Failed to update leak report status.');
    }
  };

  const columns: { header: string; accessor: keyof LeakReport | ((item: LeakReport) => React.ReactNode); }[] = [
    { header: 'Report Date', accessor: (report: LeakReport) => formatDate(report.report_date) },
    { header: 'Location', accessor: 'location_description' as keyof LeakReport },
    { header: 'Severity', accessor: 'severity' as keyof LeakReport },
    { header: 'Status', accessor: 'status' as keyof LeakReport },
    { header: 'Reported By Village', accessor: (report: LeakReport) =>
        mockData.villages.find(v => v.village_id === report.reported_by_village_id)?.village_name || 'N/A'
    },
    { header: 'Assigned To', accessor: (report: LeakReport) =>
        mockData.users.find(u => u.user_id === report.assigned_to_user_id)?.full_name || 'N/A'
    },
    {
      header: 'Actions',
      accessor: (report: LeakReport) => (
        <div className="flex space-x-2">
          {report.status !== 'Resolved' && report.status !== 'Closed' && report.status !== 'False Report' && (
            <Button size="small" variant="secondary" onClick={() => handleUpdateStatus(report, 'Resolved')}>Mark Resolved</Button>
          )}
          {report.status !== 'Closed' && (
             <Button size="small" variant="outlined" onClick={() => handleUpdateStatus(report, 'Closed')}>Close</Button>
          )}
        </div>
      ),
    },
  ];

  if (loading) return <div className="text-center p-6 text-gray-700">Loading leak reports...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Leak Reports</h2>
        <Button onClick={() => setIsModalOpen(true)}>Report New Leak</Button>
      </div>
      <Table data={reports} columns={columns} keyAccessor="leak_id" />

      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Report New Leak"
        actions={
          <>
            <Button variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitNewReport}>Submit Report</Button>
          </>
        }
      >
        {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</p>}
        <Input
          label="Report Date"
          type="date"
          name="report_date"
          value={newReport.report_date}
          onChange={handleInputChange}
        />
        <Select
          label="Severity"
          name="severity"
          value={newReport.severity}
          onChange={handleInputChange}
          options={[
            { value: 'Minor', label: 'Minor' },
            { value: 'Moderate', label: 'Moderate' },
            { value: 'Major', label: 'Major' },
            { value: 'Critical', label: 'Critical' },
          ]}
        />
        <Select
          label="Reported by Village"
          name="reported_by_village_id"
          value={newReport.reported_by_village_id}
          onChange={handleInputChange}
          options={mockData.villages.map(v => ({ value: v.village_id, label: v.village_name }))}
        />
        <Input
          label="Location Description"
          type="textarea"
          name="location_description"
          value={newReport.location_description}
          onChange={handleInputChange}
          placeholder="e.g., Pipe burst near main market, specific street name."
        />
      </Dialog>
    </div>
  );
};

export const WaterQualityTestsPage: React.FC = () => {
  const { currentUserId } = useAuth();
  const [tests, setTests] = useState<WaterQualityTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTest, setNewTest] = useState<Partial<WaterQualityTest>>({
    test_date: new Date().toISOString().split('T')[0],
    ph_level: 7.0,
    chlorine_level_mg_per_l: 0.5,
    coliform_count_cfu_per_100ml: 0,
    testing_lab: 'Default Lab',
    water_source_id: mockData.waterSources[0]?.source_id || '',
    infrastructure_asset_id: undefined,
    other_parameters: {},
    tested_by_user_id: currentUserId || '',
  });

  const fetchTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTests = await mockApi.fetchEntities<WaterQualityTest>('waterQualityTests');
      setTests(fetchedTests);
    } catch (err) {
      console.error('Failed to fetch water quality tests:', err);
      setError('Failed to load water quality tests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setNewTest(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmitNewTest = async () => {
    if (!newTest.test_date || (newTest.water_source_id === undefined && newTest.infrastructure_asset_id === undefined)) {
      setError('Please select a source or asset and a date.');
      return;
    }
    setError(null);
    try {
      await mockApi.createEntity('waterQualityTests', {
        ...newTest,
        created_at: new Date().toISOString(),
        tested_by_user_id: currentUserId,
      } as WaterQualityTest, 'test_id');
      setIsModalOpen(false);
      setNewTest({
        test_date: new Date().toISOString().split('T')[0],
        ph_level: 7.0,
        chlorine_level_mg_per_l: 0.5,
        coliform_count_cfu_per_100ml: 0,
        testing_lab: 'Default Lab',
        water_source_id: mockData.waterSources[0]?.source_id || '',
        infrastructure_asset_id: undefined,
        other_parameters: {},
        tested_by_user_id: currentUserId || '',
      });
      fetchTests();
    } catch (err) {
      console.error('Failed to add water quality test:', err);
      setError('Failed to add water quality test.');
    }
  };

  const columns: { header: string; accessor: keyof WaterQualityTest | ((item: WaterQualityTest) => React.ReactNode); }[] = [
    { header: 'Test Date', accessor: (test: WaterQualityTest) => formatDate(test.test_date) },
    { header: 'Source/Asset', accessor: (test: WaterQualityTest) => {
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
    { header: 'Tested By', accessor: (test: WaterQualityTest) => mockData.users.find(u => u.user_id === test.tested_by_user_id)?.full_name || 'N/A' },
  ];

  if (loading) return <div className="text-center p-6 text-gray-700">Loading water quality tests...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Water Quality Tests</h2>
        <Button onClick={() => setIsModalOpen(true)}>Add New Test Result</Button>
      </div>
      <Table data={tests} columns={columns} keyAccessor="test_id" />

      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Water Quality Test Result"
        actions={
          <>
            <Button variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitNewTest}>Submit Result</Button>
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
        />
        <Select
          label="Water Source"
          name="water_source_id"
          value={newTest.water_source_id || ''}
          onChange={handleInputChange}
          options={[{ value: '', label: 'Select a Water Source (Optional)' }, ...mockData.waterSources.map(s => ({ value: s.source_id, label: s.source_name }))]}
        />
        <Select
          label="Infrastructure Asset"
          name="infrastructure_asset_id"
          value={newTest.infrastructure_asset_id || ''}
          onChange={handleInputChange}
          options={[{ value: '', label: 'Select an Asset (Optional)' }, ...mockData.infrastructureAssets.map(a => ({ value: a.asset_id, label: a.asset_name }))]}
        />
        <Input
          label="Testing Lab"
          type="text"
          name="testing_lab"
          value={newTest.testing_lab}
          onChange={handleInputChange}
          placeholder="e.g., Buea Regional Lab"
        />
        <Input
          label="pH Level"
          type="number"
          name="ph_level"
          value={newTest.ph_level}
          onChange={handleInputChange}
          step="0.01"
        />
        <Input
          label="Chlorine Level (mg/L)"
          type="number"
          name="chlorine_level_mg_per_l"
          value={newTest.chlorine_level_mg_per_l}
          onChange={handleInputChange}
          step="0.01"
        />
        <Input
          label="Coliform Count (CFU/100ml)"
          type="number"
          name="coliform_count_cfu_per_100ml"
          value={newTest.coliform_count_cfu_per_100ml}
          onChange={handleInputChange}
        />
      </Dialog>
    </div>
  );
};

export const SurveyDataPage: React.FC = () => {
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSurveys = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedSurveys = await mockApi.fetchEntities<SurveyData>('surveyData');
      setSurveys(fetchedSurveys);
    } catch (err) {
      console.error('Failed to fetch survey data:', err);
      setError('Failed to load survey data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const columns: { header: string; accessor: keyof SurveyData | ((item: SurveyData) => React.ReactNode); }[] = [
    { header: 'Survey Date', accessor: (survey: SurveyData) => formatDate(survey.survey_date) },
    { header: 'Organization', accessor: (survey: SurveyData) =>
        mockData.organizations.find(o => o.org_id === survey.org_id)?.org_name || 'N/A'
    },
    { header: 'Village', accessor: (survey: SurveyData) =>
        mockData.villages.find(v => v.village_id === survey.village_id)?.village_name || 'N/A'
    },
    { header: 'Water Access Rate (%)', accessor: (survey: SurveyData) => 
        survey.water_access_rate_percent?.toString() || 'N/A'
    },
    { header: 'Groundwater Level (m)', accessor: (survey: SurveyData) => 
        survey.groundwater_level_meters || 'N/A'
    },
    { header: 'Uploaded By', accessor: (survey: SurveyData) =>
        mockData.users.find(u => u.user_id === survey.uploaded_by_user_id)?.full_name || 'N/A'
    },
  ];

  if (loading) return <div className="text-center p-6 text-gray-700">Loading survey data...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Survey Data</h2>
      <Table data={surveys} columns={columns} keyAccessor="survey_id" />
    </div>
  );
};

export const BudgetAllocationsPage: React.FC = () => {
  const [allocations, setAllocations] = useState<BudgetAllocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAllocation, setEditingAllocation] = useState<BudgetAllocation | null>(null);
  const { currentUserId } = useAuth();

  const fetchAllocations = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedAllocations = await mockApi.fetchEntities<BudgetAllocation>('budgetAllocations');
      setAllocations(fetchedAllocations);
    } catch (err) {
      console.error('Failed to fetch budget allocations:', err);
      setError('Failed to load budget allocations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, []);

  const handleSaveAllocation = async (allocation: BudgetAllocation) => {
    try {
      if (allocation.allocation_id && editingAllocation) {
        await mockApi.updateEntity('budgetAllocations', allocation.allocation_id, allocation, 'allocation_id');
      } else {
        // In a real app, new allocation IDs are usually generated by backend
        await mockApi.createEntity('budgetAllocations', { ...allocation, allocation_id: '' } as BudgetAllocation, 'allocation_id');
      }
      setIsModalOpen(false);
      setEditingAllocation(null);
      fetchAllocations(); // Refresh list
    } catch (err) {
      console.error('Failed to save allocation:', err);
      setError('Failed to save allocation.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setEditingAllocation(prev => prev ? {
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    } : null);
  };

  const columns: { header: string; accessor: keyof BudgetAllocation | ((item: BudgetAllocation) => React.ReactNode); }[] = [
    { header: 'Year', accessor: (alloc: BudgetAllocation) => alloc.allocation_year.toString() },
    { header: 'Region', accessor: (alloc: BudgetAllocation) =>
        mockData.regions.find(r => r.region_id === alloc.region_id)?.region_name || 'N/A'
    },
    { header: 'Allocated Amount', accessor: (alloc: BudgetAllocation) => formatCurrency(alloc.allocated_amount_xaf) },
    { header: 'Spent Amount', accessor: (alloc: BudgetAllocation) => formatCurrency(alloc.spent_amount_xaf) },
    { header: 'Approved By', accessor: (alloc: BudgetAllocation) =>
        mockData.users.find(u => u.user_id === alloc.approved_by_user_id)?.full_name || 'N/A'
    },
    {
      header: 'Actions',
      accessor: (alloc: BudgetAllocation) => (
        <div className="flex space-x-2">
          <Button size="small" variant="secondary" onClick={() => { setEditingAllocation(alloc); setIsModalOpen(true); }}>Edit</Button>
        </div>
      ),
    },
  ];

  if (loading) return <div className="text-center p-6 text-gray-700">Loading budget allocations...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Budget Allocations</h2>
        <Button onClick={() => { setEditingAllocation({
          allocation_year: new Date().getFullYear(),
          region_id: mockData.regions[0]?.region_id || '',
          allocated_amount_xaf: 0,
          spent_amount_xaf: 0,
          approved_by_user_id: currentUserId || mockData.users.find(u => u.role === 'Planner')?.user_id || '',
          created_at: new Date().toISOString(),
        } as BudgetAllocation); setIsModalOpen(true); }}>Add New Allocation</Button>
      </div>
      <Table data={allocations} columns={columns} keyAccessor="allocation_id" />

      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAllocation?.allocation_id ? 'Edit Budget Allocation' : 'Add New Budget Allocation'}
        actions={
          <>
            <Button variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => editingAllocation && handleSaveAllocation(editingAllocation)}>
              Save Allocation
            </Button>
          </>
        }
      >
        {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</p>}
        {editingAllocation && (
          <>
            <Input
              label="Allocation Year"
              type="number"
              name="allocation_year"
              value={editingAllocation.allocation_year}
              onChange={handleInputChange}
            />
            <Select
              label="Region"
              name="region_id"
              value={editingAllocation.region_id}
              onChange={handleInputChange}
              options={mockData.regions.map(r => ({ value: r.region_id, label: r.region_name }))}
            />
            <Input
              label="Allocated Amount (XAF)"
              type="number"
              name="allocated_amount_xaf"
              value={editingAllocation.allocated_amount_xaf}
              onChange={handleInputChange}
              step="100000"
            />
            <Input
              label="Spent Amount (XAF)"
              type="number"
              name="spent_amount_xaf"
              value={editingAllocation.spent_amount_xaf}
              onChange={handleInputChange}
              step="100000"
            />
          </>
        )}
      </Dialog>
    </div>
  );
};


export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-700">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
    </div>
  );
};

// --- Main App Component ---
export default function App2() {
  const { isAuthenticated, userRole, logout, isLoading, currentUserId } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('survey-data');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white text-xl">
        Loading application...
      </div>
    );
  }

//   if (!isAuthenticated) {
//     return <LoginPage setCurrentPage={setCurrentPage} />;
//   }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'users':
        return userRole === 'Administrator' ? <UsersPage /> : <NotFoundPage />;
      case 'infrastructure-assets':
        return ['Administrator', 'Planner', 'Field Officer'].includes(userRole!) ? <InfrastructureAssetsPage /> : <NotFoundPage />;
      case 'water-sources':
        return ['Administrator', 'Planner', 'Field Officer', 'NGO User'].includes(userRole!) ? <WaterSourcesPage /> : <NotFoundPage />;
      case 'meter-readings':
        return userRole === 'Field Officer' ? <MeterReadingsPage /> : <NotFoundPage />;
      case 'leak-reports':
        return ['Administrator', 'Field Officer'].includes(userRole!) ? <LeakReportsPage /> : <NotFoundPage />;
      case 'water-quality-tests':
        return ['Administrator', 'Planner', 'NGO User'].includes(userRole!) ? <WaterQualityTestsPage /> : <NotFoundPage />;
      case 'survey-data':
        return userRole === 'NGO User' ? <SurveyDataPage /> : <NotFoundPage />;
      case 'budget-allocations':
        return ['Administrator', 'Planner'].includes(userRole!) ? <BudgetAllocationsPage /> : <NotFoundPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <AuthProvider> {/* Ensure AuthProvider wraps the whole app or relevant parts */}
      <DashboardLayout
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        userRole={userRole}
        logout={logout}
        currentUserId={currentUserId}
      >
        {renderPage()}
      </DashboardLayout>
    </AuthProvider>
  );
}