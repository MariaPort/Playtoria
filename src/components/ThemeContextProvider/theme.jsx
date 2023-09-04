import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
  });

export const theme = {
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components: {
        MuiAlert: {
            styleOverrides: {
            root: ({ ownerState }) => ({
                ...(ownerState.severity === 'info' && {
                backgroundColor: '#60a5fa',
                }),
            }),
            },
        },
    },
};

export const getDesignTokens = (mode) => {
    console.log('getDesignTokens');
    console.log(mode);

    return {
        palette: {
            mode,
            // ...(mode === "light"
            //   ? {
            //       // palette values for light mode
            //       primary: amber,
            //       divider: amber[200],
            //       text: {
            //         primary: grey[900],
            //         secondary: grey[800],
            //       },
            //     }
            //   : {
            //       // palette values for dark mode
            //       primary: deepOrange,
            //       divider: deepOrange[700],
            //       background: {
            //         default: deepOrange[900],
            //         paper: deepOrange[900],
            //       },
            //       text: {
            //         primary: "#fff",
            //         secondary: grey[500],
            //       },
            //     }),
        },
    }
};

export default theme;
