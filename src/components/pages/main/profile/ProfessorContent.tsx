import { Box, List, Typography } from '@mui/material'

import { SubscriptionItem } from './SubscriptionItem'
import { IReservation } from '@/data/domain/ClassroomReservation'

// Data mockeada porque falta un endpoint para esto
// GET /blabla que devuelva una lista de cursos a los que estoy suscripto (ICourseList[])
const mockReservedRooms: IReservation[] = [
  {
    id: '1',
    classroomName: 'CIDI - Tornavías Piso 1',
    event: 'Cursada',
    course: 'Telecomunicaciones y Redes',
    courseData: ["Inscriptos: 50" ],
    schedules: "MIÉRCOLES 18:00 - 21:00 | VIERNES 18:00 - 21:00"
  },
  {
    id: '2',
    classroomName: 'LC1 - Tornavías Piso 1',
    event: 'Cursada',
    course: 'Paradigmas de Programación',
    courseData: ["Inscriptos: 36"],
    schedules: "MARTES 18:00 - 21:00"
  }
]

export function ProfessorContent() {
  //Deberia traermelos del backend, por ahora son la data mockeada
  const reservedRooms = mockReservedRooms

  const handleUnsubscribe = (id: string | number | undefined) => {
    //Deberia llamar a otro endpoint que me borre la materia de mi lista
    console.log('Te desuscribiste exitosamente de la materia con id: ', id)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1024, mx: 'auto', px: { xs: 2, sm: 3 }, mb: 4 }}>
      <Typography variant="h3" gutterBottom>
        Mis reservas
      </Typography>

      {reservedRooms.length === 0 ? (
        <Typography color="secondary">
          Aún no reservaste ningún espacio.
        </Typography>
      ) : (
        <List disablePadding>
          {reservedRooms.map((reservation) => (
            <SubscriptionItem
              key={reservation.id}
              title={reservation.classroomName}
              subtitle={`${reservation.event} ${reservation.course ?? ''}`}
              attributes={reservation.courseData}
              detail={reservation.schedules}
              onRemove={() => handleUnsubscribe(reservation.id)}
            />
          ))}
        </List>
      )}
    </Box>
  )
}