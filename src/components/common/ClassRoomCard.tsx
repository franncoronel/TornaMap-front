import { CardActionArea, CardContent, Typography, Card, Box, Divider} from "@mui/material";
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

  return (
    <Box  sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      p: 2,gap:2
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
            <Typography gutterBottom variant="h5" component="div" sx={{ color: '#333', fontWeight: 'bold' }}>
             {name}&nbsp;&nbsp;-&nbsp;&nbsp;{commission}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {viewType === "standard" && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MapPin size={24} color='#1976d2' style={{ marginRight:'8px'}}/>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Aula: {classroom} - Edificio: {building}
                  </Typography>
                </Box>
               </>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <User size={24} color='#1976d2' style={{ marginRight:'8px'}}/>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Profesor: {teacher.join(' - ')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Clock size={24} color='#1976d2' style={{ marginRight:'8px', }}/>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Horario: {schedules} {/*Hay que ver como viene del back*/}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', lignItems: 'center'}}>
              <BookOpenText size={24} color='#1976d2' style={{ marginRight:'8px',fontSize: '24px' }} />{/*,alignSelf: 'flex-start'*/}
                <Typography variant="body2" 
                            sx={{ color: '#1976d2',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                            }}>
                  Carreras: {careers.join(', ')}
                </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
}