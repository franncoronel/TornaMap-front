import { Chip, ChipProps } from '@mui/material'
import { InstitutionalEvent } from '@/data/domain/Event'


type EventType = InstitutionalEvent['type']

const getEventTypeColor = (type: EventType): ChipProps['color'] => {
  switch (type) {
    case 'CHARLA': return 'primary'
    case 'SEMINARIO': return 'success'
    case 'CONFERENCIA': return 'warning'
    default: return 'primary'
  }
}

interface EventTypeChipProps {
  type: EventType
}

export function ChipEventType({ type }: EventTypeChipProps) {
  return (
    <Chip 
      label={type} 
      color={getEventTypeColor(type)}
      size="small"
      sx={{ fontWeight: 600 }}
    />
  )
}