import { Typography } from '@mui/material'
import { ProfileButton } from './ProfileButton'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { SignOut } from '@phosphor-icons/react'
import { userService } from '@/data/services/UserService'
import { useEffect, useState } from 'react'
import { User } from '@/data/domain/User'

import './profile.css'
import { useNotification } from '@/context/NotificationContext'
import { useLoader } from '@/context/LoaderContext'

export default function Profile() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const { setNotificationState } = useNotification()
  const { setLoader } = useLoader()
  const handleLogout = async () => {
    setLoader(true)
    try {
      await logout()
      setLoader(false)
      setNotificationState({
        title: 'Sesión cerrada correctamente',
        type: 'success'
      })
      navigate('/')
    } catch (error) {
      setLoader(false)
      console.error('Error al cerrar sesión:', error)
      setNotificationState({
        title: 'Error al cerrar sesión',
        type: 'error'
      })
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      setLoader(true)
      try {
        const user = await userService.getProfile()
        setLoader(false)
        setUser(user.data)
      } catch (error) {
        setLoader(false)
        console.error('Error fetching user data:', error)
        setNotificationState({
          title: 'Error al obtener datos del usuario',
          type: 'error'
        })
      }
    }

    if (!user) {
      fetchUserData()
    }
  }, [user]) // Se ejecuta una vez al montar el componente

  return (
    <main className="profile-page">
      <header>
        {/* Agregar datos de mail y nombre de usuario */}
        {/* Usar typography */}
        <Typography variant="h2" component="h1" gutterBottom>
          Perfil
        </Typography>
        {user && (
          <Typography variant="h4" component="h2" gutterBottom>
            {user.name} {user.lastName}
          </Typography>
        )}
      </header>

      {user?.isAdmin && (
        <>
          <ProfileButton>Agregar Tipo de Aula</ProfileButton>
          <ProfileButton>Editar Aula</ProfileButton>
          <ProfileButton>Editar Aula</ProfileButton>
          <ProfileButton>Habilitar Solicitud Clase</ProfileButton>
          <ProfileButton onClick={() => navigate('/agregar/asignatura')}>Agregar Asignatura</ProfileButton>
        </>
      )}
      <ProfileButton>Agregar Clase</ProfileButton>
      <ProfileButton onClick={() => handleLogout()}>
        Cerrar Sesión <SignOut size={32} alt="Cerrar sesión" />
      </ProfileButton>
    </main>
  )
}
