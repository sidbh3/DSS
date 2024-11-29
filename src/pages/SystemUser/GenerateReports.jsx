import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function GenerateReports() {
  const [reportType, setReportType] = useState('monthly');
  const theme = useTheme();

  const sampleData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
  ];

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const handleGenerateReport = () => {
    console.log(`Generating ${reportType} report`);
  };

  const handleDownloadReport = () => {
    console.log('Downloading report');
  };

  return (
    <div className="w-full flex flex-col gap-8 bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-wide border-b border-gray-200 dark:border-gray-700 pb-4">
        IAF DSS Reports Generation
      </h1>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel className="text-gray-600 dark:text-gray-300">
                  Report Type
                </InputLabel>
                <Select
                  value={reportType}
                  label="Report Type"
                  onChange={handleReportTypeChange}
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  <MenuItem value="daily">Daily Report</MenuItem>
                  <MenuItem value="weekly">Weekly Report</MenuItem>
                  <MenuItem value="monthly">Monthly Report</MenuItem>
                  <MenuItem value="yearly">Yearly Report</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={8}>
              <Button
                variant="contained"
                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 mr-4"
                onClick={handleGenerateReport}
              >
                Generate Report
              </Button>
              <Button
                variant="outlined"
                className="border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-700"
                onClick={handleDownloadReport}
              >
                Download Report
              </Button>
            </Grid>

            <Grid item xs={12}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Reports Overview
                  </h2>
                  <div className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                    Statistics
                  </div>
                </div>
                <div className="h-[450px] flex items-center justify-center">
                  <BarChart
                    width={800}
                    height={400}
                    data={sampleData}
                    className="text-gray-600 dark:text-gray-300"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.1)" />
                    <XAxis dataKey="name" stroke="rgb(156, 163, 175)" />
                    <YAxis stroke="rgb(156, 163, 175)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.palette.mode === 'dark' ? '#1F2937' : '#ffffff',
                        borderColor: theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB',
                        color: theme.palette.mode === 'dark' ? '#F3F4F6' : '#1F2937',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="value" fill="#4F46E5" />
                  </BarChart>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default GenerateReports;
