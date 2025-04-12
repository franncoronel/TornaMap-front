import { CardActionArea, CardContent, Typography, Card, Box, Divider, Tooltip} from "@mui/material";
import { MapPin,Clock,User,BookOpenText, Building, Laptop} from '@phosphor-icons/react'


interface ClassRoomCardProps{
  name : string
  // classroomType : string
  commission : string
  classroom : string
  building : string
  teacher : string[]
  careers : string[]
  schedules : string
  onClick?: () => void
  viewType: string//'standard' | 'modal'
  mode: 'presencial' | 'virtual'
}


export default function ClassRoomCard({name,
                                      commission,
                                      classroom,
                                      building,
                                      teacher,
                                      careers,
                                      schedules,
                                      viewType,
                                      mode,
                                      onClick}:ClassRoomCardProps)
{
  const formattedMode = mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase()

{/* //TODO: COMENTARIOS DE MEJORAS
// * - Cambiar el formato de horario
// *     Horario:
// *        Lunes: 08:00 - 10:00 
// *        Martes: 18:00 - 22:00

// * - Agregar el botón de edición (SpeedDialEditActions)
// * - Agregar al modal los distintos edificios y aulas (en el caso de que se curse en distintos edificios)
// * - Crear el modal para editar la materia
*/}

  return (
    <Box  sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      py: 2, gap:2
    }}>

    <Card sx={{
        width: '100%',
        maxWidth: 450,
        borderRadius: 3,
        boxShadow: 1,
        border: '1px solid #e0e0e0',
        '@media (max-width: 600px)': {maxWidth: '90%'}
      }}>
        <CardActionArea onClick={onClick}>
          <CardContent sx={{ backgroundColor: '#f5f5f5', borderRadius: 3 }}>
          <Box  sx={{ display: 'grid',gridTemplateRows: 'auto auto',justifyItems: 'center',
                      maxWidth: '100%',overflow: 'hidden',mb: 0.5,}}>
            <Tooltip title={name} arrow placement="top">
              <Typography variant="h5" sx={{ color: '#333',fontWeight: 'bold', whiteSpace: 'nowrap',
                                              maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis',}}>
                {name}
              </Typography>
            </Tooltip>
            <Typography variant="h5" sx={{color: '#333', fontWeight: 'bold',}}>
              {commission}
            </Typography> 
          </Box>

          <Divider sx={{ mb: .5 }} />

          <Box  sx={{ display: 'grid',
                      gridTemplateRows: 'auto auto',
                      gridTemplateColumns: 'auto 1fr',
                      columnGap:1,
                      maxHeight: '90vh',
                      overflowY: 'auto',mb: 0.5,
                      rowGap: 1,}}>
            
            {/* Aula y Edificio */}
            {viewType === "standard" && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <MapPin size={24} color="#1976d2" />
                </Box>
                <Box sx={{display: 'flex',flexDirection: 'column', maxWidth: '100%',overflow: 'hidden'}}>
                  <Typography variant="body2" sx={{ color: '#666',display: 'block', textAlign: 'left', whiteSpace: 'nowrap',
                                              maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis',}}>
                    Aula: {classroom}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666',display: 'flex', textAlign: 'left',}}>
                    Edificio: {building}
                  </Typography>       
                </Box>
              </>
            )}

            {/* Profesor */}
            <User size={24} color="#1976d2" />
            <Box  sx={{maxWidth: '90%', width: '300px',overflow: 'hidden'}}>
              <Tooltip title={teacher.join(' - ')} arrow>
                <Typography
                  variant="body2"
                  sx={{ color: '#666',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'block',
                        textAlign: 'left',}}>
                  Profesor: {teacher.join(' - ')}
                </Typography>
              </Tooltip>
            </Box>
            
            {/* Modalidad */}
            {mode === 'presencial' ? (
              <Building size={24} color="#1976d2" />
            ) : mode === 'virtual' ? (
              <Laptop size={24} color="#1976d2" />
            ) : (
              <Building size={24} color="#1976d2" />
            )}
            <Typography variant="body2" sx={{ color: '#666',display: 'flex', textAlign: 'left', }}>
              Modalidad: {formattedMode}
            </Typography>
            
            {/* Horario */}
            <Clock size={24} color="#1976d2" />
            <Typography variant="body2" sx={{ color: '#666',display: 'flex', textAlign: 'left', }}>
              Horario: {schedules}
            </Typography>
            
            {/* Carreras */}
            <BookOpenText size={24} color="#1976d2" />
            
            <Box  sx={{maxWidth: '90%',overflow: 'hidden'}}>
              <Tooltip title={careers.join(', ')} arrow>
                <Typography
                  variant="body2"
                  sx={{color: '#1976d2',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'block',
                    textAlign: 'left',}}>
                    Carreras: {careers.join(', ')}
                </Typography>
              </Tooltip> 
            </Box>           
          </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
}