import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material"
import './nav.css'
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { HouseSimple, MagnifyingGlass, MapTrifold, SignIn, UserCircle } from "@phosphor-icons/react"
import logo from '@/assets/logos/logo-unsam-blanco-crop.png'

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
          <MagnifyingGlass size={32} alt='Buscar' />
          <Typography variant="body2" color="secondary" className='logo-label'>
            BUSCAR
          </Typography>
        </IconButton>
        <IconButton
          onClick={() => navigate("/mapa/tornavias-subsuelo")}
          color='secondary'
          className={`${isActive('/mapa') ? 'active' : ''} logo-container`}
          aria-label='Inicio'
        >
          <MapTrifold size={32} alt='Mapa' />
          <Typography variant="body2" color="secondary" className='logo-label middle-button'>
            MAPA
          </Typography>
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
              <Typography variant="body2" color="secondary" className='logo-label'>
                PERFIL
              </Typography>
            </>
          }
          {!isAuthenticated &&
            <>
              <SignIn size={32} alt='Iniciar Sesión' />
              <Typography variant="body2" color="secondary" className='logo-label'>
                INGRESAR
              </Typography>
            </>
          }
        </IconButton>
    </Toolbar>
    </AppBar >
  )
}