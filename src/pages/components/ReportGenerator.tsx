import { useState } from "react";
import { useAuth } from "../../Context/Auth-Context";
import { Backdrop, Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export interface MonthlyUsageData {
  month: string;
  usage: number; // in liters or cubic meters
  nrw: number; // percentage
}

export interface ReservoirLevelData {
  month: string;
  level: number; // percentage
}

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

// --- Report Generation Component ---
const ReportGenerator: React.FC = () => {
  const { userRole } = useAuth();
  const [reportType, setReportType] = useState('monthlyUsage');
  const [region, setRegion] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any[] | null>(null);
  const [reportTitle, setReportTitle] = useState('');

  // if (userRole === 'guest' || userRole === 'field_officer') {
  //   return (
  //     <Box sx={{ p: 3, textAlign: 'center' }}>
  //       <Typography variant="h5" color="error">Access Denied</Typography>
  //       <Typography variant="body1">You do not have permission to generate reports.</Typography>
  //     </Box>
  //   );
  // }

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedReport(null); // Clear previous report

    // Simulate API call for report generation
    setTimeout(() => {
      let data: any[] = [];
      let title = '';
      if (reportType === 'monthlyUsage') {
        data = mockMonthlyUsageData.map(d => ({
          ...d,
          usage: (d.usage * 1000000).toLocaleString(), // Convert to Liters for display
        }));
        title = `Monthly Water Usage & NRW Report for ${region || 'All Regions'} - ${month || 'All'} ${year || '2025'}`;
      } else if (reportType === 'reservoirLevels') {
        data = mockReservoirLevelData;
        title = `Reservoir Level Trends Report for ${region || 'All Regions'} - ${year || '2025'}`;
      } else if (reportType === 'nrwByDistrict') {
        // Mock more detailed NRW data
        data = [
          { district: 'Douala I', nrw: 28 },
          { district: 'Yaoundé II', nrw: 31 },
          { district: 'Garoua Central', nrw: 35 },
          { district: 'Buea Town', nrw: 22 },
        ];
        title = `Non-Revenue Water by District Report for ${region || 'All Regions'} - ${month || 'All'} ${year || '2025'}`;
      }
      setGeneratedReport(data);
      setReportTitle(title);
      setLoading(false);
    }, 2000);
  };

  const renderReportContent = () => {
    if (!generatedReport || generatedReport.length === 0) {
      return <Typography>No data to display for this report type or filters.</Typography>;
    }

    if (reportType === 'monthlyUsage') {
      return (
        <>
          <Typography variant="h6" gutterBottom>{reportTitle}</Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Water Usage (Liters)</TableCell>
                  <TableCell>NRW (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generatedReport.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>{row.usage}</TableCell>
                    <TableCell>{row.nrw}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ width: '100%', height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0e0e0', borderRadius: 2, mt: 2 }}>
            <Typography variant="subtitle1" color="textSecondary">Monthly Usage & NRW Chart Placeholder</Typography>
          </Box>
        </>
      );
    } else if (reportType === 'reservoirLevels') {
      return (
        <>
          <Typography variant="h6" gutterBottom>{reportTitle}</Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Level (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generatedReport.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>{row.level}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ width: '100%', height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0e0e0', borderRadius: 2, mt: 2 }}>
            <Typography variant="subtitle1" color="textSecondary">Reservoir Level Chart Placeholder</Typography>
          </Box>
        </>
      );
    } else if (reportType === 'nrwByDistrict') {
      return (
        <>
          <Typography variant="h6" gutterBottom>{reportTitle}</Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>District</TableCell>
                  <TableCell>NRW (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generatedReport.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.district}</TableCell>
                    <TableCell>{row.nrw}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ width: '100%', height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0e0e0', borderRadius: 2, mt: 2 }}>
            <Typography variant="subtitle1" color="textSecondary">NRW by District Chart Placeholder</Typography>
          </Box>
        </>
      );
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Report Generation
      </Typography>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleGenerateReport}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="report-type-select-label">Report Type</InputLabel>
                <Select
                  labelId="report-type-select-label"
                  id="report-type-select"
                  value={reportType}
                  label="Report Type"
                  onChange={(e) => {
                    setReportType(e.target.value as string);
                    setGeneratedReport(null); // Clear report on type change
                  }}
                >
                  <MenuItem value="monthlyUsage">Monthly Water Usage & NRW</MenuItem>
                  <MenuItem value="reservoirLevels">Reservoir Level Trends</MenuItem>
                  <MenuItem value="nrwByDistrict">NRW by District</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Region (Optional)"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                select
              >
                <MenuItem value="">All Regions</MenuItem>
                <MenuItem value="Centre">Centre</MenuItem>
                <MenuItem value="Littoral">Littoral</MenuItem>
                <MenuItem value="Far North">Far North</MenuItem>
                <MenuItem value="North West">North West</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Month (Optional)"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                select
              >
                <MenuItem value="">All Months</MenuItem>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year (Optional)"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                type="number"
                inputProps={{ min: 2020, max: new Date().getFullYear() }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Report'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {generatedReport && (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          {renderReportContent()}
        </Paper>
      )}
    </Box>
  );
};

export default ReportGenerator