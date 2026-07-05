import { ICourseList } from '@/data/domain/Course'
import { IStudentEvent } from '@/data/domain/Event'
import { useLoader } from '@/context/LoaderContext'
import { ProfileListEntry, ProfileListSection } from './ProfileListSection'
import { useEffect, useState } from 'react'
import { useNotification } from '@/context/NotificationContext'
import { userService } from '@/data/services/UserService'

export function StudentContent() {
  const [activeTab, setActiveTab] = useState(0)
  const [subscribedCourses, setSubscribedCourses] = useState<ICourseList[]>([])
  const [subscribedEvents, setSubscribedEvents] = useState<IStudentEvent[]>([])
  const { setLoader } = useLoader()
  const { setNotificationState } = useNotification()

  const fetchCourses = async () => {
    try {
      setLoader(true)
      const res = await userService.getMyCourses()
      setSubscribedCourses(res.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoader(false)
    }
  }

  const fetchEvents = async () => {
    try {
      setLoader(true)
      const res = await userService.getMyEvents()
      setSubscribedEvents(res.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchCourses()
    fetchEvents()
  }, [])

  const handleUnsubscribeCourse = async (id: string | number) => {
    try {
      setLoader(true)
      await userService.unsubscribeCourse(id)
      setNotificationState({ title: 'Te desuscribiste exitosamente', type: 'success' })
      fetchCourses()
    } catch (error) {
      setNotificationState({ title: 'Error al desuscribirse', type: 'error' })
      console.error(error)
    } finally {
      setLoader(false)
    }
  }

  const handleUnsubscribeEvent = async (id: string | number) => {
    try {
      setLoader(true)
      await userService.unsubscribeEvent(id)
      setNotificationState({ title: 'Te desuscribiste exitosamente', type: 'success' })
      fetchEvents()
    } catch (error) {
      setNotificationState({ title: 'Error al desuscribirse', type: 'error' })
      console.error(error)
    } finally {
      setLoader(false)
    }
  }

  const courseItems: ProfileListEntry[] = subscribedCourses
    .filter((c): c is ICourseList & { id: string | number } => c.id != null)
    .map((c) => ({
      id: c.id,
      title: c.name,
      subtitle: `${c.events} · ${c.professors}`,
      attributes: [c.modality],
      detail: c.schedules
    }))

  const eventItems: ProfileListEntry[] = subscribedEvents.map((e) => ({
    id: e.id,
    title: e.name,
    subtitle: e.course || e.programs,
    attributes: [e.type, e.modality].filter(Boolean),
    detail: e.schedules
  }))

  const isCourses = activeTab === 0

  return (
    <ProfileListSection
      heading={isCourses ? 'Mis materias' : 'Mis eventos'}
      emptyMessage={
        isCourses
          ? 'No estás suscripto a ninguna materia.'
          : 'No estás suscripto a ningún evento.'
      }
      items={isCourses ? courseItems : eventItems}
      onRemove={isCourses ? handleUnsubscribeCourse : handleUnsubscribeEvent}
      removeLabel="esta suscripción"
      tabLabels={['Cursadas', 'Eventos']}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  )
}
