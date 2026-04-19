// Hooks
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '@/context/NotificationContext'

// Components
import MapSelector from '@/components/common/map/MapSelector'
import ClassRoomCard from '@/components/common/ClassRoomCard/ClassRoomCard'

// Material UI
import { Box, Tabs, Tab, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { PencilSimple } from '@phosphor-icons/react/dist/ssr/PencilSimple'
import { Laptop } from '@phosphor-icons/react/dist/icons/Laptop'
import { Share } from '@phosphor-icons/react'

// Interfaces
import { ISchedule } from '@/data/domain/Schedule'
import { IEvent } from '@/data/domain/Event'

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

export default function EventTabs({ events }: { events: IEvent[] }) {
  const [tabStates, setTabStates] = useState<{ [eventId: string]: number }>({})
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [currentEventId, setCurrentEventId] = useState<string>('')

  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { setNotificationState } = useNotification()

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
    // schedule.date es un ISO-string: "2025-05-01"
    const date = parseISO(schedule.date?.toString() ?? '') // ✅ no aplica zona

    return format(date, 'dd/MM') // 01/05
  }

  return (
    <>
      {events.map((event) => {
        const activeTab = tabStates[event.id ?? 0] || 0 // Índice de la pestaña activa para este evento
        return (
          <Box
            key={event.id}
            sx={{ mb: 4, position: 'relative', width: '100%' }}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                width: '100%'
              }}
            >
              {event.name}
            </Typography>
            {isAuthenticated && (
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
              <Share size={24} />
            </IconButton>
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
                          {schedule.classroom?.name} / Piso{' '}
                          {schedule.classroom?.floor} /{' '}
                          {schedule.classroom?.building.name}
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
      <Dialog open={shareModalOpen} onClose={() => setShareModalOpen(false)}>
        <DialogTitle>Compartir Evento</DialogTitle>
        <DialogContent>
          <Typography>
            Link para compartir: {window.location.origin}/evento/{currentEventId}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCopyLink}>Copiar Link</Button>
          <Button onClick={() => setShareModalOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
