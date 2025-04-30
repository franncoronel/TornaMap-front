import './search.css'
import '../interactive-page.css'

import { useEffect, useState } from 'react'
import { useNotification } from '@/context/NotificationContext'
import { useLoader } from '@/context/LoaderContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

import { courseService } from '@/data/services/CourseService'

import { ICourse, ICourseList } from '@/data/domain/Course'

import { WarningCircle, Plus } from '@phosphor-icons/react'
import { Box, Divider, Grid2, Tooltip, Typography } from '@mui/material'
import SearchBar from '@/components/common/SearchBar'
import ClassRoomCard from '@/components/common/ClassRoomCard'
import InfoModal from '@/components/common/InfoModal'
import EventTabs from '@/components/common/EventTabs'

export default function Search() {
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null)
  const [open, setOpen] = useState(false)
  const [courses, setCourses] = useState<ICourseList[]>([])

  const { setNotificationState } = useNotification()
  const { setLoader } = useLoader()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const fetchCourses = async (query?: string) => {
    setLoader(true)
    try {
      const courses = await courseService.getAll(query)
      setLoader(false)
      const coursesData = courses.data
      setCourses(coursesData)
      if (coursesData.length === 0) {
        // Notificar que no se encontraron resultados
        setNotificationState({
          title: 'No se encontraron resultados',
          type: 'info',
          description: 'Intenta con otro término de búsqueda',
          action: () => {}
        })
      }
    } catch (error) {
      setLoader(false)
      console.error('Error fetching courses:', error)
      setNotificationState({
        title: 'Error al obtener cursos',
        type: 'error',
        description: 'Ocurrió un error al cargar los cursos',
        action: () => {}
      })
    }
  }

  const handleOpen = async (course: ICourseList) => {
    try {
      if (!course?.id) {
        console.error('Course ID is undefined')
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
      setLoader(false)
      setSelectedCourse(response.data)
      setOpen(true)

      setNotificationState({
        title: 'Curso cargado',
        type: 'success',
        description: 'Detalles del curso obtenidos con éxito',
        action: () => {}
      })
    } catch (error) {
      setLoader(false)
      console.error('Error fetching course details:', error)
      setNotificationState({
        title: 'Error al cargar curso',
        type: 'error',
        description: 'No se pudo obtener la información del curso',
        action: () => {}
      })
    }
  }

  const handleClose = () => {
    setSelectedCourse(null)
    setOpen(false)
  }

  const search = (query: string) => {
    fetchCourses(query)
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    // Contenedor principal que organiza la disposición de los elementos
    <Box className="interactive-page">
      {/* Barra de búsqueda fija */}
      <Box position="sticky" top="0" zIndex="10">
        <SearchBar
          onSearch={search}
          options={courses.map((course) => course.name)}
        />
        <Divider variant="middle" flexItem />
      </Box>

      {/* Grilla para organizar las tarjetas de las aulas de manera responsive */}
      <Grid2
        container
        rowSpacing="1rem"
        columnSpacing={{ xs: '2rem', sm: '1.5rem' }}
        columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }}
        height="100%"
        sx={{ overflowY: 'auto' }}
      >
        {courses &&
          courses.length > 0 &&
          courses.map((course: ICourseList) => (
            <Grid2 size={1} key={course.id}>
              <ClassRoomCard
                course={course}
                viewType="standard"
                onClick={() => handleOpen(course)}
              />
            </Grid2>
          ))}
        {courses.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              gap: '1rem'
            }}
          >
            <WarningCircle size={32} color="#FFB74D" />
            <Typography
              variant="h6"
              sx={{
                color: '#333',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              No se encontraron resultados
            </Typography>
          </Box>
        )}
      </Grid2>

      {/* Modal que muestra detalles de la clase seleccionada y un mapa */}
      {open && selectedCourse && (
        <InfoModal
          open={open}
          handleClose={handleClose}
          title={selectedCourse.name}
          subtitle="Cursadas y eventos"
          type="event"
        >
          <section className="class-info-container">
            <Typography variant="h6" fontWeight="medium" px="1rem">
              {selectedCourse?.programs?.map((program) => program).join(', ')}
            </Typography>
            <EventTabs events={selectedCourse.events} />
          </section>
        </InfoModal>
      )}

      {isAuthenticated && (
        <Tooltip title="Agregar asignatura" arrow placement="top">
          <Plus
            className="floating-button"
            onClick={() => navigate('/asignatura/agregar')}
          />
        </Tooltip>
      )}
    </Box>
  )
}
