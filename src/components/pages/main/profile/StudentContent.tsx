import { ICourseList } from '@/data/domain/Course'
import { ProfileListEntry, ProfileListSection } from './ProfileListSection'

// Data mockeada porque falta un endpoint para esto
// GET /blabla que devuelva una lista de cursos a los que estoy suscripto (ICourseList[])
const mockSubscribedCourses: ICourseList[] = [
  {
    id: '1',
    name: 'Algoritmos I',
    events: 'Cursada Algoritmos I',
    professors: 'Juan José López',
    modality: 'Presencial',
    schedules: 'MARTES: 18:00 - 22:00 | JUEVES: 18:00 - 22:00',
    programs: 'Tecnicatura en Programación Informática'
  },
  {
    id: '2',
    name: 'Conceptos de Arquitecturas y Sistemas Operativos',
    events: 'Cursada CASO',
    professors: 'Gaston Aguilera',
    modality: 'Presencial',
    schedules: 'LUNES: 19:00 - 22:00 | MIÉRCOLES: 19:00 - 22:00',
    programs: 'Tecnicatura en Programación Informática'
  }
]

export function StudentContent() {
    //Deberia traermelos del backend, por ahora son la data mockeada
  const subscribedCourses = mockSubscribedCourses

  const handleUnsubscribe = (id: string | number) => {
    //Deberia llamar a otro endpoint que me borre la materia de mi lista
    console.log('Te desuscribiste exitosamente de la materia con id: ', id)
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
