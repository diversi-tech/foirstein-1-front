import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, Button, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Styled components
const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '14px', // Default font size
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontSize: '18px', // Larger font size for headers
  fontWeight: 700,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  direction: 'rtl',
  maxWidth: '1200px',
  margin: 'auto',
}));

const LibrariansTable = () => {
  const [librarians, setLibrarians] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const api_url=process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchLibrarians = async () => {
      try {
        const response = await axios.get(`${api_url}/api/Users/getUsers`);
        const librariansData = response.data.filter(user => user.role === 'Librarian');
        setLibrarians(librariansData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrarians();
  }, []);

  const handleTasksClick = (userId, librarianName) => {
    navigate(`/tasks/${userId}`, { state: { librarianName } });
  };

  if (loading) {
    return (
      <StyledPaper>
        <CircularProgress />
        <Typography variant="h6" gutterBottom>טוען נתונים...</Typography>
      </StyledPaper>
    );
  }

  return (
    <StyledPaper>
      <Typography variant="h4" gutterBottom>
        ביצועי ספרניות
      </Typography>
      <TableContainer>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell align="right">שם הספרנית</StyledTableHeaderCell>
              <StyledTableHeaderCell align="right">תעודת זהות</StyledTableHeaderCell>
              <StyledTableHeaderCell align="right">אימייל</StyledTableHeaderCell>
              <StyledTableHeaderCell align="right">ביצועים</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {librarians.map((librarian) => (
              <TableRow key={librarian.userId}>
                <StyledTableCell align="right">{librarian.fname}</StyledTableCell>
                <StyledTableCell align="right">{librarian.tz}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link href={`mailto:${librarian.email}`}>{librarian.email}</Link>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => handleTasksClick(librarian.userId, librarian.fname)}>
                    הצג ביצועים
                  </Button>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </StyledPaper>
  );
};

export default LibrariansTable;
