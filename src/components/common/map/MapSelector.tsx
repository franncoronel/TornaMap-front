//Components
import TornaviasSubsuelo from './tornavias/TornaviasSubsuelo'
import TornaviasPlantaBaja from './tornavias/TornaviasPlantaBaja'
import TornaviasPrimerPiso from './tornavias/TornaviasPrimerPiso'
import AularioNave3PlantaBaja from './aulario/AularioNave3PlantaBaja'
import AularioNave3PlantaAlta from './aulario/AularioNave3PlantaAlta'
import ITSPb from './its/ITSPb'
//MUI Components
import { Box } from '@mui/material'
// Styles
import '@/components/pages/map/map.css'
//React
import { FC } from 'react'
import { normalize } from '@/data/mapper/buildingMapper'



interface FloorMapProps {
  selectedCode?: string
  handleOpen?: (classRoomId: string) => void
}

// 1. define tus mapas por edificio
const tornavias: Record<string, FC<FloorMapProps>> = {
  '-1': TornaviasSubsuelo,
  '0': TornaviasPlantaBaja,
  '1': TornaviasPrimerPiso
}

const aulario: Record<string, FC<FloorMapProps>> = {
  '0': AularioNave3PlantaBaja,
  '1': AularioNave3PlantaAlta
}

const its: Record<string, FC<FloorMapProps>> = {
  '0': ITSPb
}

// 2. agrúpalos en un selector de edificios
const buildingMaps: Record<string, typeof tornavias> = {
  tornavias: tornavias,
  aularionave3: aulario,
  its: its
}

interface MapSelectorProps {
  building: string | undefined
  level: string | undefined // '-1', '0', '1', '2', …
  handleOpen?: (classRoomId: string) => void // función para abrir el modal
  classRoom?: string // e.g. 'A1'
}

export default function MapSelector({
  building,
  level,
  handleOpen,
  classRoom
}: MapSelectorProps) {
  const mapSet = buildingMaps[normalize(building ?? '')]
  if (!mapSet) return <p>Edificio desconocido</p>
  // obtengo el componente concreto para el floor
  const MapComponent = mapSet[level ?? ''] // e.g. '0', '1', '2', …
  if (!MapComponent) return <p>Piso “{level}” no disponible</p>

  return (
    <Box className="svg-container">
      {/* Renderiza el componente del mapa correspondiente */}
      <MapComponent selectedCode={classRoom} handleOpen={handleOpen} />
    </Box>
  )
}
