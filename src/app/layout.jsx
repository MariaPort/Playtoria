import * as React from 'react';
import Box from '@mui/material/Box';
import {
  LayoutWrapper,
  Header,
} from '../components';

export const metadata = {
  title: 'Playtoria',
};

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
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>
          <Header />

          <Box component="main">
            {children}
          </Box>
        </LayoutWrapper>
      </body>
    </html>
  );
}
