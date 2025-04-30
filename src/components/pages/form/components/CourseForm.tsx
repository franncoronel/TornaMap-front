import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useLoader } from '@/context/LoaderContext'
import { useNotification } from '@/context/NotificationContext'
import { useNavigate } from 'react-router-dom'
import { useOutletContext, useParams } from 'react-router-dom'
import { FormContext } from '../Form'

import { programService } from '@/data/services/ProgramService'
import { courseService } from '@/data/services/CourseService'

import { ICourseCreate, ICourseUpdate } from '@/data/domain/Course'
import { IProgram } from '@/data/domain/Program'

import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material'

type FormValues = Omit<ICourseCreate, 'id'> & { id?: string }

export default function CourseForm() {
  const [programs, setPrograms] = useState<IProgram[]>([])

  const navigate = useNavigate()
  const { setLoader } = useLoader()
  const { setNotificationState } = useNotification()
  const { setTitle } = useOutletContext<FormContext>()
  const { id } = useParams()

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: { name: '', description: '', programs: [] }
  })

  /* Llamados a API */
  const fetchPrograms = async () => {
    const response = await programService.getAll()
    setPrograms(response.data)
  }
  const fetchCourse = async (courseId: string) => {
    try {
      setLoader(true)
      const { data: course } = await courseService.getById(courseId)
      console.log(course)
      reset({
        id: course.id,
        name: course.name,
        description: course.description,
        programs: course.programs
      })
      // setValue('name', course.name)
      // setValue('description', course.description)
      // setValue('programs', course.programs)
    } catch (error) {
      console.error('Error fetching course:', error)
      setNotificationState({
        title: 'Error al obtener el curso',
        description: 'Contacta a soporte',
        type: 'error'
      })
    } finally {
      setLoader(false)
    }
  }
  const createCourse = async (payload: ICourseCreate) => {
    try {
      setLoader(true)
      await courseService.create(payload)
      navigate('/buscar')
      setNotificationState({
        title: 'Curso creado',
        description: 'El curso fue creado correctamente',
        type: 'success'
      })
    } catch (error) {
      console.error('Error creating course:', error)

      setNotificationState({
        title: 'Error al crear el curso',
        description: 'Contacta a soporte',
        type: 'error'
      })
    } finally {
      setLoader(false)
    }
  }
  const updateCourse = async (payload: ICourseUpdate) => {
    try {
      setLoader(true)
      await courseService.update(payload)
      setNotificationState({
        title: 'Curso actualizado',
        description: 'El curso fue actualizado correctamente',
        type: 'success'
      })
    } catch (error) {
      console.error('Error updating course:', error)
      setNotificationState({
        title: 'Error al actualizar el curso',
        description: 'Contacta a soporte',
        type: 'error'
      })
    } finally {
      setLoader(false)
    }
  }

  /* Submit */
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (id) {
      await updateCourse({ id, ...data })
    } else {
      await createCourse(data)
    }
  }

  /** ---------- helpers ---------- */
  const optionLabel = (p: IProgram) => p.name
  const findSelected = (ids: string[]) =>
    programs.filter((p) => ids.includes(p.id))

  useEffect(() => {
    setTitle('Asignatura')
    fetchPrograms()
    if (id) fetchCourse(id)
  }, [id])

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}
    >
      <Stack spacing={3}>
        <Typography variant="h5">
          {id ? 'Editar curso' : 'Crear curso'}
        </Typography>

        {/* Nombre */}
        <Controller
          name="name"
          control={control}
          rules={{ required: 'El nombre es obligatorio' }}
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

        {/* Descripción */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Descripción"
              fullWidth
              multiline
              minRows={4}
            />
          )}
        />

        {/* Programas */}
        <Controller
          name="programs"
          control={control}
          render={({ field }) => (
            <Autocomplete
              multiple
              options={programs}
              disableCloseOnSelect
              getOptionLabel={optionLabel}
              isOptionEqualToValue={(o, v) => o.id === v.id}
              value={findSelected(field.value)}
              onChange={(_, value) => field.onChange(value.map((v) => v.id))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Carreras o Programas"
                  placeholder="Selecciona carreras o programas"
                />
              )}
            />
          )}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            {id ? 'Actualizar' : 'Crear'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
