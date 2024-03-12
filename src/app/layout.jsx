import * as React from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
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
        <GoogleTagManager gtmId='G-E3GLMZ2GFD' />
      </body>
    </html>
  );
}
