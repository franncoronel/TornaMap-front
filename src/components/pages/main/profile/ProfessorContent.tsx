import { IReservation } from '@/data/domain/ClassroomReservation'
import { ProfileListEntry, ProfileListSection } from './ProfileListSection'
import { useEffect, useState } from 'react'
import { useLoader } from '@/context/LoaderContext'
import { useNotification } from '@/context/NotificationContext'
import { userService } from '@/data/services/UserService'

export function ProfessorContent() {
  const [reservedRooms, setReservedRooms] = useState<IReservation[]>([])
  const { setLoader } = useLoader()
  const { setNotificationState } = useNotification()

  const fetchReservations = async () => {
    try {
      setLoader(true)
      const res = await userService.getMyReservations()
      setReservedRooms(res.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchReservations()
  }, [])

  const handleCancel = async (id: string | number) => {
    try {
      setLoader(true)
      await userService.cancelReservation(id)
      setNotificationState({
        title: 'Reserva cancelada exitosamente',
        type: 'success'
      })
      fetchReservations() // Recargamos la lista
    } catch (error) {
      setNotificationState({ title: 'Error al cancelar la reserva', type: 'error' })
      console.error(error)
    } finally {
      setLoader(false)
    }
  }

  const items: ProfileListEntry[] = reservedRooms.map((r) => ({
    id: r.id,
    title: r.classroomName,
    subtitle: `${r.event} ${r.course ?? ''}`,
    attributes: r.courseData,
    detail: r.schedules
  }))

  return (
    <ProfileListSection
      heading="Mis reservas"
      emptyMessage="Aún no reservaste ningún espacio."
      items={items}
      onRemove={handleCancel}
      removeLabel="esta reserva"
    />
  )
}
