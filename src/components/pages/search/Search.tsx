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
import { IEventList } from '@/data/domain/Event'

import { WarningCircle, Plus } from '@phosphor-icons/react'
import { Box, Divider, Grid2, Tooltip, Typography, Tabs, Tab } from '@mui/material'
import SearchTagsInput from '@/components/common/SearchTagsInput'
import ClassRoomCard from '@/components/common/ClassRoomCard/ClassRoomCard'
import InfoModal from '@/components/common/InfoModal'
import EventTabs from '@/components/common/EventTabs'
import { InstitutionalEventCard } from '@/components/common/InstitutionalEventCard'

// ─── Tab panel genérico ───────────────────────────────
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

// ─── Componente principal ─────────────────────────────
export default function Search() {
  // Solapa activa: 0 = Cursos, 1 = Eventos
  const [activeTab, setActiveTab] = useState(0)

  // Estado de cursos (solapa 0)
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null)
  const [open, setOpen] = useState(false)
  const [courses, setCourses] = useState<ICourseList[]>([])
  const [courseSearchTags, setCourseSearchTags] = useState<string[]>([])

  // Estado de eventos institucionales (solapa 1)
  const [institutionalEvents, setInstitutionalEvents] = useState<IEventList[]>([])
  const [eventSearchTags, setEventSearchTags] = useState<string[]>([])

  const { setNotificationState } = useNotification()
  const { setLoader } = useLoader()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  // ─── Fetch cursos ─────────────────────────────────
  const fetchCourses = async (query: string[] = []) => {
    setLoader(true)
    try {
      const response = await courseService.getAll(query)
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

  // ─── Fetch eventos institucionales ────────────────
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

  // ─── Handlers de modal de curso ───────────────────
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

  // ─── Búsquedas según solapa ───────────────────────
  const handleCourseSearch = (tags: string[]) => {
    setCourseSearchTags(tags)
    fetchCourses(tags)
  }

  const handleEventSearch = (tags: string[]) => {
    setEventSearchTags(tags)
    // Usamos el primer tag como query; si no hay tags, traemos todos
    const query = tags.length > 0 ? tags.join(' ') : undefined
    fetchInstitutionalEvents(query)
  }

  // ─── Carga inicial según solapa activa ────────────
  useEffect(() => {
    if (activeTab === 0 && courses.length === 0) {
      fetchCourses([])
    }
    if (activeTab === 1 && institutionalEvents.length === 0) {
      fetchInstitutionalEvents()
    }
  }, [activeTab])

  // Carga inicial de cursos
  useEffect(() => {
    fetchCourses([])
  }, [])

  // ─── Render ───────────────────────────────────────
  return (
    <Box className="interactive-page">
      {/* Solapas principales */}
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

        {/* Barra de búsqueda — cambia según la solapa */}
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

        {/* Modal detalle de curso con sus eventos académicos */}
        {open && selectedCourse && (
          <InfoModal
            open={open}
            handleClose={handleClose}
            title={selectedCourse.name}
            subtitle="Cursadas y exámenes"
            type="course"
          >
            <section className="class-info-container">
              <Typography variant="h6" fontWeight="medium" px="1rem">
                {selectedCourse?.programs?.map((program) => program).join(', ')}
              </Typography>
              <EventTabs events={selectedCourse.events} />
            </section>
            {isAuthenticated && (
              <Tooltip title="Agregar evento al curso" arrow placement="top">
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
              </Grid2>
            ))}
        </Grid2>

        {institutionalEvents.length === 0 && (
          <EmptyState message="No se encontraron eventos institucionales" />
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
              onClick={() => navigate('/evento/agregar')}
              role="button"
              aria-label="Agregar evento"
            />
          </Tooltip>
        )}
      </TabPanel>
    </Box>
  )
}

// ─── Componente auxiliar para estado vacío ─────────
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