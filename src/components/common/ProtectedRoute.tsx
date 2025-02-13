import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from "@/context/AuthContext.tsx";

interface ProtectedRouteProps {
    children: React.ReactNode // Elementos hijos que se renderizarán si el usuario está autenticado
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useAuth().isAuthenticated

    if (!isAuthenticated) {
        return <Navigate to="/ingresar" replace />
    }

    // Renderiza el contenido protegido si está autenticado
    return <>{children}</>
}
