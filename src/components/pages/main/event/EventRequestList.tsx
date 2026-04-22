import { useEffect, useState } from 'react'
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme
} from '@mui/material'
import {
  CheckCircle,
  XCircle,
  CalendarDots,
  BookOpen,
  Clock,
  CalendarPlus
} from '@phosphor-icons/react'
import { useLoader } from '@/context/LoaderContext'
import { useNotification } from '@/context/NotificationContext'
import { eventService } from '@/data/services/EventService'
import { IEvent } from '@/data/domain/Event'

// ─── helpers ────────────────────────────────────────────────────────────────

const weekDayLabel: Record<string, string> = {
  MONDAY: 'Lunes',
  TUESDAY: 'Martes',
  WEDNESDAY: 'Miércoles',
  THURSDAY: 'Jueves',
  FRIDAY: 'Viernes',
  SATURDAY: 'Sábado',
  SUNDAY: 'Domingo'
}

function formatScheduleSummary(schedules: IEvent['schedules']): string {
  if (!schedules?.length) return 'Sin horarios'
  return schedules
    .map((s) => {
      const day = s.weekDay
        ? (weekDayLabel[s.weekDay] ?? s.weekDay)
        : (s.date ?? '—')
      const time = s.startTime && s.endTime ? `${s.startTime}–${s.endTime}` : ''
      const place = s.isVirtual ? 'Virtual' : (s.classroom?.code ?? 'Sin aula')
      return [day, time, place].filter(Boolean).join(' · ')
    })
    .join(' / ')
}

// ─── sub-componente: tarjeta de solicitud ───────────────────────────────────

interface RequestCardProps {
  event: IEvent
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

function RequestCard({ event, onApprove, onReject }: RequestCardProps) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderLeft: `4px solid ${theme.palette.warning.main}`,
        borderRadius: 2,
        p: 2.5,
        backgroundColor: theme.palette.background.paper,
        transition: 'box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`
        }
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        {/* Info principal */}
        <Stack spacing={0.75} flex={1} minWidth={0}>
          {/* Nombre del evento */}
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarDots
              size={18}
              weight="duotone"
              color={theme.palette.warning.main}
            />
            <Typography
              variant="subtitle1"
              fontWeight={600}
              noWrap
              sx={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {event.name}
            </Typography>
          </Stack>

          {/* Asignatura */}
          <Stack direction="row" spacing={0.75} alignItems="center">
            <BookOpen size={15} color={theme.palette.text.secondary} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {event.courseName}
            </Typography>
            {event.programNames?.length > 0 && (
              <>
                <Typography variant="body2" color="text.disabled">
                  ·
                </Typography>
                <Typography variant="body2" color="text.disabled" noWrap>
                  {event.programNames.join(', ')}
                </Typography>
              </>
            )}
          </Stack>

          {/* Horarios */}
          <Stack direction="row" spacing={0.75} alignItems="flex-start">
            <Clock
              size={15}
              color={theme.palette.text.secondary}
              style={{ marginTop: 2 }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ wordBreak: 'break-word', lineHeight: 1.5 }}
            >
              {formatScheduleSummary(event.schedules)}
            </Typography>
          </Stack>

          {/* Chips de estado */}
          <Stack direction="row" spacing={1} mt={0.5} flexWrap="wrap">
            <Chip
              label="Pendiente"
              size="small"
              sx={{
                backgroundColor: alpha(theme.palette.warning.main, 0.12),
                color: theme.palette.warning.dark,
                fontWeight: 600,
                fontSize: '0.7rem'
              }}
            />
            {event.isCancelled && (
              <Chip
                label="Cancelado"
                size="small"
                color="error"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            )}
          </Stack>
        </Stack>

        {/* Acciones */}
        <Stack direction="row" spacing={0.5} alignItems="center" flexShrink={0}>
          <Tooltip title="Aprobar solicitud" arrow>
            <IconButton
              onClick={() => onApprove(event.id!)}
              size="medium"
              sx={{
                color: theme.palette.success.main,
                backgroundColor: alpha(theme.palette.success.main, 0.08),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.success.main, 0.18),
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.15s ease'
              }}
            >
              <CheckCircle size={26} weight="duotone" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Rechazar solicitud" arrow>
            <IconButton
              onClick={() => onReject(event.id!)}
              size="medium"
              sx={{
                color: theme.palette.error.main,
                backgroundColor: alpha(theme.palette.error.main, 0.08),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.error.main, 0.18),
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.15s ease'
              }}
            >
              <XCircle size={26} weight="duotone" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  )
}

// ─── componente principal ────────────────────────────────────────────────────

export default function EventRequestsList() {
  const [requests, setRequests] = useState<IEvent[]>([])
  const { setLoader } = useLoader()
  const { setNotificationState } = useNotification()
  const theme = useTheme()

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    setLoader(true)
    try {
      // Asumimos que existe eventService.getPendingRequests()
      // Si no existe aún, ver nota al pie del archivo
      const { data } = await eventService.getPendingRequests()
      setRequests(data)
    } catch {
      setNotificationState({
        title: 'Error al cargar solicitudes',
        type: 'error'
      })
    } finally {
      setLoader(false)
    }
  }

  const handleApprove = async (id: string) => {
    setLoader(true)
    try {
      await eventService.approve(id)
      setRequests((prev) => prev.filter((e) => e.id !== id))
      setNotificationState({
        title: 'Solicitud aprobada',
        description: 'El evento fue habilitado correctamente',
        type: 'success'
      })
    } catch {
      setNotificationState({
        title: 'Error al aprobar',
        description: 'Intentá nuevamente',
        type: 'error'
      })
    } finally {
      setLoader(false)
    }
  }

  const handleReject = async (id: string) => {
    setLoader(true)
    try {
      await eventService.reject(id)
      setRequests((prev) => prev.filter((e) => e.id !== id))
      setNotificationState({
        title: 'Solicitud rechazada',
        type: 'success'
      })
    } catch {
      setNotificationState({
        title: 'Error al rechazar',
        type: 'error'
      })
    } finally {
      setLoader(false)
    }
  }

  return (
    <Box sx={{ height: '100vh', overflowY: 'auto', width: '100%', pb: 5 }}>
      <Box sx={{ maxWidth: 750, mx: 'auto', mt: 2, pb: 6 }}>
        {/* Header */}
        <Stack
          spacing={0.5}
          mb={3}
          alignItems="center"
          textAlign="center"
          mt={5}
        >
          <Stack spacing={1} alignItems="center" direction="row">
            <CalendarPlus size={40} weight="duotone" />
            <Typography variant="h1" fontWeight={700}>
              Solicitudes de eventos
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {requests.length === 0
              ? ''
              : `${requests.length} solicitud${requests.length !== 1 ? 'es' : ''} esperando aprobación`}
          </Typography>
        </Stack>

        {/* Lista */}
        {requests.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 10,
              px: 4
            }}
          >
            <CalendarDots
              size={52}
              weight="thin"
              color={theme.palette.text.disabled}
              style={{ marginBottom: 12 }}
            />
            <Typography variant="body1" color="text.disabled" fontWeight={500}>
              No hay solicitudes pendientes
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {requests.map((event) => (
              <RequestCard
                key={event.id}
                event={event}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  )
}
