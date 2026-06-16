import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '@/context/NotificationContext'

import MapSelector from '@/components/common/map/MapSelector'
import ClassRoomCard from '@/components/common/ClassRoomCard/ClassRoomCard'

import {
  Box,
  Typography,
  IconButton,
  Chip,
  Stack,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Tooltip,
  Tabs,
  Tab
} from '@mui/material'
import { PencilSimple } from '@phosphor-icons/react/dist/ssr/PencilSimple'
import { Laptop } from '@phosphor-icons/react/dist/icons/Laptop'
import { Share, CaretDown, Clock, MapPin, CalendarBlank } from '@phosphor-icons/react'

import { IEvent, ACADEMIC_TYPES } from '@/data/domain/Event'
import { ISchedule } from '@/data/domain/Schedule'
import { format, parseISO } from 'date-fns'

import '../pages/search/search.css'

/* ─── Helpers ─────────────────────────────────── */
const summarizeSchedules = (schedules: ISchedule[]): string => {
  if (schedules.length === 0) return 'Sin horarios'

  const parts = schedules.map((s) => {
    const day = s.weekDay ?? (s.date ? formatDate(s.date) : '')
    const time = s.startTime && s.endTime ? `${s.startTime}–${s.endTime}` : ''
    return [day, time].filter(Boolean).join(' ')
  })

  return parts.join(' · ')
}

const formatDate = (date: string | Date) => {
  try {
    if (date instanceof Date) return format(date, 'dd/MM')
    return format(parseISO(date), 'dd/MM')
  } catch {
    return String(date)
  }
}

const summarizeLocation = (schedules: ISchedule[]): string | null => {
  const locations = schedules
    .filter((s) => !s.isVirtual && s.classroom)
    .map((s) => s.classroom!.name)
  const virtuals = schedules.filter((s) => s.isVirtual).length

  const parts: string[] = []
  if (locations.length > 0) parts.push([...new Set(locations)].join(', '))
  if (virtuals > 0) parts.push('Virtual')
  return parts.length > 0 ? parts.join(' · ') : null
}

const getEventDate = (schedules: ISchedule[]): string | null => {
  if (schedules.length === 0) return null
  const s = schedules[0]
  if (s.weekDay) return s.weekDay
  if (!s.date) return null
  return formatDate(s.date)
}

/* ─── Main component ──────────────────────────── */
interface CourseEventsPanelProps {
  events: IEvent[]
}

export default function CourseEventsPanel({ events }: CourseEventsPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [currentEventId, setCurrentEventId] = useState('')

  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { setNotificationState } = useNotification()

  const academicEvents = events.filter((e) => ACADEMIC_TYPES.includes(e.type))

  // Group: Cursadas y Eventos (parciales + finales juntos)
  const cursadas = academicEvents.filter((e) => e.type === 'CURSADA')
  const eventos  = academicEvents.filter((e) => e.type === 'PARCIAL' || e.type === 'FINAL')

  const grouped = [
    { groupLabel: 'Cursadas', color: 'primary' as const, events: cursadas },
    { groupLabel: 'Eventos',  color: 'warning' as const, events: eventos },
  ].filter((g) => g.events.length > 0)

  const toggleExpand = (eventId: string) => {
    setExpandedId((prev) => (prev === eventId ? null : eventId))
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
    } catch (_err) {
      setNotificationState({
        title: 'Error',
        description: 'No se pudo copiar el enlace.',
        type: 'error'
      })
    }
  }

  if (academicEvents.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Este curso aún no tiene eventos asociados.
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Stack spacing={3}>
        {grouped.map(({ groupLabel, color, events: groupEvents }) => (
          <Box key={groupLabel}>
            {/* Group header */}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'text.secondary',
                  fontWeight: 700,
                  fontSize: '0.75rem'
                }}
              >
                {groupLabel}
              </Typography>
              <Chip
                label={groupEvents.length}
                size="small"
                color={color}
                sx={{
                  height: 20,
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  '& .MuiChip-label': { px: 1 }
                }}
              />
            </Stack>

            {/* Event cards */}
            <Stack spacing={1.5}>
              {groupEvents.map((event) => {
                const isExpanded = expandedId === event.id
                const locationSummary = summarizeLocation(event.schedules)

                return (
                  <Box
                    key={event.id}
                    sx={{
                      border: '1px solid',
                      borderColor: isExpanded ? `${color}.main` : 'divider',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                      boxShadow: isExpanded
                        ? '0 2px 12px rgba(0,0,0,0.08)'
                        : 'none',
                      '&:hover': {
                        borderColor: isExpanded ? undefined : 'action.disabled',
                        boxShadow: '0 1px 6px rgba(0,0,0,0.05)'
                      }
                    }}
                  >
                    {/* ── Compact card (always visible) ── */}
                    <Box
                      onClick={() => toggleExpand(event.id!)}
                      sx={{
                        px: 2,
                        py: 1.5,
                        cursor: 'pointer',
                        userSelect: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        '&:hover': { bgcolor: 'action.hover' }
                      }}
                    >
                      {/* Left: info */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 600,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {event.name}
                          </Typography>
                        </Stack>

                        {/* Schedule + location summary */}
                        <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ gap: 0.5 }}>
                          {getEventDate(event.schedules) && (
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <CalendarBlank size={14} color="gray" />
                              <Typography variant="caption" color="text.secondary">
                                {getEventDate(event.schedules)}
                              </Typography>
                            </Stack>
                          )}
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Clock size={14} color="gray" />
                            <Typography variant="caption" color="text.secondary">
                              {summarizeSchedules(event.schedules)}
                            </Typography>
                          </Stack>
                          {locationSummary && (
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <MapPin size={14} color="gray" />
                              <Typography variant="caption" color="text.secondary">
                                {locationSummary}
                              </Typography>
                            </Stack>
                          )}
                        </Stack>
                      </Box>

                      {/* Right: actions + caret */}
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        {isAuthenticated && (
                          <Tooltip title="Editar" arrow>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/evento/editar/${event.id}`)
                              }}
                            >
                              <PencilSimple size={18} />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Compartir" arrow>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentEventId(event.id ?? '')
                              setShareModalOpen(true)
                            }}
                          >
                            <Share size={18} />
                          </IconButton>
                        </Tooltip>
                        <CaretDown
                          size={18}
                          style={{
                            transition: 'transform 0.2s ease',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            color: 'gray',
                            flexShrink: 0
                          }}
                        />
                      </Stack>
                    </Box>

                    {/* ── Expanded detail ── */}
                    <Collapse in={isExpanded} timeout={250}>
                      <ExpandedEventDetail event={event} />
                    </Collapse>
                  </Box>
                )
              })}
            </Stack>
          </Box>
        ))}
      </Stack>

      {/* Share dialog */}
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

/* ─── Expanded detail subcomponent ────────────── */
function ExpandedEventDetail({ event }: { event: IEvent }) {
  const [activeTab, setActiveTab] = useState(0)

  if (event.schedules.length === 0) {
    return (
      <Box sx={{ px: 2, pb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Sin horarios asignados.
        </Typography>
      </Box>
    )
  }

  const createLabel = (schedule: ISchedule) => {
    if (!schedule.weekDay && !schedule.date) return 'Sin fecha'
    if (schedule.weekDay) return schedule.weekDay
    try {
      return format(parseISO(schedule.date?.toString() ?? ''), 'dd/MM')
    } catch {
      return 'Fecha'
    }
  }

  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
      {/* Schedule tabs — only if more than one */}
      {event.schedules.length > 1 && (
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          variant="fullWidth"
          sx={{
            minHeight: 36,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              minHeight: 36,
              fontSize: '0.85rem'
            }
          }}
        >
          {event.schedules.map((s) => (
            <Tab key={s.id} label={createLabel(s)} />
          ))}
        </Tabs>
      )}

      {/* Schedule content */}
      {event.schedules.map((schedule, idx) => (
        <Box
          key={schedule.id}
          hidden={idx !== activeTab}
          sx={{ p: 2 }}
        >
          {idx === activeTab && (
            <Stack spacing={2}>
              {!schedule.isVirtual ? (
                <>
                  {/* Location info */}
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                      bgcolor: 'action.hover',
                      borderRadius: '8px',
                      px: 1.5,
                      py: 1
                    }}
                  >
                    <MapPin size={18} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {schedule.classroom?.name} · Piso {schedule.classroom?.floor} · {schedule.classroom?.building.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                      Cap. {schedule.classroom?.capacity}
                    </Typography>
                  </Stack>

                  {/* Map */}
                  <MapSelector
                    building={schedule.classroom?.building.name}
                    level={schedule.classroom?.floor.toString()}
                    classRoom={schedule.classroom?.code}
                  />
                </>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 2,
                    bgcolor: 'action.hover',
                    borderRadius: '8px'
                  }}
                >
                  <Laptop size={64} color="#2e4b7d" weight="duotone" />
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, fontWeight: 500 }}
                  >
                    Clase virtual
                  </Typography>
                </Box>
              )}

              <ClassRoomCard schedule={schedule} viewType="modal" />
            </Stack>
          )}
        </Box>
      ))}
    </Box>
  )
}