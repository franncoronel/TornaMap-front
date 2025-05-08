// Styles
import './classRoomCard.css'
// Context
import { useAuth } from '@/context/AuthContext'

// Interfaces
import { ICourseList } from '@/data/domain/Course'
import { IEventList } from '@/data/domain/Event'
import { ISchedule } from '@/data/domain/Schedule'

// MUI
import {
  CardActionArea,
  CardContent,
  Typography,
  Card,
  Box,
  Divider,
  Tooltip,
  IconButton
} from '@mui/material'
import {
  MapPin,
  Clock,
  User,
  BookOpenText,
  Building,
  Laptop,
  ArrowsClockwise,
  PencilSimple
} from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

interface ClassRoomCardProps {
  course?: ICourseList
  schedule?: ISchedule
  event?: IEventList
  onClick?: () => void
  viewType: string //'standard' | 'modal'
}

export default function ClassRoomCard({
  course,
  onClick,
  viewType,
  schedule,
  event
}: ClassRoomCardProps) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const handleEdit = (e: React.MouseEvent) => {
    // NEW
    e.stopPropagation() // evita disparar onClick del Card
    if (course) navigate(`/asignatura/editar/${course.id}`)
    else if (event) navigate(`/evento/editar/${event.id}`)
    else if (schedule) navigate(`/horario/editar/${schedule.id}`)
  }

  const isVirtual = () => {
    if (course) {
      return course?.modality === 'Virtual'
    } else if (schedule) {
      return schedule?.isVirtual
    } else {
      return event?.schedules[0]?.isVirtual
    }
  }
  const isPresential = () => {
    if (course) {
      return course?.modality === 'Presencial'
    } else if (schedule) {
      return !schedule?.isVirtual
    } else {
      return event?.schedules[0]?.isVirtual === false
    }
  }

  const isHybrid = () => {
    if (course) {
      return course?.modality === 'Virtual - Presencial'
    } else {
      return false
    }
  }

  const classroom = () => {
    if (course || event) {
      return ''
    } else {
      return schedule?.classroom?.name
    }
  }

  const building = () => {
    if (course || event) {
      return
    } else {
      return schedule?.classroom?.building?.name
    }
  }

  const timeSchedule = () => {
    if (course) {
      return course?.schedules
    } else if (schedule) {
      return schedule?.startTime + ' - ' + schedule?.endTime
    } else {
      return (
        event?.schedules[0]?.startTime + ' - ' + event?.schedules[0]?.endTime
      )
    }
  }

  const professors = () => {
    if (course) {
      return course.professors
    } else if (schedule) {
      return schedule?.professors.map((professor) => professor).join(' - ')
    } else {
      return event?.schedules[0]?.professors
        .map((professor) => professor)
        .join(', ')
    }
  }

  const programs = () => {
    if (course) {
      return course?.programs
    } else if (schedule) {
      return null
    } else {
      return event?.programNames.map((program) => program).join(', ')
    }
  }
  const hasEvents = () => {
    if (course) {
      return course?.events.length > 0
    } else if (event) {
      return event.schedules.length > 0
    } else {
      return true
    }
  }

  const courseName = () => {
    if (course) {
      return course?.name
    } else if (event) {
      return event?.courseName
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
      className="classroom-card"
    >
      <Box sx={{ position: 'relative', width: '100%' }}>
        {isAuthenticated && viewType == 'standard' && (
          <IconButton /* NEW */
            onClick={handleEdit}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 2,
              color: '#666',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: 'primary.main',
                transform: 'scale(1.1)'
              },
              '&:active': {
                transform: 'scale(1)'
              }
            }}
            aria-label="Editar"
          >
            <PencilSimple size={24} />
          </IconButton>
        )}
        <Card
          sx={{
            width: '100%',
            flexGrow: 1,
            borderRadius: 3,
            boxShadow: 1,
            border: '1px solid #e0e0e0',
            '@Media (min-width: 1201px)': { width: '95%' }
          }}
        >
          <CardActionArea onClick={onClick}>
            <CardContent sx={{ backgroundColor: '#f5f5f5', borderRadius: 3 }}>
              {courseName() && (
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
                    <Tooltip title={courseName()} arrow placement="top">
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 'bold',
                          whiteSpace: 'nowrap',
                          maxWidth: '90%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {courseName()}
                      </Typography>
                    </Tooltip>
                    {hasEvents() && (
                      <Tooltip title={course?.events} arrow placement="bottom">
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            maxWidth: '90%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: '#666'
                          }}
                        >
                          {course?.events}
                        </Typography>
                      </Tooltip>
                    )}
                    {course && !hasEvents() && (
                      <Tooltip title={course?.events} arrow placement="bottom">
                        <Typography
                          variant="h2"
                          sx={{
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            maxWidth: '90%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: '#666'
                          }}
                        >
                          Sin eventos
                        </Typography>
                      </Tooltip>
                    )}
                    {}
                    {event?.name && (
                      <Tooltip title={event?.name} arrow placement="bottom">
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 'bold'
                          }}
                        >
                          {event?.name}
                        </Typography>
                      </Tooltip>
                    )}
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
                        sx={{
                          color: '#666',
                          display: 'flex',
                          textAlign: 'left'
                        }}
                      >
                        Edificio: {building()}
                      </Typography>
                    </Box>
                  </>
                )}

                {/* Profesor */}
                {hasEvents() && (
                  <>
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
                  </>
                )}

                {/* Modalidad */}
                {hasEvents() && isPresential() && !isVirtual() && (
                  <Building size={24} color="#1976d2" />
                )}
                {hasEvents() && isVirtual() && !isPresential() && (
                  <Laptop size={24} color="#1976d2" />
                )}
                {hasEvents() && isHybrid() && (
                  <ArrowsClockwise color="#1976d2" size={24} />
                )}

                {hasEvents() && (
                  <Typography
                    variant="body2"
                    sx={{ color: '#666', display: 'flex', textAlign: 'left' }}
                  >
                    Modalidad: {isVirtual() ? 'Virtual' : ''}{' '}
                    {isHybrid() ? 'Virtual - Presencial' : ''}{' '}
                    {isPresential() ? 'Presencial' : ''}
                  </Typography>
                )}

                {/* Horario */}
                {hasEvents() && <Clock size={24} color="#1976d2" />}
                {hasEvents() && (
                  <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
                    <Tooltip title={timeSchedule()} arrow>
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
                        Horario: {timeSchedule()}
                      </Typography>
                    </Tooltip>
                  </Box>
                )}

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
    </Box>
  )
}
