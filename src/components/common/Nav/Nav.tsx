import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import './nav.css'
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { HouseSimple, MagnifyingGlass, MapTrifold, SignIn, UserCircle } from "@phosphor-icons/react"
import logo from '@/assets/logos/logo-unsam-blanco-crop.png'

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
        <IconButton
          onClick={() => navigate("/")}
          color='secondary'
          className={`${isActive('/') ? 'active' : ''} logo-container`}
          aria-label='Inicio'
        >
          <Box
            component="img"
            sx={{
              height: '3rem',
              width: 'auto',
            }}
            alt='Inicio'
            src={logo}
            className='wide-screen-logo'
          />
          <HouseSimple size={32} alt='Inicio' className='mobile-logo'/>
        </IconButton>
        <Box flexGrow='1' className='spacing'/>
        <IconButton
          onClick={() => navigate("/buscar")}
          color='secondary'
          className={`${isActive('/buscar') ? 'active' : ''} logo-container`}
          aria-label='Buscar'
        >
          <MagnifyingGlass size={32} alt='Buscar'/>
          <StyledTypography className='logo-label'>
            BUSCAR
          </StyledTypography>
        </IconButton>
        <IconButton
          onClick={() => navigate("/mapa/tornavias-subsuelo")}
          color='secondary'
          className={`${isActive('/mapa') ? 'active' : ''} logo-container`}
          aria-label='Inicio'
        >
          <MapTrifold size={32} alt='Mapa' />
          <StyledTypography className='logo-label'>
            MAPA
          </StyledTypography>
        </IconButton>
        <IconButton
          onClick={() => navigate("/perfil")}
          color='secondary'
          className={`${isActive(["/perfil", "/ingresar"]) ? 'active' : ''} logo-container`}
          aria-label='Perfil'
        >
          {isAuthenticated &&
            <>
              <UserCircle size={32} alt='Perfil' />
              <StyledTypography className='logo-label'>
                PERFIL
              </StyledTypography>
            </>
          }
          {!isAuthenticated &&
            <>
              <SignIn size={32} alt='Iniciar Sesión' />
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