import { ICourseList } from '@/data/domain/Course'
import { useLoader } from '@/context/LoaderContext'
import { ProfileListEntry, ProfileListSection } from './ProfileListSection'
import { useEffect, useState } from 'react'
import { useNotification } from '@/context/NotificationContext'
import { userService } from '@/data/services/UserService'


export function StudentContent() {
  const [subscribedCourses, setSubscribedCourses] = useState<ICourseList[]>([])
  const { setLoader } = useLoader()
  const { setNotificationState } = useNotification()

  const fetchCourses = async () => {
    try {
      setLoader(true)
      const res = await userService.getMyCourses()
      setSubscribedCourses(res.data.data) // Asumiendo que tu axios devuelve el CustomResponse
    } catch (error) {
      console.error(error)
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])


  const handleUnsubscribe = async (id: string | number) => {
    try {
      setLoader(true)
      await userService.unsubscribeCourse(id)
      setNotificationState({ title: 'Te desuscribiste exitosamente', type: 'success' })
      fetchCourses() // Recargamos la lista
    } catch (error) {
      setNotificationState({ title: 'Error al desuscribirse', type: 'error' })
      console.error(error)
    } finally {
      setLoader(false)
    }

  }

  const items: ProfileListEntry[] = subscribedCourses
    .filter((c): c is ICourseList & { id: string | number } => c.id != null)
    .map((c) => ({
      id: c.id,
      title: c.name,
      subtitle: `${c.events} · ${c.professors}`,
      attributes: [c.modality],
      detail: c.schedules
    }))

  return (
    <ProfileListSection
      heading="Mis materias"
      emptyMessage="No estás suscripto a ninguna materia."
      items={items}
      onRemove={handleUnsubscribe}
      removeLabel="esta suscripción"
    />
  )
}
