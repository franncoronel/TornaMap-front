// Hooks
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '@/context/NotificationContext'

// Components
import MapSelector from '@/components/common/map/MapSelector'
import ClassRoomCard from '@/components/common/ClassRoomCard/ClassRoomCard'

// Material UI
import { Box, Tabs, Tab, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip, Divider, Chip } from '@mui/material'
import { PencilSimple } from '@phosphor-icons/react/dist/ssr/PencilSimple'
import { Laptop } from '@phosphor-icons/react/dist/icons/Laptop'
import { Share } from '@phosphor-icons/react'

// Interfaces
import { ISchedule } from '@/data/domain/Schedule'
import { IEvent, ACADEMIC_TYPES } from '@/data/domain/Event'

// Styles
import '../pages/search/search.css'

// Utils
import { format, parseISO } from 'date-fns'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

// ─── Chip de tipo de evento ───────────────────────
const TYPE_LABELS: Record<string, string> = {
  CURSADA: 'Cursada',
  PARCIAL: 'Parcial',
  FINAL: 'Final'
}

const TYPE_COLORS: Record<string, 'default' | 'primary' | 'error' | 'warning'> = {
  CURSADA: 'primary',
  PARCIAL: 'warning',
  FINAL: 'error'
}

export default function EventTabs({ events }: { events: IEvent[] }) {
  const [tabStates, setTabStates] = useState<{ [eventId: string]: number }>({})
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [currentEventId, setCurrentEventId] = useState<string>('')

  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const isAdmin = user?.role === 'ADMIN'
  const { setNotificationState } = useNotification()

  // Filtrar solo eventos académicos (CURSADA, PARCIAL, FINAL)
  const academicEvents = events.filter(
    (e) => ACADEMIC_TYPES.includes(e.type)
  )

  const handleTabChange = (eventId: string, newValue: number) => {
    setTabStates((prev) => ({
      ...prev,
      [eventId]: newValue
    }))
  }

  const handleCopyLink = async () => {
    const link = `${window.location.origin}/evento/${currentEventId}`
    try {
      await navigator.clipboard.writeText(link)
      setNotificationState({
        title: 'Enlace copiado',
        description: 'El enlace se ha copiado al portapapeles.',
        type: 'success'
      })
    } catch (err) {
      setNotificationState({
        title: 'Error',
        description: 'No se pudo copiar el enlace.',
        type: 'error'
      })
    }
  }

  const createLabel = (schedule: ISchedule) => {
    if (!schedule.weekDay && !schedule.date) {
      return 'Sin fecha'
    }
    if (schedule.weekDay) {
      return schedule.weekDay
    }
    return buildDateString(schedule)
  }

  const buildDateString = (schedule: ISchedule) => {
    const date = parseISO(schedule.date?.toString() ?? '')
    return format(date, 'dd/MM')
  }

  if (academicEvents.length === 0) {
    return (
      <Box sx={{ py: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Este curso no tiene eventos académicos asociados.
        </Typography>
      </Box>
    )
  }

  return (
    <>
      {academicEvents.map((event) => {
        const activeTab = tabStates[event.id ?? 0] || 0
        return (
          <Box
            key={event.id}
            sx={{ mb: 4, position: 'relative', width: '100%' }}
          >
            {/* Header del evento con nombre y chip de tipo */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 0.5 }}>
              <Typography
                variant="h6"
                sx={{ textAlign: 'center', fontWeight: 'bold' }}
              >
                {event.name}
              </Typography>
              <Chip
                label={TYPE_LABELS[event.type] ?? event.type}
                color={TYPE_COLORS[event.type] ?? 'default'}
                size="small"
                sx={{ fontWeight: 600 }}
              />
            </Box>

            {isAuthenticated && isAdmin && (
              <IconButton
                onClick={() => navigate(`/evento/editar/${event.id}`)}
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 50,
                  padding: 0,
                  zIndex: 2
                }}
                aria-label="Editar"
              >
                <PencilSimple size={24} />
              </IconButton>
            )}
            <Tooltip title="Compartir" arrow>
              <IconButton
                onClick={() => {
                  setCurrentEventId(event.id ?? '')
                  setShareModalOpen(true)
                }}
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 15,
                  padding: 0,
                  zIndex: 2
                }}
                aria-label="Compartir"
              >
                <Share size={27} />
              </IconButton>
            </Tooltip>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={activeTab}
                onChange={(_, newValue) =>
                  handleTabChange(event.id ?? '', newValue)
                }
                variant="fullWidth"
              >
                {event.schedules.map((schedule: ISchedule) => (
                  <Tab
                    key={schedule.id}
                    label={createLabel(schedule)}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 'bold'
                    }}
                  />
                ))}
              </Tabs>
            </Box>
            {event.schedules.map((schedule: ISchedule, index) => (
              <CustomTabPanel key={schedule.id} value={activeTab} index={index}>
                <section className="schedules-list-container">
                  <div
                    className={`schedules-list ${event.schedules.length == 1 ? 'single' : ''}`}
                  >
                    {!schedule.isVirtual ? (
                      <article className="schedules-list-item">
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                          sx={{
                            textAlign: 'center',
                            wordBreak: 'break-word',
                            whiteSpace: 'normal'
                          }}
                        >
                          / {schedule.classroom?.name} / Piso{' '}
                          {schedule.classroom?.floor} /{' '}
                          {schedule.classroom?.building.name} / Capacidad:{' '}
                          {schedule.classroom?.capacity}
                        </Typography>
                        <MapSelector
                          building={schedule.classroom?.building.name}
                          level={schedule.classroom?.floor.toString()}
                          classRoom={schedule.classroom?.code}
                        />
                      </article>
                    ) : (
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                          sx={{
                            textAlign: 'center',
                            wordBreak: 'break-word',
                            whiteSpace: 'normal'
                          }}
                        >
                          Esta clase se dicta de forma virtual
                        </Typography>
                        <Laptop size={150} color="#2e4b7d" weight="duotone" />
                      </Box>
                    )}
                    <ClassRoomCard schedule={schedule} viewType="modal" />
                  </div>
                </section>
              </CustomTabPanel>
            ))}
          </Box>
        )
      })}
      <Dialog
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        PaperProps={{ sx: { borderRadius: 2, boxShadow: 6 } }}
      >
        <DialogTitle sx={{ pb: 1.5 }}>Compartir Evento</DialogTitle>
        <DialogContent>
          <Divider sx={{ mb: 1 }} />
          <Typography sx={{ mb: 1 }}>Link para compartir:</Typography>
          <Typography
            variant="body2"
            sx={{
              wordBreak: 'break-all',
              backgroundColor: '#f5f5f5',
              padding: 1,
              borderRadius: 2
            }}
          >
            {window.location.origin}/evento/{currentEventId}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ textTransform: 'none' }}
            onClick={handleCopyLink}
          >
            Copiar Link
          </Button>
          <Button
            sx={{ textTransform: 'none' }}
            onClick={() => setShareModalOpen(false)}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}