import UnsamIcon from "@/assets/logos/logo-unsam"
import { useAuth } from "@/context/AuthContext"
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { HouseSimple, MagnifyingGlass, MapTrifold, SignIn, UserCircle } from "@phosphor-icons/react"
import { useLocation, useNavigate } from "react-router-dom"

export default function NavigationButtons() {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const location = useLocation()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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
        <>
            {isMobile ?
                <IconButton
                    onClick={() => navigate("/")}
                    color='secondary'
                    className={isActive('/') ? 'active' : ''}
                    aria-label='Buscar'
                >
                    <HouseSimple size={32} alt='Inicio' />
                </IconButton> :
                <>
                    <IconButton
                        onClick={() => navigate("/")}
                        color='secondary'
                        className={isActive('/') ? 'active' : ''}
                        aria-label='Inicio'
                    >
                        <UnsamIcon size={48} />
                    </IconButton>
                    <Box flexGrow='1' />
                </>
            }
            <IconButton
                onClick={() => navigate("/buscar")}
                color='secondary'
                className={isActive('/buscar') ? 'active' : ''}
                aria-label='Buscar'
            >
                <MagnifyingGlass size={32} alt='Buscar' />
            </IconButton>
            <IconButton
                onClick={() => navigate("/mapa/tornavias-subsuelo")}
                color='secondary'
                className={isActive('/mapa') ? 'active' : ''}
                aria-label='Inicio'
            >
                <MapTrifold size={32} alt='Mapa' />
            </IconButton>
            <IconButton
                onClick={() => navigate("/perfil")}
                color='secondary'
                className={isActive(["/perfil", "/ingresar"]) ? 'active' : ''}
                aria-label='Perfil'
            >
                {isAuthenticated && <UserCircle size={32} alt='Perfil' />}
                {!isAuthenticated && <SignIn size={32} alt='Iniciar Sesión' />}
            </IconButton>
        </>
    )
}