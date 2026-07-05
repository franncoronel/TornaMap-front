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
  const [activeTab, setActiveTab] = useState(0)

  const fetchReservations = async () => {
    try {
      setLoader(true)
      const isApproved = activeTab === 1
      const res = await userService.getMyReservations(isApproved)
      setReservedRooms(res.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchReservations()
  }, [activeTab])

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
      setNotificationState({
        title: 'Error al cancelar la reserva',
        type: 'error'
      })
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
      emptyMessage={activeTab === 0 ? 'No tenés reservas pendientes de aprobación.' : 'No tenés reservas aprobadas.'}
      items={items}
      onRemove={handleCancel}
      removeLabel="esta reserva"
      tabLabels={['Pendientes', 'Aprobadas']}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  )
}