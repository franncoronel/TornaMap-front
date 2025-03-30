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
    <Box
     display='flex'
     flexDirection='column'
     height='100vh'
     >

      <Box flexShrink='0' position='sticky' top='0' zIndex='10'>
        <SearchBar onSearch={() => search()} />
        <Divider variant='middle' flexItem/>
      </Box>

      <Box
        display='flex'
        flex='1'
        overflow='auto'
        flexDirection={{xs:'column', sm:'row'}}
        flexWrap={{xs:'nowrap', sm:'wrap'}}
        justifyContent={{xs:'flex-start', sm:'center'}}
        pt='1rem'
        mx='2rem'
        pb='7rem'
        gap={{xs:'1rem', lg:'1rem 2rem', xl:'1rem 3rem'}}
      >
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