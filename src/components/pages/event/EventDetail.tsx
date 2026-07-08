import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import { EventService } from '@/data/services/EventService'
import { IEvent } from '@/data/domain/Event'
import '@/styles/interactive-page.css'
import { BookOpen } from '@phosphor-icons/react'
import CourseScheduleCard from '../../common/CourseScheduleCard'
import { useLoader } from '@/context/LoaderContext'
import { useNotification } from '@/context/NotificationContext'

export default function EventDetail() {
  const { id } = useParams<{ id: string }>()

  const [event, setEvent] = useState<IEvent | null>(null)
  const { setLoader } = useLoader()
  const { setNotificationState } = useNotification()
  const schedules = event?.schedules ?? []


  useEffect(() => {
    if (!id) return

    const fetchEvent = async () => {
      setLoader(true)
      try {
        const response = await new EventService().getEventDetail(id)

        if (!response.data) {
          setNotificationState({
            title: 'Detalle no disponible',
            type: 'info',
            description: 'No fue posible obtener el detalle del curso. Intente nuevamente más tarde.',
            action: () => {}
          })
          return
        }

        setEvent(response.data)
      } catch (error) {
        console.error('Error fetching event detail:', error)
        setNotificationState({
          title: 'Error al cargar el detalle',
          type: 'error',
          description: 'Ocurrió un error al obtener la información del curso.',
          action: () => {}
        })
      } finally {
        setLoader(false)
      }
    }

    fetchEvent()
  }, [id, setLoader, setNotificationState])


  return (
    <Box className="interactive-page" sx={{ overflowY: 'auto' }}>
      <Box maxWidth="1200px" mx="auto" px={{ xs: 2, md: 4 }} py={4}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }} >
          <Stack spacing={2}>
            <Chip
              label={event?.type}
              color="info"
              sx={{ width: 'fit-content' }}
            />

            <Typography variant="h5" fontWeight={700}>
              {event?.courseName}
            </Typography>

            <Typography color="text.secondary">
              {event?.name}
            </Typography>

            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <BookOpen size={20} style={{ flexShrink: 0 }}/>

                <Typography>
                  {event?.programNames?.join(' • ')}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Paper>

        <Typography variant="h5" fontWeight={700} mb={3} >
          Detalle de la Cursada
        </Typography>

        {schedules.length > 0 ? (
          <Stack spacing={5}>
            {schedules.map((schedule) => (
              <CourseScheduleCard key={schedule.id} schedule={schedule} />
            ))}
          </Stack>
        ) : (
          <Paper elevation={1}
            sx={{ p: 4, textAlign: 'center', borderRadius: 3 }} >
            <Typography variant="h6" gutterBottom>
              Información no disponible
            </Typography>

            <Typography color="text.secondary">
              Esta cursada aún no tiene horarios asignados.
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  )
}