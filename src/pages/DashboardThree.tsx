import { useState } from "react";
import { useAuth } from "../Context/Auth-Context";
// import { useThemeMode } from "../Context/ThemeContext";
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Drawer, FormControlLabel, IconButton, List, ListItem, ListItemText, Switch, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { Bug, LayoutDashboardIcon, ListCheck, LogOut, Menu, Paperclip, PlusCircle } from "lucide-react";
import DataEntryForm from "./components/DataEntry";
import ReportGenerator from "./components/ReportGenerator";

// --- Custom Message Box Component ---
export interface MessageBoxProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  showConfirmButton?: boolean;
}

export const MessageBox: React.FC<MessageBoxProps> = ({
  open,
  title,
  message,
  onClose,
  onConfirm,
  showConfirmButton = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="message-box-title">
      <DialogTitle id="message-box-title">{title}</DialogTitle>
      <DialogContent dividers>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {showConfirmButton ? 'Cancel' : 'Close'}
        </Button>
        {showConfirmButton && (
          <Button onClick={onConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

// --- Mock Data ---
export interface KPIData {
  totalWaterDistributed: number;
  currentReservoirLevel: number; // percentage
  nonRevenueWater: number; // percentage
  activeLeakReports: number;
  accessRural: number; // percentage
  accessUrban: number; // percentage
  reservoirUtilization: number; // percentage
  financialLosses: number; // in millions USD
}

export interface MonthlyUsageData {
  month: string;
  usage: number; // in liters or cubic meters
  nrw: number; // percentage
}

export interface ReservoirLevelData {
  month: string;
  level: number; // percentage
}

export interface LeakReport {
  id: string;
  location: string;
  description: string;
  status: 'Reported' | 'Assigned' | 'In Progress' | 'Resolved';
  reportedBy: string;
  reportedDate: string;
  assignedTo?: string;
  resolutionDate?: string;
}

export interface MeterReading {
  id: string;
  waterSourceId: string;
  region: string;
  date: string;
  readingValue: number; // in cubic meters
}

export interface MaintenanceLog {
  id: string;
  infrastructureId: string;
  region: string;
  date: string;
  description: string;
  actionsTaken: string;
}

export const mockKPIData: KPIData = {
  totalWaterDistributed: 150000000, // Liters
  currentReservoirLevel: 75, // %
  nonRevenueWater: 30, // %
  activeLeakReports: 12,
  accessRural: 52, // %
  accessUrban: 88, // %
  reservoirUtilization: 65, // %
  financialLosses: 7.5, // Million USD
};

export const mockMonthlyUsageData: MonthlyUsageData[] = [
  { month: 'Jan', usage: 10, nrw: 32 },
  { month: 'Feb', usage: 12, nrw: 31 },
  { month: 'Mar', usage: 11, nrw: 30 },
  { month: 'Apr', usage: 13, nrw: 29 },
  { month: 'May', usage: 14, nrw: 28 },
  { month: 'Jun', usage: 15, nrw: 27 },
];

export const mockReservoirLevelData: ReservoirLevelData[] = [
  { month: 'Jan', level: 80 },
  { month: 'Feb', level: 78 },
  { month: 'Mar', level: 75 },
  { month: 'Apr', level: 73 },
  { month: 'May', level: 70 },
  { month: 'Jun', level: 68 },
];

export let mockLeakReports: LeakReport[] = [
  {
    id: 'LR001',
    location: 'Bamenda - Commercial Street',
    description: 'Large pipe burst causing significant water loss.',
    status: 'Assigned',
    reportedBy: 'Citizen_A',
    reportedDate: '2025-05-20',
    assignedTo: 'Engineer Alex',
  },
  {
    id: 'LR002',
    location: 'Douala - New Bell Area',
    description: 'Minor leak near residential block, continuous dripping.',
    status: 'Reported',
    reportedBy: 'Citizen_B',
    reportedDate: '2025-06-01',
  },
  {
    id: 'LR003',
    location: 'Yaoundé - Mvog-Ada District',
    description: 'Suspected underground leak, visible dampness on road.',
    status: 'In Progress',
    reportedBy: 'Field Officer Mark',
    reportedDate: '2025-05-28',
    assignedTo: 'Engineer Clara',
  },
  {
    id: 'LR004',
    location: 'Buea - Mile 17',
    description: 'Small crack on main distribution pipe.',
    status: 'Resolved',
    reportedBy: 'Citizen_C',
    reportedDate: '2025-04-15',
    resolutionDate: '2025-04-20',
    assignedTo: 'Engineer Ben',
  },
];

export const mockWaterSources = [
  { id: 'WS001', name: 'Mefou Dam', type: 'Dam', region: 'Centre', coordinates: '3.82, 11.5' },
  { id: 'WS002', name: 'Sanaga River Intake', type: 'River', region: 'Littoral', coordinates: '4.00, 9.7' },
  { id: 'WS003', name: 'Borehole A', type: 'Borehole', region: 'Far North', coordinates: '10.5, 14.3' },
];


// --- Main App Component ---
const AppContent: React.FC = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  // const { mode, toggleColorMode } = useThemeMode();
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [currentPage, setCurrentPage] = useState('reports'); // Initial page

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleMenuItemClick = (page: string) => {
    setCurrentPage(page);
    if (isMobile) {
      setOpenDrawer(false);
    }
  };

  const getPageTitle = (page: string) => {
    switch (page) {
      case 'dashboard': return 'Dashboard';
      case 'dataEntry': return 'Data Entry';
      case 'reports': return 'Report Generation';
      case 'leakTracking': return 'Leak Report Tracking';
      default: return 'National Water Resource Management';
    }
  };

  const renderPage = () => {
    // if (!isAuthenticated) {
    //   return <WaterAuthSystem />;
    // }

    switch (currentPage) {
      case 'dataEntry':
        return <DataEntryForm />;
      case 'reports':
        return <ReportGenerator />;
      default:
        return <></>; // Fallback
    }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <LayoutDashboardIcon />, page: 'dashboard', roles: ['planner', 'field_officer', 'ngo'] },
    { text: 'Data Entry', icon: <PlusCircle />, page: 'dataEntry', roles: ['field_officer', 'planner', 'ngo'] },
    { text: 'Reports', icon: <Paperclip />, page: 'reports', roles: ['planner', 'ngo'] },
    { text: 'Leak Tracking', icon: <Bug />, page: 'leakTracking', roles: ['planner', 'field_officer', 'ngo'] },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isAuthenticated && isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {getPageTitle(currentPage)}
          </Typography>
          <FormControlLabel
            control={<Switch checked={'dark' === 'dark'}  />}
            // label={mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            label={'dark' === 'dark' ? "Dark" : "Light"}
            sx={{ color: 'white' }}
          />
          {isAuthenticated && (
            <Button color="inherit" onClick={logout} startIcon={<LogOut />}>
              Logout ({userRole.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')})
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {isAuthenticated && (
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? openDrawer : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile.
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
          }}
        >
          <Toolbar /> {/* Spacer to align with AppBar */}
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {menuItems.map((item) => {
                // Ensure the menu item is only rendered if the current user role is allowed
                if (item.roles.includes(userRole)) {
                  return (
                    <ListItem
                    //   button
                      key={item.text}
                      onClick={() => handleMenuItemClick(item.page)}
                    //   selected={currentPage === item.page}
                    >
                      <ListCheck>{item.icon}</ListCheck>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  );
                }
                return null;
              })}
            </List>
            <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
              <Typography variant="caption" color="textSecondary" align="center" display="block">
                National Water Resource Management System
              </Typography>
              <Typography variant="caption" color="textSecondary" align="center" display="block">
                © {new Date().getFullYear()} Your Group
              </Typography>
              <Typography variant="caption" color="textSecondary" align="center" display="block">
                All data is simulated for demonstration purposes.
              </Typography>
            </Box>
          </Box>
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 0, width: '100%' }}>
        <Toolbar /> {/* Spacer for AppBar */}
        {renderPage()}
      </Box>
    </Box>
  );
};

export default AppContent


