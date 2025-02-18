import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material"

import { Controller, useForm } from "react-hook-form"
import { Outlet, useNavigate } from "react-router-dom"

import './map.css'
import ClassInfoModal from "@/components/common/Modal"
import { Box, InputBase, Typography } from "@mui/material"

import { useState } from "react"
import ClassRoomCard from "@/components/common/ClassRoomCard";
import { buildingData } from "@/data/mock/BuildingData";
import { classes, IClass } from "@/data/mock/ClassData"

export default function Map() {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      building:  0, // Valor inicial, índice del array de componentes
      level: 0 // Valor inicial, índice del array de componentes
    }
  })
  const navigate = useNavigate()

   // Observamos los valores seleccionados
  const selectedBuilding = watch('building')
  const currentBuilding = buildingData.find((b) => b.id === selectedBuilding)

  const buildingLevels = () => currentBuilding?.levels || [] // Devuelve niveles o un array vacío si no se encuentra

  const handleLevelChange = (levelId: number) => {
    const pathToNavigate = `${buildingData[selectedBuilding].levels[levelId].path}`
    navigate(`/mapa/${pathToNavigate}`)
  }
  const handleBuildingChange = (buildingId: number) => {
    const newBuilding = buildingData.find((b) => b.id === buildingId)
    setValue("level", 0) // Resetea el nivel al primer valor
    navigate(`/${newBuilding?.path}`)
  }

  // Estado para el modal
  const [classRoomId, setClassRoomId] = useState<null|number>(null)
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [filteredClasses, setFilteredClasses] = useState<IClass[]>([])

  const handleClose = () => {
    setClassRoomId(null)
    setOpen(false)
    console.log('cerrar')
  }

  const handleOpen = (classRoomId: number) => {
    const today = new Date().toISOString().split('T')[0]; // Fecha actual en formato ISO
    setDate(today); // Resetea la fecha seleccionada
    setOpen(true);
    setClassRoomId(classRoomId);

    // Filtrar clases por la fecha actual
    const currentClassRoom = buildingData[selectedBuilding].levels
      .flatMap((l) => l.classRooms)
      .find((c) => c.id === classRoomId);

    if (currentClassRoom) {
      const filtered = classes.filter(
        (cls) =>
          cls.classroom === currentClassRoom.classroom &&
          new Date(cls.startDate) <= new Date(today) &&
          new Date(cls.endDate) >= new Date(today)
      );
      setFilteredClasses(filtered);
    }
  }

  const findClassRoom = () => buildingData[selectedBuilding].levels.find((l) => l.id === selectedBuilding)?.classRooms.find((c) => c.id === classRoomId)

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(newDate);
    if (selectedClassRoom()) {
      // Filtrar las clases por fecha seleccionada
      const filtered = classes.filter(
        (cls) =>{
          console.log(selectedClassRoom())
          return (cls.classroom === selectedClassRoom()?.classroom &&
          new Date(cls.startDate) <= new Date(newDate) &&
          new Date(cls.endDate) >= new Date(newDate))}
      )
      console.log(filtered)
      setFilteredClasses(filtered);
    }
  };

  const selectedClassRoom = () => buildingData[selectedBuilding].levels.find((l) => l.id === selectedBuilding)?.classRooms.find((c) => c.id === classRoomId)

  return (
    <main className="map-page">
    {/* Select del edificio */}
    <Controller
      name="building"
      control={control}
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel id="building-select-label">Edificio</InputLabel>
          <Select
            {...field}
            labelId="building-select-label"
            label="Edificio"
            onChange={(e) => {
              field.onChange(e.target.value) // Actualiza el valor en react-hook-form
              console.log(e.target.value)
              handleBuildingChange(parseInt(`${e.target.value}`)) // Redirige a la ruta
            }}
          >
            {buildingData.map((building) => (
              <MenuItem key={building.id} value={building.id}>
                {building.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />

    {/* RadioGroup de niveles */}
    {currentBuilding &&
      <Controller
        name="level"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <FormLabel id="building-levels-label">Niveles</FormLabel>
            <RadioGroup
              {...field}
              aria-labelledby="building-levels-label"
              name="levels-group"
              onChange={(e) => {
                field.onChange(e.target.value) // Actualiza el valor en react-hook-form
                handleLevelChange(parseInt(`${e.target.value}`)) // Redirige a la ruta
              }}
            >
              {buildingLevels().map((level, index) => (
                <FormControlLabel
                  key={index}
                  value={level.path}
                  control={<Radio />}
                  label={level.text}
                />
              ))}

            </RadioGroup>
          </FormControl>
        )}
      />
    }

    <section className="map-container">
        <Outlet context={{ handleOpen }} />
    </section>

    {/* Modal */}
    {classRoomId !== null && (
        <ClassInfoModal
          open={open}
          handleClose={handleClose}
          classroom={`${findClassRoom()?.classroom}`}
          classroomType="Aula"
        >
          <Box>
            <InputBase
              type="date"
              value={date}
              onChange={handleDateChange}
              sx={{
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: 1,
                p: 1,
                mb: 2,
              }}
            />


            {filteredClasses.length > 0 ? (
              <section className="classes-container">
              {
                filteredClasses.map((cls, index) => (
                  <ClassRoomCard
                    key={index}
                    name={cls.name}
                    commission={cls.commission}
                    classroom={cls.classroom}
                    building={cls.building}
                    teacher={cls.teacher}
                    careers={cls.careers}
                    schedules={cls.schedules}
                    viewType="modal"
                    onClick={() => {}} // Aquí puedes agregar una acción al hacer clic
                  />
                ))
              }
                </section>

            ) : (
              <Typography variant="body2">No hay clases en la fecha seleccionada.</Typography>
            )}
          </Box>
        </ClassInfoModal>
      )}
  </main>
  )
}

