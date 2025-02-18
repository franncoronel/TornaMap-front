import ClassRoomCard from "@/components/common/ClassRoomCard"
import SearchBar from "@/components/common/SearchBar"
import { classes, IClass } from "@/data/mock/ClassData"
import { Box, Divider, Typography } from "@mui/material"
import { useState } from "react"
import TornaviasSubsuelo from "@/components/pages/map/components/TornaviasSubsuelo"
import ClassInfoModal from "@/components/common/Modal"
import './search.css'

export function Search() {

  const [selectedClass, setSelectedClass] = useState<IClass | null>(null)
  const [open, setOpen] = useState(false)

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
    <Box display='flex' flexDirection='column' height='100vh' overflow='hidden'>
      <Box flexShrink='0' paddingTop='2rem'>
        <Typography variant="h5" fontWeight="bold">Búsqueda</Typography>
        <SearchBar onSearch={() => search()} />
      </Box>
      <Divider variant='middle' flexItem/>
      <Box sx={{overflowY: 'auto', display: 'flex', flexDirection:'column', gap: '1rem'}} padding='2rem'>
        {
          classes.map((c: IClass) => (
            <ClassRoomCard
              key={c.id}
              name={c.name}
              commission={c.commission}
              classroom={c.classroom}
              building={c.building}
              teacher={c.teacher}
              careers={c.careers}
              schedules={c.schedules}
              viewType={c.viewType}
              onClick={() => handleOpen(c)}
            />
          ))
        }

      </Box>
      {/* Modal con mapa y detalles */}
      {currentClass && (
        <ClassInfoModal
          open={open}
          handleClose={handleClose}
          classroom={currentClass.classroom}
          classroomType="Aula"
        >
          <section className="class-info-container">
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {currentClass.building} - {currentClass.buildingLevel}
            </Typography>
            <TornaviasSubsuelo selectedClassRoomId={selectedClass?.classRoomId} onClassRoomClick={() => setSelectedClass(currentClass)} />
            <ClassRoomCard
              name={currentClass.name}
              commission={currentClass.commission}
              classroom={currentClass.classroom}
              building={currentClass.building}
              teacher={currentClass.teacher}
              careers={currentClass.careers}
              schedules={currentClass.schedules}
              viewType="modal"
            />
          </section>
        </ClassInfoModal>
      )}
    </Box>
  )
}