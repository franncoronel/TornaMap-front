import { Box, List, Typography } from '@mui/material'
import { ICourseList } from '@/data/domain/Course'
import { SubscriptionItem } from './SubscriptionItem'

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

  const handleUnsubscribe = (id: string | number | undefined) => {
    //Deberia llamar a otro endpoint que me borre la materia de mi lista
    console.log('Te desuscribiste exitosamente de la materia con id: ', id)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1024, mx: 'auto', px: { xs: 2, sm: 3 }, mb: 4 }}>
      <Typography variant="h3" gutterBottom>
        Mis materias
      </Typography>

      {subscribedCourses.length === 0 ? (
        <Typography color="secondary">
          No estás suscripto a ninguna materia.
        </Typography>
      ) : (
        <List disablePadding>
          {subscribedCourses.map((course) => (
            <SubscriptionItem
              key={course.id}
              title={course.name}
              subtitle={`${course.events} · ${course.professors}`}
              attributes={[course.modality]}
              detail={course.schedules}
              onRemove={() => handleUnsubscribe(course.id)}
            />
          ))}
        </List>
      )}
    </Box>
  )
}
