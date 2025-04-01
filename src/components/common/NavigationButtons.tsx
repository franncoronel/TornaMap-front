import { useAuth } from "@/context/AuthContext"
import { Box, IconButton, Typography } from "@mui/material"
import { HouseSimple, MagnifyingGlass, MapTrifold, SignIn, UserCircle } from "@phosphor-icons/react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { W } from "vitest/dist/chunks/reporters.D7Jzd9GS.js"

export default function NavigationButtons() {
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

    const mobileButtons = () => (
            <>
                <IconButton
                    onClick={() => navigate("/")}
                    color='secondary'
                    className={isActive('/') ? 'active' : ''}
                    aria-label='Buscar'
                >
                    <HouseSimple size={32} alt='Inicio' />
                </IconButton>
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

    const wideViewportButtons = () => (
        <>
            <IconButton
                onClick={() => navigate("/")}
                color='secondary'
                className={isActive('/') ? 'active' : ''}
                aria-label='Inicio'
            >
                <Typography flexGrow='1'>UNSAM</Typography> {/*Reemplazar por logo*/}
            </IconButton>
            <Box flexGrow='1' /> {/*Necesario para posicionar al logo a la izquierda y los iconos a la derecha*/}
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
                aria-label='Mapa'
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

    return (
        <>
            {isMobile && mobileButtons()}
            {!isMobile && wideViewportButtons()}
        </>
    )
}