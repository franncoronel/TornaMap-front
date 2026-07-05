import { Box, Chip, IconButton, ListItem, Tooltip, Typography } from '@mui/material'
import { Trash } from '@phosphor-icons/react'

interface SubscriptionItemProps {
  title: string
  subtitle?: string
  attributes?: string[]
  detail?: string
  onRemove: () => void
}

export function SubscriptionItem({
  title,
  subtitle,
  attributes,
  detail,
  onRemove
}: SubscriptionItemProps) {
  return (
    <ListItem
      disablePadding
      divider
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 1.5,
        gap: 2
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Tooltip title={title} placement="top-start">
          <Typography fontWeight="bold" noWrap>
            {title}
          </Typography>
        </Tooltip>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {subtitle}
          </Typography>
        )}
        {(attributes || detail) && (
          <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
            {attributes?.map((attr) => (
              <Chip key={attr} label={attr} size="small" variant="outlined" />
            ))}
            {detail && (
              <Typography variant="caption" color="text.secondary">
                {detail}
              </Typography>
            )}
          </Box>
        )}
      </Box>

      <IconButton aria-label="Eliminar" onClick={onRemove} color="error" size="small">
        <Trash size={20} />
      </IconButton>
    </ListItem>
  )
}
