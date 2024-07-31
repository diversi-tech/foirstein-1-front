import React from 'react';
import { AppBar, Tabs, Tab, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <AppBar 
        position="static" 
        sx={{ 
          maxWidth: 400, 
          width: '100%', 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          boxShadow: 4, 
          backdropFilter: 'blur(10px)', 
          borderRadius: 2 
        }}
      >
        <Tabs 
          value={currentPath}
          centered
          TabIndicatorProps={{ style: { backgroundColor: '#0D1E46' } }}
          textColor="inherit"
        >
          <Tab 
            label="הצגת דוחות" 
            value="/view-reports" 
            component={Link} 
            to="/view-reports" 
            sx={{ color: currentPath === '/view-reports' ? '#0D1E46' : '#0D1E46' }}
          />
          <Tab 
            label="יצירת דוחות" 
            value="/ManagerDashboard" 
            component={Link} 
            to="/ManagerDashboard" 
            sx={{ color: currentPath === '/ManagerDashboard' ? '#0D1E46' : '#0D1E46' }}
          />
        </Tabs>
      </AppBar>
    </Box>
  );
};

export default NavBar;
