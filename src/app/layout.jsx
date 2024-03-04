import * as React from 'react';
import Box from '@mui/material/Box';
import {
  LayoutWrapper,
  Header,
} from '../components';
import GoogleAnalytics from './GoogleAnalytics';

export const metadata = {
  title: 'Playtoria',
};

// const LINKS = [
//   {text: 'Home', href: '/', icon: HomeIcon},
//   {text: 'Top Charts', href: '/top', icon: EmojiEventsIcon},
// ];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
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
