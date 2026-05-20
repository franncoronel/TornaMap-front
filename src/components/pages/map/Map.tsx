// Hooks
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

// Components
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Box, Typography, Divider, Paper, Button } from '@mui/material'
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
import { useAuth } from '@/context/AuthContext'
import { IClassroom } from '@/data/domain/Classroom'
import { classroomService } from '@/data/services/ClassroomService'
import { buildingService } from '@/data/services/BuildingService'

// Mapper
import { mapBuildingsToUI, UIBuilding, normalize } from '@/data/mapper/buildingMapper'
import { OccupiedInterval } from '@/data/domain/Schedule'
import { toMins } from '@/utils/helpers'
import { pathToFloor, floorToPath } from '@/data/mapper/levelMapper'
import Campus from '@/components/common/map/campus/Campus'

function hasAvailableSlot(occupied: OccupiedInterval[]): boolean {
  const DAY_START = 6 * 60
  const DAY_END = 22 * 60
  const MIN_SLOT = 30
  const sorted = [...occupied]
    .map(o => ({ start: toMins(o.startTime), end: toMins(o.endTime) }))
    .sort((a, b) => a.start - b.start)
  let cursor = DAY_START
  for (const { start, end } of sorted) {
    if (start - cursor >= MIN_SLOT) return true
    cursor = Math.max(cursor, end)
  }
  return DAY_END - cursor >= MIN_SLOT
}

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
  const [selectedCampusBuilding, setSelectedCampusBuilding] = useState<string>('')

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
  const { isAuthenticated } = useAuth()

  const occupiedIntervals: OccupiedInterval[] = events.flatMap(e =>
    e.schedules.map(s => ({ startTime: s.startTime, endTime: s.endTime }))
  )
  const canReserve = classroom !== null && hasAvailableSlot(occupiedIntervals)

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
  
  const isCampus = buildingPath === 'campus'
  
  const currentBuilding = buildings.find( (b) => b.path === buildingPath ) //edificio actual
  
  const currentLevel = pathToFloor(levelPath || '')// nivel actual -> numero

  // Manejo del mapa -> navegación niveles
  const handleLevelChange = (levelPath: string) => {
    navigate(`/mapa/${buildingPath}/${levelPath}`)
  }

  // Manejo del mapa -> navegación edificios
  const handleBuildingChange = (newBuildingPath: string) => {
    //caso campus
    if (newBuildingPath === 'campus') {
      navigate(`/mapa/campus/0`)
      return
    }

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
                <MenuItem value="campus">Campus</MenuItem>
                {buildings.map((b) => (
                  <MenuItem key={b.id} value={b.path}>
                    {b.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

      {/* Select del campus */}
        {isCampus && (
          <Box  display="flex" 
                flexDirection={{ xs: "column", md: "row" }} 
                gap={3} 
                alignItems="stretch" 
                justifyContent="center"
                maxWidth="1300px" 
                margin="0 auto"
                padding={2}>
            {/* Panel de Control -> arriba en movil, izquierda en web*/}
            <Paper 
              elevation={2} 
              sx={{ 
                width: { xs: "100%", md: "300px" }, 
                padding: 2.5, 
                borderRadius: 2, 
                display: "flex", 
                flexDirection: "column", 
                gap: 1.5,
                maxHeight: { xs: "220px", md: "none" },//limite la altura para que no empuje el mapa demasiado abajo
                overflowY: "auto",
                alignSelf: { md: "flex-start" }
              }}
            >
              <FormLabel sx={{ fontWeight: "bold", fontSize: "1rem", color: "text.primary" }}>
                Edificios
              </FormLabel>
              <FormControl fullWidth>
                <RadioGroup
                  value={selectedCampusBuilding}
                  onChange={(e) => setSelectedCampusBuilding(e.target.value)}
                  //movil-> se ordena las opciones horizontalmente para ahorrar espacio vertical
                  sx={{ 
                    display: "flex", 
                    flexDirection: { xs: "row", md: "column" }, 
                    flexWrap: "wrap",
                    gap: 1 
                  }}
                >
                  {buildings.map((b) => {
                    const isSelected = selectedCampusBuilding === b.path;
                    return (
                      <Box
                        key={b.id}
                        sx={{
                          flex: { xs: "1 1 120px", md: "none" }, // Se estiran en móvil para rellenar filas
                          border: "1px solid",
                          borderColor: isSelected ? "primary.main" : "divider",
                          borderRadius: 1.5,
                          backgroundColor: isSelected ? "action.selected" : "transparent",
                          transition: "0.2s ease",
                          "&:hover": { 
                            backgroundColor: "action.hover"
                          }
                        }}
                      >
                        <FormControlLabel
                          value={b.path}
                          control={<Radio size="small" />}
                          label={b.text}
                          sx={{ 
                            width: "100%", 
                            margin: 0, 
                            paddingY: 0.5, 
                            paddingX: 1.5,
                            "& .MuiFormControlLabel-label": { fontSize: "0.9rem" }
                          }}
                        />
                      </Box>
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Paper>

            {/* MAPA CAMPUS */}
            <Box  flexGrow={1} display="flex" justifyContent="center" alignItems="center"
              sx={{ 
                border: "1px solid", 
                borderColor: "divider", 
                borderRadius: 2, 
                overflow: "hidden",
                backgroundColor: "#fafafa",
                minHeight: { xs: "350px", md: "500px" } 
              }}
            >
              <Campus selectedBuilding={selectedCampusBuilding} />
            </Box>
          </Box>
        )}

        {/* Select de los edificios */}
        {/* RadioGroup de niveles */}
        {!isCampus && currentBuilding && (
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
      {!isCampus && (
        <section className="map-container">
          <MapSelector
            building={buildingPath}
            level={currentLevel?.toString()}
            handleOpen={handleOpen}
          />
        </section>
    )}

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

          {isAuthenticated && classroom && (
            <Box px="1rem" pb="1rem">
              <Button
                variant="contained"
                fullWidth
                disabled={!canReserve}
                onClick={() => {
                  handleClose()
                  navigate('/reserva/agregar', {
                    state: {
                      classroom,
                      date: date ? date.toISOString() : null,
                      occupiedIntervals
                    }
                  })
                }}
              >
                Reservar espacio
              </Button>
              {!canReserve && (
                <Typography variant="caption" color="text.secondary" display="block" textAlign="center" mt={0.5}>
                  Sin disponibilidad horaria para este día (06:00–22:00)
                </Typography>
              )}
            </Box>
          )}
        </InfoModal>
      )}
    </main>
  )
}
