import {FC, Suspense, lazy } from 'react'
//Components
const TornaviasSubsuelo = lazy(()=>import('./tornavias/TornaviasSubsuelo'))
const TornaviasPlantaBaja = lazy(()=>import('./tornavias/TornaviasPlantaBaja'))
const TornaviasPrimerPiso = lazy(()=>import('./tornavias/TornaviasPrimerPiso'))
const AularioNave3PlantaBaja = lazy(()=>import('./aulario/AularioNave3PlantaBaja'))
const AularioNave3PlantaAlta = lazy(()=>import('./aulario/AularioNave3PlantaAlta'))
const ITSPb = lazy(()=>import('./its/ITSPb'))
//MUI Components
import { Box, CircularProgress } from '@mui/material'
// Styles
import '@/components/pages/map/map.css'
//React
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
  Tornavías: tornavias,
  tornavias: tornavias,
  AularioNave3: aulario,
  aularioNave3: aulario,
  ITS: its,
  its: its
}

interface MapSelectorProps {
  building: string | 'Tornavías' | 'AularioNave3' | undefined
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
  const mapSet = buildingMaps[building?.replace(/\s+/g, '') ?? '']
  if (!mapSet) return <p>Edificio desconocido</p>
  // obtengo el componente concreto para el floor
  const MapComponent = mapSet[level ?? ''] // e.g. '0', '1', '2', …
  if (!MapComponent) return <p>Piso “{level}” no disponible</p>

  return (
    <Suspense
          fallback={
            <div className="loader-container">
              <span className="loader-unsam">UNSAM</span>
              <CircularProgress className="loader" size={250} />
            </div>
          }
        >
      <Box className="svg-container">
        {/* Renderiza el componente del mapa correspondiente */}
        <MapComponent selectedCode={classRoom} handleOpen={handleOpen} />
      </Box>
    </Suspense>
  )
}
