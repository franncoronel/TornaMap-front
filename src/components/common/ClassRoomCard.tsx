import { CardActionArea, CardContent, Typography, Card, Box, Divider, Tooltip, Grid2 } from "@mui/material";
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

  // Si la modalidad es 'virtual', no se debe ejecutar el onClick
  const handleClick = onClick && mode !== 'virtual' ? onClick : undefined

{/* //TODO: COMENTARIOS DE MEJORAS
// * - Cambiar el formato de horario
// *     Horario:
// *        Lunes: 08:00 - 10:00 
// *        Martes: 18:00 - 22:00

// * - Si la modalidad es 'virtual' el aula y edificio deben aparecer vacías o no mostrar ese campo
// * - Agregar el botón de edición (SpeedDialEditActions)
// * - Corregir la proporcionalidad del títuto para que todas las cards tengan el mismo tamaño
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
        <CardActionArea onClick={handleClick}>
          <CardContent sx={{ backgroundColor: '#f5f5f5', borderRadius: 3 }}>
            {/* Nombre de la Materia y Comisión */}
            <Typography gutterBottom variant="h5" component="div" sx={{ color: '#333', fontWeight: 'bold' }}>
             {name}&nbsp;&nbsp;-&nbsp;&nbsp;{commission}
            </Typography>
            <Divider sx={{ mb: .5 }} />

            <Grid2  container
                    rowSpacing={1}
                    columnSpacing={{ xs: '1rem', sm: '1.5rem' }}
                    columns={{ xs: 1, sm: 2, lg:2 }}
                    sx={{ maxHeight: '90vh', overflowY: 'auto' }}>
              {/* Aula y Edificio */}
              {viewType === "standard" && (
                <>
                  <Grid2 >
                    <Box sx={{ display: 'flex', alignItems: 'center',flexDirection: 'row'}}>
                      <MapPin size={24} color='#1976d2' style={{flexShrink: 0, marginRight:'8px'}}/>
                      <Box sx={{ display: 'flex', flexDirection: 'column',alignItems: 'flex-start'}}>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          Aula: {classroom}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          Edificio: {building}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid2>
                </>
              )}

              {/* Profesor */}
              <Grid2 >
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                  <User size={24} color='#1976d2' style={{flexShrink: 0, marginRight:'8px'}}/>
                  <Tooltip title={teacher.join(' - ')} arrow>
                    <Typography variant="body2" 
                                sx={{ color: '#666',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis', }}>
                      Profesor: {teacher.join(' - ')}
                    </Typography>
                  </Tooltip>
                </Box>
              </Grid2>

              {/* Modalidad */}
              <Grid2 >
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                  {mode === 'presencial' ? (
                    <Building size={24} color='#1976d2' style={{ marginRight: '8px' }} />
                  ) : mode === 'virtual' ? (
                    <Laptop size={24} color='#1976d2' style={{ marginRight: '8px' }} />
                  ) : (
                    <Building size={24} color='#1976d2' style={{ marginRight: '8px' }} />
                  )}
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Modalidad: {formattedMode}
                  </Typography>
                </Box>
              </Grid2>                  
                
              {/* Horario */}
              <Grid2 >
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                  <Clock size={24} color='#1976d2' style={{flexShrink: 0, marginRight:'8px', }}/>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Horario: {schedules} {/*Hay que ver como viene del back*/}
                  </Typography>
                </Box>
              </Grid2>

              {/* Carreras */}
              <Grid2 >
                <Box sx={{ display: 'flex', lignItems: 'center'}}>
                  <BookOpenText size={24} color='#1976d2' style={{flexShrink: 0, marginRight:'8px',fontSize: '24px' }} />{/*,alignSelf: 'flex-start'*/}
                  <Tooltip title={careers.join(', ')} arrow>
                    <Typography variant="body2" 
                                sx={{ color: '#1976d2',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                }}>
                      Carreras: {careers.join(', ')}
                    </Typography>
                  </Tooltip>
                </Box>
              </Grid2>
            </Grid2>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
}