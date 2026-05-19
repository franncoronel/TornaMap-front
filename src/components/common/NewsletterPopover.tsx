import {
  Popover,
  Box,
  Typography,
  TextField,
  Button
} from '@mui/material'
import { useState } from 'react'

type NewsletterPopoverProps = {
  anchorEl: HTMLButtonElement | null
  onClose: () => void
  onSubmit: (email: string) => void
}

export default function NewsletterPopover({
  anchorEl,
  onClose,
  onSubmit
}: NewsletterPopoverProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!email.includes('@')) {
      setError('Ingresá un email válido')
      return
    }
    onSubmit(email)
    setEmail('')
    setError('')
    onClose()
  }

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5, width: 280 }}>
        <Typography variant="subtitle2" fontWeight="bold">
          Suscribirse al newsletter
        </Typography>
        <TextField
          size="small"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError('')
          }}
          error={Boolean(error)}
          helperText={error}
        />
        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          sx={{ borderRadius: '999px' }}
        >
          Confirmar
        </Button>
      </Box>
    </Popover>
  )
}