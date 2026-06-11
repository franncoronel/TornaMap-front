import { Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import { InstitutionalEvent } from '@/data/domain/Event'
import { CalendarBlank, Clock, MapPinLine} from '@phosphor-icons/react'

interface InstitutionalEventCardProps {
  event: InstitutionalEvent
}

const getEventTypeColor = ( type: InstitutionalEvent['type'] ): 'primary' | 'success' | 'warning' => {
  switch (type) {
    case 'CHARLA': return 'primary'
    case 'SEMINARIO': return 'success'
    case 'CONFERENCIA': return 'warning'
    default: return 'primary'
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-AR')
}

export function InstitutionalEventCard({ event }: InstitutionalEventCardProps) {
  return (
    <Card variant="outlined"
      sx={{ height: '100%', borderRadius: 2, transition: '0.2s', 
            '&:hover': { boxShadow: 3 } }} >
      <CardContent>
        <Stack spacing={2}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" >
            <Chip label={event.type} 
                  color={getEventTypeColor(event.type)}
                  size="small"
                  sx={{ fontWeight: 600 }} />

            <Stack direction="row" spacing={0.5} alignItems="center" >
              <Clock size={20}/>
              <Typography variant="body2">
                {event.startTime} - {event.endTime}
              </Typography>
            </Stack>
          </Stack>

          {/* Nombre */}
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }} >
            {event.name}
          </Typography>

          {/* Locacion */}
          <Stack direction="row"  spacing={1} alignItems="center"
              sx={{  minHeight: 24, color: 'text.secondary' }} >
              <MapPinLine size={20} />
              <Typography variant="body2">
                {event.location ?? ' '}
              </Typography>
          </Stack>

          {/* Fecha */}
          <Stack  direction="row" spacing={1} alignItems="center" >
            <CalendarBlank size={20} />
            <Typography variant="body2">
              {formatDate(event.startDate ?? '')}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}