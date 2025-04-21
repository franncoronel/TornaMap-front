// Estilos
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import CssBaseline from '@mui/material/CssBaseline'

// Librerías
import { Suspense } from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'

// Contextos
import { AuthProvider } from '@/context/AuthContext.tsx'
import { LoaderProvider } from './context/LoaderContext'
import MuiDateProvider from './context/MuiDateContext'
import { NotificationProvider } from './context/NotificationContext'

// Rutas
import { routes } from '@/routes'

// Componentes
import {
  Box /* , useMediaQuery, useTheme  */,
  CircularProgress
} from '@mui/material'
import Nav from './components/common/Nav/Nav'

function App() {
  // const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <CssBaseline />
      <LoaderProvider>
        <AuthProvider>
          <NotificationProvider>
            <MuiDateProvider>
              <BrowserRouter
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true
                }}
              >
                <Box className="layout-container">
                  <Box className="page-structure">
                    <RoutesWrapper />
                  </Box>
                  <Nav />
                </Box>
              </BrowserRouter>
            </MuiDateProvider>
          </NotificationProvider>
        </AuthProvider>
      </LoaderProvider>
    </>
  )
}

function RoutesWrapper() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress />
        </Box>
      }
    >
      {useRoutes(routes)}
    </Suspense>
  )
}

export default App
