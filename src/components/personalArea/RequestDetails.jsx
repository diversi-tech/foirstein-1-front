import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Collapse,
  TableCell,
  TableRow,
  ThemeProvider,
  Typography,
  createTheme,
  Table,
  TableBody,
  CardMedia,
} from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import stylisRTLPlugin from 'stylis-plugin-rtl';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [stylisRTLPlugin],
});

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const RequestDetails = ({ request, expanded }) => {
  if (!request) {
    return null;
  }

  const rows = [
    { key: 'description', label: 'תיאור' },
    { key: 'author', label: 'מחבר' },
    { key: 'category', label: 'קטגוריה' },
    { key: 'isApproved', label: 'ניתן להשאלה', transform: value => (value ? 'כן' : 'לא') },
    { key: 'createdAt', label: 'נוצר ב', transform: value => new Date(value).toLocaleString() },
    { key: 'updatedAt', label: 'עודכן ב', transform: value => new Date(value).toLocaleString() },
  ];

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <TableRow>
          <TableCell colSpan={9}>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Card>
                <Box display="flex" flexDirection="column">
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {request.title}
                    </Typography>
                    <Table>
                      <TableBody>
                        {rows.map(row => (
                          <TableRow key={row.key}>
                            <TableCell>{row.transform ? row.transform(request[row.key]) : request[row.key]}</TableCell>
                            <TableCell component="th" scope="row">
                              <strong>{row.label}</strong>
                            </TableCell>
                          </TableRow>
                        ))}
                        {request.filePath && (
                          <TableRow>
                            <TableCell colSpan={2}>
                              <CardMedia
                                component="img"
                                sx={{ width: '100%', height: 'auto', borderRadius: 1, mt: 2 }}
                                image={request.filePath}
                                alt="Product image"
                              />
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Box>
              </Card>
            </Collapse>
          </TableCell>
        </TableRow>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default RequestDetails;



