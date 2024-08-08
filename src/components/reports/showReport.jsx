import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Select, MenuItem, TextField, FormControl, Box, Pagination, Tooltip, IconButton, CircularProgress } from '@mui/material';
import { TableRows } from '@mui/icons-material';
import ReportService from '../../axios/reportsAxios';
import { FillData1 } from '../../redux/actions/reportsAction';
import NavBar from './minNav';

const ViewReports = () => {
  const dispatch = useDispatch();
  const generatedReports = useSelector((state) => state.reportsReducer.reportsList);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const reportsPerPage = 10;

  const reportColors = {
    "חיפושים": "#0D1E46",
    "פעילות": "#0D1E99",
    "שנתי": "black",
    "התחברות": "blue"
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await ReportService.getAllReports();
        dispatch(FillData1(response));
        setFilteredReports(response);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [dispatch]);

  const handleViewReport = (report) => {
    if (!report.reportData) {
      console.error('No report data available');
      return;
    }
    const rows = report.reportData.trim().split('\n');
    const lastRow = rows[rows.length - 1]?.trim();
    if (!lastRow) {
      console.error('No last row data available');
      return;
    }
    const typeItem = lastRow.split(',').find(item => item.trim().startsWith('type:'));
    if (!typeItem) {
      console.error('No type found in last row');
      return;
    }
    const type = typeItem.split(':')[1]?.trim();
    navigate(`/report/${report.reportId}`, { state: { report, type } });
  };

  const getColorByReportType = (type) => {
    return reportColors[type] || '#ccc';
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSearchDateChange = (event) => {
    setSearchDate(event.target.value);
  };

  const filterReports = () => {
    let filtered = generatedReports;

    if (selectedType) {
      filtered = filtered.filter(report => {
        if (!report.reportData) return false;
        const rows = report.reportData.trim().split('\n');
        const lastRow = rows[rows.length - 1]?.trim();
        if (!lastRow) return false;
        const reportTypeItem = lastRow.split(',').find(item => item.trim().startsWith('type:'));
        if (!reportTypeItem) return false;
        const reportType = reportTypeItem.split(':')[1]?.trim();
        return reportType === selectedType;
      });
    }

    if (searchName) {
      filtered = filtered.filter(report => report.reportName.includes(searchName));
    }

    if (searchDate) {
      filtered = filtered.filter(report => {
        const reportDate = new Date(report.generatedAt).toLocaleDateString();
        return reportDate === new Date(searchDate).toLocaleDateString();
      });
    }

    setFilteredReports(filtered);
  };

  useEffect(() => {
    filterReports();
  }, [selectedType, searchName, searchDate, generatedReports]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * reportsPerPage;
  const displayedReports = filteredReports.slice(startIndex, startIndex + reportsPerPage);

  return (
    <div>
      <NavBar />
      <Container dir="rtl">
        <Typography variant="h4" component="h1" align="center" sx={{ marginBottom: 4 }}>
          
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 4 }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <Select
                value={selectedType}
                onChange={handleTypeChange}
                displayEmpty
                inputProps={{ 'aria-label': 'חפש לפי סוג' }}
              >
                <MenuItem value="">
                  <em>חפש לפי סוג</em>
                </MenuItem>
                {Object.keys(reportColors).map((type, index) => (
                  <MenuItem key={index} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="חפש לפי שם"
              value={searchName}
              onChange={handleSearchNameChange}
              InputLabelProps={{ shrink: false }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="חפש לפי תאריך"
              type="date"
              value={searchDate}
              onChange={handleSearchDateChange}
              InputLabelProps={{ shrink: false }}
            />
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 4 }}>
          <Grid container spacing={2} justifyContent="center">
            {displayedReports.length > 0 ? (
              displayedReports.map((report, index) => {
                const rows = report.reportData?.trim().split('\n') || [];
                const lastRow = rows[rows.length - 1]?.trim() || '';
                const typeItem = lastRow.split(',').find(item => item.trim().startsWith('type:'));
                const type = typeItem ? typeItem.split(':')[1]?.trim() : 'לא ידוע';

                return (
                  <Grid item xs={12} key={index}>
                    <Card sx={{ display: 'flex', borderRadius: 1, overflow: 'hidden', mb: 1, width: '75%', margin: '0 auto', height: '60px', boxShadow: 3 }}>
                      <Box sx={{ width: '10px', backgroundColor: getColorByReportType(type) }}></Box>
                      <CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" component="div" sx={{ flex: 2, color: 'black', textAlign: 'right', fontWeight: 'bold' }}>
                          {report.reportName}
                        </Typography>
                        <Typography variant="body2" sx={{ flex: 1, color: 'black', textAlign: 'center', fontWeight: 'bold' }}>
                          {new Date(report.generatedAt).toLocaleDateString()}
                        </Typography>
                        <Tooltip title="הצג דוח">
                          <IconButton 
                            sx={{ color: 'black' }}
                            onClick={() => handleViewReport(report)}
                          >
                            <TableRows />
                          </IconButton>
                        </Tooltip>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                {filteredReports.length === 0 && !selectedType && !searchName && !searchDate ? (
                  <CircularProgress />
                ) : (
                  <Typography variant="h6" component="div" sx={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>
                    אין דוחות תואמים לחיפוש
                  </Typography>
                )}
              </Box>
            )}
          </Grid>
          <Pagination
            count={Math.ceil(filteredReports.length / reportsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}
          />
        </Box>
      </Container>
    </div>
  );
};

export default ViewReports;
