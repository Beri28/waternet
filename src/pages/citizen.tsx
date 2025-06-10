import React, { useState, useEffect, createContext, useContext } from 'react';

// --- Global Tailwind CSS (usually in index.css or main.css) ---
// This would typically be imported from a CSS file. For this self-contained immersive,
// we'll imagine it's loaded.
// <style>
// @tailwind base;
// @tailwind components;
// @tailwind utilities;
// </style>

// --- Lucide React Icons (Directly embedded SVGs for standalone nature of this immersive) ---
export const HomeIcon:React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);
export const GaugeIcon:React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 14v4"></path>
    <path d="M8.5 12.5l1.5 1.5"></path>
    <path d="M15.5 12.5l-1.5 1.5"></path>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
    <path d="M12 6a6 6 0 0 0-6 6"></path>
  </svg>
);
export const FileTextIcon:React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <line x1="10" y1="9" x2="8" y2="9"></line>
  </svg>
);
export const DollarSignIcon:React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);
export const MegaphoneIcon:React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l13-9 8 7-14 14L3 11zm5 7v-1.5"></path>
  </svg>
);
export const AlertTriangleIcon:React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

// Custom Water Droplet Logo SVG (reused from landing page)
const WaterDropletLogo:React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.69L11.83 2C8.68 2.36 6 4.81 6 8.5S12 22 12 22s6-13.5 6-17.5S15.32 2.36 12.17 2L12 2.69z" fill="currentColor" opacity="0.8"/>
    <path d="M10 5.69L9.83 5C7.68 5.36 6 7.81 6 10.5S10 20 10 20s4-9 4-12S12.32 5.36 10.17 5L10 5.69z" fill="currentColor" opacity="0.6"/>
  </svg>
);


// --- Utility Functions (reused) ---
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

// --- Context for User Authentication and Global State (Mock) ---
interface AuthContextType {
  isAuthenticated: boolean;
  citizenId: UUID | null;
  login: (citizenId: UUID) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    citizenId: null,
    login: () => {},
    logout: () => {},
    isLoading: true
});
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [citizenId, setCitizenId] = useState<UUID | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      const storedCitizenId = localStorage.getItem('citizenId');
      if (storedCitizenId) {
        setIsAuthenticated(true);
        setCitizenId(storedCitizenId);
      }
      setIsLoading(false);
    }, 500);
  }, []);

  const login = (id: UUID) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setCitizenId(id);
      localStorage.setItem('citizenId', id);
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(false);
      setCitizenId(null);
      localStorage.removeItem('citizenId');
      setIsLoading(false);
    }, 500);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, citizenId, login, logout, isLoading }}>
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

// --- Type Definitions (Mapping from database schema + citizen-specific) ---
type UUID = string;

type AssetCondition = 'Good' | 'Fair' | 'Poor' | 'Critical' | 'Decommissioned';
type LeakSeverity = 'Minor' | 'Moderate' | 'Major' | 'Critical';
type ReportStatus = 'Reported' | 'Under Investigation' | 'Resolved' | 'Closed' | 'False Report' | 'Mitigated';
type BillStatus = 'Paid' | 'Pending' | 'Overdue';
type BillType = 'Water Consumption' | 'Maintenance Fee';

interface Region { region_id: UUID; region_name: string; }
interface District { district_id: UUID; district_name: string; region_id: UUID; }
interface Village { village_id: UUID; village_name: string; district_id: UUID; population_count: number; }

interface Property {
  property_id: UUID;
  address: string;
  village_id: UUID;
  meter_asset_id: UUID; // Link to an infrastructure asset that is a meter
  owner_citizen_id?: UUID; // Optional link to a citizen account
}

interface CitizenAccount {
  citizen_id: UUID;
  full_name: string;
  email?: string;
  phone_number: string;
  property_id: UUID; // Each citizen is associated with one property for simplicity
  account_status: 'Active' | 'Suspended';
  registered_at: string;
}

interface InfrastructureAsset {
  asset_id: UUID;
  asset_name: string;
  asset_type_id: number; // Assuming type 5 is 'Meter'
  condition_status?: AssetCondition;
}

interface MeterReading {
  reading_id: UUID;
  meter_asset_id: UUID;
  reading_date: string;
  volume_consumed_liters: number;
  reported_by_citizen_id: UUID; // New: link to citizen
  created_at: string;
}

interface LeakReport {
  leak_id: UUID;
  report_date: string;
  location_description?: string;
  severity: LeakSeverity;
  status: ReportStatus;
  resolution_date?: string;
  reported_by_citizen_id: UUID; // New: link to citizen
  created_at: string;
}

interface Bill {
  bill_id: UUID;
  citizen_id: UUID;
  property_id: UUID;
  issue_date: string;
  due_date: string;
  amount_xaf: number;
  status: BillStatus;
  bill_type: BillType;
  period_start_date?: string;
  period_end_date?: string;
  created_at: string;
}

interface Announcement {
  announcement_id: UUID;
  title: string;
  content: string;
  published_at: string;
  author?: string;
}

// --- Mock Data (Expanded for Citizen App) ---
export const mockData = {
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
  ] as Village[],
  infrastructureAssets: [
    { asset_id: 'meter-001', asset_name: 'Mendong Meter 1', asset_type_id: 5, condition_status: 'Good' },
    { asset_id: 'meter-002', asset_name: 'Bonaberi Meter A', asset_type_id: 5, condition_status: 'Fair' },
    { asset_id: 'pipe-001', asset_name: 'Mendong Main Pipe', asset_type_id: 1, condition_status: 'Good' },
  ] as InfrastructureAsset[],
  properties: [
    { property_id: 'prop-001', address: '123 Main St, Mendong', village_id: 'vil-mendong', meter_asset_id: 'meter-001', owner_citizen_id: 'citizen-001' },
    { property_id: 'prop-002', address: '45 River Rd, Bonaberi', village_id: 'vil-bonaberi', meter_asset_id: 'meter-002', owner_citizen_id: 'citizen-002' },
  ] as Property[],
  citizenAccounts: [
    { citizen_id: 'citizen-001', full_name: 'Mme. Sarah Mbonjo', email: 'sarah.mbonjo@example.com', phone_number: '+237677123456', property_id: 'prop-001', account_status: 'Active', registered_at: '2023-01-01T00:00:00Z' },
    { citizen_id: 'citizen-002', full_name: 'Mr. David Nkeng', email: 'david.nkeng@example.com', phone_number: '+237699765432', property_id: 'prop-002', account_status: 'Active', registered_at: '2023-02-10T00:00:00Z' },
  ] as CitizenAccount[],
  meterReadings: [
    { reading_id: 'mr-001', meter_asset_id: 'meter-001', reading_date: '2024-03-01', volume_consumed_liters: 10000, reported_by_citizen_id: 'citizen-001', created_at: '2024-03-01T10:00:00Z' },
    { reading_id: 'mr-002', meter_asset_id: 'meter-001', reading_date: '2024-04-01', volume_consumed_liters: 12000, reported_by_citizen_id: 'citizen-001', created_at: '2024-04-01T10:00:00Z' },
    { reading_id: 'mr-003', meter_asset_id: 'meter-001', reading_date: '2024-05-01', volume_consumed_liters: 11500, reported_by_citizen_id: 'citizen-001', created_at: '2024-05-01T10:00:00Z' },
    { reading_id: 'mr-004', meter_asset_id: 'meter-002', reading_date: '2024-04-15', volume_consumed_liters: 8000, reported_by_citizen_id: 'citizen-002', created_at: '2024-04-15T11:00:00Z' },
    { reading_id: 'mr-005', meter_asset_id: 'meter-002', reading_date: '2024-05-15', volume_consumed_liters: 8500, reported_by_citizen_id: 'citizen-002', created_at: '2024-05-15T11:00:00Z' },
  ] as MeterReading[],
  leakReports: [
    { leak_id: 'lr-001', report_date: '2024-05-20', location_description: 'Pipe leak near gate', severity: 'Minor', status: 'Reported', reported_by_citizen_id: 'citizen-001', created_at: '2024-05-20T09:00:00Z' },
    { leak_id: 'lr-002', report_date: '2024-04-10', location_description: 'Street pipe burst on main road', severity: 'Major', status: 'Resolved', resolution_date: '2024-04-12', reported_by_citizen_id: 'citizen-002', created_at: '2024-04-10T14:00:00Z' },
  ] as LeakReport[],
  bills: [
    { bill_id: 'bill-001', citizen_id: 'citizen-001', property_id: 'prop-001', issue_date: '2024-05-05', due_date: '2024-05-20', amount_xaf: 7500, status: 'Overdue', bill_type: 'Water Consumption', period_start_date: '2024-04-01', period_end_date: '2024-04-30', created_at: '2024-05-05T08:00:00Z' },
    { bill_id: 'bill-002', citizen_id: 'citizen-001', property_id: 'prop-001', issue_date: '2024-06-05', due_date: '2024-06-20', amount_xaf: 8000, status: 'Pending', bill_type: 'Water Consumption', period_start_date: '2024-05-01', period_end_date: '2024-05-31', created_at: '2024-06-05T08:00:00Z' },
    { bill_id: 'bill-003', citizen_id: 'citizen-002', property_id: 'prop-002', issue_date: '2024-05-10', due_date: '2024-05-25', amount_xaf: 6000, status: 'Paid', bill_type: 'Water Consumption', period_start_date: '2024-04-01', period_end_date: '2024-04-30', created_at: '2024-05-10T09:00:00Z' },
    { bill_id: 'bill-004', citizen_id: 'citizen-002', property_id: 'prop-002', issue_date: '2024-06-10', due_date: '2024-06-25', amount_xaf: 6500, status: 'Pending', bill_type: 'Water Consumption', period_start_date: '2024-05-01', period_end_date: '2024-05-31', created_at: '2024-06-10T09:00:00Z' },
    { bill_id: 'bill-005', citizen_id: 'citizen-001', property_id: 'prop-001', issue_date: '2024-01-01', due_date: '2024-01-31', amount_xaf: 2500, status: 'Paid', bill_type: 'Maintenance Fee', created_at: '2024-01-01T00:00:00Z' },
  ] as Bill[],
  announcements: [
    { announcement_id: 'ann-001', title: 'Planned Water Interruption: Mendong Sector', content: 'Dear residents of Mendong, please be informed of a planned water interruption on 2024-06-15 from 8 AM to 4 PM for urgent pipe maintenance. We apologize for any inconvenience.', published_at: '2024-06-08T10:00:00Z', author: 'CAMWATER' },
    { announcement_id: 'ann-002', title: 'Water Quality Advisory: Bonaberi', content: 'Residents of Bonaberi are advised that recent heavy rains may affect water turbidity. While our purification systems are active, consider boiling drinking water as a precaution for the next 48 hours.', published_at: '2024-06-07T15:30:00Z', author: 'MINEE' },
  ] as Announcement[],
};

const mockApi = {
  // Corrected syntax for generic methods in an object literal
  fetchEntities<T>(entityType: keyof typeof mockData): Promise<T[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData[entityType] as T[]);
      }, 500);
    });
  },

  fetchEntitiesByCitizenId<T extends { citizen_id?: UUID; reported_by_citizen_id?: UUID }>(
    entityType: keyof typeof mockData,
    citizenId: UUID
  ): Promise<T[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredData = (mockData[entityType] as unknown as T[]).filter(
          (item: T) => item.citizen_id === citizenId || item.reported_by_citizen_id === citizenId
        );
        resolve(filteredData);
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

  createEntity<T extends { [key: string]: any }>(
    entityType: keyof typeof mockData,
    newEntity: T,
    idKey: keyof T
  ): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const withId = { ...newEntity, [idKey]: `${String(idKey).substring(0,2)}-${Math.random().toString(36).substring(2, 9)}` } as T;
        (mockData[entityType] as unknown as T[]).push(withId);
        resolve(withId);
      }, 500);
    });
  },

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
          resolve(true);
        } else {
          reject(new Error(`${String(entityType)} with ID ${id} not found`));
        }
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

export const Button: React.FC<ButtonProps> = ({
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


// interface DialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   children: React.ReactNode;
//   actions?: React.ReactNode;
// }


// --- Layouts ---
interface CitizenLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  citizenId: UUID | null;
  logout: () => void;
}

const CitizenLayout: React.FC<CitizenLayoutProps> = ({
  children,
  currentPage,
  setCurrentPage,
  citizenId,
  logout
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentCitizen = mockData.citizenAccounts.find(c => c.citizen_id === citizenId);

  const navigationItems = [
    { name: 'Dashboard', icon: <HomeIcon />, page: 'citizen-dashboard' },
    { name: 'Submit Reading', icon: <GaugeIcon />, page: 'submit-reading' },
    { name: 'Report Leak', icon: <AlertTriangleIcon />, page: 'report-leak' },
    { name: 'Consumption History', icon: <FileTextIcon />, page: 'consumption-history' },
    { name: 'My Bills', icon: <DollarSignIcon />, page: 'my-bills' },
    { name: 'Announcements', icon: <MegaphoneIcon />, page: 'announcements' },
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <WaterDropletLogo className="text-blue-100 w-8 h-8" />
            <h1 className="text-2xl font-bold text-blue-100">WaterNet Citizen</h1>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      : 'text-blue-200 hover:bg-blue-700 hover:text-white'
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
          <div className="text-sm text-blue-200 mb-2">Logged in as:</div>
          <div className="text-md font-semibold text-blue-100 mb-2">{currentCitizen?.full_name || 'Citizen'}</div>
          <div className="text-xs text-blue-300 break-words mb-4">Account ID: {citizenId}</div>
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
            <span className="text-gray-700">Hello, {currentCitizen?.full_name.split(' ')[0]}!</span>
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

const CitizenLoginPage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState(''); // Simple password for mock
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    setError('');
    if (!phoneOrEmail || !password) {
      setError('Please enter your phone number/email and password.');
      return;
    }

    // Mock login logic: Find citizen by phone/email and check a mock password
    const foundCitizen = mockData.citizenAccounts.find(
      (c) => c.phone_number === phoneOrEmail || c.email === phoneOrEmail
    );

    if (foundCitizen && password === 'citizen') { // Using 'citizen' as a mock password for all citizen accounts
      login(foundCitizen.citizen_id);
      setCurrentPage('citizen-dashboard');
    } else {
      setError('Invalid credentials. Please use phone/email from mock data and password "citizen".');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <WaterDropletLogo className="text-blue-800 w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Citizen Portal Login</h2>
        {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</p>}
        <Input
          label="Phone Number or Email"
          type="text"
          value={phoneOrEmail}
          onChange={(e) => setPhoneOrEmail(e.target.value)}
          placeholder="e.g., +237677123456 or sarah.mbonjo@example.com"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <Button onClick={handleLogin} disabled={isLoading} className="w-full mt-6">
          {isLoading ? 'Logging In...' : 'Login to Portal'}
        </Button>
        <p className="text-center text-sm text-gray-600 mt-6">
          Hint: Use any phone/email from the mock data (e.g., `+237677123456` or `sarah.mbonjo@example.com`) and password `citizen`.
        </p>
      </div>
    </div>
  );
};


const CitizenDashboardPage: React.FC = () => {
  const { citizenId } = useAuth();
  const [currentCitizen, setCurrentCitizen] = useState<CitizenAccount | null>(null);
  const [latestReading, setLatestReading] = useState<MeterReading | null>(null);
  const [pendingBills, setPendingBills] = useState<Bill[]>([]);
  const [activeReports, setActiveReports] = useState<LeakReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!citizenId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const citizen = mockData.citizenAccounts.find(c => c.citizen_id === citizenId) || null;
        setCurrentCitizen(citizen);

        if (citizen) {
          const readings = await mockApi.fetchEntitiesByCitizenId<MeterReading>('meterReadings', citizen.citizen_id);
          const latest = readings.sort((a, b) => new Date(b.reading_date).getTime() - new Date(a.reading_date).getTime())[0] || null;
          setLatestReading(latest);

          const bills = await mockApi.fetchEntitiesByCitizenId<Bill>('bills', citizen.citizen_id);
          setPendingBills(bills.filter(b => b.status === 'Pending' || b.status === 'Overdue'));

          const reports = await mockApi.fetchEntitiesByCitizenId<LeakReport>('leakReports', citizen.citizen_id);
          setActiveReports(reports.filter(r => r.status !== 'Resolved' && r.status !== 'Closed'));
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [citizenId]);

  if (loading) return <div className="text-center p-6 text-gray-700">Loading your dashboard...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  if (!citizenId || !currentCitizen) return <div className="text-center p-6 text-gray-700">Please log in to view your dashboard.</div>;

  const totalPendingBillsAmount = pendingBills.reduce((sum, bill) => sum + bill.amount_xaf, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Welcome Card */}
      <div className="lg:col-span-3 bg-white rounded-lg shadow p-6 text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <h3 className="text-3xl font-bold mb-2">Welcome, {currentCitizen.full_name.split(' ')[0]}!</h3>
        <p className="text-lg opacity-90">Your gateway to efficient water management.</p>
        <p className="text-sm opacity-80 mt-2">Property Address: {currentCitizen.property_id ? mockData.properties.find(p => p.property_id === currentCitizen.property_id)?.address : 'N/A'}</p>
      </div>

      {/* Latest Meter Reading Card */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
        <GaugeIcon className="text-blue-600 mb-3 w-12 h-12" />
        <h3 className="text-xl font-semibold text-gray-700">Latest Meter Reading</h3>
        {latestReading ? (
          <>
            <p className="text-4xl font-bold text-blue-800">{latestReading.volume_consumed_liters} L</p>
            <p className="text-gray-500 text-sm mt-1">As of {formatDate(latestReading.reading_date)}</p>
          </>
        ) : (
          <p className="text-gray-500 text-sm mt-1">No readings yet. Submit one!</p>
        )}
      </div>

      {/* Pending Bills Card */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
        <DollarSignIcon className="text-red-600 mb-3 w-12 h-12" />
        <h3 className="text-xl font-semibold text-gray-700">Pending Bills</h3>
        <p className="text-4xl font-bold text-red-800">{formatCurrency(totalPendingBillsAmount)}</p>
        <p className="text-gray-500 text-sm mt-1">{pendingBills.length} outstanding bill(s)</p>
      </div>

      {/* Active Leak Reports Card */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
        <AlertTriangleIcon className="text-orange-500 mb-3 w-12 h-12" />
        <h3 className="text-xl font-semibold text-gray-700">Active Reports</h3>
        <p className="text-4xl font-bold text-orange-700">{activeReports.length}</p>
        <p className="text-gray-500 text-sm mt-1">Issues currently under review</p>
      </div>

      {/* Quick Actions Card */}
      <div className="lg:col-span-3 bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button variant="primary" size="large" onClick={() => {/* navigate to submit reading */}}>Submit Meter Reading</Button>
          <Button variant="secondary" size="large" onClick={() => {/* navigate to report leak */}}>Report a Leak</Button>
          <Button variant="outlined" size="large" onClick={() => {/* navigate to my bills */}}>View My Bills</Button>
        </div>
      </div>
    </div>
  );
};

const SubmitMeterReadingPage: React.FC = () => {
  const { citizenId } = useAuth();
  const [volume, setVolume] = useState<number | ''>('');
  const [readingDate, setReadingDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const currentCitizen = mockData.citizenAccounts.find(c => c.citizen_id === citizenId);
  const citizenProperty = currentCitizen ? mockData.properties.find(p => p.property_id === currentCitizen.property_id) : null;
  const citizenMeter = citizenProperty ? mockData.infrastructureAssets.find(a => a.asset_id === citizenProperty.meter_asset_id) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!citizenId || !citizenMeter?.asset_id || volume === '' || volume <= 0) {
      setError('Please ensure you are logged in, your property has a meter, and enter a valid positive volume.');
      return;
    }
    setLoading(true);
    try {
      const newReading: Omit<MeterReading, 'reading_id' | 'created_at'> = {
        meter_asset_id: citizenMeter.asset_id,
        reading_date: readingDate,
        volume_consumed_liters: volume,
        reported_by_citizen_id: citizenId,
      };
      await mockApi.createEntity('meterReadings', newReading as MeterReading, 'reading_id');
      setMessage('Meter reading submitted successfully! Thank you.');
      setVolume('');
      setReadingDate(new Date().toISOString().split('T')[0]); // Reset date
    } catch (err) {
      console.error('Failed to submit meter reading:', err);
      setError('Failed to submit meter reading. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!citizenId || !currentCitizen) return <div className="text-center p-6 text-gray-700">Please log in to submit a meter reading.</div>;
  if (!citizenMeter) return <div className="text-center p-6 text-red-600">No meter found for your property. Please contact support.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Submit Your Meter Reading</h2>
      <p className="text-gray-600 mb-4 text-center">
        Help us ensure accurate billing and track your water usage.
      </p>
      {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">{message}</div>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Your Property Meter:</label>
          <p className="text-gray-800 text-lg font-medium">{citizenMeter.asset_name} ({citizenProperty?.address})</p>
        </div>
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
          placeholder="Enter the reading from your meter (in Liters)"
          min="1"
          required
        />
        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Reading'}
        </Button>
      </form>
    </div>
  );
};


const ReportLeakPage: React.FC = () => {
  const { citizenId } = useAuth();
  const [locationDescription, setLocationDescription] = useState('');
  const [severity, setSeverity] = useState<LeakSeverity>('Minor');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const currentCitizen = mockData.citizenAccounts.find(c => c.citizen_id === citizenId);
  // const citizenVillage = currentCitizen ? mockData.villages.find(v => v.village_id === currentCitizen.property_id) : null; // Assuming property_id can sometimes be used to infer village for reporting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!citizenId || !locationDescription) {
      setError('Please provide a description of the leak location.');
      return;
    }
    setLoading(true);
    try {
      const newReport: Omit<LeakReport, 'leak_id' | 'created_at'> = {
        report_date: new Date().toISOString().split('T')[0],
        location_description: locationDescription,
        severity: severity,
        reported_by_citizen_id: citizenId,
        status: 'Reported', // Default status for new reports
      };
      await mockApi.createEntity('leakReports', newReport as LeakReport, 'leak_id');
      setMessage('Leak report submitted successfully! We will investigate this issue.');
      setLocationDescription('');
      setSeverity('Minor');
    } catch (err) {
      console.error('Failed to submit leak report:', err);
      setError('Failed to submit leak report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!citizenId || !currentCitizen) return <div className="text-center p-6 text-gray-700">Please log in to report a leak.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Report a Water Leak</h2>
      <p className="text-gray-600 mb-4 text-center">
        Your reports help us quickly address water losses and ensure efficient service.
      </p>
      {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">{message}</div>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <Input
          label="Location Description"
          type="textarea"
          value={locationDescription}
          onChange={(e) => setLocationDescription(e.target.value)}
          placeholder="e.g., Leaking pipe at the junction of Main Street and Avenue 5, near the large mango tree."
          required
        />
        <Select
          label="Severity"
          value={severity}
          onChange={(e) => setSeverity(e.target.value as LeakSeverity)}
          options={[
            { value: 'Minor', label: 'Minor - Small drip or wet patch' },
            { value: 'Moderate', label: 'Moderate - Steady flow, noticeable puddle' },
            { value: 'Major', label: 'Major - Significant flow, large puddle/stream' },
            { value: 'Critical', label: 'Critical - Burst pipe, gushing water' },
          ]}
        />
        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? 'Submitting Report...' : 'Submit Leak Report'}
        </Button>
      </form>
    </div>
  );
};


const ConsumptionHistoryPage: React.FC = () => {
  const { citizenId } = useAuth();
  const [readings, setReadings] = useState<MeterReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!citizenId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const fetchedReadings = await mockApi.fetchEntitiesByCitizenId<MeterReading>('meterReadings', citizenId);
        // Sort by date descending for history
        setReadings(fetchedReadings.sort((a, b) => new Date(b.reading_date).getTime() - new Date(a.reading_date).getTime()));
      } catch (err) {
        console.error('Failed to fetch consumption history:', err);
        setError('Failed to load consumption history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [citizenId]);

  const columns = [
    { header: 'Reading Date', accessor: (reading: MeterReading) => formatDate(reading.reading_date) },
    { header: 'Volume (Liters)', accessor: (reading: MeterReading) => reading.volume_consumed_liters },
    { header: 'Reported On', accessor: (reading: MeterReading) => formatDate(reading.created_at) },
  ];

  if (loading) return <div className="text-center p-6 text-gray-700">Loading consumption history...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  if (!citizenId) return <div className="text-center p-6 text-gray-700">Please log in to view your consumption history.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">My Water Consumption History</h2>
      {/* Basic Chart Placeholder */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Consumption Trend (Mock Chart)</h3>
        <div className="w-full h-48 bg-blue-100 flex items-end justify-around rounded-md overflow-hidden">
          {readings.slice(0, 6).reverse().map((reading) => (
            <div
              key={reading.reading_id}
              style={{ height: `${(reading.volume_consumed_liters / 15000) * 100}%` }} // Scale to max 15000 for visualization
              className="w-1/6 bg-blue-600 mx-1 rounded-t-sm flex items-center justify-center text-white text-xs font-bold transition-all duration-300 ease-in-out"
              title={`${reading.volume_consumed_liters} L on ${formatDate(reading.reading_date)}`}
            >
              <span className="transform -rotate-90 origin-bottom-left whitespace-nowrap mb-2">{reading.volume_consumed_liters / 1000}k L</span>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 text-sm mt-2">Volume in Liters over recent periods</p>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Readings</h3>
      <Table data={readings} columns={columns} keyAccessor="reading_id" />
    </div>
  );
};


const MyBillsPage: React.FC = () => {
  const { citizenId } = useAuth();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);

  const fetchBills = async () => {
    if (!citizenId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const fetchedBills = await mockApi.fetchEntitiesByCitizenId<Bill>('bills', citizenId);
      // Sort to show pending/overdue first, then by due date
      setBills(fetchedBills.sort((a, b) => {
        if (a.status === 'Pending' || a.status === 'Overdue') {
          if (b.status !== 'Pending' && b.status !== 'Overdue') return -1;
        } else if (b.status === 'Pending' || b.status === 'Overdue') {
          return 1;
        }
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      }));
    } catch (err) {
      console.error('Failed to fetch bills:', err);
      setError('Failed to load bills.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [citizenId]);

  const handlePayBill = async (billId: UUID) => {
    setPaymentMessage(null);
    try {
      // Simulate a payment processing
      await mockApi.updateEntity<Bill>('bills', billId, { status: 'Paid' }, 'bill_id');
      setPaymentMessage(`Bill ${billId} has been successfully paid!`);
      fetchBills(); // Refresh bills list
    } catch (err) {
      console.error('Payment failed:', err);
      setError('Payment failed. Please try again.');
    }
  };

  const columns: { header: string; accessor: keyof Bill | ((item: Bill) => React.ReactNode); }[] = [
    { header: 'Bill ID', accessor: 'bill_id' },
    { header: 'Issue Date', accessor: (bill: Bill) => formatDate(bill.issue_date) },
    { header: 'Due Date', accessor: (bill: Bill) => formatDate(bill.due_date) },
    { header: 'Amount', accessor: (bill: Bill) => formatCurrency(bill.amount_xaf) },
    { header: 'Status', accessor: 'status' as keyof Bill },
    { header: 'Type', accessor: 'bill_type' as keyof Bill },
    {
      header: 'Actions',
      accessor: (bill: Bill) => (
        bill.status !== 'Paid' ? (
          <Button size="small" onClick={() => handlePayBill(bill.bill_id)}>Pay Now (Mock)</Button>
        ) : (
          <span className="text-green-600 font-semibold">Paid</span>
        )
      ),
    },
  ];

  if (loading) return <div className="text-center p-6 text-gray-700">Loading your bills...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  if (!citizenId) return <div className="text-center p-6 text-gray-700">Please log in to view your bills.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">My Water Bills</h2>
      {paymentMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">{paymentMessage}</div>}
      <Table data={bills} columns={columns} keyAccessor="bill_id" />
      <p className="text-sm text-gray-600 mt-4 text-center">
        Note: Payment functionality is mocked for demonstration purposes.
      </p>
    </div>
  );
};


const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedAnnouncements = await mockApi.fetchEntities<Announcement>('announcements');
        // Sort by published date descending
        setAnnouncements(fetchedAnnouncements.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()));
      } catch (err) {
        console.error('Failed to fetch announcements:', err);
        setError('Failed to load announcements.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) return <div className="text-center p-6 text-gray-700">Loading announcements...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Public Announcements</h2>
      {announcements.length === 0 ? (
        <p className="text-gray-600 text-center">No announcements available at this time.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map(ann => (
            <div key={ann.announcement_id} className="border border-blue-200 rounded-lg p-6 bg-blue-50 shadow-sm">
              <h3 className="text-xl font-bold text-blue-800 mb-2">{ann.title}</h3>
              <p className="text-sm text-gray-600 mb-3">Published: {formatDate(ann.published_at)} by {ann.author || 'Water Authority'}</p>
              <p className="text-gray-700 leading-relaxed">{ann.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CitizenNotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-700">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist for citizens.</p>
    </div>
  );
};


// --- Main App Component ---
export function App() {
  const { isAuthenticated, citizenId, isLoading, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('citizen-dashboard'); // Default citizen page

  // Effect to handle initial page load or authentication changes
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // If authenticated, ensure we are on a valid citizen page, default to dashboard
        if (!['citizen-dashboard', 'submit-reading', 'report-leak', 'consumption-history', 'my-bills', 'announcements'].includes(currentPage)) {
          setCurrentPage('citizen-dashboard');
        }
      } else {
        // If not authenticated, always go to login page
        setCurrentPage('citizen-login');
      }
    }
  }, [isLoading, isAuthenticated, currentPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white text-xl">
        Loading citizen application...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <CitizenLoginPage setCurrentPage={setCurrentPage} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'citizen-dashboard':
        return <CitizenDashboardPage />;
      case 'submit-reading':
        return <SubmitMeterReadingPage />;
      case 'report-leak':
        return <ReportLeakPage />;
      case 'consumption-history':
        return <ConsumptionHistoryPage />;
      case 'my-bills':
        return <MyBillsPage />;
      case 'announcements':
        return <AnnouncementsPage />;
      default:
        return <CitizenNotFoundPage />;
    }
  };

  return (
    <CitizenLayout
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      citizenId={citizenId}
      logout={logout}
    >
      {renderPage()}
    </CitizenLayout>
  );
}

// Wrap the App component with AuthProvider for context to be available
export default function Citizen() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
