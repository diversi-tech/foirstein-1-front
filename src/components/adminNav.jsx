// src/components/adminNav.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textAlign: 'right',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  marginRight: theme.spacing(2),
}));

export const AdminNav = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Root>
      <AppBar position="static">
        <Toolbar>
          <MenuButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </MenuButton>
          <Title variant="h6">
            ניהול משתמשים
          </Title>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={StyledLink} to="/">דף הבית</MenuItem>
            <MenuItem onClick={handleClose} component={StyledLink} to="/ActivityLog">יומן פעילות</MenuItem>
            <MenuItem onClick={handleClose} component={StyledLink} to="/changePermission">שינוי הרשאות</MenuItem>
            <MenuItem onClick={handleClose} component={StyledLink} to="/Charts">גרפים</MenuItem>
            <MenuItem onClick={handleClose} component={StyledLink} to="/UserManagementComponent">ניהול משתמשים</MenuItem>
            <MenuItem onClick={handleClose} component={StyledLink} to="/profile">משתמשים</MenuItem>

          </Menu>
        </Toolbar>
      </AppBar>
    </Root>
  );
};
