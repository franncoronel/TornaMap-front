import { IReservation } from '@/data/domain/ClassroomReservation'
import { ProfileListEntry, ProfileListSection } from './ProfileListSection'

// Data mockeada porque falta un endpoint para esto
// GET que devuelva una lista de espacios que reservé
const mockReservedRooms: IReservation[] = [
  {
    id: '1',
    classroomName: 'CIDI - Tornavías Piso 1',
    event: 'Cursada',
    course: 'Telecomunicaciones y Redes',
    courseData: ['Inscriptos: 50'],
    schedules: 'MIÉRCOLES 18:00 - 21:00 | VIERNES 18:00 - 21:00'
  },
  {
    id: '2',
    classroomName: 'LC1 - Tornavías Piso 1',
    event: 'Cursada',
    course: 'Paradigmas de Programación',
    courseData: ['Inscriptos: 36'],
    schedules: 'MARTES 18:00 - 21:00'
  }
]

export function ProfessorContent() {
  //Deberia traermelas del backend, por ahora son la data mockeada
  const reservedRooms = mockReservedRooms

  const handleCancel = (id: string | number) => {
    console.log('Diste de baja tu reserva del espacio: ', id)
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
