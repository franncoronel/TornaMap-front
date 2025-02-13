import { AppBar, IconButton, Toolbar } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { HouseSimple, MagnifyingGlass, MapTrifold, SignIn, UserCircle } from '@phosphor-icons/react'
import { useAuth } from "@/context/AuthContext"
import './nav.css'
export default function Nav() {
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth()
  const location = useLocation()
  // Función para detectar rutas parciales o múltiples coincidencias
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
    <AppBar className="footer-nav-bar" position="sticky" color="primary" sx={{ top: 'auto', bottom: 0, height: '10vh', display:'flex', justifyContent:'center', alignItems:'center' }} enableColorOnDark>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%'}}>
        <IconButton onClick={() => navigate("/")} color='secondary' className={isActive('/')?'active':''} aria-label='Buscar'>
          <HouseSimple size={32} alt='Inicio'/>
        </IconButton>
        <IconButton onClick={() => navigate("/buscar")} color='secondary' className={isActive('/buscar')?'active':''} aria-label='Buscar'>
          <MagnifyingGlass size={32} alt='Buscar' />
        </IconButton>
        <IconButton onClick={() => navigate("/mapa/tornavias-subsuelo")} color='secondary' className={isActive('/mapa')?'active':''} aria-label='Inicio'>
          <MapTrifold size={32} alt='Mapa' />
        </IconButton>
        <IconButton onClick={() => navigate("/perfil")} color='secondary' className={isActive(["/perfil", "/ingresar"])?'active':''} aria-label='Perfil'>
          {isAuthenticated && <UserCircle size={32} alt='Perfil' />}
          {!isAuthenticated && <SignIn size={32} alt='Iniciar Sesión' />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}