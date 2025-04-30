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
  FormControlLabel,
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
import { eventService } from '@/data/services/EventService'

import { IPeriod } from '@/data/domain/Period'
import { ICourseList } from '@/data/domain/Course'
import { IEventCreate } from '@/data/domain/Event'
import { IBuildingList } from '@/data/domain/Building'
import { buildingService } from '@/data/services/BuildingService'
import { IScheduleCreate } from '@/data/domain/Schedule'

type ScheduleForm = Omit<IScheduleCreate, 'id'> & { id?: string }
type FormValues = Omit<
  IEventCreate,
  'periodID' | 'courseID' | 'classroomID'
> & {
  id?: string
  periodID: string
  courseID: string
  schedules: ScheduleForm[]
}

export default function EventForm() {
  /* ---------- state ---------- */
  const [periods, setPeriods] = useState<IPeriod[]>([])
  const [courses, setCourses] = useState<ICourseList[]>([])
  const [buildings, setBuildings] = useState<IBuildingList[]>([])
  const [openConfirm, setOpenConfirm] = useState(false)

  /* ---------- context ---------- */
  const { setLoader } = useLoader()
  const { setNotificationState } = useNotification()
  const { setTitle } = useOutletContext<FormContext>()
  const navigate = useNavigate()
  const { id } = useParams()

  /* ---------- form ---------- */
  const {
    control,
    handleSubmit,
    reset,
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

  /* field array para schedules */
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedules'
  })

  /* ---------- helpers ---------- */
  const optionLabelPeriod = (p: IPeriod) => p.title
  const optionLabelCourse = (c: ICourseList) => c.name

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
      /* editar */
      const { data: evt } = await eventService.getById(id)
      reset({
        /* id: evt.id, */
        name: evt.name,
        isApproved: evt.isApproved,
        isCancelled: evt.isCancelled,
        periodID: evt.periodId,
        courseID: evt.courseId,
        schedules: evt.schedules.map((s) => ({
          ...s,
          date: s.date, // string yyyy-MM-dd que controla TextField type=date
          classroomId: s.classroom.id ?? ''
        }))
      })
    }
    setLoader(false)
  }

  /* ---------- acciones ---------- */
  const submit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoader(true)
      if (id) await eventService.update(data as IEventCreate)
      else await eventService.create(data as IEventCreate)

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

  /* ---------- efect ---------- */
  useEffect(() => {
    setTitle('Evento')
    fetchInfo()
  }, [id])

  /* ---------- UI ---------- */
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

          {/* schedules dinámicos */}
          <Typography variant="h6">Horarios</Typography>
          {fields.map((f, idx) => (
            <Stack
              key={f.id}
              direction="row"
              spacing={1}
              sx={{ alignItems: 'center' }}
            >
              {/* día */}
              <Controller
                name={`schedules.${idx}.weekDay`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    SelectProps={{ native: true }}
                    label="Día"
                    sx={{ width: 120 }}
                  >
                    {[
                      'MONDAY',
                      'TUESDAY',
                      'WEDNESDAY',
                      'THURSDAY',
                      'FRIDAY',
                      'SATURDAY',
                      'SUNDAY'
                    ].map((d) => (
                      <option key={d} value={d}>
                        {d.slice(0, 3)}
                      </option>
                    ))}
                  </TextField>
                )}
              />

              {/* inicio */}
              <Controller
                name={`schedules.${idx}.startTime`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="time"
                    label="Inicio"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: 120 }}
                  />
                )}
              />

              {/* fin */}
              <Controller
                name={`schedules.${idx}.endTime`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="time"
                    label="Fin"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: 120 }}
                  />
                )}
              />

              {/* fecha única (opcional) */}
              <Controller
                name={`schedules.${idx}.date`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Fecha"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: 150 }}
                  />
                )}
              />

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

              {/* aula */}
              <Controller
                name={`schedules.${idx}.classroomId`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Aula Id" sx={{ width: 110 }} />
                )}
              />

              <Button
                color="error"
                onClick={() => remove(idx)}
                sx={{ minWidth: 30 }}
              >
                X
              </Button>
            </Stack>
          ))}
          <Button
            onClick={() =>
              append({
                weekDay: 'MONDAY',
                startTime: '08:00',
                endTime: '10:00',
                date: null,
                isVirtual: false,
                classroom: null,
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
