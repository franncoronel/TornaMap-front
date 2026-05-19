import { AppBar, Toolbar, Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import './nav.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { HouseSimple, MagnifyingGlass, MapTrifold, SignIn, UserCircle } from '@phosphor-icons/react'
import logo from '@/assets/logos/logo-unsam-negro-crop.png'


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
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const iconSize = (isMobile || isDesktop) ? 26 : 20

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
              <HouseSimple size={iconSize} alt="Inicio" className="mobile-logo" />
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
                height: { sm: '2.5rem', md: '3rem' },
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
          <MagnifyingGlass size={iconSize} alt="Buscar" />
          <StyledTypography className="logo-label">BUSCAR</StyledTypography>
        </IconButton>
        <IconButton
          onClick={() => navigate('/mapa/tornavias/planta-baja')}
          className={`${isActive('/mapa') ? 'active' : ''} logo-container nav-icon`}
          aria-label="Ir al mapa interactivo"
        >
          <MapTrifold size={iconSize} alt="Mapa" />
          <StyledTypography className="logo-label">MAPA</StyledTypography>
        </IconButton>
        <IconButton
          onClick={() => navigate('/perfil')}
          className={`${isActive(['/perfil', '/ingresar']) ? 'active' : ''} logo-container nav-icon`}
          aria-label={isAuthenticated ? 'Ir al perfil' : 'Ingresar'}
        >
          {isAuthenticated && (
            <>
              <UserCircle size={iconSize} alt="Perfil" />
              <StyledTypography className="logo-label">PERFIL</StyledTypography>
            </>
          )}
          {!isAuthenticated && (
            <>
              <SignIn size={iconSize} alt="Iniciar Sesión" />
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
