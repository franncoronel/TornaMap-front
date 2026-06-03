import { useEffect, useState } from 'react'
import { format, parse, parseISO } from 'date-fns'
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm
} from 'react-hook-form'
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import { useLoader } from '@/context/LoaderContext'
import { useNotification } from '@/context/NotificationContext'
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams
} from 'react-router-dom'
import { FormContext } from '../Form'

import { periodService } from '@/data/services/PeriodService'
import { courseService } from '@/data/services/CourseService'
import { buildingService } from '@/data/services/BuildingService'
import {
  eventService,
  mapScheduleToBackend
} from '@/data/services/EventService'

import { IPeriod } from '@/data/domain/Period'
import { ICourseList } from '@/data/domain/Course'
import { EVENT_TYPES, EventType, IEventCreate, IEventCreateDto } from '@/data/domain/Event'
import { IBuildingList } from '@/data/domain/Building'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { IScheduleCreate } from '@/data/domain/Schedule'
import { weekDayES, weekDayShort } from '@/utils/helpers'
import { Trash } from '@phosphor-icons/react/dist/icons/Trash'
import { XSquare } from '@phosphor-icons/react/dist/icons/XSquare'
import { FloppyDisk } from '@phosphor-icons/react/dist/icons/FloppyDisk'
import { CalendarPlus } from '@phosphor-icons/react/dist/icons/CalendarPlus'
import { CalendarDots } from '@phosphor-icons/react/dist/icons/CalendarDots'
import { CalendarStar } from '@phosphor-icons/react/dist/icons/CalendarStar'
import { TimePicker } from '@mui/x-date-pickers'

/** Modo de programación para eventos no-CURSADA */
type ScheduleMode = 'single' | 'custom_period'

interface LocationState {
  courseID?: string
  preselectedClassroomId?: string
}

/* ---------- tipos ---------- */
export type ScheduleForm = Omit<IScheduleCreate, 'id' | 'date'> & {
  id?: string
  date: Date | null
  buildingId?: string
  classroomId?: string
}

type FormValues = Omit<IEventCreate, 'periodID' | 'courseID'> & {
  id?: string
  periodID: string
  courseID: string
  type: EventType
  details: string
  /* campos para modo no-CURSADA */
  scheduleMode: ScheduleMode
  customPeriodStart: Date | null
  customPeriodEnd: Date | null
  customPeriodDays: string[]
  schedules: ScheduleForm[]
}

/* ---------- helpers de tipo ---------- */
const isExamType = (type: EventType | '') => type === 'FINAL' || type === 'PARCIAL'
const needsCourse = (type: EventType | '') => type === 'CURSADA' || isExamType(type)
const needsPeriod = (type: EventType | '') => type === 'CURSADA'
const allowsCustomPeriod = (type: EventType | '') =>
  !!type && type !== 'CURSADA' && !isExamType(type)

/* ---------- componente ---------- */
export default function EventForm() {
  const location = useLocation()
  const { courseID: initialCourseID, preselectedClassroomId } = (location.state ?? {}) as LocationState

  /* state */
  const [periods, setPeriods] = useState<IPeriod[]>([])
  const [courses, setCourses] = useState<ICourseList[]>([])
  const [buildings, setBuildings] = useState<IBuildingList[]>([])
  const [openConfirm, setOpenConfirm] = useState(false)

  /* context */
  const { setLoader } = useLoader()
  const { setNotificationState } = useNotification()
  const { setTitle, setIcon } = useOutletContext<FormContext>()
  const navigate = useNavigate()
  const { id } = useParams()

  /* form */
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      isApproved: false,
      isCancelled: false,
      periodID: '',
      courseID: initialCourseID ?? '',
      type: 'CURSADA',
      details: '',
      scheduleMode: 'single',
      customPeriodStart: null,
      customPeriodEnd: null,
      customPeriodDays: [],
      schedules: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedules'
  })

  /* watchers */
  const eventType = watch('type')
  const scheduleMode = watch('scheduleMode')
  const isCursada = eventType === 'CURSADA'

  /* helpers */
  const optionLabelPeriod = (p: IPeriod) => p.title
  const optionLabelCourse = (c: ICourseList) => c.name
  const classroomsFlat = buildings.flatMap((b) =>
    b.classrooms.map((cl) => ({
      id: cl.id,
      label: `${cl.code} — ${b.name}`,
      buildingId: b.id
    }))
  )

  /* ---------- fetch ---------- */
  const fetchInfo = async () => {
    setLoader(true)
    const [{ data: periodList }, { data: courseList }, { data: buildingList }] =
      await Promise.all([
        periodService.getAll(),
        courseService.getAll(),
        buildingService.getAll()
      ])
    setPeriods(periodList)
    setCourses(courseList)
    setBuildings(buildingList)

    if (id) {
      const { data: evt } = await eventService.getDetailById(id)

      /* Derivar scheduleMode a partir de los datos existentes */
      const evtIsCursada = evt.type === 'CURSADA'
      const evtIsExam = isExamType(evt.type)
      let derivedMode: ScheduleMode = 'single'
      let derivedDays: string[] = []
      let derivedStart: Date | null = null
      let derivedEnd: Date | null = null

      if (!evtIsCursada && !evtIsExam && evt.schedules.length > 0) {
        const hasWeekDays = evt.schedules.some((s) => !!s.weekDay)
        if (hasWeekDays) {
          derivedMode = 'custom_period'
          derivedDays = [
            ...new Set(evt.schedules.map((s) => s.weekDay).filter(Boolean))
          ] as string[]
          derivedStart = evt.customPeriodStart
            ? typeof evt.customPeriodStart === 'string'
              ? parseISO(evt.customPeriodStart)
              : evt.customPeriodStart
            : null
          derivedEnd = evt.customPeriodEnd
            ? typeof evt.customPeriodEnd === 'string'
              ? parseISO(evt.customPeriodEnd)
              : evt.customPeriodEnd
            : null
        }
      }

      reset({
        name: evt.name,
        isApproved: evt.isApproved,
        isCancelled: evt.isCancelled,
        periodID: evt.periodID ?? '',
        courseID: evt.courseID ?? '',
        type: evt.type,
        details: evt.details ?? '',
        scheduleMode: (evtIsCursada || evtIsExam) ? 'single' : derivedMode,
        customPeriodStart: derivedStart,
        customPeriodEnd: derivedEnd,
        customPeriodDays: derivedDays,
        schedules: evt.schedules.map((s) => ({
          ...s,
          date:
            typeof s.date === 'string'
              ? parseISO(s.date)
              : s.date,
          buildingId: s.classroom?.building.id ?? '',
          classroomId: s.classroom?.id ?? ''
        }))
      })
    }
    setLoader(false)
  }

  /* ---------- submit ---------- */
  const submit: SubmitHandler<FormValues> = async (data) => {
    /* ── Validaciones ── */
    if (!data.type) {
      setNotificationState({
        title: 'Error',
        description: 'Seleccione un tipo de evento',
        type: 'error'
      })
      return
    }

    /* CURSADA: periodo + asignatura obligatorios */
    if (data.type === 'CURSADA') {
      if (!data.periodID || !data.courseID) {
        setNotificationState({
          title: 'Error',
          description: 'Periodo y Asignatura son obligatorios para Cursada',
          type: 'error'
        })
        return
      }
    }

    /* FINAL / PARCIAL: asignatura obligatoria */
    if (isExamType(data.type)) {
      if (!data.courseID) {
        setNotificationState({
          title: 'Error',
          description: 'Asignatura es obligatoria para Final/Parcial',
          type: 'error'
        })
        return
      }
    }

    /* Periodo personalizado: validar rango y días */
    if (allowsCustomPeriod(data.type) && data.scheduleMode === 'custom_period') {
      if (!data.customPeriodStart || !data.customPeriodEnd) {
        setNotificationState({
          title: 'Error',
          description: 'Seleccione fecha de inicio y fin del periodo',
          type: 'error'
        })
        return
      }
      if (data.customPeriodDays.length === 0) {
        setNotificationState({
          title: 'Error',
          description: 'Seleccione al menos un día de la semana',
          type: 'error'
        })
        return
      }
    }

    /* Aula obligatoria si no es virtual */
    for (const sch of data.schedules) {
      if (!sch.isVirtual && !sch.classroomId) {
        setNotificationState({
          title: 'Error',
          description: 'Seleccione aula o marque Virtual',
          type: 'error'
        })
        return
      }
    }

    /* Evento único / examen: cada horario debe tener fecha */
    const isSingleMode =
      (data.type !== 'CURSADA' && data.scheduleMode === 'single') ||
      isExamType(data.type)

    if (isSingleMode) {
      for (const sch of data.schedules) {
        if (!sch.date) {
          setNotificationState({
            title: 'Error',
            description: 'Seleccione una fecha para el evento',
            type: 'error'
          })
          return
        }
      }
    }

    try {
      setLoader(true)

      const sendCustomPeriod =
        allowsCustomPeriod(data.type) && data.scheduleMode === 'custom_period'

      const payload: IEventCreateDto & { id: string | undefined } = {
        id,
        name: data.name,
        isApproved: data.isApproved,
        isCancelled: data.isCancelled,
        type: data.type,
        details: !isCursada ? data.details : '',
        periodID: needsPeriod(data.type) ? data.periodID : '',
        courseID: needsCourse(data.type) ? data.courseID : '',
        customPeriodStart: sendCustomPeriod ? data.customPeriodStart : null,
        customPeriodEnd: sendCustomPeriod ? data.customPeriodEnd : null,
        schedules: data.schedules.map((sch) => {
          const cleaned = sch.isVirtual
            ? { ...sch, buildingId: '', classroomId: '' }
            : sch
          return mapScheduleToBackend(cleaned)
        })
      }

      if (id) await eventService.update(payload)
      else await eventService.create(payload)
      navigate('/buscar')
      setNotificationState({
        title: id ? 'Evento actualizado' : 'Evento creado',
        description: 'La operación se realizó correctamente',
        type: 'success'
      })
    } catch {
      setNotificationState({
        title: 'Error',
        description: 'Contacta a soporte',
        type: 'error'
      })
    } finally {
      setLoader(false)
    }
  }

  /* ---------- delete ---------- */
  const onDelete = async () => {
    if (!id) return
    try {
      setLoader(true)
      await eventService.delete(id)
      navigate('/buscar')
      setNotificationState({
        title: 'Evento eliminado',
        description: 'El evento fue eliminado correctamente',
        type: 'success'
      })
    } finally {
      setLoader(false)
    }
  }

  /* ---------- side-effects al cambiar tipo ---------- */
  useEffect(() => {
    if (!eventType) return

    if (eventType === 'CURSADA') {
      /* Limpiar campos no-cursada */
      setValue('details', '')
      setValue('customPeriodStart', null)
      setValue('customPeriodEnd', null)
      setValue('customPeriodDays', [])
      setValue('scheduleMode', 'single')
    } else if (isExamType(eventType)) {
      /* Final/Parcial: forzar evento único, limpiar periodo */
      setValue('periodID', '')
      setValue('scheduleMode', 'single')
      setValue('customPeriodStart', null)
      setValue('customPeriodEnd', null)
      setValue('customPeriodDays', [])
    } else {
      /* Charla/Seminario/Conferencia: limpiar periodo y asignatura */
      setValue('periodID', '')
      setValue('courseID', '')
    }
  }, [eventType, setValue])

  /* ---------- efectos iniciales ---------- */
  const schedulesWatch = watch('schedules')

  useEffect(() => {
    setTitle('Evento')
    setIcon(<CalendarStar size={32} />)

    const init = async () => {
      await fetchInfo()

      if (!id && initialCourseID) {
        setValue('courseID', initialCourseID)
      }

      // Si viene un aula pre-seleccionada desde el modal (rol PROFESSOR),
      // agregamos un horario con ese edificio/aula ya cargados
      if (!id && preselectedClassroomId) {
        const allBuildings = await import('@/data/services/BuildingService')
          .then(m => m.buildingService.getAll())
          .then(r => r.data)

        let foundBuildingId = ''
        for (const b of allBuildings) {
          if (b.classrooms.some(c => c.id === preselectedClassroomId)) {
            foundBuildingId = b.id
            break
          }
        }

        append({
          weekDay: '',
          startTime: '08:00',
          endTime: '10:00',
          date: null,
          isVirtual: false,
          buildingId: foundBuildingId,
          classroomId: preselectedClassroomId,
          professors: []
        })
      }
    }

    init()

    schedulesWatch.forEach((s, idx) => {
      if (s.isVirtual && s.classroom) {
        setValue(`schedules.${idx}.buildingId`, '')
        setValue(`schedules.${idx}.classroomId`, '')
      }
    })
  }, [])

  /* ---------- helper para agregar horario ---------- */
  const appendSchedule = () => {
    append({
      weekDay: '',
      startTime: '08:00',
      endTime: '10:00',
      date: null,
      isVirtual: true,
      buildingId: '',
      classroomId: '',
      professors: []
    })
  }

  /* ---------- derivar qué mostrar en horarios ---------- */
  const showWeekDayInSchedule =
    isCursada || (allowsCustomPeriod(eventType) && scheduleMode === 'custom_period')
  const showDateInSchedule =
    isExamType(eventType) ||
    (!isCursada && !allowsCustomPeriod(eventType)) || /* fallback */
    (!isCursada && scheduleMode === 'single' && allowsCustomPeriod(eventType))

  /* ---------- UI ---------- */
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(submit)}
        sx={{ maxWidth: 650, mx: 'auto', mt: 2 }}
      >
        <Stack spacing={3}>
          {/* ═══════════ Nombre ═══════════ */}
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Obligatorio' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          {/* ═══════════ Tipo de evento ═══════════ */}
          <Controller
            name="type"
            control={control}
            rules={{ required: 'Obligatorio' }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel id="type-lbl">Tipo de evento</InputLabel>
                <Select
                  labelId="type-lbl"
                  label="Tipo de evento"
                  {...field}
                >
                  {EVENT_TYPES.map((t) => (
                    <MenuItem key={t.value} value={t.value}>
                      {t.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.type && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.type.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          {/* ═══════════ Switches ═══════════ */}
          <Stack direction="row" spacing={2}>
            <Controller
              name="isApproved"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch {...field} checked={field.value} />}
                  label="Aprobado"
                />
              )}
            />
            <Controller
              name="isCancelled"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  sx={{ display: 'none' }}
                  control={<Switch {...field} checked={field.value} />}
                  label="Cancelado"
                />
              )}
            />
          </Stack>

          {/* ═══════════ CURSADA: Periodo + Asignatura ═══════════ */}
          {isCursada && (
            <>
              <Controller
                name="periodID"
                control={control}
                rules={{ required: isCursada }}
                render={({ field }) => (
                  <Autocomplete
                    options={periods}
                    getOptionLabel={optionLabelPeriod}
                    isOptionEqualToValue={(o, v) => o.id === v.id}
                    value={periods.find((p) => p.id === field.value) ?? null}
                    onChange={(_, val) => field.onChange(val ? val.id : '')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Periodo"
                        error={!!errors.periodID}
                        helperText={errors.periodID && 'Obligatorio'}
                      />
                    )}
                  />
                )}
              />

              <Controller
                name="courseID"
                control={control}
                rules={{ required: isCursada }}
                render={({ field }) => (
                  <Autocomplete
                    options={courses}
                    getOptionLabel={optionLabelCourse}
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
            </>
          )}

          {/* ═══════════ FINAL / PARCIAL: solo Asignatura ═══════════ */}
          {isExamType(eventType) && (
            <Controller
              name="courseID"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Autocomplete
                  options={courses}
                  getOptionLabel={optionLabelCourse}
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

          {/* ═══════════ NO CURSADA: Detalle ═══════════ */}
          {eventType && !isCursada && (
            <Controller
              name="details"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Detalle"
                  fullWidth
                  multiline
                  minRows={3}
                />
              )}
            />
          )}

          {/* ═══════════ CHARLA/SEMINARIO/CONFERENCIA: Modo de programación ═══════════ */}
          {allowsCustomPeriod(eventType) && (
            <>
              <Controller
                name="scheduleMode"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Programación
                    </Typography>
                    <RadioGroup
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <FormControlLabel
                        value="single"
                        control={<Radio />}
                        label="Evento único (fecha puntual)"
                      />
                      <FormControlLabel
                        value="custom_period"
                        control={<Radio />}
                        label="Periodo personalizado (rango de fechas + días)"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />

              {/* ── Periodo personalizado: desde / hasta / días ── */}
              {scheduleMode === 'custom_period' && (
                <Stack spacing={2} sx={{ pl: 2, borderLeft: '3px solid #1976d2' }}>
                  <Stack direction="row" spacing={2}>
                    <Controller
                      name="customPeriodStart"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          label="Desde"
                          disablePast
                          value={field.value}
                          onChange={(val) => field.onChange(val)}
                          slotProps={{
                            textField: { fullWidth: true },
                            actionBar: { actions: ['cancel', 'clear', 'accept'] }
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="customPeriodEnd"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          label="Hasta"
                          disablePast
                          value={field.value}
                          onChange={(val) => field.onChange(val)}
                          slotProps={{
                            textField: { fullWidth: true },
                            actionBar: { actions: ['cancel', 'clear', 'accept'] }
                          }}
                        />
                      )}
                    />
                  </Stack>

                  {/* Días de la semana */}
                  <Controller
                    name="customPeriodDays"
                    control={control}
                    render={({ field }) => (
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {weekDayES.map((day) => (
                          <FormControlLabel
                            key={day}
                            control={
                              <Checkbox
                                checked={field.value.includes(day)}
                                onChange={(e) => {
                                  const updated = e.target.checked
                                    ? [...field.value, day]
                                    : field.value.filter((d) => d !== day)
                                  field.onChange(updated)
                                }}
                              />
                            }
                            label={weekDayShort[day]}
                          />
                        ))}
                      </Stack>
                    )}
                  />
                </Stack>
              )}
            </>
          )}

          {/* ═══════════ HORARIOS ═══════════ */}
          <Typography variant="h2">
            <CalendarDots size={32} />
            Horarios
          </Typography>

          {fields.map((f, idx) => {
            const buildField = `schedules.${idx}.buildingId` as const
            const classField = `schedules.${idx}.classroomId` as const
            const buildingIdSel = watch(buildField)
            const classroomsFiltered = classroomsFlat.filter(
              (c) => c.buildingId === buildingIdSel
            )

            return (
              <Stack
                key={f.id}
                spacing={1}
                sx={{ border: '1px solid #ddd', p: 1, borderRadius: 1 }}
              >
                {/* fila 1: día o fecha */}
                <Stack direction="row" spacing={1}>
                  {showWeekDayInSchedule && (
                    <Controller
                      name={`schedules.${idx}.weekDay`}
                      control={control}
                      render={({ field }) => (
                        <FormControl sx={{ flex: 1 }}>
                          <InputLabel id={`weekday-lbl-${idx}`}>Día</InputLabel>
                          <Select
                            labelId={`weekday-lbl-${idx}`}
                            label="Día"
                            displayEmpty
                            {...field}
                          >
                            <MenuItem value="">
                              <em>---</em>
                            </MenuItem>
                            {weekDayES.map((d) => (
                              <MenuItem key={d} value={d}>
                                {weekDayShort[d]}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  )}

                  {showDateInSchedule && (
                    <Controller
                      name={`schedules.${idx}.date`}
                      control={control}
                      render={({ field }) => (
                        <Box sx={{ flex: 1 }}>
                          <DatePicker
                            label="Fecha"
                            disablePast
                            value={field.value}
                            onChange={(val) => field.onChange(val)}
                            slotProps={{
                              textField: { fullWidth: true },
                              actionBar: {
                                actions: ['cancel', 'clear', 'accept']
                              }
                            }}
                          />
                        </Box>
                      )}
                    />
                  )}
                </Stack>

                {/* fila 2: hora inicio / fin */}
                <Stack direction="row" spacing={1}>
                  <Controller
                    name={`schedules.${idx}.startTime`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TimePicker
                        label="Inicio"
                        value={
                          field.value
                            ? parse(field.value, 'HH:mm', new Date())
                            : null
                        }
                        onChange={(val) =>
                          field.onChange(
                            val ? format(val as Date, 'HH:mm') : ''
                          )
                        }
                        slotProps={{
                          textField: { fullWidth: true }
                        }}
                      />
                    )}
                  />
                  <Controller
                    name={`schedules.${idx}.endTime`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TimePicker
                        label="Fin"
                        value={
                          field.value
                            ? parse(field.value, 'HH:mm', new Date())
                            : null
                        }
                        onChange={(val) =>
                          field.onChange(
                            val ? format(val as Date, 'HH:mm') : ''
                          )
                        }
                        slotProps={{
                          textField: { fullWidth: true }
                        }}
                      />
                    )}
                  />
                </Stack>

                {/* fila 3: virtual / edificio / aula */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1}
                  alignItems="center"
                >
                  <Controller
                    name={`schedules.${idx}.isVirtual`}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        sx={{ alignSelf: 'start' }}
                        control={
                          <Switch
                            {...field}
                            checked={field.value}
                            onChange={(e) => {
                              field.onChange(e.target.checked)
                              if (e.target.checked) {
                                setValue(buildField, '')
                                setValue(classField, '')
                              }
                            }}
                          />
                        }
                        label="Virtual"
                      />
                    )}
                  />

                  <Controller
                    name={buildField}
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        options={buildings}
                        sx={{ flex: 1, width: { xs: '100%' } }}
                        getOptionLabel={(b) => b.name}
                        isOptionEqualToValue={(o, v) => o.id === v.id}
                        disabled={watch(`schedules.${idx}.isVirtual`)}
                        value={
                          buildings.find((b) => b.id === field.value) ?? null
                        }
                        onChange={(_, v) => {
                          field.onChange(v ? v.id : '')
                          setValue(classField, '')
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Edificio"
                            fullWidth
                            sx={{ width: { xs: '100%' } }}
                            disabled={watch(`schedules.${idx}.isVirtual`)}
                          />
                        )}
                      />
                    )}
                  />

                  <Controller
                    name={classField}
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        sx={{ flex: 1, width: { xs: '100%' } }}
                        options={classroomsFiltered}
                        getOptionLabel={(o) => o.label}
                        isOptionEqualToValue={(o, v) => o.id === v.id}
                        disabled={
                          watch(`schedules.${idx}.isVirtual`) || !buildingIdSel
                        }
                        value={
                          classroomsFiltered.find(
                            (c) => c.id === field.value
                          ) ?? null
                        }
                        onChange={(_, v) => field.onChange(v ? v.id : '')}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Aula"
                            fullWidth
                            sx={{ width: { xs: '100%' } }}
                            disabled={
                              watch(`schedules.${idx}.isVirtual`) ||
                              !buildingIdSel
                            }
                          />
                        )}
                      />
                    )}
                  />
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Button color="error" onClick={() => remove(idx)}>
                    <Trash size={32} />
                    Eliminar Horario
                  </Button>
                </Stack>
              </Stack>
            )
          })}

          <Button onClick={appendSchedule}>
            <CalendarPlus size={32} />
            Añadir horario
          </Button>

          {/* ═══════════ Acciones ═══════════ */}
          <Stack direction="column" spacing={2}>
            <Button variant="contained" type="submit">
              <FloppyDisk size={32} />
              {id ? 'Actualizar' : 'Guardar'}
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              <XSquare size={32} />
              Cancelar
            </Button>
            {id && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpenConfirm(true)}
              >
                <Trash size={32} />
                Eliminar
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>

      {/* ═══════════ Diálogo confirmación eliminar ═══════════ */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>¿Eliminar evento?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción es irreversible. ¿Seguro que deseas eliminar el evento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>
            <XSquare size={32} />
            Cancelar
          </Button>
          <Button
            color="error"
            onClick={() => {
              onDelete()
              setOpenConfirm(false)
            }}
          >
            <Trash size={32} />
            Sí, eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}