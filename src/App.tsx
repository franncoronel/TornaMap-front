import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { AuthProvider } from "@/context/AuthContext.tsx"
import Nav from './components/common/Nav/Nav'
import { routes } from '@/routes'
import { useMediaQuery, useTheme } from '@mui/material'
import Header from './components/common/Header'

function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          {!isMobile && <Header />}
          <RoutesWrapper />
          {isMobile && <Nav />}
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

function RoutesWrapper() {
  return useRoutes(routes) // Ahora se ejecuta dentro del BrowserRouter
}

export default App
