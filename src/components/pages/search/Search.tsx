import ClassRoomCard from "@/components/common/ClassRoomCard"
import SearchBar from "@/components/common/SearchBar"
import { Box, Divider, Grid2, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import TornaviasSubsuelo from "@/components/pages/map/components/tornavias/TornaviasSubsuelo"
import ClassInfoModal from "@/components/common/Modal"
import './search.css'
import '../interactive-page.css'
import { ExclamationMark, Laptop } from "@phosphor-icons/react"
import { ICourse } from "@/data/domain/Course"
import { courseService } from "@/data/service/CourseService"
import { displayErrorMessage } from "@/data/errors"
import Loader from "@/components/common/Loader/Loader"

export function Search() {
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null)
  const [open, setOpen] = useState(false)
  const [courses, setCourses] = useState<ICourse[]>([])
  const [isLoading, setLoading] = useState<Boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetchCourses = async (query?: string) => {
    setLoading(true)
    courseService.getAll(query).then((response) => {
      const courses = response
      setCourses(courses)
    }
    ).catch((error) => {
      setErrorMessage(displayErrorMessage(error))
    }).finally(() => {
    setLoading(false)
    })
  }

  const fetchCourseData = async (courseId: number) => {
    setLoading(true)
    courseService.getById(courseId).then((response) => {
      const course = response
      setSelectedCourse(course)
    }
    ).catch((error) => {
      setErrorMessage(displayErrorMessage(error))
    }
    ).finally(() => {
      setLoading(false)
    }
    )
  }

  const handleOpen = (course: ICourse) => {
    fetchCourseData(course.id!)
    setOpen(true)
  }

  const handleClose = () => {
    setSelectedCourse(null)
    setOpen(false)
  }
  const search = (query: string) => {
    console.log('Result', query)
    fetchCourses(query)
  }

  useEffect(() => {
    fetchCourses()
  }
  , [])

  return (
    // Contenedor principal que organiza la disposición de los elementos
    <Box className='interactive-page'>
      {/* Barra de búsqueda fija */}
      <Box flexShrink='0' position='sticky' top='0' zIndex='10'>
        <SearchBar onSearch={search} />
        <Divider variant='middle' flexItem />
      </Box>

      {/* Grilla para organizar las tarjetas de las aulas de manera responsive */}
      <Grid2
        container
        rowSpacing='1rem'
        columnSpacing={{ xs: '2rem', sm: '1.5rem' }}
        columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }}
        maxHeight='90vh'
        pt='1rem'
        pb='7rem'
        sx={{ overflowY: 'auto' }}
      >
        {isLoading ? <Loader/> :
          courses && courses.length > 0 && courses.map((course: ICourse) =>
            <Grid2 size={1} key={course.id}>
              <ClassRoomCard
                course={course}
                viewType="card"
                onClick={() => handleOpen(course)}
              />
            </Grid2>
          )
        }
        {
          courses.length === 0 &&
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#333' }}>
              <ExclamationMark color="#FFB74D" />
                {errorMessage}
            </Typography>
          </Box>
        }
      </Grid2>

      {/* Modal que muestra detalles de la clase seleccionada y un mapa */}
      {open && selectedCourse &&
        <ClassInfoModal
          open={open}
          handleClose={handleClose}
          title={selectedCourse.name}
          subtitle='Cursadas y eventos'
        >
          <section className="class-info-container">
            <Typography variant="h6" sx={{ mb: 2 }}>
              {selectedCourse.programs.map((program) => program).join(', ')}
            </Typography>
            {selectedCourse.events.map((event) => (
              <Box key={event.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection:'column', width: '100%' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {event.name}
                </Typography>
                <section className='schedules-list-container'>
                  <div className='schedules-list'>
                    {event.schedules.map((schedule) =>

                    <article className="schedules-list-item" >
                      {!schedule.isVirtual ? (
                        <>
                        {/* Título del modal con información del edificio y nivel */}
                          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {schedule.classroom?.name} - Piso {schedule.classroom?.floor} - {schedule.classroom?.building.name}
                          </Typography>
                          {/* Mapa interactivo del subsuelo */}
                          <TornaviasSubsuelo selectedClassRoomId={schedule?.classroom?.id} />
                        </>
                        ) : (
                        <Box display="flex" flexDirection="column" alignItems="center">
                          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', wordBreak: 'break-word',whiteSpace:'normal',}}>
                            Esta clase se dicta de forma virtual
                          </Typography>
                          <Laptop size={150} color="#d1d1d1" weight="duotone"/>
                        </Box>
                      )}
                      <ClassRoomCard
                        schedule={schedule}
                        viewType="modal"
                      />
                    </article>
                  )}

                  </div>
                </section>
              </Box>
            ))}
            {/* Tarjeta con detalles adicionales de la clase */}
            {/* <ClassRoomCard
              course={}
              viewType="modal"
            /> */}
          </section>
        </ClassInfoModal>
      }
    </Box>
  )
}