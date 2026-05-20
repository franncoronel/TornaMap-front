import { createTheme } from '@mui/material'
import { esES } from '@mui/x-date-pickers/locales'

let unsamTheme = createTheme(
  {
    typography: {
      fontFamily: ['Saira' /*Fuente que usa la UNSAM*/, 'sans-serif'].join(','),
      h1: { fontSize: '2rem',   fontWeight: 600 },
      h2: { fontSize: '1.5rem', fontWeight: 400 },
      h3: { fontSize: '1.5rem', fontWeight: 400 },
      h4: { fontSize: '1.1rem', fontWeight: 400 },
      h5: { fontSize: '1rem',   fontWeight: 400 },
      h6: { fontSize: '1.1rem', fontWeight: 400 },
    },
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: '#7DA1C4' /*Pantone 645 como indica la UNSAM, si cambia es por #00DC8C (color de ECyT).*/,
            contrastText: '#0F0F0F' /* Azul oscuro/casi negro para el texto en el color principal*/
          },
          secondary: {
            main: '#0F0F0F'
          },
          error: {
            main: '#ef9a9a'
          },
          warning: {
            main: '#ff9800'
          },
          tonalOffset: 0.1
        }
      }
    },
    components: {
      /* === Inyecta las variables CSS del tema para que index.css y el theme.ts compartan la misma fuente de verdad === */
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          ':root': {
            '--primary-color': theme.palette.primary.main,
            '--primary-color-light': theme.palette.primary.light,
            '--primary-color-dark': theme.palette.primary.dark,
          }
        })
      },
      MuiIconButton: {
        defaultProps: {
          color: 'secondary',
          disableRipple: true,
          disableFocusRipple: true
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            '&:-webkit-autofill': {
              boxShadow: '0 0 0 1000px white inset',
              WebkitTextFillColor: '#000',
              transition: 'background-color 5000s ease-in-out 0s',
            }
          }
        }
      }
    }
  },
  esES
)

unsamTheme = createTheme(unsamTheme, {
  typography: {
    h1: { [unsamTheme.breakpoints.up('sm')]: { fontSize: '2.3rem' } },
    h2: { [unsamTheme.breakpoints.up('sm')]: { fontSize: '2rem' } },
    h3: { [unsamTheme.breakpoints.up('sm')]: { fontSize: '1.75rem' } },
    h4: { [unsamTheme.breakpoints.up('sm')]: { fontSize: '1.35rem' } },
    h5: { [unsamTheme.breakpoints.up('sm')]: { fontSize: '1.1rem' } },
    h6: { [unsamTheme.breakpoints.up('sm')]: { fontSize: '1.25rem' } },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlinedPrimary: {
          '&:hover': {
            backgroundColor: 'rgba(95, 94, 94, 0.06)',
            borderColor: unsamTheme.palette.primary.main,
          }
        }
      }
    }
  }
})

export default unsamTheme
