import { useEffect, useState } from 'react'
import { format, parse, parseISO } from 'date-fns'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useLoader } from '@/context/LoaderContext'
import { useNotification } from '@/context/NotificationContext'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { FormContext } from '../Form'
import { courseService } from '@/data/services/CourseService'
import {
  eventService,
  mapScheduleToBackend
} from '@/data/services/EventService'
import { ICourseList } from '@/data/domain/Course'
import { EVENT_TYPES, EventType, IEventCreateDto } from '@/data/domain/Event'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers'
import { toMins } from '@/utils/helpers'
import { OccupiedInterval } from '@/data/domain/Schedule'
import { CalendarStar } from '@phosphor-icons/react/dist/icons/CalendarStar'
import { XSquare } from '@phosphor-icons/react/dist/icons/XSquare'
import { FloppyDisk } from '@phosphor-icons/react/dist/icons/FloppyDisk'
import { IPossibleReservation } from '@/data/domain/ClassroomReservation'

type FormValues = {
  name: string
  type: EventType
  details: string
  courseID: string
  date: Date | null
  startTime: string
  endTime: string
}

const isExamType = (type: EventType | '') =>
  type === 'FINAL' || type === 'PARCIAL'

export default function SpaceRequestForm() {
  const location = useLocation()
  const state = (location.state ?? {}) as IPossibleReservation

  const [courses, setCourses] = useState<ICourseList[]>([])

  const { setLoader } = useLoader()
  const { setNotificationState } = useNotification()
  const { setTitle, setIcon } = useOutletContext<FormContext>()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      type: 'CHARLA',
      details: '',
      courseID: '',
      date: state.date ? parseISO(state.date) : new Date(),
      startTime: '',
      endTime: ''
    }
  })

  const eventType = watch('type')
  const startTimeStr = watch('startTime')
  const endTimeStr = watch('endTime')
  const parsedStartTime = startTimeStr
    ? parse(startTimeStr, 'HH:mm', new Date())
    : null
  const parsedEndTime = endTimeStr
    ? parse(endTimeStr, 'HH:mm', new Date())
    : null

  const occupiedIntervals: OccupiedInterval[] = state.occupiedIntervals ?? []

  // Límite superior para Hora fin: inicio del primer bloque ocupado después de startTime, o 22:00
  const endTimeMaxTime: Date = (() => {
    const startMins = startTimeStr ? toMins(startTimeStr) : 0
    const nextBlock = occupiedIntervals
      .map((i) => toMins(i.startTime))
      .filter((s) => s > startMins)
      .sort((a, b) => a - b)[0]
    const limitMins = nextBlock ?? 22 * 60
    const d = new Date()
    d.setHours(Math.floor(limitMins / 60), limitMins % 60, 0, 0)
    return d
  })()

  // Deshabilita horas/minutos fuera del rango operativo o dentro de un bloque ocupado
  const disabledTime = (time: Date) => {
    const totalMins = time.getHours() * 60 + time.getMinutes()
    if (totalMins < 6 * 60 || totalMins >= 22 * 60) return true
    return occupiedIntervals.some((i) => {
      const start = toMins(i.startTime)
      const end = toMins(i.endTime)
      return totalMins >= start && totalMins < end
    })
  }

  useEffect(() => {
    setTitle('reserva de espacio')
    setIcon(<CalendarStar size={32} />)

    const fetchData = async () => {
      setLoader(true)
      const { data: courseList } = await courseService.getAll()
      setCourses(courseList)
      setLoader(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!startTimeStr) return
    if (endTimeStr && endTimeStr <= startTimeStr) setValue('endTime', '')
  }, [startTimeStr])

  // Al salir de Final/Parcial, limpiamos la asignatura
  useEffect(() => {
    if (!isExamType(eventType)) setValue('courseID', '')
  }, [eventType, setValue])

  const submit: SubmitHandler<FormValues> = async (data) => {
    if (isExamType(data.type) && !data.courseID) {
      setNotificationState({
        title: 'Error',
        description: 'Asignatura es obligatoria para Final/Parcial',
        type: 'error'
      })
      return
    }

    if (!data.date) {
      setNotificationState({
        title: 'Error',
        description: 'Seleccione una fecha para la reserva',
        type: 'error'
      })
      return
    }

    if (data.startTime >= data.endTime) {
      setNotificationState({
        title: 'Error',
        description: 'La hora de fin debe ser posterior a la hora de inicio',
        type: 'error'
      })
      return
    }

    const reqStart = toMins(data.startTime)
    const reqEnd = toMins(data.endTime)
    const overlaps = occupiedIntervals.some(
      (i) => reqStart < toMins(i.endTime) && reqEnd > toMins(i.startTime)
    )
    if (overlaps) {
      setNotificationState({
        title: 'Error',
        description:
          'El horario seleccionado se superpone con un evento ya existente',
        type: 'error'
      })
      return
    }

    try {
      setLoader(true)

      const schedule = mapScheduleToBackend({
        weekDay: '',
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        isVirtual: false,
        professors: [],
        classroomId: state.classroom.id
      })

      const payload: IEventCreateDto = {
        name: data.name,
        isApproved: false,
        isCancelled: false,
        type: data.type,
        details: data.details,
        periodID: '',
        courseID: isExamType(data.type) ? data.courseID : '',
        customPeriodStart: null,
        customPeriodEnd: null,
        schedules: [schedule]
      }

      await eventService.create(payload)
      navigate('/buscar')
      setNotificationState({
        title: 'Solicitud enviada',
        description:
          'Tu solicitud de reserva fue enviada y está pendiente de aprobación',
        type: 'success'
      })
    } catch {
      setNotificationState({
        title: 'Error',
        description: 'No se pudo enviar la solicitud. Contacta a soporte.',
        type: 'error'
      })
    } finally {
      setLoader(false)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(submit)}
      sx={{ maxWidth: 650, mx: 'auto', mt: 2 }}
    >
      <Stack spacing={3}>
        {/* Espacio seleccionado (solo lectura) */}
        <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'action.hover' }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Espacio seleccionado
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {state.classroom?.code ?? '—'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {state.classroom?.building.name}
            {state.classroom?.capacity
              ? ` · Capacidad: ${state.classroom.capacity} personas`
              : ''}
          </Typography>
        </Box>

        {/* Nombre */}
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Obligatorio' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Motivo / nombre del evento"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        {/* Tipo de evento */}
        <Controller
          name="type"
          control={control}
          rules={{ required: 'Obligatorio' }}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.type}>
              <InputLabel id="type-lbl">Tipo de evento</InputLabel>
              <Select labelId="type-lbl" label="Tipo de evento" {...field}>
                {EVENT_TYPES.filter((t) => t.value !== 'CURSADA').map((t) => (
                  <MenuItem key={t.value} value={t.value}>
                    {t.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        {/* FINAL / PARCIAL: solo Asignatura */}
        {isExamType(eventType) && (
          <Controller
            name="courseID"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                options={courses}
                getOptionLabel={(c) => c.name}
                isOptionEqualToValue={(o, v) => o.id === v.id}
                value={courses.find((c) => c.id === field.value) ?? null}
                onChange={(_, v) => field.onChange(v ? v.id : '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Asignatura"
                    error={!!errors.courseID}
                    helperText={errors.courseID && 'Obligatorio'}
                  />
                )}
              />
            )}
          />
        )}

        {/* Descripción */}
        <Controller
          name="details"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Descripción / motivo de la reserva"
              fullWidth
              multiline
              minRows={3}
            />
          )}
        />

        <Typography variant="subtitle1" fontWeight="bold">
          Horario
        </Typography>

        {/* Fecha */}
        <Controller
          name="date"
          control={control}
          rules={{ required: 'Obligatorio' }}
          render={({ field }) => (
            <DatePicker
              label="Fecha"
              disablePast
              value={field.value}
              onChange={(val) => field.onChange(val)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.date,
                  helperText: errors.date ? 'Obligatorio' : undefined
                },
                actionBar: { actions: ['cancel', 'clear', 'accept'] }
              }}
            />
          )}
        />

        {/* Hora inicio / fin */}
        <Stack direction="row" spacing={2}>
          <Controller
            name="startTime"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TimePicker
                label="Hora inicio"
                value={
                  field.value ? parse(field.value, 'HH:mm', new Date()) : null
                }
                onChange={(val) =>
                  field.onChange(val ? format(val as Date, 'HH:mm') : '')
                }
                maxTime={parsedEndTime ?? undefined}
                shouldDisableTime={disabledTime}
                slotProps={{ textField: { fullWidth: true } }}
              />
            )}
          />
          <Controller
            name="endTime"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TimePicker
                label="Hora fin"
                value={
                  field.value ? parse(field.value, 'HH:mm', new Date()) : null
                }
                onChange={(val) =>
                  field.onChange(val ? format(val as Date, 'HH:mm') : '')
                }
                disabled={!startTimeStr}
                minTime={parsedStartTime ?? undefined}
                maxTime={endTimeMaxTime}
                shouldDisableTime={disabledTime}
                slotProps={{ textField: { fullWidth: true } }}
              />
            )}
          />
        </Stack>

        {/* Acciones */}
        <Stack direction="column" spacing={2}>
          <Button variant="contained" type="submit">
            <FloppyDisk size={32} />
            Enviar solicitud
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            <XSquare size={32} />
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}