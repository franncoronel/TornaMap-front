import {
  Modal,
  Box,
  Typography,
  Divider,
  IconButton,
  Fade,
  Tooltip,
  Button
} from '@mui/material'
import { ReactNode, useState } from 'react'
import { Bell, X } from '@phosphor-icons/react'
import { useAuth } from '@/context/AuthContext'
import NewsletterPopover from './NewsletterPopover' // ajustá el path si es necesario

type InfoModalProps = {
  children: ReactNode
  open: boolean
  handleClose: () => void
  title: string
  subtitle?: string
  capacity?: string
  type: 'course' | 'event' | 'schedule'
  onSubscribe?: () => void
  onSubscribeNewsletter?: (email: string) => void
}

export default function InfoModal({
  children,
  open,
  handleClose,
  title,
  subtitle,
  capacity,
  onSubscribe = () => {},
  onSubscribeNewsletter = () => {}
}: InfoModalProps) {
  const { isAuthenticated } = useAuth()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleBellClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handlePopoverClose = () => setAnchorEl(null)

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
            {/* Título y subtítulo */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" component="h2" fontWeight="bold">
                  {title}
                </Typography>
                {capacity && (
                  <Box
                    sx={{
                      px: 1,
                      py: 0.25,
                      borderRadius: '999px',
                      backgroundColor: 'action.hover',
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Capacidad: {capacity} personas
                    </Typography>
                  </Box>
                )}
              </Box>
              {subtitle && (
                <Typography variant="subtitle1" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>

            {/* Botones */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
             {/* Campana newsletter - solo para no logueados */}
              {!isAuthenticated && (
                <Tooltip title="Suscribirse al newsletter">
                  <IconButton
                    aria-label="Suscribirse al newsletter"
                    color="secondary"
                    onClick={handleBellClick}
                  >
                    <Bell size={24} />
                  </IconButton>
                </Tooltip>
              )}

              <NewsletterPopover
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                onSubmit={onSubscribeNewsletter}
              />

              {/* Suscripción al curso/evento - solo logueados */}
              {isAuthenticated && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={onSubscribe}
                  sx={{ borderRadius: '999px' }}
                >
                  Suscribirse
                </Button>
              )}

              <IconButton
                aria-label="Cerrar Ventana"
                onClick={handleClose}
                edge="end"
              >
                <X weight="bold" />
              </IconButton>
            </Box>

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