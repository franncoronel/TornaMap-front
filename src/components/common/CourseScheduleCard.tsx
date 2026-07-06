import { useState } from 'react'
import Grid from '@mui/material/Grid2'
import { Box, Chip, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import {Laptop} from '@phosphor-icons/react'
import Campus from '@/components/common/map/campus/Campus'
import MapSelector from '@/components/common/map/MapSelector'
import { IScheduleCreate } from '@/data/domain/Schedule'

interface Props {
  schedule: IScheduleCreate
}

export default function CourseScheduleCard({ schedule}: Props) {
  const [mapView, setMapView] =
    useState<'building' | 'campus'>('building')


    // TODO: Esto esta horrible pero es para salir del paso
    // TODO: Cambio a futuro: que cada edificio tenga un code o un path para poder renderizarlo en el mapa, y que no dependa del nombre del edificio 
  const buildingMap: Record<string, string> = {
    'Tornavías': 'tornavias',
    'Aulario Nave 3': 'aularionave3',
    'ITS': 'its'
  }

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" mb={2} >
        <Typography variant="h6" fontWeight={700} >
          {schedule.weekDay} 
        </Typography>

        <Chip
          label={schedule.isVirtual ? 'Virtual' : 'Presencial'}
          color={schedule.isVirtual ? 'secondary' : 'primary'}
          size="small"
        />
      </Stack>

      <Grid container spacing={3} >
        {/* Información */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper elevation={2}
            sx={{ p: 3, height: '100%' }} >
            <Typography variant="subtitle1" fontWeight={700} mb={2} >
              Información
            </Typography>

            <Stack spacing={2}>
              <Info title="Horario"
                value={`${schedule.startTime} - ${schedule.endTime}`} />

              <Info title="Docente"
                value={schedule.professors?.join(', ') ?? '-'} />

              {schedule.isVirtual ? (
                <Info title="Modalidad"
                  value="Virtual" />
              ) : (
                <>
                  <Info title="Aula"
                    value={schedule.classroom?.name ?? '-'} />

                  <Info title="Capacidad"
                    value={String(schedule.classroom?.capacity ?? '-')} />

                  <Info title="Edificio"
                    value={schedule.classroom?.building.name ?? '-'} />

                  <Info title="Piso"
                    value={formatFloor(schedule.classroom?.floor)} />
                </>
              )}

            </Stack>
          </Paper>

        </Grid>

        {/* Plano */}

        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }} >
            {schedule.isVirtual ? (
              <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ minHeight: 420 }} >
                <Laptop size={70}/>
                <Typography variant="h6" >
                  Clase Virtual
                </Typography>
                <Typography textAlign="center" color="text.secondary" >
                  Este encuentro se dicta de forma virtual.
                </Typography>
              </Stack>
            ) : (
              <>
                <Typography variant="subtitle1" fontWeight={700} mb={2} >
                  Ubicación
                </Typography>

                <ToggleButtonGroup
                  exclusive
                  value={mapView}
                  onChange={(_, value) => value && setMapView(value)}
                  size="small"
                  sx={{ mb: 3, flexWrap: 'wrap'}} >
                  <ToggleButton value="building">
                    Plano edificio
                  </ToggleButton>
                  <ToggleButton value="campus">
                    Campus
                  </ToggleButton>
                </ToggleButtonGroup>

                {mapView === 'building' ? (
                  <MapSelector
                    building={schedule.classroom?.building.name ?? ''}
                    level={String(schedule.classroom?.floor ?? '')}
                    classRoom={schedule.classroom?.code ?? ''}
                  />
                ) : (
                  <Campus selectedBuilding={ buildingMap[schedule.classroom?.building.name ?? ''] ?? ''}/>
                )}
              </>
            )}
          </Paper>

        </Grid>
      </Grid>
    </Box>
  )
}

function Info({ title, value }: { title: string ,value: string }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" >
        {title}
      </Typography>

      <Typography fontWeight={600}>
        {value}
      </Typography>
    </Box>
  )
}

function formatFloor(floor?: number) {
  if (floor == null) return '-'

  switch (floor) {
    case -1:
      return 'Subsuelo'
    case 0:
      return 'Planta Baja'
    case 1:
      return 'Primer Piso'
    case 2:
      return 'Segundo Piso'
    case 3:
      return 'Tercer Piso'
    default:
      return `Piso ${floor}`
  }
}