import { useEffect, useState } from 'react'
import { periodsService } from '@/data/services/PeriodsService'
import { IPeriod } from '@/data/domain/Period'
import { useNotification } from '@/context/NotificationContext'
import { useLoader } from '@/context/LoaderContext'

type ProgramFormData = {
    title: string
    startDate: string
    endDate: string
}

export const useFetchPeriods = () => {
    const { setNotificationState } = useNotification()
    const { setLoader } = useLoader()
    const [periods, setPeriods] = useState<IPeriod[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [openDelete, setOpenDelete] = useState(false)
    const [selectedPeriod, setSelectedPeriod] = useState<IPeriod | null>(null)
    const [openForm, setOpenForm] = useState(false)
    const [editingPeriod, setEditingPeriod] = useState<IPeriod | null>(null)

    useEffect(() => {
        fetchPeriods()
    }, [])

    const fetchPeriods = async () => {
        setLoader(true)
        try {
            const response = await periodsService.getAll()
            const data = response.data
            setPeriods(data)

            if (data.length === 0) {
                setNotificationState({
                    title: 'No se encontraron resultados',
                    type: 'info',
                    description: 'Intenta con otro término de búsqueda',
                    action: () => { }
                })
            }
        } catch (error) {
            setNotificationState({
                title: 'Error al obtener los periodos',
                type: 'error',
                description: 'Ocurrió un error al cargar los periodos',
                action: () => { }
            })
        } finally {
            setLoader(false)
        }
    }

    const handleDeleteClick = (period: IPeriod) => {
        setSelectedPeriod(period)
        setOpenDelete(true)
    }

    const handleConfirmDelete = async () => {
        if (!selectedPeriod) return

        setLoader(true)
        try {
            await periodsService.delete(selectedPeriod.id)
            await fetchPeriods()
            setNotificationState({
                title: 'Periodo eliminado',
                type: 'success',
                description: 'El periodo se eliminó correctamente',
                action: () => { }
            })
        } catch (error) {
            setNotificationState({
                title: 'Error al eliminar el periodo',
                type: 'error',
                description: 'Ocurrió un error al eliminar el periodo',
                action: () => { }
            })
        } finally {
            setLoader(false)
            setOpenDelete(false)
        }
    }

    const handleFormSubmit = async (data: ProgramFormData) => {
        setLoader(true)
        try {
            if (editingPeriod) {
                const updated = { ...editingPeriod, ...data }
                await periodsService.update(updated)
                setNotificationState({
                    title: 'Periodo actualizado',
                    type: 'success',
                    description: 'Se guardaron los cambios correctamente',
                    action: () => { }
                })
            } else {
                await periodsService.create(data)
                setNotificationState({
                    title: 'Periodo creado',
                    type: 'success',
                    description: 'Se agregó el periodo correctamente',
                    action: () => { }
                })
            }
            await fetchPeriods()
        } catch (error) {
            setNotificationState({
                title: 'Error al guardar',
                type: 'error',
                description: 'Ocurrió un error al guardar el periodo',
                action: () => { }
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
        periods,
        searchQuery,
        handleSearch,
        openDelete,
        setOpenDelete,
        selectedPeriod,
        handleDeleteClick,
        handleConfirmDelete,
        openForm,
        setOpenForm,
        editingPeriod,
        setEditingPeriod,
        handleFormSubmit
    }
}
