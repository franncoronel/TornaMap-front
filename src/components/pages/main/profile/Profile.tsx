import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
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
import { ChalkboardTeacher } from '@phosphor-icons/react/dist/ssr/ChalkboardTeacher'
import { GraduationCap } from '@phosphor-icons/react/dist/ssr/GraduationCap'
import { CalendarStar } from '@phosphor-icons/react/dist/ssr/CalendarStar'
import { CalendarPlus } from '@phosphor-icons/react/dist/ssr/CalendarPlus'
import { ClockClockwise } from '@phosphor-icons/react/dist/ssr/ClockClockwise'
import { ActionCard } from './ActionCard'

export default function Profile() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const { setNotificationState } = useNotification()
  const { setLoader } = useLoader()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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
        setUser(user.data.data)
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
        <Typography variant="h1" gutterBottom>
          Perfil
        </Typography>
        {user && (
          <Typography variant="h2" gutterBottom>
            {user.name} {user.lastName}
          </Typography>
        )}
      </header>

      {user?.isAdmin && (
        <>
          {/* <ProfileButton>Agregar Tipo de Aula</ProfileButton>
          <ProfileButton>Editar Aula</ProfileButton> */}
          {/* <ProfileButton>Habilitar Solicitud Clase</ProfileButton> */}
          {isMobile ? (
            <>
              <ProfileButton
                onClick={() => navigate('/programas')}
                startIcon={<GraduationCap size={32} />}
              >
                Carreras o Programas
              </ProfileButton>
              <ProfileButton
                onClick={() => navigate('/asignatura/agregar')}
                startIcon={<ChalkboardTeacher size={32} />}
              >
                Agregar Asignatura
              </ProfileButton>
              <ProfileButton
                onClick={() => navigate('/evento/agregar')}
                startIcon={<CalendarStar size={32} />}
              >
                Agregar Evento / Clase
              </ProfileButton>
              <ProfileButton
                onClick={() => navigate('/solicitudes')}
                startIcon={<CalendarPlus size={32} />}
              >
                Solicitudes de eventos
              </ProfileButton>
              <ProfileButton
                onClick={() => navigate('/periodos')}
                startIcon={<ClockClockwise size={32} />}
              >
                Periodos
              </ProfileButton>
            </>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)'
                },
                gap: 3,
                mb: 4,
                px: { xs: 2, sm: 3 }
              }}
            >
              <ActionCard
                title="Carreras o Programas"
                icon={<GraduationCap size={60} />}
                onClick={() => navigate('/programas')}
              />
              <ActionCard
                title="Agregar Asignatura"
                icon={<ChalkboardTeacher size={60} />}
                onClick={() => navigate('/asignatura/agregar')}
              />
              <ActionCard
                title="Agregar Evento / Clase"
                icon={<CalendarStar size={60} />}
                onClick={() => navigate('/evento/agregar')}
              />
              <ActionCard
                title="Solicitudes de eventos"
                icon={<CalendarPlus size={60} />}
                onClick={() => navigate('/solicitudes')}
              />
              <ActionCard
                title="Periodos"
                icon={<ClockClockwise size={60} />}
                onClick={() => navigate('/periodos')}
              />
            </Box>
          )}
        </>
      )}
      <ProfileButton
        onClick={() => handleLogout()}
        centerText={true}
        endIcon={<SignOut size={32} alt="Cerrar sesión" />}
      >
        Cerrar Sesión
      </ProfileButton>
    </main>
  )
}
