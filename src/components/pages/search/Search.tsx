import './search.css'
import '@/styles/interactive-page.css'

import { useEffect, useState } from 'react'
import { useNotification } from '@/context/NotificationContext'
import { useLoader } from '@/context/LoaderContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

import { courseService } from '@/data/services/CourseService'
import { eventService } from '@/data/services/EventService'

import { ICourse, ICourseList } from '@/data/domain/Course'
import { IEventCreate, IEventList } from '@/data/domain/Event'
import { ISchedule } from '@/data/domain/Schedule'

import { WarningCircle, Plus, MapPin } from '@phosphor-icons/react'
import { Box, Divider, Grid2, Tooltip, Typography, Tabs, Tab, Stack} from '@mui/material'
import { Laptop } from '@phosphor-icons/react/dist/icons/Laptop'
import SearchTagsInput from '@/components/common/SearchTagsInput'
import ClassRoomCard from '@/components/common/ClassRoomCard/ClassRoomCard'
import MapSelector from '@/components/common/map/MapSelector'
import InfoModal from '@/components/common/InfoModal'
import CourseModalContent from '@/components/common/CourseModalContent'
import { InstitutionalEventCard } from '@/components/common/InstitutionalEventCard'
import { ChipEventType } from '@/components/common/ChipEventType'
import EventTabs from '@/components/common/EventTabs'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

export default function Search() {
  const [activeTab, setActiveTab] = useState(0)

  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null)
  const [open, setOpen] = useState(false)
  const [courses, setCourses] = useState<ICourseList[]>([])
  const [courseSearchTags, setCourseSearchTags] = useState<string[]>([])

  const [institutionalEvents, setInstitutionalEvents] = useState<IEventList[]>([])
  const [eventSearchTags, setEventSearchTags] = useState<string[]>([])

  // Modal de evento institucional
  const [selectedEvent, setSelectedEvent] = useState<IEventCreate | null>(null)
  const [eventOpen, setEventOpen] = useState(false)
  const { setNotificationState } = useNotification()
  const { setLoader } = useLoader()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()

  const fetchCourses = async (query: string[] = []) => {
    setLoader(true)
    try {
      const response = await courseService.getAll(query)
      setLoader(false)
      setCourses(response.data)
      if (response.data.length === 0) {
        setNotificationState({
          title: 'No se encontraron resultados',
          type: 'info',
          description: 'Intenta con otro término de búsqueda',
          action: () => {}
        })
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
      setNotificationState({
        title: 'Error al obtener cursos',
        type: 'error',
        description: 'Ocurrió un error al cargar los cursos',
        action: () => {}
      })
    } finally {
      setLoader(false)
    }
  }

  const fetchInstitutionalEvents = async (query?: string) => {
    setLoader(true)
    try {
      const response = await eventService.getInstitutionalEvents(query)
      setInstitutionalEvents(response.data)
      if (response.data.length === 0) {
        setNotificationState({
          title: 'No se encontraron eventos',
          type: 'info',
          description: 'No hay eventos institucionales disponibles',
          action: () => {}
        })
      }
    } catch (error) {
      console.error('Error fetching institutional events:', error)
      setNotificationState({
        title: 'Error al obtener eventos',
        type: 'error',
        description: 'Ocurrió un error al cargar los eventos',
        action: () => {}
      })
    } finally {
      setLoader(false)
    }
  }

  const handleOpen = async (course: ICourseList) => {
    try {
      if (!course?.id) {
        setNotificationState({
          title: 'Error: ID indefinido',
          type: 'error',
          description: 'El curso no tiene un ID válido',
          action: () => {}
        })
        return
      }
      setLoader(true)
      const response = await courseService.getById(course.id)
      setSelectedCourse(response.data)
      setOpen(true)
    } catch (error) {
      console.error('Error fetching course details:', error)
      setNotificationState({
        title: 'Error al cargar curso',
        type: 'error',
        description: 'No se pudo obtener la información del curso',
        action: () => {}
      })
    } finally {
      setLoader(false)
    }
  }

  const handleClose = () => {
    setSelectedCourse(null)
    setOpen(false)
  }

  const handleCourseSearch = (tags: string[]) => {
    setCourseSearchTags(tags)
    fetchCourses(tags)
  }

  const handleEventSearch = (tags: string[]) => {
    setEventSearchTags(tags)
    const query = tags.length > 0 ? tags.join(' ') : undefined
    fetchInstitutionalEvents(query)
  }

  // ─── Modal de evento institucional ────────────
  const handleEventOpen = async (eventId: string) => {
    try {
      setLoader(true)
      const response = await eventService.getDetailById(eventId)
      setSelectedEvent(response.data)
      setEventOpen(true)
    } catch (error) {
      console.error('Error fetching event details:', error)
      setNotificationState({
        title: 'Error al cargar evento',
        type: 'error',
        description: 'No se pudo obtener la información del evento',
        action: () => {}
      })
    } finally {
      setLoader(false)
    }
  }

  const handleEventClose = () => {
    setSelectedEvent(null)
    setEventOpen(false)
  }

  useEffect(() => {
    if (activeTab === 0 && courses.length === 0) {
      fetchCourses([])
    }
    if (activeTab === 1 && institutionalEvents.length === 0) {
      fetchInstitutionalEvents()
    }
  }, [activeTab])
  // Obtiene el primer classroomId disponible en los schedules del curso
  const getFirstClassroomId = (): string | undefined => {
    if (!selectedCourse?.events) return undefined
    for (const event of selectedCourse.events) {
      for (const schedule of event.schedules) {
        if (schedule.classroom?.id) return schedule.classroom.id
      }
    }
    return undefined
  }

  const handleReserveClassroom = () => {
    const classroomId = getFirstClassroomId()
    navigate('/evento/agregar', {
      state: {
        courseID: selectedCourse?.id,
        preselectedClassroomId: classroomId
      }
    })
    handleClose()
  }

  const handleSubscribe = () => {
    // Lógica de suscripción existente — completar según el servicio
    setNotificationState({
      title: 'Suscripción',
      description: 'Te suscribiste a la materia correctamente',
      type: 'success'
    })
    handleClose()
  }

  // useEffect(() => {
  //  fetchCourses([])
  // }, [])

  const isAdmin = user?.role === 'ADMIN'

  return (
    <Box className="interactive-page">
      <Box position="sticky" top="0" zIndex="10" bgcolor="background.paper" py="0.75rem">
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{ mb: 1 }}
        >
          <Tab label="Cursos" sx={{ textTransform: 'none', fontWeight: 'bold' }} />
          <Tab label="Eventos" sx={{ textTransform: 'none', fontWeight: 'bold' }} />
        </Tabs>

        {activeTab === 0 && (
          <SearchTagsInput
            onSearch={handleCourseSearch}
            value={courseSearchTags}
            options={courses.map((c) => c.name)}
          />
        )}
        {activeTab === 1 && (
          <SearchTagsInput
            onSearch={handleEventSearch}
            value={eventSearchTags}
            options={institutionalEvents.map((e) => e.name)}
          />
        )}

        <Divider variant="middle" flexItem />
      </Box>

      {/* ═══════════════ SOLAPA CURSOS ═══════════════ */}
      <TabPanel value={activeTab} index={0}>
        <Grid2
          container
          rowSpacing="1rem"
          columnSpacing={{ xs: '2rem', sm: '1.5rem' }}
          columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }}
        >
          {courses.length > 0 &&
            courses.map((course: ICourseList) => (
              <Grid2 size={1} key={course.id}>
                <ClassRoomCard
                  course={course}
                  viewType="standard"
                  onClick={() => handleOpen(course)}
                />
              </Grid2>
            ))}
        </Grid2>

        {courses.length === 0 && (
          <EmptyState message="No se encontraron cursos" />
        )}

        {open && selectedCourse && (
          <InfoModal
            open={open}
            handleClose={handleClose}
            title={selectedCourse.name}

            type="course"
          >
            <section className="class-info-container">
              <Typography variant="h6" fontWeight="medium" px="1rem">
                {selectedCourse?.programs?.map((program) => program).join(', ')}
              </Typography>

              {/* Nuevo componente: cursadas con mapa + exámenes colapsables */}
              <CourseModalContent events={selectedCourse.events} />
            </section>

            {isAuthenticated && (
              <Tooltip title="Agregar evento" arrow placement="top">
                <Plus
                  className="floating-button modal"
                  onClick={() =>
                    navigate('/evento/agregar', {
                      state: { courseID: selectedCourse?.id }
                    })
                  }
                />
              </Tooltip>
            )}
          </InfoModal>
        )}

        {isAuthenticated && (
          <Tooltip
            title="Agregar asignatura"
            arrow
            placement="top"
            enterDelay={500}
            leaveDelay={200}
            slotProps={{
              popper: {
                modifiers: [{ name: 'offset', options: { offset: [0, -8] } }]
              }
            }}
          >
            <Plus
              className="floating-button"
              onClick={() => navigate('/asignatura/agregar')}
              role="button"
              aria-label="Agregar asignatura"
            />
          </Tooltip>
        )}
      </TabPanel>

      {/* ═══════════════ SOLAPA EVENTOS ═══════════════ */}
      <TabPanel value={activeTab} index={1}>
        <Grid2
          container
          rowSpacing="1rem"
          columnSpacing={{ xs: '2rem', sm: '1.5rem' }}
          columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }}
        >
          {institutionalEvents.length > 0 &&
            institutionalEvents.map((event: IEventList) => (
              <Grid2 size={1} key={event.id}>
                <Box onClick={() => handleEventOpen(event.id ?? '')} sx={{ cursor: 'pointer' }}>
                  <InstitutionalEventCard
                    event={{
                      id: event.id ?? '',
                      name: event.name,
                      type: event.type as 'CHARLA' | 'SEMINARIO' | 'CONFERENCIA',
                      details: '',
                      startDate: event.schedules?.[0]?.date?.toString(),
                      startTime: event.schedules?.[0]?.startTime,
                      endTime: event.schedules?.[0]?.endTime,
                      location: event.schedules?.[0]?.classroom?.name,
                      isVirtual: event.schedules?.[0]?.isVirtual ?? false
                    }}
                  />
                </Box>
              </Grid2>
            ))}
        </Grid2>

        {institutionalEvents.length === 0 && (
          <EmptyState message="No se encontraron eventos institucionales" />
        )}

        {/* Modal de evento institucional */}
        {eventOpen && selectedEvent && (
          <InfoModal
            open={eventOpen}
            handleClose={handleEventClose}
            title={selectedEvent.name}
            type="event"
          >
            <Stack spacing={2}>
              <Box>
                <ChipEventType type={selectedEvent.type as 'CHARLA' | 'SEMINARIO' | 'CONFERENCIA'} />
              </Box>

              {selectedEvent.details && (
                <Typography variant="body2" color="text.secondary">
                  {selectedEvent.details}
                </Typography>
              )}

              {selectedEvent.schedules.map((schedule: ISchedule, idx: number) => (
                <Box key={schedule.id ?? idx}>
                  {!schedule.isVirtual ? (
                    <Stack spacing={2}>
                      <Stack
                        direction="row" spacing={1} alignItems="center"
                        sx={{ bgcolor: 'action.hover', borderRadius: '8px', px: 1.5, py: 1 }}
                      >
                        <MapPin size={18} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {schedule.classroom?.name} · Piso {schedule.classroom?.floor} · {schedule.classroom?.building.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                          Cap. {schedule.classroom?.capacity}
                        </Typography>
                      </Stack>
                      <MapSelector
                        building={schedule.classroom?.building.name}
                        level={schedule.classroom?.floor.toString()}
                        classRoom={schedule.classroom?.code}
                      />
                    </Stack>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2, bgcolor: 'action.hover', borderRadius: '8px' }}>
                      <Laptop size={64} color="#2e4b7d" weight="duotone" />
                      <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
                        Clase virtual
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ mt: 2 }}>
                    <ClassRoomCard schedule={schedule} viewType="modal" />
                  </Box>
                </Box>
              ))}
            </Stack>
          </InfoModal>
        )}

        {isAuthenticated && (
          <Tooltip
            title="Agregar evento"
            arrow
            placement="top"
            enterDelay={500}
            leaveDelay={200}
            slotProps={{
              popper: {
                modifiers: [{ name: 'offset', options: { offset: [0, -8] } }]
              }
            }}
          >
            <Plus
              className="floating-button"
              onClick={() => navigate('/evento/agregar', {
                state: { defaultType: 'CHARLA' }
              })}
              role="button"
              aria-label="Agregar evento"
            />
          </Tooltip>
        )}
      </TabPanel>

      {/* Modal detalle del curso */}
      {open && selectedCourse && (
        <InfoModal
          open={open}
          handleClose={handleClose}
          title={selectedCourse.name}
          subtitle="Cursadas y eventos"
          type="event"
          onSubscribe={handleSubscribe}
          onReserveClassroom={handleReserveClassroom}
        >
          <section className="class-info-container">
            <Typography variant="h6" fontWeight="medium" px="1rem">
              {selectedCourse?.programs?.map((program) => program).join(', ')}
            </Typography>
            <EventTabs events={selectedCourse.events} />
          </section>

          {/* Botón flotante "+" para admin: navegar a agregar evento */}
          {isAuthenticated && isAdmin && (
            <Tooltip title="Agregar evento" arrow placement="top">
              <Plus
                className="floating-button modal"
                onClick={() =>
                  navigate('/evento/agregar', {
                    state: { courseID: selectedCourse?.id }
                  })
                }
              />
            </Tooltip>
          )}
        </InfoModal>
      )}

      {/* Botón flotante "+" para admin: agregar asignatura */}
      {isAuthenticated && isAdmin && (
        <Tooltip
          title="Agregar asignatura"
          arrow
          placement="top"
          enterDelay={500}
          leaveDelay={200}
          slotProps={{
            popper: {
              modifiers: [{ name: 'offset', options: { offset: [0, -8] } }]
            }
          }}
        >
          <Plus
            className="floating-button"
            onClick={() => navigate('/asignatura/agregar')}
            role="button"
            aria-label="Agregar asignatura"
          />
        </Tooltip>
      )}
    </Box>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        gap: '1rem',
        py: 4
      }}
    >
      <WarningCircle size={32} color="#FFB74D" />
      <Typography
        variant="h6"
        sx={{
          color: '#333',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}
      >
        {message}
      </Typography>
    </Box>
  )
}