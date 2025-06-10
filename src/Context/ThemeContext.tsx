// import { createTheme } from '@mui/material';
// import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

// interface ThemeContextType {
//   mode: 'light' | 'dark';
//   toggleColorMode: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [mode, setMode] = useState<'light' | 'dark'>(() => {
//     const storedMode = localStorage.getItem('themeMode');
//     return storedMode === 'dark' ? 'dark' : 'light';
//   });

//   const toggleColorMode = () => {
//     setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//   };

//   useEffect(() => {
//     localStorage.setItem('themeMode', mode);
//   }, [mode]);

//   const theme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//           primary: {
//             main: '#007bff', // CAMWATER blue
//           },
//           secondary: {
//             main: '#6c757d', // Grey for accents
//           },
//           background: {
//             default: mode === 'light' ? '#f4f6f8' : '#121212',
//             paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
//           },
//         },
//         typography: {
//           fontFamily: '"Inter", sans-serif',
//         },
//         shape: {
//           borderRadius: 8, // Rounded corners
//         },
//         components: {
//           MuiButton: {
//             styleOverrides: {
//               root: {
//                 borderRadius: 8,
//               },
//             },
//           },
//           MuiPaper: {
//             styleOverrides: {
//               root: {
//                 borderRadius: 8,
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
//               },
//             },
//           },
//           MuiCard: {
//             styleOverrides: {
//               root: {
//                 borderRadius: 8,
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
//               },
//             },
//           },
//           MuiDialog: {
//             styleOverrides: {
//               paper: {
//                 borderRadius: 8,
//               },
//             },
//           },
//         },
//       }),
//     [mode],
//   );

//   return (
//     <ThemeContext.Provider value={{ mode, toggleColorMode }}>
//       {/* <ThemeProviderWrapper theme={theme}> */}
//         {children} {/* Children (RootApp or App) will be rendered here */}
//       {/* </ThemeProviderWrapper> */}
//     </ThemeContext.Provider>
//   );
// };

// export const useThemeMode = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useThemeMode must be used within a ThemeProviderWrapper');
//   }
//   return context;
// };