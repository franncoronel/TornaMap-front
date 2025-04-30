import { useEffect, useState } from 'react'
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import { useLoader } from '@/context/LoaderContext'
import { useNotification } from '@/context/NotificationContext'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
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
import { IEventCreate, IEventCreateDto } from '@/data/domain/Event'
import { IBuildingList } from '@/data/domain/Building'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { IScheduleCreate } from '@/data/domain/Schedule'

/* ---------- tipos ---------- */
export type ScheduleForm = Omit<IScheduleCreate, 'id'> & {
  id?: string
  buildingId?: string
  classroomId?: string
}

type FormValues = Omit<IEventCreate, 'periodID' | 'courseID'> & {
  id?: string
  periodID: string
  courseID: string
  schedules: ScheduleForm[]
}

/* ---------- componente ---------- */
export default function EventForm() {
  /* state */
  const [periods, setPeriods] = useState<IPeriod[]>([])
  const [courses, setCourses] = useState<ICourseList[]>([])
  const [buildings, setBuildings] = useState<IBuildingList[]>([])
  const [openConfirm, setOpenConfirm] = useState(false)

  /* context */
  const { setLoader } = useLoader()
  const { setNotificationState } = useNotification()
  const { setTitle } = useOutletContext<FormContext>()
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
      courseID: '',
      schedules: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedules'
  })

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

  /* fetch */
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
      const { data: evt } = await eventService.getById(id)
      reset({
        /* id: evt.id, */
        name: evt.name,
        isApproved: evt.isApproved,
        isCancelled: evt.isCancelled,
        periodID: evt.periodID,
        courseID: evt.courseID,
        schedules: evt.schedules.map((s) => ({
          ...s,
          buildingId: s.classroom?.building.id ?? '',
          classroomId: s.classroom?.id ?? ''
        }))
      })
    }
    setLoader(false)
  }

  /* submit */
  const submit: SubmitHandler<FormValues> = async (data) => {
    /* validación rápida */
    for (const sch of data.schedules) {
      const hasWeek = !!sch.weekDay
      const hasDate = !!sch.date
      if ((hasWeek && hasDate) || (!hasWeek && !hasDate)) {
        setNotificationState({
          title: 'Error',
          description: 'Cada horario debe tener día o fecha (no ambos)',
          type: 'error'
        })
        return
      }
      if (!sch.isVirtual && !sch.classroomId) {
        setNotificationState({
          title: 'Error',
          description: 'Seleccione aula o marque Virtual',
          type: 'error'
        })
        return
      }
    }

    try {
      setLoader(true)
      const payload: IEventCreateDto = {
        name: data.name,
        isApproved: data.isApproved,
        isCancelled: data.isCancelled,
        periodID: data.periodID,
        courseID: data.courseID,
        schedules: data.schedules.map(mapScheduleToBackend)
      }

      if (id)
        await eventService.update(payload) // update espera IEventCreate
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

  /* delete */
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

  /* efectos */
  useEffect(() => {
    setTitle('Evento')
    fetchInfo()
  }, [id])

  /* reglas: observar schedules para limpiar campos */
  const schedulesWatch = watch('schedules')
  useEffect(() => {
    schedulesWatch.forEach((s, idx) => {
      /* weekday xor date */
      if (s.weekDay && s.date) setValue(`schedules.${idx}.date`, null)
      /* virtual => limpia building & classroom */
      if (s.isVirtual && s.classroom) {
        setValue(`schedules.${idx}.buildingId`, '')
        setValue(`schedules.${idx}.classroomId`, '')
      }
    })
  }, [schedulesWatch, setValue])

  /* ui */
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(submit)}
        sx={{ maxWidth: 650, mx: 'auto', mt: 2 }}
      >
        <Stack spacing={3}>
          {/* nombre */}
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

          {/* switches */}
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
                  control={<Switch {...field} checked={field.value} />}
                  label="Cancelado"
                />
              )}
            />
          </Stack>

          {/* periodo */}
          <Controller
            name="periodID"
            control={control}
            rules={{ required: true }}
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

          {/* curso */}
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
                onChange={(_, val) => field.onChange(val ? val.id : '')}
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

          {/* horarios */}
          <Typography variant="h6">Horarios</Typography>
          {fields.map((f, idx) => {
            const buildField = `schedules.${idx}.buildingId` as const
            const classField = `schedules.${idx}.classroomId` as const
            const isVirtual = watch(`schedules.${idx}.isVirtual`)
            const buildingIdSel = watch(buildField)
            const classroomsFiltered = classroomsFlat.filter(
              (c) => c.buildingId === buildingIdSel
            )

            return (
              <Stack
                key={f.id}
                spacing={1}
                sx={{ border: '1px solid #ddd', p: 1 }}
              >
                {/* fila 1 */}
                <Stack direction="row" spacing={1}>
                  {/* weekday */}
                  <Controller
                    name={`schedules.${idx}.weekDay`}
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        sx={{ flex: 1 }}
                        disabled={Boolean(watch(`schedules.${idx}.date`))}
                      >
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
                          {[
                            'MONDAY',
                            'TUESDAY',
                            'WEDNESDAY',
                            'THURSDAY',
                            'FRIDAY',
                            'SATURDAY',
                            'SUNDAY'
                          ].map((d) => (
                            <MenuItem key={d} value={d}>
                              {d.slice(0, 3)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  {/* date */}
                  <Controller
                    name={`schedules.${idx}.date`}
                    control={control}
                    render={({ field }) => (
                      <Box sx={{ flex: 1 }}>
                        <DatePicker
                          label="Fecha"
                          disablePast
                          value={field.value || null}
                          onChange={(val) => field.onChange(val ? val : '')}
                          disabled={watch(`schedules.${idx}.weekDay`) !== ''}
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
                </Stack>

                {/* fila 2 */}
                <Stack direction="row" spacing={1}>
                  <Controller
                    name={`schedules.${idx}.startTime`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="time"
                        label="Inicio"
                        InputLabelProps={{ shrink: true }}
                        sx={{ flex: 1 }}
                      />
                    )}
                  />
                  <Controller
                    name={`schedules.${idx}.endTime`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="time"
                        label="Fin"
                        InputLabelProps={{ shrink: true }}
                        sx={{ flex: 1 }}
                      />
                    )}
                  />
                </Stack>

                {/* fila 3 */}
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* virtual */}
                  <Controller
                    name={`schedules.${idx}.isVirtual`}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch {...field} checked={field.value} />}
                        label="Virtual"
                      />
                    )}
                  />
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* building */}
                  <Controller
                    name={buildField}
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        options={buildings}
                        getOptionLabel={(b) => b.name}
                        isOptionEqualToValue={(o, v) => o.id === v.id}
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
                            sx={{ width: 180 }}
                          />
                        )}
                        disabled={isVirtual}
                      />
                    )}
                  />

                  {/* aula */}
                  <Controller
                    name={classField}
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        options={classroomsFiltered}
                        getOptionLabel={(o) => o.label}
                        isOptionEqualToValue={(o, v) => o.id === v.id}
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
                            sx={{ width: 180 }}
                          />
                        )}
                        disabled={isVirtual || !buildingIdSel}
                      />
                    )}
                  />
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Button color="error" onClick={() => remove(idx)}>
                    Eliminar Horario
                  </Button>
                </Stack>
              </Stack>
            )
          })}

          <Button
            onClick={() =>
              append({
                weekDay: '',
                startTime: '08:00',
                endTime: '10:00',
                date: null,
                isVirtual: false,
                buildingId: '',
                classroomId: '',
                professors: []
              })
            }
          >
            Añadir horario
          </Button>

          {/* acciones */}
          <Stack direction="column" spacing={2}>
            <Button variant="contained" type="submit">
              {id ? 'Actualizar' : 'Crear'}
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            {id && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpenConfirm(true)}
              >
                Eliminar
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>

      {/* confirmación */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>¿Eliminar evento?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción es irreversible. ¿Seguro que deseas eliminar el evento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
          <Button
            color="error"
            onClick={() => {
              onDelete()
              setOpenConfirm(false)
            }}
          >
            Sí, eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
