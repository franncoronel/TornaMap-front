import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { QrCode } from '@phosphor-icons/react'
import { ChalkboardTeacher } from '@phosphor-icons/react/dist/ssr/ChalkboardTeacher'
import { GraduationCap } from '@phosphor-icons/react/dist/ssr/GraduationCap'
import { CalendarStar } from '@phosphor-icons/react/dist/ssr/CalendarStar'
import { CalendarPlus } from '@phosphor-icons/react/dist/ssr/CalendarPlus'
import { ClockClockwise } from '@phosphor-icons/react/dist/ssr/ClockClockwise'
import { ProfileButton } from './ProfileButton'
import { ActionCard } from './ActionCard'

export function AdminContent() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
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
          <ProfileButton
            onClick={() => navigate('/qr')}
            startIcon={<QrCode size={32} />}
          >
            QR y Flyers
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
          <ActionCard
            title="QR y Flyers"
            icon={<QrCode size={60} />}
            onClick={() => navigate('/qr')}
          />
        </Box>
      )}
    </>
  )
}
