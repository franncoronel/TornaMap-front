import { useState } from 'react'
import { Box, Typography, List } from '@mui/material'
import { SubscriptionItem } from './SubscriptionItem'
import DeleteModal from '@/components/common/DeleteModal'

// Forma común a la que cada sección normaliza sus datos
export interface ProfileListEntry {
  id: string | number
  title: string
  subtitle?: string
  attributes?: string[]
  detail?: string
}

interface ProfileListSectionProps {
  heading: string
  emptyMessage: string
  items: ProfileListEntry[]
  onRemove: (id: string | number) => void
  removeLabel: string // "esta suscripción" / "esta reserva"
}

export function ProfileListSection({
  heading,
  emptyMessage,
  items,
  onRemove,
  removeLabel
}: ProfileListSectionProps) {
  const [pending, setPending] = useState<ProfileListEntry | null>(null)

  const handleConfirm = () => {
    if (pending) onRemove(pending.id)
    setPending(null)
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1024,
        mx: 'auto',
        px: { xs: 2, sm: 3 },
        mb: 4
      }}
    >
      <Typography variant="h3" gutterBottom>
        {heading}
      </Typography>

      {items.length === 0 ? (
        <Typography color="secondary">{emptyMessage}</Typography>
      ) : (
        <List disablePadding>
          {items.map((entry) => (
            <SubscriptionItem
              key={entry.id}
              title={entry.title}
              subtitle={entry.subtitle}
              attributes={entry.attributes}
              detail={entry.detail}
              onRemove={() => setPending(entry)}
            />
          ))}
        </List>
      )}

      <DeleteModal
        open={pending !== null}
        value={removeLabel}
        onConfirm={handleConfirm}
        onCancel={() => setPending(null)}
      />
    </Box>
  )
}
