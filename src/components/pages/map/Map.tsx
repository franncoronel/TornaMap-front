// Hooks
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

// Components
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio,  RadioGroup, Select, Box, Typography, Divider } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import InfoModal from '@/components/common/InfoModal'
import ClassRoomCard from '@/components/common/ClassRoomCard/ClassRoomCard'
import MapSelector from '@/components/common/map/MapSelector'

// Styles
import './map.css'
import '../interactive-page.css'

// Types
import { IEventList } from '@/data/domain/Event'

// Services
import { eventService } from '@/data/services/EventService'

// Contexts
import { useNotification } from '@/context/NotificationContext'
import { useLoader } from '@/context/LoaderContext'
import { IClassroom } from '@/data/domain/Classroom'
import { classroomService } from '@/data/services/ClassroomService'
import { buildingService } from '@/data/services/BuildingService'

// Mapper
import { mapBuildingsToUI, UIBuilding, normalize } from '@/data/mapper/buildingMapper'
import { pathToFloor, floorToPath } from '@/data/mapper/levelMapper'

export default function Map() {
  const { control } = useForm({
    defaultValues: {
      building: '', // Valor inicial, índice del array de componentes
      level: '' // Valor inicial, índice del array de componentes
    }
  })
  const navigate = useNavigate()
  const { building: buildingPath, level: levelPath } = useParams() //leo la url del map para saber a qué edificio y nivel mostrar, ej: /mapa/tornavias/primer-piso => buildingPath = 'tornavias', levelPath = 'primer-piso'

  // edificios desde back
  const [buildings, setBuildings] = useState<UIBuilding[]>([])

  // Estado del modal
  const [classRoomId, setClassRoomId] = useState<null | string>(null)
  const [classroom, setClassroom] = useState<IClassroom | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [open, setOpen] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  // Dato del modal
  const [events, setEvents] = useState<IEventList[]>([])

  const { setNotificationState } = useNotification()
  const { setLoader } = useLoader()

  // carga de edificios
  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoader(true)
        const res = await buildingService.getAll()
        setBuildings(mapBuildingsToUI(res.data))

      } catch (e) {
        console.error('Error fetching Buildings:', e)
        setNotificationState({
          title: 'Error al obtener edificios',
          type: 'error',
          description: 'Ocurrió un error al cargar los edificios',
          action: () => {}
        })
      } finally {
        setLoader(false)
      }
    }

    fetchBuildings()
  }, [])

  const currentBuilding = buildings.find( (b) => b.path === buildingPath ) //edificio actual
  
  const currentLevel = pathToFloor(levelPath || '')// nivel actual -> numero

  // Manejo del mapa -> navegación niveles
  const handleLevelChange = (levelPath: string) => {
    navigate(`/mapa/${buildingPath}/${levelPath}`)
  }

  // Manejo del mapa -> navegación edificios
  const handleBuildingChange = (newBuildingPath: string) => {
    const newBuilding = buildings.find((b) => normalize(b.text) === newBuildingPath )

    if (!newBuilding) return

    const firstLevel = newBuilding.levels[0]?.level ?? 0

    navigate(`/mapa/${newBuildingPath}/${floorToPath(firstLevel)}`)
  }

  const fetchEvents = async (classRoomId: string | null, date: Date) => {
    try {
      setLoader(true)
      console.log('classroom id:', classRoomId)
      const eventsResponse = await eventService.getAll( classRoomId, new Date(date) )
      setLoader(false)
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

  const fetchClassroom = async (classRoomId: string) => {
    try {
      setLoader(true)
      const classroomResponse = await classroomService.getById(classRoomId)
      setLoader(false)
      setClassroom(classroomResponse.data)
    } catch (error) {
      setLoader(false)
      setOpen(false)
      console.error('Error fetching classroom:', error)
      setNotificationState({
        title: 'Error al obtener aula',
        type: 'error',
        description: 'Ocurrió un error al cargar los datos del aula',
        action: () => {}
      })
    }
  }

  // Manejo del modal
  const handleOpen = async (newClassRoomId: string) => {
    const today = new Date()
    setDate(today)
    setClassRoomId(newClassRoomId)
    await Promise.all([
      fetchClassroom(newClassRoomId),
      fetchEvents(newClassRoomId, today)
    ])
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
  if (!buildingPath && buildings.length > 0) {
    const first = buildings[0]
    const firstLevel = first.levels[0]?.level ?? 0

    navigate(`/mapa/${normalize(first.text)}/${floorToPath(firstLevel)}`)
  }
}, [buildings])

  return (
    <main className="interactive-page map-page">
      <Box>
        {/* Select del edificio */}
        <Controller
          name="building"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth sx={{ pb: '1rem' }}>
              <InputLabel id="building-select-label">Edificio</InputLabel>
              <Select
                {...field}
                value={buildingPath || ''}
                labelId="building-select-label"
                label="Edificio"
                onChange={(e) => {
                  field.onChange(e.target.value) // Actualiza el valor en react-hook-form
                  handleBuildingChange(`${e.target.value}`) // Redirige a la ruta
                }}
              >
                {buildings.map((b) => (
                  <MenuItem key={b.id} value={b.path}>
                    {b.text}
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
                  value={levelPath || ''}
                  onChange={(e) => {
                    field.onChange(e.target.value) // Actualiza el valor en react-hook-form
                    handleLevelChange(e.target.value) // Redirige a la ruta
                  }}
                  className="levels-radio-group"
                >
                  {currentBuilding.levels.map((lvl) =>(
                    <FormControlLabel
                      key={lvl.level}
                      value={floorToPath(lvl.level)}
                      control={<Radio />}
                      label={lvl.text}
                      // checked={level.path === levelPath ? true : false}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        )}
      </Box>

      <Divider variant="middle" flexItem sx={{}} />

      <section className="map-container">
        <MapSelector
          building={buildingPath}
          level={currentLevel?.toString()}
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
          capacity={classroom?.capacity?.toString()}
          type="schedule"
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
            <Typography variant="body2" px="1rem">
              No hay eventos en la fecha seleccionada.
            </Typography>
          )}
        </InfoModal>
      )}
    </main>
  )
}
