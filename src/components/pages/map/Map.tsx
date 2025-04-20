// Hooks
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

// Components
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Box,
  Typography
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import InfoModal from '@/components/common/InfoModal'
import ClassRoomCard from '@/components/common/ClassRoomCard'
import { MapSelector } from '@/components/common/map/MapSelector'

// Styles
import './map.css'
import '../interactive-page.css'

// Data
import { buildingData } from '@/data/mock/BuildingData'
import { IEventList } from '@/data/domain/Event'

// Services
import { eventService } from '@/data/services/EventService'

// Contexts
import { useNotification } from '@/context/NotificationContext'
import { useLoader } from '@/context/LoaderContext'

export default function Map() {
  const { control } = useForm({
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
  const [classRoomId, setClassRoomId] = useState<null | string>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [open, setOpen] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  // Dato del modal
  const [events, setEvents] = useState<IEventList[]>([])

  const { setNotificationState } = useNotification()
  const { setLoader } = useLoader()

  // Manejo del mapa
  const handleLevelChange = (levelPath: string) => {
    navigate(`/mapa/${buildingPath}/${levelPath}`)
  }
  const handleBuildingChange = (newBuildingPath: string) => {
    const newLevelPath = buildingData.find((b) => b.path == newBuildingPath)
      ?.levels[0].path
    navigate(`/mapa/${newBuildingPath}/${newLevelPath}`)
  }

  const fetchEvents = async (classRoomId: string | null, date: Date) => {
    try {
      setLoader(true)
      const eventsResponse = await eventService.getAll(
        classRoomId,
        new Date(date)
      )
      setLoader(false)
      console.log(eventsResponse)
      setEvents(eventsResponse.data)
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

  // Manejo del modal
  const handleOpen = async (newClassRoomId: string) => {
    const today = new Date()
    setDate(today)
    setClassRoomId(newClassRoomId)
    await fetchEvents(newClassRoomId, today)
    setOpen(true)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDateChange = (value: Date | null, _?: unknown) => {
    if (!value) return // el usuario borró la fecha
    setDate(value)
    setPickerOpen(false)
    fetchEvents(classRoomId, value)
  }
  const handleClose = () => {
    setClassRoomId(null)
    setDate(null)
    setOpen(false)
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
        <MapSelector
          building={buildingPath}
          level={currentLevel?.level.toString()}
          handleOpen={handleOpen}
        />
      </section>

      {/* Modal */}
      {classRoomId !== null && (
        <InfoModal
          open={open}
          handleClose={handleClose}
          title={classRoomId}
          subtitle={currentBuilding?.text}
        >
          <DatePicker
            label="Elige una fecha"
            value={date}
            open={pickerOpen}
            onOpen={() => setPickerOpen(true)}
            onClose={() => setPickerOpen(false)}
            onChange={handleDateChange}
            sx={{ mt: '1rem' }}
            slotProps={{
              textField: {
                fullWidth: true,
                size: 'small'
              }
            }}
          />

          {events.length > 0 ? (
            <section className="classes-container">
              {events.map((e, index) => (
                <ClassRoomCard
                  key={index}
                  event={e}
                  viewType="standard"
                  onClick={() => {}} // Aquí puedes agregar una acción al hacer clic
                />
              ))}
            </section>
          ) : (
            <Typography variant="body2">
              No hay eventos en la fecha seleccionada.
            </Typography>
          )}
        </InfoModal>
      )}
    </main>
  )
}
