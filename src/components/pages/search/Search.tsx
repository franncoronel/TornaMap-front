import ClassRoomCard from "@/components/common/ClassRoomCard"
import SearchBar from "@/components/common/SearchBar"
import { classes, IClass } from "@/data/mock/ClassData"
import { Box, Divider, Grid2, Typography } from "@mui/material"
import { useState } from "react"
import TornaviasSubsuelo from "@/components/pages/map/components/TornaviasSubsuelo"
import ClassInfoModal from "@/components/common/Modal"
import './search.css'
import '../interactive-page.css'
import { Laptop } from "@phosphor-icons/react"
import { Course } from "@/data/domain/Course"
import { courseService } from "@/data/service/CourseService"

export function Search() {
  const [selectedClass, setSelectedClass] = useState<IClass | null>(null)
  const [open, setOpen] = useState(false)
  const [courses, setCourses] = useState<Course[]>()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetchCourses = async () => {
    const courses = await courseService.getAll()
    setCourses(courses)
  }

  const handleOpen = (classData: IClass) => {
    setSelectedClass(classData)
    setOpen(true)
  }

  const handleClose = () => {
    setSelectedClass(null)
    setOpen(false)
  }
  const search = () => {
    console.log('Result')
  }

  // Mapeo entre IDs y clases
  const currentClass = classes[selectedClass?.id ?? 0] || null


  return (
    // Contenedor principal que organiza la disposición de los elementos
    <Box className='interactive-page'>
      {/* Barra de búsqueda fija */}
      <Box flexShrink='0' position='sticky' top='0' zIndex='10'>
        <SearchBar onSearch={() => search()} />
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
        {
          // Mapeo de las clases para renderizar cada tarjeta de aula
          classes.map((c: IClass) => (
            <Grid2 size={1}>
              <ClassRoomCard
                key={c.id}
                name={c.name}
                commission={c.commission}
                classroom={c.classroom}
                building={c.building}
                teacher={c.teacher}
                careers={c.careers}
                schedules={c.schedules}
                mode={c.mode}
                viewType={c.viewType}
                onClick={() => handleOpen(c)}
              />
            </Grid2>
          ))
        }
      </Grid2>

      {/* Modal que muestra detalles de la clase seleccionada y un mapa */}
      {currentClass && (
        <ClassInfoModal
          open={open}
          handleClose={handleClose}
          classroom={currentClass.classroom}
          classroomType="Aula"
        >
          <section className="class-info-container">
            {currentClass.mode !== "virtual" ? (
              <>
              {/* Título del modal con información del edificio y nivel */}
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   {currentClass.building} - {currentClass.buildingLevel}
                </Typography>
              {/* Mapa interactivo del subsuelo */}
              <TornaviasSubsuelo selectedClassRoomId={selectedClass?.classRoomId} onClassRoomClick={() => setSelectedClass(currentClass)}/> 
              </>
              ) : (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', wordBreak: 'break-word',whiteSpace:'normal',}}>
                  Esta clase se dicta de forma virtual
                </Typography>
                <Laptop size={300} color="#d1d1d1" weight="duotone"/> 
              </Box>
            )}

            {/* Tarjeta con detalles adicionales de la clase */}
            <ClassRoomCard
              name={currentClass.name}
              commission={currentClass.commission}
              classroom={currentClass.classroom}
              building={currentClass.building}
              teacher={currentClass.teacher}
              careers={currentClass.careers}
              schedules={currentClass.schedules}
              mode={currentClass.mode}
              viewType="modal"
            />
          </section>
        </ClassInfoModal>
      )}
    </Box>
  )
}