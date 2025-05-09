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


import { FloppyDisk } from '@phosphor-icons/react/dist/icons/FloppyDisk'
import { XSquare } from '@phosphor-icons/react/dist/icons/XSquare'
import { Trash } from '@phosphor-icons/react/dist/icons/Trash'
import { ChalkboardTeacher } from '@phosphor-icons/react/dist/icons/ChalkboardTeacher'
import Box from '@mui/material/Box/Box'
import Stack from '@mui/material/Stack/Stack'
import TextField from '@mui/material/TextField/TextField'
import Autocomplete from '@mui/material/Autocomplete/Autocomplete'
import Button from '@mui/material/Button/Button'
import Dialog from '@mui/material/Dialog/Dialog'
import DialogTitle from '@mui/material/DialogTitle/DialogTitle'
import DialogContent from '@mui/material/DialogContent/DialogContent'
import DialogContentText from '@mui/material/DialogContentText/DialogContentText'
import DialogActions from '@mui/material/DialogActions/DialogActions'

type FormValues = Omit<ICourseCreate, 'id'> & { id?: string }

export default function CourseForm() {
  const [programs, setPrograms] = useState<IProgram[]>([])
  const [openConfirm, setOpenConfirm] = useState(false)

  const navigate = useNavigate()
  const { setLoader } = useLoader()
  const { setNotificationState } = useNotification()
  const { setTitle, setIcon } = useOutletContext<FormContext>()
  const { id } = useParams()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: { name: '', description: '', programs: [] }
  })

  /* Llamados a API */
  const fetchInfo = async () => {
    /* 1️⃣ Traemos los programas y los guardamos */
    const { data: progList } = await programService.getAll()
    setPrograms(progList)

    /* 2️⃣ Si estamos editando, traemos el curso */
    if (id) {
      const { data: course } = await courseService.getById(id)

      /* 3️⃣ Calculamos los ids con la lista recién recibida (progList) */
      const programIds = progList
        .filter((p) => course.programs.includes(p.name))
        .map((p) => p.id)

      reset({
        id: course.id,
        name: course.name,
        description: course.description,
        programs: programIds
      })
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
  const deleteCourse = async (courseId: string) => {
    try {
      setLoader(true)
      await courseService.delete(courseId)
      navigate('/buscar')
      setNotificationState({
        title: 'Curso eliminado',
        description: 'El curso fue eliminado correctamente',
        type: 'success'
      })
    } catch (error) {
      console.error('Error deleting course:', error)
      setNotificationState({
        title: 'Error al eliminar el curso',
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
    setIcon(<ChalkboardTeacher size={32} />)
    fetchInfo()
  }, [id])

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}
      >
        <Stack spacing={3}>
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

          <Stack direction="column" spacing={2} justifyContent="space-between">
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
      {/* ---------- DIALOG DE CONFIRMACIÓN ---------- */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>¿Eliminar curso?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción es irreversible. ¿Seguro que deseas eliminar la
            asignatura?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
          <Button
            color="error"
            onClick={() => {
              if (id) deleteCourse(id) // llama al service
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
