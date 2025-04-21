import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext.tsx'
import { ReactNode } from 'react'
interface ProtectedRouteProps {
  children: ReactNode // Elementos hijos que se renderizarán si el usuario está autenticado
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAuth().isAuthenticated

  if (!isAuthenticated) {
    return <Navigate to="/ingresar" replace />
  }

  // Renderiza el contenido protegido si está autenticado
  return <>{children}</>
}
