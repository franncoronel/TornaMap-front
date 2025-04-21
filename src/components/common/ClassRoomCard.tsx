import { ICourseList } from '@/data/domain/Course'
import { ISchedule } from '@/data/domain/Schedule'
/* import { EventAvailableTwoTone } from "@mui/icons-material" */
import {
  CardActionArea,
  CardContent,
  Typography,
  Card,
  Box,
  Divider,
  Tooltip
} from '@mui/material'
import {
  MapPin,
  Clock,
  User,
  BookOpenText,
  Building,
  Laptop,
  ArrowsClockwise
} from '@phosphor-icons/react'

interface ClassRoomCardProps {
  course?: ICourseList
  schedule?: ISchedule
  onClick?: () => void
  viewType: string //'standard' | 'modal'
}

export default function ClassRoomCard({
  course,
  onClick,
  viewType,
  schedule
}: ClassRoomCardProps) {
  //const formattedMode = mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase()

  {
    /* //TODO: COMENTARIOS DE MEJORAS
// * - Cambiar el formato de horario
// *     Horario:
// *        Lunes: 08:00 - 10:00
// *        Martes: 18:00 - 22:00

// * - Agregar el botón de edición (SpeedDialEditActions)
// * - Agregar al modal los distintos edificios y aulas (en el caso de que se curse en distintos edificios)
// * - Crear el modal para editar la materia
*/
  }

  const isVirtual = () => {
    if (!course) {
      return schedule?.isVirtual
    } else {
      return course?.modality === 'Virtual'
    }
  }
  const isPresential = () => {
    if (!course) {
      return !schedule?.isVirtual
    } else {
      return course?.modality === 'Presencial'
    }
  }

  const classroom = () => {
    if (course) {
      return ''
    } else {
      return schedule?.classroom?.name
    }
  }

  const building = () => {
    if (course) {
      return
    } else {
      return schedule?.classroom?.building?.name
    }
  }

  const timeSchedule = () => {
    if (course) {
      return course?.schedules
    } else {
      return schedule?.startTime + ' - ' + schedule?.endTime
    }
  }

  const professors = () => {
    if (course) {
      return course.professors
    } else {
      return schedule?.professors.map((professor) => professor).join(', ')
    }
  }

  const programs = () => {
    if (course) {
      return course?.programs
    } else {
      return null
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        py: 2,
        gap: 2
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 450,
          borderRadius: 3,
          boxShadow: 1,
          border: '1px solid #e0e0e0',
          '@media (max-width: 600px)': { maxWidth: '90%' }
        }}
      >
        <CardActionArea onClick={onClick}>
          <CardContent sx={{ backgroundColor: '#f5f5f5', borderRadius: 3 }}>
            {course?.name && (
              <>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateRows: 'auto auto',
                    justifyItems: 'center',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    mb: 0.5
                  }}
                >
                  <Tooltip title={course?.name} arrow placement="top">
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {course?.name}
                    </Typography>
                  </Tooltip>
                  <Tooltip title={course?.events} arrow placement="bottom">
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        maxWidth: '90%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {course?.events}
                    </Typography>
                  </Tooltip>
                </Box>
                <Divider sx={{ mb: 0.5 }} />
              </>
            )}

            <Box
              sx={{
                display: 'grid',
                gridTemplateRows: 'auto auto',
                gridTemplateColumns: 'auto 1fr',
                columnGap: 1,
                maxHeight: '90vh',
                overflowY: 'auto',
                mb: 0.5,
                rowGap: 1
              }}
            >
              {/* Aula y Edificio */}
              {viewType === 'modal' && !isVirtual() && (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <MapPin size={24} color="#1976d2" />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      maxWidth: '100%',
                      overflow: 'hidden'
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        display: 'block',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      Aula: {classroom()}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#666', display: 'flex', textAlign: 'left' }}
                    >
                      Edificio: {building()}
                    </Typography>
                  </Box>
                </>
              )}

              {/* Profesor */}
              <User size={24} color="#1976d2" />
              <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
                <Tooltip title={professors()} arrow>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'block',
                      textAlign: 'left'
                    }}
                  >
                    Profesor: {professors()}
                  </Typography>
                </Tooltip>
              </Box>

              {/* Modalidad */}
              {isPresential() && !isVirtual() && (
                <Building size={24} color="#1976d2" />
              )}
              {isVirtual() && !isPresential() && (
                <Laptop size={24} color="#1976d2" />
              )}
              {isPresential() && isVirtual() && (
                <ArrowsClockwise color="#1976d2" size={24} />
              )}

              <Typography
                variant="body2"
                sx={{ color: '#666', display: 'flex', textAlign: 'left' }}
              >
                Modalidad: {isVirtual() ? 'Virtual' : ''}{' '}
                {isVirtual() && isPresential() ? ' - ' : ''}{' '}
                {isPresential() ? 'Presencial' : ''}
              </Typography>

              {/* Horario */}
              <Clock size={24} color="#1976d2" />
              <Typography
                variant="body2"
                sx={{ color: '#666', display: 'flex', textAlign: 'left' }}
              >
                Horario: {timeSchedule()}
              </Typography>

              {/* Carreras */}
              {programs() && (
                <>
                  <BookOpenText size={24} color="#1976d2" />
                  <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
                    <Tooltip title={programs()} arrow>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#1976d2',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: 'block',
                          textAlign: 'left'
                        }}
                      >
                        Carreras: {programs()}
                      </Typography>
                    </Tooltip>
                  </Box>
                </>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
}
