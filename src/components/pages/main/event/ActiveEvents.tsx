import { Box, Stack, Typography } from '@mui/material'
import { CalendarCheck } from '@phosphor-icons/react'

import { todayEvents, finishedTodayEvents, upcomingEvents } from '@/data/mock/ActiveEvents'

import BackButton from '@/components/common/BackButton'
import { EventSection } from '@/components/common/EventSection'
import '@/styles/interactive-page.css'


export default function ActiveEvents() {
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
          title="En Curso Hoy"
          count={todayEvents.length}
          events={todayEvents}
          defaultExpanded/>

        <EventSection
          title="Finalizados Hoy"
          count={finishedTodayEvents.length}
          events={finishedTodayEvents}/>

        <EventSection
          title="Próximos Eventos"
          count={upcomingEvents.length}
          events={upcomingEvents}/>
      </Box>
    </Box>
  )
}