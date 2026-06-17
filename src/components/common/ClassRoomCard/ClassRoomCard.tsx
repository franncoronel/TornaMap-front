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
  IconButton,
  Stack
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
  const { isAuthenticated, user } = useAuth()
  const isAdmin = user?.role === 'ADMIN'
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
        py: 1,
        gap: 2
      }}
      className="classroom-card"
    >
      <Box sx={{ position: 'relative', width: '100%' }}>
        {isAuthenticated && isAdmin && viewType == 'standard' && (
          <IconButton /* NEW */
            onClick={handleEdit}
            sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 2,
            color: 'text.secondary',
            transition: 'all 0.3s ease',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo sutil para legibilidad
            backdropFilter: 'blur(4px)',
            '&:hover': {
              color: 'primary.main',
              transform: 'scale(1.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)'
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
        <Card variant="outlined"
              sx={{
                height: '100%',
                borderRadius: 2,
                transition: '0.2s',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': { 
                  boxShadow: 3,
                  borderColor: 'primary.light' // Feedback visual sutil al hacer hover
                }}}>
          <CardActionArea onClick={onClick} sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'stretch',
            justifyContent: 'flex-start' }}>
            <CardContent   sx={{ p: 3, flexGrow: 1 }}>
              <Stack spacing={2}>
              {courseName() && (
                <Stack spacing={1}>
                  <Stack spacing={0.5} alignItems="center">
                    <Tooltip title={courseName()} arrow placement="top">
                      <Typography
                        variant="h3"
                        noWrap
                        sx={{ fontWeight: 'bold', maxWidth: '90%' }}
                      >
                        {courseName()}
                      </Typography>
                    </Tooltip>
                    {hasEvents() && (
                      <Tooltip title={course?.events} arrow placement="bottom">
                        <Typography
                          variant="h6"
                          noWrap
                          sx={{ fontWeight: 'bold', maxWidth: '90%', color: 'text.secondary' }}
                        >
                          {course?.events}
                        </Typography>
                      </Tooltip>
                    )}
                    {course && !hasEvents() && (
                      <Tooltip title={course?.events} arrow placement="bottom">
                        <Typography
                          variant="h4"
                          noWrap
                          sx={{ fontWeight: 'bold', maxWidth: '90%', color: 'text.secondary' }}
                        >
                          Sin eventos
                        </Typography>
                      </Tooltip>
                    )}
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
                  </Stack>
                  <Divider sx={{ mb: 1.5 }} />
                  </Stack>
              )}

              <Stack spacing={1.5}>
                {/* Aula y Edificio */}
                {viewType === 'modal' && !isVirtual() && (
                  <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ color: 'text.secondary' }}>
                    <Box
                      sx={{ display: 'flex', pt: '2px' }}
                    >
                      <MapPin size={24} color="var(--info-color-dark)" style={{ flexShrink: 0 }} />
                    </Box>
                    <Stack>
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{ color: 'text.secondary', fontWeight: 500, textAlign: 'left' }}
                      >
                        Aula: {classroom()}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontWeight: 500,
                          display: 'flex',
                          textAlign: 'left'
                        }}
                      >
                        Edificio: {building()}
                      </Typography>
                    </Stack>
                  </Stack>
                )}

                {/* Profesor */}
                {hasEvents() && (
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
                    <User size={24} color="var(--info-color-dark)" style={{ flexShrink: 0 }}/>
                    
                      <Tooltip title={professors()} arrow>
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{ color: 'text.secondary', fontWeight: 500, textAlign: 'left' }}
                        >
                          Profesor: {professors()}
                        </Typography>
                      </Tooltip>
                   </Stack>
                )}

                {/* Modalidad */}
                {hasEvents() && (
              <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
                {isPresential() && !isVirtual() && <Building size={24} color="var(--info-color-dark)" style={{ flexShrink: 0 }}/>}
                {isVirtual() && !isPresential() && <Laptop size={24} color="var(--info-color-dark)" style={{ flexShrink: 0 }}/>}
                {isHybrid() && <ArrowsClockwise color="var(--info-color-dark)" size={24} style={{ flexShrink: 0 }}/>}
                
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, display: 'flex', textAlign: 'left' }}>
                  Modalidad: {isVirtual() ? 'Virtual' : ''}
                      {isHybrid() ? 'Virtual - Presencial' : ''}
                      {isPresential() ? 'Presencial' : ''}
                    </Typography>
                  </Stack>
                )}
                

                {/* Horario */}
                {hasEvents() && (
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
                <Clock size={24} color="var(--info-color-dark)" style={{ flexShrink: 0 }}/>
                <Tooltip title={timeSchedule()} arrow>
                  <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
                    Horario: {timeSchedule()}
                      </Typography>
                    </Tooltip>
                  </Stack>
                )}

                {/* Carreras */}
                {programs() && (
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
                    <BookOpenText size={24} color="var(--info-color-dark)" style={{ flexShrink: 0 }}/>
                      <Tooltip title={programs()} arrow>
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{ color: 'text.secondary', fontWeight: 500, textAlign: 'left' }}
                        >
                          Carreras: {programs()}
                        </Typography>
                      </Tooltip>
                  </Stack>
                )}
                </Stack>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  )
}
