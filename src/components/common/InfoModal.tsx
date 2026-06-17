import {
  Modal,
  Box,
  Typography,
  IconButton,
  Fade,
  Button,
  useMediaQuery,
  useTheme,
  Tooltip
} from '@mui/material'
import { ReactNode, useRef, useCallback, useEffect } from 'react'
import { useState } from 'react'
import { Bell, X, BookBookmark, CalendarPlus } from '@phosphor-icons/react'
import { useAuth } from '@/context/AuthContext'
import NewsletterPopover from './NewsletterPopover'
import { useNavigate } from 'react-router-dom'
import { IPossibleReservation } from '@/data/domain/ClassroomReservation'

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
  onReserveClassroom?: () => void
  possibleReservationData?: IPossibleReservation
}

export default function InfoModal({
  children,
  open,
  handleClose,
  title,
  subtitle,
  capacity,
  type,
  onSubscribe = () => {},
  onSubscribeNewsletter = () => {},
  possibleReservationData
}: InfoModalProps) {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  // Scroll shadow state
  const [hasScrolled, setHasScrolled] = useState(false)
  const [canScrollMore, setCanScrollMore] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleBellClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handlePopoverClose = () => setAnchorEl(null)



  // Track scroll position for shadow indicators
  const updateScrollShadows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setHasScrolled(el.scrollTop > 8)
    setCanScrollMore(el.scrollTop + el.clientHeight < el.scrollHeight - 8)
  }, [])

  useEffect(() => {
    if (!open) return
    // Small delay to let content render
    const timer = setTimeout(updateScrollShadows, 100)
    return () => clearTimeout(timer)
  }, [open, updateScrollShadows])
  const isStudent = user?.role === 'STUDENT'
  const isProfessor = user?.role === 'PROFESSOR'

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)'
          }
        }
      }}
    >
      <Fade in={open} timeout={250}>
        <Box
          sx={{
            // ─── Responsive sizing ───
            width: isMobile ? '95vw' : '80vw',
            maxWidth: 960,
            maxHeight: '85vh',
            minHeight: isMobile ? '70vh' : 'auto',

            // ─── Positioning ───
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',

            // ─── Appearance ───
            bgcolor: 'background.paper',
            borderRadius: isMobile ? '16px' : '20px',
            boxShadow:
              '0 24px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',

            // ─── Focus outline ───
            outline: 'none'
          }}
        >
          {/* ═══════════════ HEADER ═══════════════ */}
          <Box
            sx={{
              px: isMobile ? 2 : 3,
              pt: isMobile ? 2 : 2.5,
              pb: 2,
              flexShrink: 0,
              position: 'relative',
              // Shadow que aparece al scrollear, indica que hay contenido arriba
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: "1px",
                bgcolor: 'divider',
                opacity: hasScrolled ? 1 : 0.4,
                transition: 'opacity 0.2s ease'
              }
            }}
          >
            {/* Close button — siempre arriba a la derecha */}
            <IconButton
              aria-label="Cerrar"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: isMobile ? 8 : 12,
                right: isMobile ? 8 : 12,
                bgcolor: 'action.hover',
                width: 36,
                height: 36,
                zIndex: 10,
                '&:hover': {
                  bgcolor: 'action.selected'
                }
              }}
            >
              <X size={18} weight="bold" />
            </IconButton>

            {/* Title block */}
            <Box sx={{ pr: 5 }}>
              <Typography
                id="modal-modal-title"
                variant={isMobile ? 'h6' : 'h5'}
                component="h2"
                fontWeight={700}
                sx={{
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em'
                }}
              >
                {title}
              </Typography>

              {/* Subtitle + capacity row */}
              {(subtitle || capacity) && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 1,
                    mt: 0.5
                  }}
                >
                  {subtitle && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      {subtitle}
                    </Typography>
                  )}
                  {subtitle && capacity && (
                    <Box
                      sx={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        bgcolor: 'text.disabled'
                      }}
                    />
                  )}
                  {capacity && (
                    <Typography variant="body2" color="text.secondary">
                      {capacity} personas
                    </Typography>
                  )}
                </Box>
              )}
            </Box>

            {/* Botones */}
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5}}
            >
              {/* No logueado: solo campana newsletter, sin botón suscribirse */}
              {!isAuthenticated && type === 'event' && (
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

              {/* Estudiante: botón suscribirse activo */}
              {isAuthenticated && isStudent && type === 'event' && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={onSubscribe}
                  disableElevation
                  startIcon={<BookBookmark size={18} />}
                  sx={{
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 2
                  }}
                >
                  Suscribirse
                </Button>
              )}

              {/* Newsletter — no logueados */}
              {!isAuthenticated && (
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleBellClick}
                    startIcon={<Bell size={18} />}
                    sx={{
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 2
                    }}
                  >
                    Newsletter
                  </Button>
                  <NewsletterPopover
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    onSubmit={onSubscribeNewsletter}
                  />
                </>
              )}
              {/* Profesor: botón reservar aula, solo en cards de aulas */}
              {isAuthenticated && isProfessor && type === 'schedule' && (
                <Tooltip title="Crear un evento en esta aula" arrow>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    startIcon={<CalendarPlus size={18} />}
                    sx={{ borderRadius: '999px' }}
                    onClick={() => {
                      if (!possibleReservationData) return
                      handleClose()
                      navigate('/reserva/agregar', {
                        state: possibleReservationData
                      })
                    }}
                  >
                    Reservar aula
                  </Button>
                </Tooltip>
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

          {/* ═══════════════ SCROLLABLE CONTENT ═══════════════ */}
          <Box
            ref={scrollRef}
            onScroll={updateScrollShadows}
            sx={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              px: isMobile ? 2 : 3,
              py: 2,
              pb: 4,
              position: 'relative',

              // Smooth scroll
              scrollBehavior: 'smooth',

              // Scrollbar styling
              '&::-webkit-scrollbar': {
                width: 6
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(0,0,0,0.15)',
                borderRadius: 3,
                '&:hover': {
                  background: 'rgba(0,0,0,0.25)'
                }
              }
            }}
          >
            {children}
          </Box>

          {/* ═══════════ BOTTOM FADE — indica que hay más contenido ═══════════ */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 48,
              background: canScrollMore
                ? 'linear-gradient(transparent, var(--mui-palette-background-paper, #fff))'
                : 'none',
              pointerEvents: 'none',
              transition: 'opacity 0.3s ease',
              opacity: canScrollMore ? 1 : 0,
              borderRadius: '0 0 20px 20px'
            }}
          />
        </Box>
      </Fade>
    </Modal>
  )
}
