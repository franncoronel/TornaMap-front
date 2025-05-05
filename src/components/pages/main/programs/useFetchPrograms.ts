import { useEffect, useState } from 'react'
import { programService } from '@/data/services/ProgramsService'
import { IProgram } from '@/data/domain/Program'
import { useNotification } from '@/context/NotificationContext'
import { useLoader } from '@/context/LoaderContext'

type ProgramFormData = {
  name: string
  description: string
}

export const useFetchPrograms = () => {
  const { setNotificationState } = useNotification()
  const { setLoader } = useLoader()

  const [programs, setPrograms] = useState<IProgram[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<IProgram | null>(null)
  const [openForm, setOpenForm] = useState(false)
  const [editingProgram, setEditingProgram] = useState<IProgram | null>(null)

  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    setLoader(true)
    try {
      const response = await programService.getAll()
      const data = response.data
      setPrograms(data)

      if (data.length === 0) {
        setNotificationState({
          title: 'No se encontraron resultados',
          type: 'info',
          description: 'Intenta con otro término de búsqueda',
          action: () => {}
        })
      }
    } catch (error) {
      setNotificationState({
        title: 'Error al obtener los programas',
        type: 'error',
        description: 'Ocurrió un error al cargar los programas',
        action: () => {}
      })
    } finally {
      setLoader(false)
    }
  }

  const handleDeleteClick = (program: IProgram) => {
    setSelectedProgram(program)
    setOpenDelete(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedProgram) return

    setLoader(true)
    try {
      await programService.delete(selectedProgram.id)
      await fetchPrograms() 
      setNotificationState({
        title: 'Programa eliminado',
        type: 'success',
        description: 'El programa se eliminó correctamente',
        action: () => {}
      })
    } catch (error) {
      setNotificationState({
        title: 'Error al eliminar el programa',
        type: 'error',
        description: 'Ocurrió un error al eliminar el programa',
        action: () => {}
      })
    } finally {
      setLoader(false)
      setOpenDelete(false)
    }
  }

  const handleFormSubmit = async (data: ProgramFormData) => {
    setLoader(true)
    try {
      if (editingProgram) {
        const updated = { ...editingProgram, ...data }
        await programService.update(updated)
        setNotificationState({
          title: 'Programa actualizado',
          type: 'success',
          description: 'Se guardaron los cambios correctamente',
          action: () => {}
        })
      } else {
        await programService.create(data)
        setNotificationState({
          title: 'Programa creado',
          type: 'success',
          description: 'Se agregó el programa correctamente',
          action: () => {}
        })
      }
      await fetchPrograms()
    } catch (error) {
      setNotificationState({
        title: 'Error al guardar',
        type: 'error',
        description: 'Ocurrió un error al guardar el programa',
        action: () => {}
      })
    } finally {
      setLoader(false)
      setOpenForm(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase())
  }

  return {
    programs,
    searchQuery,
    handleSearch,
    openDelete,
    setOpenDelete,
    selectedProgram,
    handleDeleteClick,
    handleConfirmDelete,
    openForm,
    setOpenForm,
    editingProgram,
    setEditingProgram,
    handleFormSubmit
  }
}
