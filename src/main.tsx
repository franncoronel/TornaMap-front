import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App.tsx'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material'

let unsamTheme = createTheme({
  typography: {
    fontFamily: [
      'Saira', /*Fuente que usa la UNSAM*/
      'sans-serif'
    ].join(','),
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main:'#7DA1C4', /*Pantone 645 como indica la UNSAM, si cambia es por #00DC8C (color de ECyT).*/
          contrastText: '#FFFFFF' /*Blanco para el texto en el color principal*/
        },
        secondary: {
          main:'#FFFFFF'
        },
        tonalOffset: 0.1
      }
    },
    dark: {
      palette: {
        primary: {
          main:'#7DA1C4',
          contrastText: '#FFFFFF'
        },
        secondary:{
          main:'#FFFFFF'
        }
      }
    }
  },
})
unsamTheme = responsiveFontSizes(unsamTheme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={unsamTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>
)
