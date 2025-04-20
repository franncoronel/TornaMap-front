import ClassRoomCard from '@/components/common/ClassRoomCard'
import SearchBar from '@/components/common/SearchBar'
import { Box, Divider, Grid2, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import InfoModal from '@/components/common/InfoModal'
import './search.css'
import '../interactive-page.css'
import { WarningCircle, Laptop } from '@phosphor-icons/react'
import { ICourse, ICourseList } from '@/data/domain/Course'
import { courseService } from '@/data/services/CourseService'
import { useNotification } from '@/context/NotificationContext'
import { useLoader } from '@/context/LoaderContext'
import { MapSelector } from '@/components/common/map/MapSelector'

export function Search() {
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null)
  const [open, setOpen] = useState(false)
  const [courses, setCourses] = useState<ICourseList[]>([])

  const { setNotificationState } = useNotification()
  const { setLoader } = useLoader()

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
      <Box flexShrink="0" position="sticky" top="0" zIndex="10">
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
        maxHeight="90vh"
        pt="1rem"
        pb="7rem"
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
        >
          <section className="class-info-container">
            <Typography variant="h6" sx={{ mb: 2 }}>
              {selectedCourse?.programs?.map((program) => program).join(', ')}
            </Typography>
            {selectedCourse.events.map((event) => (
              <Box
                key={event.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  width: '100%'
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {event.name}
                </Typography>
                <section className="schedules-list-container">
                  <div
                    className={`schedules-list ${event.schedules.length == 1 ? 'single' : ''}`}
                  >
                    {event.schedules.map((schedule) => (
                      <article
                        key={schedule.id}
                        className="schedules-list-item"
                      >
                        {!schedule.isVirtual ? (
                          <>
                            {/* Título del modal con información del edificio y nivel */}
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {schedule.classroom?.name} - Piso{' '}
                              {schedule.classroom?.floor} -{' '}
                              {schedule.classroom?.building.name}
                            </Typography>
                            {/* Mapa interactivo del subsuelo */}
                            <MapSelector
                              building={schedule.classroom?.building.name}
                              level={schedule.classroom?.floor.toString()}
                              classRoom={schedule.classroom?.code}
                            />
                          </>
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
                            <Laptop
                              size={150}
                              color="#2e4b7d"
                              weight="duotone"
                            />
                          </Box>
                        )}
                        <ClassRoomCard schedule={schedule} viewType="modal" />
                      </article>
                    ))}
                  </div>
                </section>
              </Box>
            ))}
          </section>
        </InfoModal>
      )}
    </Box>
  )
}
