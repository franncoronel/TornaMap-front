import { AppBar, Toolbar, Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import './nav.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import logo from '@/assets/logos/logo-unsam-negro-crop.png'
import { buildingData } from '@/data/mock/BuildingData'
import { HouseSimple } from '@phosphor-icons/react/dist/icons/HouseSimple'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/icons/MagnifyingGlass'
import { MapTrifold } from '@phosphor-icons/react/dist/icons/MapTrifold'
import { UserCircle } from '@phosphor-icons/react/dist/icons/UserCircle'
import { SignIn } from '@phosphor-icons/react/dist/icons/SignIn'

const StyledTypography = styled(Typography)(({ theme }) => ({
  variant: 'body2',
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.secondary.main
}))

export default function Nav() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const isActive = (paths: string | string[]) => {
    if (typeof paths === 'string') {
      return paths === '/'
        ? location.pathname === paths // Verifica solo si es '/'
        : location.pathname.startsWith(paths) // Para rutas parciales
    }
    return paths.some((path) =>
      path === '/'
        ? location.pathname === path
        : location.pathname.startsWith(path)
    )
  }

  return (
    <AppBar
      className="outer-container"
      position="sticky"
      color="primary"
      enableColorOnDark
    >
      <Toolbar className="inner-container">
        {isMobile ? (
          !isAuthenticated && (
            <IconButton
              onClick={() => navigate('/')}
              className={`${isActive('/') ? 'active' : ''} logo-container home-icon`}
              aria-label="Ir al inicio"
            >
              <HouseSimple size={32} alt="Inicio" className="mobile-logo" />
            </IconButton>
          )
        ) : (
          <IconButton
            onClick={() => navigate('/')}
            className={`${isActive('/') ? 'active' : ''} logo-container home-icon`}
            disabled={isAuthenticated}
            aria-label="Ir al inicio"
          >
            <Box
              component="img"
              sx={{
                height: '3rem',
                width: 'auto'
              }}
              alt="Logo de la UNSAM"
              title="Inicio"
              src={logo}
              className="wide-screen-logo"
            />
          </IconButton>
        )}
        <Box flexGrow="1" className="spacing" />
        <IconButton
          onClick={() => navigate('/buscar')}
          className={`${isActive('/buscar') ? 'active' : ''} logo-container nav-icon`}
          aria-label="Ir a búsqueda de materias"
        >
          <MagnifyingGlass size={32} alt="Buscar" />
          <StyledTypography className="logo-label">BUSCAR</StyledTypography>
        </IconButton>
        <IconButton
          onClick={() =>
            navigate(
              `/mapa/${buildingData[0].path}/${buildingData[0].levels[0].path}`
            )
          }
          className={`${isActive('/mapa') ? 'active' : ''} logo-container nav-icon`}
          aria-label="Ir al mapa interactivo"
        >
          <MapTrifold size={32} alt="Mapa" />
          <StyledTypography className="logo-label">MAPA</StyledTypography>
        </IconButton>
        <IconButton
          onClick={() => navigate('/perfil')}
          className={`${isActive(['/perfil', '/ingresar']) ? 'active' : ''} logo-container nav-icon`}
          aria-label={isAuthenticated ? 'Ir al perfil' : 'Ingresar'}
        >
          {isAuthenticated && (
            <>
              <UserCircle size={32} alt="Perfil" />
              <StyledTypography className="logo-label">PERFIL</StyledTypography>
            </>
          )}
          {!isAuthenticated && (
            <>
              <SignIn size={32} alt="Iniciar Sesión" />
              <StyledTypography className="logo-label">
                INGRESAR
              </StyledTypography>
            </>
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
