
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Container, Grid, Card, CardContent, Typography, Button, Select, MenuItem, TextField, FormControl, Box } from '@mui/material';
// import ReportService from '../../axios/reportsAxios';
// import { FillData } from '../../redux/actions/reportsAction';
// import NavBar from './minNav';


// const ViewReports = () => {
//   const dispatch = useDispatch();
//   const generatedReports = useSelector((state) => state.reportsReducer.reportsList);
//   const [filteredReports, setFilteredReports] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [searchName, setSearchName] = useState('');
//   const [searchDate, setSearchDate] = useState('');
//   const navigate = useNavigate();

//   const reportColors = {
//     "חיפושים": "#0D1E46",
//     "פעילות": "#0D1E99",
//     "שנתי": "#ec7063",
//   };

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const response = await ReportService.getAllReports();
//         dispatch(FillData(response));
//         setFilteredReports(response);
//       } catch (error) {
//         console.error('Error fetching reports:', error);
//       }
//     };

//     fetchReports();
//   }, [dispatch]);

//   const handleViewReport = (report) => {
//     const rows = report.reportData.trim().split('\n');
//     const lastRow = rows[rows.length - 1].trim();
//     const type = lastRow.split(',').find(item => item.trim().startsWith('type:')).split(':')[1].trim();
//     navigate(`/report/${report.reportId}`, { state: { report, type } });
//   };

//   const getColorByReportType = (type) => {
//     return reportColors[type] || '#ccc';
//   };

//   const handleTypeChange = (event) => {
//     setSelectedType(event.target.value);
//   };

//   const handleSearchNameChange = (event) => {
//     setSearchName(event.target.value);
//   };

//   const handleSearchDateChange = (event) => {
//     setSearchDate(event.target.value);
//   };

//   const filterReports = () => {
//     let filtered = generatedReports;

//     if (selectedType) {
//       filtered = filtered.filter(report => {
//         const rows = report.reportData.trim().split('\n');
//         const lastRow = rows[rows.length - 1].trim();
//         const reportType = lastRow.split(',').find(item => item.trim().startsWith('type:')).split(':')[1].trim();
//         return reportType === selectedType;
//       });
//     }

//     if (searchName) {
//       filtered = filtered.filter(report => report.reportName.includes(searchName));
//     }

//     if (searchDate) {
//       filtered = filtered.filter(report => {
//         const reportDate = new Date(report.generatedAt).toLocaleDateString();
//         return reportDate === new Date(searchDate).toLocaleDateString();
//       });
//     }

//     setFilteredReports(filtered);
//   };

//   useEffect(() => {
//     filterReports();
//   }, [selectedType, searchName, searchDate, generatedReports]);

//   return (
//     <div>  <NavBar/>
//     <Container dir="rtl">
//       <Typography variant="h4" component="h1" align="center" sx={{ marginBottom: 4 }}>
//       </Typography>
//       <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 4 }}>
//         <Grid item xs={12} md={4}>
//           <FormControl fullWidth>
//             <Select
//               value={selectedType}
//               onChange={handleTypeChange}
//               displayEmpty
//               inputProps={{ 'aria-label': 'חפש לפי סוג' }}
//             >
//               <MenuItem value="">
//                 <em>חפש לפי סוג</em>
//               </MenuItem>
//               {Object.keys(reportColors).map((type, index) => (
//                 <MenuItem key={index} value={type}>{type}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <TextField
//             fullWidth
//             placeholder="חפש לפי שם"
//             value={searchName}
//             onChange={handleSearchNameChange}
//             InputLabelProps={{ shrink: false }}
//           />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <TextField
//             fullWidth
//             placeholder="חפש לפי תאריך"
//             type="date"
//             value={searchDate}
//             onChange={handleSearchDateChange}
//             InputLabelProps={{ shrink: false }}
//           />
//         </Grid>
//       </Grid>
//       <Box sx={{ marginTop: 4 }}>
//         <Grid container spacing={2} justifyContent="center">
//           {filteredReports.length > 0 ? filteredReports.map((report, index) => {
//             const rows = report.reportData.trim().split('\n');
//             const lastRow = rows[rows.length - 1].trim();
//             const type = lastRow.split(',').find(item => item.trim().startsWith('type:')).split(':')[1].trim();

//             return (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Card sx={{ backgroundColor: 'white', border: `3px solid ${getColorByReportType(type)}` }}>
//                   <CardContent>
//                     <Typography variant="h6" component="div" sx={{ color: 'black' }}>
//                       {report.reportName}
//                     </Typography>
//                     <Typography variant="body2" sx={{ color: 'black', marginBottom: 2 }}>
//                       {new Date(report.generatedAt).toLocaleString()}
//                     </Typography>
//                     <Button 
//                       size="small" 
//                       variant="contained" 
//                       sx={{ backgroundColor: getColorByReportType(type), color: 'white' }}
//                       onClick={() => handleViewReport(report)}
//                     >
//                       הצג דו"ח
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             );
//           }) : (
//             <Typography variant="h6" component="div">
//               אין דוחות זמינים.
//             </Typography>
//           )}
//         </Grid>
//       </Box>
//     </Container></div>
//   );
// };

// export default ViewReports;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button, Select, MenuItem, TextField, FormControl, Box } from '@mui/material';
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

  const reportColors = {
    "חיפושים": "#0D1E46",
    "פעילות": "#0D1E99",
    "שנתי": "#ec7063",
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

  return (
    <div>
      <NavBar/>
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
            {filteredReports.length > 0 ? filteredReports.map((report, index) => {
              const rows = report.reportData?.trim().split('\n') || [];
              const lastRow = rows[rows.length - 1]?.trim() || '';
              const typeItem = lastRow.split(',').find(item => item.trim().startsWith('type:'));
              const type = typeItem ? typeItem.split(':')[1]?.trim() : 'לא ידוע';

              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ backgroundColor: 'white', border: `3px solid ${getColorByReportType(type)}` }}>
                    <CardContent>
                      <Typography variant="h6" component="div" sx={{ color: 'black' }}>
                        {report.reportName}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'black', marginBottom: 2 }}>
                        {new Date(report.generatedAt).toLocaleString()}
                      </Typography>
                      <Button 
                        size="small" 
                        variant="contained" 
                        sx={{ backgroundColor: getColorByReportType(type), color: 'white' }}
                        onClick={() => handleViewReport(report)}
                      >
                        הצג דו"ח
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            }) : (
              <Typography variant="h6" component="div">
                אין דוחות זמינים.
              </Typography>
            )}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default ViewReports;
