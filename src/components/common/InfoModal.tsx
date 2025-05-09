import {
  Modal,
  Box,
  Typography,
  Divider,
  IconButton,
  Fade
} from '@mui/material'
import { X } from '@phosphor-icons/react/dist/icons/X'
import { ReactNode } from 'react'

type InfoModalProps = {
  children: ReactNode // Permite múltiples hijos de cualquier tipo
  open: boolean // Propiedad para manejar el estado del Modal
  handleClose: () => void // Función para cerrar el Modal
  title: string
  subtitle?: string
  type: 'course' | 'event' | 'schedule'
}

export default function InfoModal({
  children,
  open,
  handleClose,
  title,
  subtitle
}: InfoModalProps) {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      keepMounted
    >
      <Fade in={open}>
        <Box
          sx={{
            maxHeight: '80vh',
            minHeight: '85vh',
            width: '90vw',
            overflowY: 'hidden',
            borderRadius: '24px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            bgcolor: 'background.paper',
            boxShadow: 3,
            transform: 'translate(-50%, -55%)',
            p: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              p: 2,
              zIndex: 1,
              backgroundColor: 'background.paper'
            }}
          >
            <Typography
              sx={{ display: 'flex', flexDirection: 'column' }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              <span>{title}</span>
              <span>{subtitle}</span>
            </Typography>
            <IconButton
              aria-label="Cerrar Ventana"
              onClick={handleClose}
              edge="end"
            >
              <X weight="bold" />
            </IconButton>
          </Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxHeight: '70vh',
              overflowY: 'auto'
            }}
          >
            {children}
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}
