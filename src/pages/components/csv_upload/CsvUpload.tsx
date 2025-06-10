import React, { useState } from 'react';
import { Button, Typography, Paper, Backdrop, CircularProgress } from '@mui/material';
import { parseCSVFile } from './csvParser';
import { FileUpload } from './models/FileUploadModel';

const CsvUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a CSV file to upload.');
      return;
    }

    const fileUploadModel = new FileUpload(
      crypto.randomUUID(),
      selectedFile.name,
      selectedFile.type,
      new Date()
    );
    if (!fileUploadModel.isValid()) {
      setMessage('Invalid file type or size.');
      return;
    }

    setLoading(true);
    try {
      const jsonData = await parseCSVFile(selectedFile);
      console.log('Parsed JSON Data:', jsonData);
      // Here you would typically send jsonData to your backend API
      setMessage('File uploaded successfully.');
    } catch (error:any) {
      setMessage('Error uploading file: ' + error.message);
    } finally {
      setLoading(false);
      setSelectedFile(null);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Upload CSV File
      </Typography>
      <form onSubmit={handleFileUpload}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="csv-upload"
        />
        <label htmlFor="csv-upload">
          <Button variant="contained" component="span">
            Choose CSV File
          </Button>
        </label>
        {selectedFile && <Typography variant="body2">{selectedFile.name}</Typography>}
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload'}
        </Button>
      </form>
      {message && <Typography variant="body2" color="error">{message}</Typography>}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default CsvUpload;