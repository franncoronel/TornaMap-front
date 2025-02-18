import { CardActionArea, CardContent, Typography, Card, Box, Divider } from "@mui/material";
import { MapPin,Clock,User,BookOpenText} from '@phosphor-icons/react'


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
}


export default function ClassRoomCard({name,
                                      commission,
                                      classroom,
                                      building,
                                      teacher,
                                      careers,
                                      schedules,
                                      viewType,
                                      onClick}:ClassRoomCardProps)
{
  return (
    <Box  sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      mx: 2,p: 2,gap:2
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
              <Clock size={24} color='#1976d2' style={{ marginRight:'8px'}}/>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Horario: {schedules} {/*Hay que ver como viene del back*/}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1,flexWrap: 'wrap', }}>
              <BookOpenText size={24} color='#1976d2' style={{ alignSelf: 'flex-start' }} />{/*,alignSelf: 'flex-start'*/}
              <Typography
                variant="body2"
                sx={{
                  color: '#1976d2',
                  maxWidth: 'calc(100% - 32px)',
                  //flex: 1,
                  wordBreak: 'break-word',
                  whiteSpace: 'normal',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 2, // número de lineas que se deben mostrar
                  WebkitBoxOrient: 'vertical',
                  display: '-webkit-box',
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