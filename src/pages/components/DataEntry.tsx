import { useState } from "react";
import { MaintenanceLog, MessageBox, MeterReading, mockWaterSources } from "../DashboardThree";
import { useAuth } from "../../Context/Auth-Context";
import { Backdrop, Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";

// --- Data Entry Form Component ---
const DataEntryForm: React.FC = () => {
  const { userRole } = useAuth();
  const [formType, setFormType] = useState<'meter' | 'maintenance' | 'upload'>('meter');
  const [loading, setLoading] = useState(false);
  const [messageBoxOpen, setMessageBoxOpen] = useState(false);
  const [messageBoxTitle, setMessageBoxTitle] = useState('');
  const [messageBoxMessage, setMessageBoxMessage] = useState('');

  // Meter Reading State
  const [meterReadingData, setMeterReadingData] = useState<Omit<MeterReading, 'id'>>({
    waterSourceId: '',
    region: '',
    date: new Date().toISOString().split('T')[0],
    readingValue: 0,
  });

  // Maintenance Log State
  const [maintenanceLogData, setMaintenanceLogData] = useState<Omit<MaintenanceLog, 'id'>>({
    infrastructureId: '',
    region: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    actionsTaken: '',
  });

  // File Upload State (for simulated Excel/PDF)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // if (userRole === 'guest' || (userRole === 'planner' && formType !== 'upload') || userRole === 'ngo' && formType !== 'upload') {
  //   return (
  //     <Box sx={{ p: 3, textAlign: 'center' }}>
  //       <Typography variant="h5" color="error">Access Denied</Typography>
  //       <Typography variant="body1">You do not have permission to access the Data Entry features.</Typography>
  //     </Box>
  //   );
  // }
  
  // Specific role check for field officer to access Meter and Maintenance forms
  // if (userRole !== 'field_officer' && (formType === 'meter' || formType === 'maintenance')) {
  //   return (
  //     <Box sx={{ p: 3, textAlign: 'center' }}>
  //       <Typography variant="h5" color="error">Access Denied</Typography>
  //       <Typography variant="body1">Only Field Officers can submit Meter Readings and Maintenance Logs.</Typography>
  //     </Box>
  //   );
  // }


  // const handleMeterReadingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
  const handleMeterReadingChange = (e:any) => {
    const { name, value } = e.target;
    setMeterReadingData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleMaintenanceLogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setMaintenanceLogData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const showMessage = (title: string, message: string) => {
    setMessageBoxTitle(title);
    setMessageBoxMessage(message);
    setMessageBoxOpen(true);
  };

  const handleMeterReadingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Submitting Meter Reading:', meterReadingData);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      showMessage('Submission Successful', `Meter reading for ${meterReadingData.waterSourceId} on ${meterReadingData.date} submitted.`);
      // In a real app, this would add to mock data or call backend
      setMeterReadingData({
        waterSourceId: '',
        region: '',
        date: new Date().toISOString().split('T')[0],
        readingValue: 0,
      });
    }, 1500);
  };

  const handleMaintenanceLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Submitting Maintenance Log:', maintenanceLogData);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      showMessage('Submission Successful', `Maintenance log for ${maintenanceLogData.infrastructureId} on ${maintenanceLogData.date} submitted.`);
      // In a real app, this would add to mock data or call backend
      setMaintenanceLogData({
        infrastructureId: '',
        region: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        actionsTaken: '',
      });
    }, 1500);
  };

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      showMessage('Error', 'Please select a file to upload.');
      return;
    }
    setLoading(true);
    console.log('Uploading file:', selectedFile.name);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      showMessage('Upload Successful', `File "${selectedFile.name}" uploaded for processing.`);
      setSelectedFile(null);
    }, 2000);
  };

  const renderForm = () => {
    switch (formType) {
      case 'meter':
        return (
          <form onSubmit={handleMeterReadingSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth required sx={{width:200}}>
                  <InputLabel id="water-source-select-label">Water Source / Meter ID</InputLabel>
                  <Select
                    labelId="water-source-select-label"
                    id="water-source-select"
                    name="waterSourceId"
                    value={meterReadingData.waterSourceId}
                    onChange={handleMeterReadingChange}
                    label="Water Source / Meter ID"
                    fullWidth
                  >
                    {mockWaterSources.map((source) => (
                      <MenuItem key={source.id} value={source.id}>
                        {source.name} ({source.id})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} sx={{width:200}}>
                <TextField
                  fullWidth
                  label="Region"
                  name="region"
                  value={meterReadingData.region}
                  onChange={handleMeterReadingChange}
                  required
                  select
                >
                  <MenuItem value="Centre">Centre</MenuItem>
                  <MenuItem value="Littoral">Littoral</MenuItem>
                  <MenuItem value="Far North">Far North</MenuItem>
                  <MenuItem value="North West">North West</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reading Date"
                  type="date"
                  name="date"
                  value={meterReadingData.date}
                  onChange={handleMeterReadingChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Reading Value (Cubic Meters)"
                  type="number"
                  name="readingValue"
                  value={meterReadingData.readingValue}
                  onChange={handleMeterReadingChange}
                  inputProps={{ min: 0 }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Meter Reading'}
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      case 'maintenance':
        return (
          <form onSubmit={handleMaintenanceLogSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Infrastructure ID"
                  name="infrastructureId"
                  value={maintenanceLogData.infrastructureId}
                  onChange={handleMaintenanceLogChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Region"
                  name="region"
                  value={maintenanceLogData.region}
                  onChange={handleMaintenanceLogChange}
                  required
                  select
                >
                  <MenuItem value="Centre">Centre</MenuItem>
                  <MenuItem value="Littoral">Littoral</MenuItem>
                  <MenuItem value="Far North">Far North</MenuItem>
                  <MenuItem value="North West">North West</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Maintenance Date"
                  type="date"
                  name="date"
                  value={maintenanceLogData.date}
                  onChange={handleMaintenanceLogChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description of Issue"
                  name="description"
                  value={maintenanceLogData.description}
                  onChange={handleMaintenanceLogChange}
                  multiline
                  rows={3}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Actions Taken"
                  name="actionsTaken"
                  value={maintenanceLogData.actionsTaken}
                  onChange={handleMaintenanceLogChange}
                  multiline
                  rows={3}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Maintenance Log'}
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      case 'upload':
        return (
          <form onSubmit={handleFileUpload}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Upload Excel or PDF documents (e.g., MINEE quarterly audits, CAMWATER monthly readings).
                </Typography>
                <Button variant="contained" component="label">
                  Choose File
                  <input type="file" hidden onChange={handleFileChange} accept=".xls,.xlsx,.pdf" />
                </Button>
                {selectedFile && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </Typography>
                )}
                {!selectedFile && (
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    No file chosen
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" disabled={loading || !selectedFile}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload Document'}
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Data Entry
      </Typography>
      <MessageBox
        open={messageBoxOpen}
        title={messageBoxTitle}
        message={messageBoxMessage}
        onClose={() => setMessageBoxOpen(false)}
      />
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant={formType === 'meter' ? 'contained' : 'outlined'}
              onClick={() => setFormType('meter')}
              // disabled={userRole !== 'field_officer'}
            >
              Meter Readings
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={formType === 'maintenance' ? 'contained' : 'outlined'}
              onClick={() => setFormType('maintenance')}
              // disabled={userRole !== 'field_officer'}
            >
              Maintenance Logs
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant={formType === 'upload' ? 'contained' : 'outlined'}
              onClick={() => setFormType('upload')}
            >
              Document Upload
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        {renderForm()}
      </Paper>
    </Box>
  );
};

export default DataEntryForm