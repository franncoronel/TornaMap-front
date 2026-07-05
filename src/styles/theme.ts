import { createTheme, responsiveFontSizes } from '@mui/material'
import { esES } from '@mui/x-date-pickers/locales'

let unsamTheme = createTheme(
  {
    typography: {
      fontFamily: ['Saira' /*Fuente que usa la UNSAM*/, 'sans-serif'].join(',')
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

export default unsamTheme = responsiveFontSizes(unsamTheme)