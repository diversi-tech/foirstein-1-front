
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { getRoleFromToken, getUserNameFromToken } from './decipheringToken';

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  direction: 'rtl',
}));

const StyledLink = styled(Link)(({ theme, active }) => ({
  color: active ? '#FFD700' : '#FFFFFF',
  textDecoration: 'none',
  marginLeft: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: 0,
  // fontFamily: "Consolas, 'Courier New', monospace",
  '&:hover': {
    color: '#FFD700',
  },
}));

const NavBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#0D1E46',
  borderRadius: 0,
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: theme.zIndex.appBar + 1,
}));

const ToolbarOffset = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const RightSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '36px',
  marginRight: '10px',
});

const LeftSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginRight: 'auto',

});

const GreetingText = styled(Typography)(({ theme }) => ({
  color: '#FFFFFF',
  // fontFamily: "Consolas, 'Courier New', monospace",
}));

const getGreetingMessage = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  if (currentHour >= 5 && currentHour < 12) {
    return 'בוקר טוב';
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'צהרים טובים';
  } else {
    return 'ערב טוב';
  }
};

export const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('jwt'));
  const [anchorEl, setAnchorEl] = useState(null);
  const greetingMessage = getGreetingMessage();
  const role = isLoggedIn ? getRoleFromToken() : null;
  const userName = isLoggedIn ? getUserNameFromToken() : null;

  useEffect(() => {
    if (!isLoggedIn && (location.pathname === '/UserManagementComponent' || location.pathname === '/ActivityLog' || location.pathname === '/changePermission' || location.pathname === '/Charts')) {
      navigate('/home');
    }
  }, [isLoggedIn, location.pathname, navigate]);

  useEffect(() => {
    setIsLoggedIn(!!sessionStorage.getItem('jwt'));   

  }, [location.pathname]);

  const handleLogout = () => {
    const confirmLogout = window.confirm('האם אתה בטוח שאתה רוצה להתנתק?');
    if (confirmLogout) {
      sessionStorage.removeItem('jwt');
      setIsLoggedIn(false);
      navigate('/home');
      console.log('Logging out...');
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const renderUserAvatar = (name) => {
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    return '';
  };

  return (
    <Root>
      <NavBar position="fixed">
        <Toolbar>
          <RightSection>
            <img src="/bookshelf.png" alt="Bookshelf Icon" style={{ height: '24px', marginRight: 'auto' }} />
            <Typography
              variant="body1"
              style={{ color: '#FFFFFF', marginLeft: '4px', fontWeight: 'bold' }}
            >
              אתר ספריה
            </Typography>
          </RightSection>
          <StyledLink to="/" active={location.pathname === '/' || location.pathname === '/login/home' || location.pathname === '/home'}>
            דף הבית
          </StyledLink>
          {!isLoggedIn && (
            <StyledLink to="/login" active={location.pathname === '/login' || location.pathname === '/login/security-question/reset-password/password-reset-success/login'}>
              התחברות
            </StyledLink>
          )}
          {role === 'Admin' && (
            <>
              <StyledLink to="/ActivityLog" active={location.pathname === '/ActivityLog'}>
                יומן פעילות
              </StyledLink>
              <StyledLink to="/changePermission" active={location.pathname === '/changePermission'}>
                שינוי הרשאות
              </StyledLink>
              <StyledLink to="/Charts" active={location.pathname === '/Charts'}>
                גרפים
              </StyledLink>
              <StyledLink to="/UserManagementComponent" active={location.pathname === '/UserManagementComponent'}>
                ניהול משתמשים
              </StyledLink>
              <StyledLink to="/ManagerDashboard" active={location.pathname === '/ManagerDashboard'}>
                 דוחות
              </StyledLink>
            </>
          )}
          <LeftSection>
            {isLoggedIn ? (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleMenuOpen}
                >
                  <Avatar>{renderUserAvatar(userName)}</Avatar>
                </IconButton>
                <GreetingText variant="body1">
                  {greetingMessage} {userName}
                </GreetingText>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleProfileClick}>ניהול חשבון</MenuItem>
                  <MenuItem onClick={handleLogout}>התנתקות</MenuItem>
                </Menu>
              </>
            ) : (
              <GreetingText variant="body1">לא מחובר</GreetingText>
            )}
          </LeftSection>
        </Toolbar>
      </NavBar>
      <ToolbarOffset />
    </Root>
  );
};
