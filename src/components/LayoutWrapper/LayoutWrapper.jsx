import * as React from 'react';
import ThemeRegistry from '../ThemeRegistry/ThemeRegistry';
import { ThemeContextProvider } from '../ThemeContextProvider/ThemeContextProvider';

export function LayoutWrapper({ children }) {
  return (
    <ThemeContextProvider>
        <ThemeRegistry>
            {children}
        </ThemeRegistry>
    </ThemeContextProvider>
  );
}
