import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import './nav.css'
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { HouseSimple, MagnifyingGlass, MapTrifold, SignIn, UserCircle } from "@phosphor-icons/react"
import logo from '@/assets/logos/logo-unsam-negro-crop.png'

const StyledTypography = styled(Typography)(({ theme }) => ({
  variant: "body2",
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.secondary.main,
}))

export default function Nav() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  const isActive = (paths: string | string[]) => {
    if (typeof paths === "string") {
      return paths === "/"
        ? location.pathname === paths // Verifica solo si es '/'
        : location.pathname.startsWith(paths) // Para rutas parciales
    }
    return paths.some((path) =>
      path === "/"
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
      <Toolbar
        className="inner-container"
      >
        {!isAuthenticated && <IconButton
          onClick={() => navigate("/")}
          className={`${isActive('/') ? 'active' : ''} logo-container home-icon`}
          aria-label='Ir al inicio'
          disableRipple
        >
          <Box
            component="img"
            sx={{
              height: '3rem',
              width: 'auto',
            }}
            alt='Logo de la UNSAM'
            title='Inicio'
            src={logo}
            className='wide-screen-logo'
          />
          <HouseSimple size={32} alt='Inicio' className='mobile-logo'/>
        </IconButton>}
        <Box flexGrow='1' className='spacing'/>
        <IconButton
          onClick={() => navigate("/buscar")}
          className={`${isActive('/buscar') ? 'active' : ''} logo-container nav-icon`}
          aria-label='Ir a búsqueda de materias'
          disableRipple
        >
          <MagnifyingGlass size={32} alt='Buscar'/>
          <StyledTypography className='logo-label'>
            BUSCAR
          </StyledTypography>
        </IconButton>
        <IconButton
          onClick={() => navigate("/mapa/tornavias-subsuelo")}
          className={`${isActive('/mapa') ? 'active' : ''} logo-container nav-icon`}
          aria-label='Ir al mapa interactivo'
          disableRipple
        >
          <MapTrifold size={32} alt='Mapa'/>
          <StyledTypography className='logo-label'>
            MAPA
          </StyledTypography>
        </IconButton>
        <IconButton
          onClick={() => navigate("/perfil")}
          className={`${isActive(["/perfil", "/ingresar"]) ? 'active' : ''} logo-container nav-icon`}
          aria-label={isAuthenticated ? 'Ir al perfil' : 'Ingresar'}
          disableRipple
        >
          {isAuthenticated &&
            <>
              <UserCircle size={32} alt='Perfil'/>
              <StyledTypography className='logo-label'>
                PERFIL
              </StyledTypography>
            </>
          }
          {!isAuthenticated &&
            <>
              <SignIn size={32} alt='Iniciar Sesión'/>
              <StyledTypography className='logo-label'>
                INGRESAR
              </StyledTypography>
            </>
          }
        </IconButton>
    </Toolbar>
    </AppBar >
  )
}