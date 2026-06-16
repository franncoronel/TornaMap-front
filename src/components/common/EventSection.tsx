import { InstitutionalEventCard } from '@/components/common/InstitutionalEventCard'
import { InstitutionalEvent } from '@/data/domain/Event'
import { Accordion, AccordionDetails, AccordionSummary, Grid2, Typography } from '@mui/material'
import { CaretDown } from '@phosphor-icons/react'


interface EventSectionProps {
  title: string
  count: number
  events: InstitutionalEvent[]
  defaultExpanded?: boolean
}

export function EventSection({ title, count, events, defaultExpanded = false }: EventSectionProps) {
  return (
    <Accordion defaultExpanded={defaultExpanded} disableGutters
      sx={{ mb: 2, borderRadius: 2, overflow: 'hidden',
        '&:before': { display: 'none' } }} >
      <AccordionSummary expandIcon={<CaretDown size={18} />} >
        <Typography variant="h6">
          {title} ({count})
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        {events.length === 0 ? (
          <Typography variant="body2" color="text.secondary" >
            No hay eventos para mostrar.
          </Typography>
        ) : (
          <Grid2 container spacing={2}>
            {events.map((event) => (
              <Grid2 key={event.id} size={{ xs: 12, md: 6 }} >
                <InstitutionalEventCard event={event} />
              </Grid2>
            ))}
          </Grid2>
        )}
      </AccordionDetails>
    </Accordion>
  )
}