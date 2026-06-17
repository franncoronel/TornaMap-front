import { Card, CardContent, Stack, Typography } from '@mui/material'
import { InstitutionalEvent } from '@/data/domain/Event'
import { CalendarBlank, Clock, MapPinLine} from '@phosphor-icons/react'
import { ChipEventType } from './ChipEventType'
import { formatDateFromBackend } from '@/data/utils/dateUtils'

interface InstitutionalEventCardProps {
  event: InstitutionalEvent
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
            <ChipEventType type={event.type} />
            
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
              {formatDateFromBackend(event.startDate ?? '')}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}