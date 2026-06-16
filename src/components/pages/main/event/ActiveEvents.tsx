import { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { CalendarCheck } from '@phosphor-icons/react'
import BackButton from '@/components/common/BackButton'
import { EventSection } from '@/components/common/EventSection'
import '@/styles/interactive-page.css'
import { InstitutionalEventsResponse } from '@/data/domain/Event'
import { eventService } from '@/data/services/EventService'
import { useNotification } from '@/context/NotificationContext'



export default function ActiveEvents() {
  const { setNotificationState } = useNotification()
  const [events, setEvents] = useState<InstitutionalEventsResponse>({
    current: [],
    pendingToday: [],
    finished: [],
    upcoming: [],
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await eventService.getInstitutionalEventsDashboard()

      setEvents(response.data)
    } catch (error) {
      console.error('Error al obtener eventos institucionales', error)
      setNotificationState({
        title: 'Error al obtener eventos institucionales',
        type: 'error',
        description: 'Ocurrió un error al cargar los eventos',
        action: () => {}
      })
    }
  }

  return (
    <Box className="interactive-page">
      <header className="interactive-page-header">
        <BackButton />
        <Stack direction="row" spacing={1} alignItems="center" >
          <CalendarCheck size={32} />
          <Typography variant="h1">
            Eventos En Curso
          </Typography>
        </Stack>
      </header>

      <Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%', pb: 6 }} >
        <Typography variant="body2" color="text.secondary"
                    mb={4}
                    sx={{ textAlign: { xs: 'center', sm: 'left' } }} >
          Visualiza las Charlas, Seminarios y Conferencias registradas en el sistema.
        </Typography>

        <EventSection 
          title="En Curso"
          count={events.current.length}
          events={events.current}
          defaultExpanded/>

        <EventSection
          title="Sin Iniciar"
          count={events.pendingToday.length}
          events={events.pendingToday}/>

        <EventSection
          title="Finalizados"
          count={events.finished.length}
          events={events.finished}/>

        <EventSection
          title="Próximos Eventos"
          count={events.upcoming.length}
          events={events.upcoming}/>
      </Box>
    </Box>
  )
}