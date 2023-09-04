'use client'
import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import HomeIcon from '@mui/icons-material/Home';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import NightModeToggle from '@/components/NightModeToggle/NightModeToggle';
import { ThemeContextProvider } from '@/components/ThemeContextProvider/ThemeContextProvider';

export const metadata = {
  title: 'Next.js App Router + Material UI v5',
  description: 'Next.js App Router + Material UI v5',
};

const PAGES = [
    {text: 'Home', href: '/', icon: HomeIcon},
    {text: 'Top Charts', href: '/top', icon: EmojiEventsIcon},
  ];

// const LINKS = [
//   {text: 'Home', href: '/', icon: HomeIcon},
//   {text: 'Top Charts', href: '/top', icon: EmojiEventsIcon},
// ];

// const PLACEHOLDER_LINKS = [
//   { text: 'Settings', icon: SettingsIcon },
//   { text: 'Support', icon: SupportIcon },
//   { text: 'Logout', icon: LogoutIcon },
// ];

export default function RootLayout({ children }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          <ThemeRegistry>
            <AppBar position="static">
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <SmartToyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: 'none', md: 'flex' },
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    PLAYTORIA
                  </Typography>

                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: 'block', md: 'none' },
                      }}
                    >
                      {PAGES.map(({text, href}) => (
                        <MenuItem key={text} onClick={handleCloseNavMenu} component={Link} href={href}>
                          <Typography textAlign="center">{text}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                  <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: 'flex', md: 'none' },
                      flexGrow: 1,
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    PLAYTORIA
                  </Typography>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {PAGES.map(({text, href}) => (
                      <Button
                        key={text}
                        onClick={handleCloseNavMenu}
                        component={Link}
                        href={href}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        {text}
                      </Button>
                    ))}
                  </Box>
                  <NightModeToggle />

                </Toolbar>
              </Container>
            </AppBar>
            
            <Box component="main">
              {children}
            </Box>
          </ThemeRegistry>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
