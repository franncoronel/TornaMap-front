import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select
} from '@mui/material'

import { Controller, useForm } from 'react-hook-form'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

import './map.css'
import '../interactive-page.css'
import ClassInfoModal from '@/components/common/Modal'
import { Box, InputBase, Typography } from '@mui/material'

import { useEffect, useState } from 'react'
import ClassRoomCard from '@/components/common/ClassRoomCard'
import { buildingData } from '@/data/mock/BuildingData'

import { eventService } from '@/data/services/EventService'
import { useNotification } from '@/context/NotificationContext'
import { useLoader } from '@/context/LoaderContext'
import { IEventList } from '@/data/domain/Event'
import { MapSelector } from '@/components/common/map/MapSelector'

export default function Map() {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      building: 0, // Valor inicial, índice del array de componentes
      level: 0 // Valor inicial, índice del array de componentes
    }
  })
  const navigate = useNavigate()
  const params = useParams()
  const { building: buildingPath, level: levelPath } = params

  const currentBuilding = buildingData.find((b) => b.path === buildingPath)
  const currentLevel = currentBuilding?.levels.find((l) => l.path === levelPath)

  // Estado del modal
  const [classRoomId, setClassRoomId] = useState<null | number>(null)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [open, setOpen] = useState(false)
  // Dato del modal
  const [events, setEvents] = useState<IEventList[]>([])

  const { setNotificationState } = useNotification()
  const { setLoader } = useLoader()

  const handleClose = () => {
    setClassRoomId(null)

    setOpen(false)
  }

  const fetchEvents = async (classRoomId: number | null, date: Date) => {
    try {
      setLoader(true)
      const filtered = await eventService.getAll(classRoomId, new Date(date))
      setLoader(false)
      setOpen(true)
      console.log(filtered)
      setEvents(filtered)
    } catch (error) {
      setLoader(false)
      setOpen(false)
      console.error('Error fetching classes:', error)
      setNotificationState({
        title: 'Error al obtener clases',
        type: 'error',
        description: 'Ocurrió un error al cargar los eventos',
        action: () => {}
      })
    }
  }

  const handleOpen = async (classRoomId: number) => {
    const today = new Date().toISOString().split('T')[0]
    setDate(today)
    setClassRoomId(classRoomId)

    fetchEvents(classRoomId, new Date(today))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setDate(newDate)
    fetchEvents(classRoomId, new Date(newDate))
  }
  const handleLevelChange = (levelPath: string) => {
    navigate(`/mapa/${buildingPath}/${levelPath}`)
  }

  const handleBuildingChange = (newBuildingPath: string) => {
    const newLevelPath = buildingData.find((b) => b.path == newBuildingPath)
      ?.levels[0].path
    // Debe sobreescrubur la ruta actual
    navigate(`/mapa/${newBuildingPath}/${newLevelPath}`)
  }

  useEffect(() => {
    if (!buildingPath) {
      navigate(`mapa/${buildingData[0].path}/${buildingData[0].levels[0].path}`)
    }
  }, [])

  return (
    <main className="interactive-page map-page">
      <Box
        position="sticky"
        top="0"
        zIndex="10"
        sx={{ backgroundColor: 'white' }}
      >
        {/* Select del edificio */}
        <Controller
          name="building"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth sx={{ pb: '1rem' }}>
              <InputLabel id="building-select-label">Edificio</InputLabel>
              <Select
                {...field}
                value={currentBuilding?.path || ''}
                labelId="building-select-label"
                label="Edificio"
                onChange={(e) => {
                  field.onChange(e.target.value) // Actualiza el valor en react-hook-form
                  handleBuildingChange(`${e.target.value}`) // Redirige a la ruta
                }}
              >
                {buildingData.map((building) => (
                  <MenuItem key={building.id} value={building.path}>
                    {building.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        {/* RadioGroup de niveles */}
        {currentBuilding && (
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
                  value={currentLevel?.path || ''}
                  onChange={(e) => {
                    field.onChange(e.target.value) // Actualiza el valor en react-hook-form
                    handleLevelChange(`${e.target.value}`) // Redirige a la ruta
                  }}
                >
                  {currentBuilding.levels.map((level, index) => (
                    <FormControlLabel
                      key={index}
                      value={level.path}
                      control={<Radio />}
                      label={level.text}
                      checked={level.path === levelPath ? true : false}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        )}
      </Box>

      <section className="map-container">
        {/* <Outlet context={{ handleOpen }} /> */}
        <MapSelector
          building={buildingPath}
          level={currentLevel?.level.toString()}
        />
      </section>

      {/* Modal */}
      {/* {classRoomId !== null && (
        <ClassInfoModal
          open={open}
          handleClose={handleClose}
          classroom={`${findClassRoom()?.classroom}`}
          classroomType="Aula"
        >
          <InputBase
            type="date"
            value={date}
            onChange={handleDateChange}
            sx={{
              width: '100%',
              border: '1px solid #ccc',
              borderRadius: 1,
              p: 1,
              mb: 2
            }}
          />

          {filteredClasses.length > 0 ? (
            <section className="classes-container">
              {filteredClasses.map((cls, index) => (
                <ClassRoomCard
                  key={index}
                  name={cls.name}
                  commission={cls.commission}
                  classroom={cls.classroom}
                  building={cls.building}
                  teacher={cls.teacher}
                  careers={cls.careers}
                  schedules={cls.schedules}
                  mode={cls.mode} // capaz solo deberia cargar la materia que es presencial
                  viewType="modal"
                  onClick={() => {}} // Aquí puedes agregar una acción al hacer clic
                />
              ))}
            </section>
          ) : (
            <Typography variant="body2">
              No hay clases en la fecha seleccionada.
            </Typography>
          )}
        </ClassInfoModal>
      )} */}
    </main>
  )
}
