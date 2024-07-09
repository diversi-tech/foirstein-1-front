// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import NavBar from './minNav';

// const ReportPage = () => {
//   const location = useLocation();
//   const { report, type } = location.state;
//   const parseReportData = (reportData) => {
//     const rows = reportData.trim().split('\n');
//     return rows.map(row => {
//       const [a, b, c, d, e] = row.split(',').map(item => item.split(': ')[1]);
//       return { a, b, c, d, e };
//     });
//   };

//   const handleDownloadPdf = () => {
//     const doc = new jsPDF();
//     doc.text(`שם הדוח:: ${report.reportName}`, 10, 10);
//     doc.text(`נוצר ע"י: ${new Date(report.generatedAt).toLocaleString()}`, 10, 20);

//     const data = parseReportData(report.reportData);

//     let columns = [];
//     let rows = [];

//     switch (type) {
//       case 'פעילות':
//         columns = ['שם משתמש', 'מספר פעולות'];
//         rows = data.map(item => [item.a, item.b]);
//         break;
//       case 'חיפושים':
//         columns = ['קוד משתמש', 'תוכן החיפוש', 'תאריך החיפוש', 'קוד הבקשה', 'תאריך הבקשה'];
//         rows = data.map(item => [item.a, item.b, item.c, item.d, item.e]);
//         break;
//       case 'שנתי':
//         columns = ['שנה', 'כמות משתמשים שנוספו בשנה זו'];
//         rows = data.map(item => [item.a, item.b]);
//         break;
//       default:
//         break;
//     }

//     doc.autoTable({
//       head: [columns],
//       body: rows,
//       startY: 30,
//     });

//     doc.save(`${report.reportName}.pdf`);
//   };

//   const renderReportContent = () => {
//     switch (type) {
//       case 'פעילות':
//         return (
//           <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//             <Table>
//               <TableHead sx={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid black' }}>
//                 <TableRow>
//                   <TableCell align="right">שם משתמש</TableCell>
//                   <TableCell align="right">מספר פעולות</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {parseReportData(report.reportData).map((logItem, logIndex) => (
//                   <TableRow key={logIndex}>
//                     <TableCell align="right">{logItem.a}</TableCell>
//                     <TableCell align="right">{logItem.b}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         );
//       case 'חיפושים':
//         return (
//           <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//             <Table>
//               <TableHead sx={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid black' }}>
//                 <TableRow>
//                   <TableCell align="right">קוד משתמש</TableCell>
//                   <TableCell align="right">תוכן החיפוש</TableCell>
//                   <TableCell align="right">תאריך החיפוש</TableCell>
//                   <TableCell align="right">קוד הבקשה</TableCell>
//                   <TableCell align="right">תאריך הבקשה</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {parseReportData(report.reportData).map((logItem, logIndex) => (
//                   <TableRow key={logIndex}>
//                     <TableCell align="right">{logItem.a}</TableCell>
//                     <TableCell align="right">{logItem.b}</TableCell>
//                     <TableCell align="right">{logItem.c}</TableCell>
//                     <TableCell align="right">{logItem.d}</TableCell>
//                     <TableCell align="right">{logItem.e}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         );
//       case 'שנתי':
//         return (
//           <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//             <Table>
//               <TableHead sx={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid black' }}>
//                 <TableRow>
//                   <TableCell align="right">שנה</TableCell>
//                   <TableCell align="right">כמות המשתמשים שנוספו בשנה  זו</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {parseReportData(report.reportData).map((logItem, logIndex) => (
//                   <TableRow key={logIndex}>
//                     <TableCell align="right">{logItem.a}</TableCell>
//                     <TableCell align="right">{logItem.b}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>  <NavBar/>

//     <Container dir="rtl">
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleDownloadPdf
// }
//           startIcon={<PictureAsPdfIcon />}
//         >
//           הורד ל-PDF
//         </Button>
//       </Box>
//       {renderReportContent()}
//     </Container></div>
//   );
// };

// export default ReportPage;
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import NavBar from './minNav';

const ReportPage = () => {
  const location = useLocation();
  const { report, type } = location.state;
  const parseReportData = (reportData) => {
    if (!reportData) return [];
    const rows = reportData.trim().split('\n');
    return rows.map(row => {
      const [a, b, c, d, e] = row.split(',').map(item => item.split(': ')[1]);
      return { a, b, c, d, e };
    });
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.text(`שם הדוח:: ${report.reportName}`, 10, 10);
    doc.text(`נוצר ע"י: ${new Date(report.generatedAt).toLocaleString()}`, 10, 20);

    const data = parseReportData(report.reportData);

    let columns = [];
    let rows = [];

    switch (type) {
      case 'פעילות':
        columns = ['שם משתמש', 'מספר פעולות'];
        rows = data.map(item => [item.a, item.b]);
        break;
      case 'חיפושים':
        columns = ['קוד משתמש', 'תוכן החיפוש', 'תאריך החיפוש', 'קוד הבקשה', 'תאריך הבקשה'];
        rows = data.map(item => [item.a, item.b, item.c, item.d, item.e]);
        break;
      case 'שנתי':
        columns = ['שנה', 'כמות משתמשים שנוספו בשנה זו'];
        rows = data.map(item => [item.a, item.b]);
        break;
      default:
        break;
    }

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30,
    });

    doc.save(`${report.reportName}.pdf`);
  };

  const renderReportContent = () => {
    switch (type) {
      case 'פעילות':
        return (
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid black' }}>
                <TableRow>
                  <TableCell align="right">שם משתמש</TableCell>
                  <TableCell align="right">מספר פעולות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parseReportData(report.reportData).map((logItem, logIndex) => (
                  <TableRow key={logIndex}>
                    <TableCell align="right">{logItem.a}</TableCell>
                    <TableCell align="right">{logItem.b}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      case 'חיפושים':
        return (
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid black' }}>
                <TableRow>
                  <TableCell align="right">קוד משתמש</TableCell>
                  <TableCell align="right">תוכן החיפוש</TableCell>
                  <TableCell align="right">תאריך החיפוש</TableCell>
                  <TableCell align="right">קוד הבקשה</TableCell>
                  <TableCell align="right">תאריך הבקשה</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parseReportData(report.reportData).map((logItem, logIndex) => (
                  <TableRow key={logIndex}>
                    <TableCell align="right">{logItem.a}</TableCell>
                    <TableCell align="right">{logItem.b}</TableCell>
                    <TableCell align="right">{logItem.c}</TableCell>
                    <TableCell align="right">{logItem.d}</TableCell>
                    <TableCell align="right">{logItem.e}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      case 'שנתי':
        return (
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid black' }}>
                <TableRow>
                  <TableCell align="right">שנה</TableCell>
                  <TableCell align="right">כמות המשתמשים שנוספו בשנה  זו</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parseReportData(report.reportData).map((logItem, logIndex) => (
                  <TableRow key={logIndex}>
                    <TableCell align="right">{logItem.a}</TableCell>
                    <TableCell align="right">{logItem.b}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div>  
      <NavBar/>
      <Container dir="rtl">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadPdf}
            startIcon={<PictureAsPdfIcon />}
          >
            הורד ל-PDF
          </Button>
        </Box>
        {renderReportContent()}
      </Container>
    </div>
  );
};

export default ReportPage;
