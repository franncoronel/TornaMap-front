// ScheduleModal.tsx
import TornaviasSubsuelo from './tornavias/TornaviasSubsuelo'
import TornaviasPlantaBaja from './tornavias/TornaviasPlantaBaja'
import TornaviasPrimerPiso from './tornavias/TornaviasPrimerPiso'

import AularioNave3PlantaBaja from './aulario/AularioNave3PlantaBaja'
import AularioNave3PlantaAlta from './aulario/AularioNave3PlantaAlta'

// 1. define tus mapas por edificio
const tornavias: Record<string, React.FC<{ selectedCode?: string }>> = {
  '-1': TornaviasSubsuelo,
  '0': TornaviasPlantaBaja,
  '1': TornaviasPrimerPiso
}

const aulario: Record<string, React.FC<{ selectedCode?: string }>> = {
  '1': AularioNave3PlantaBaja,
  '2': AularioNave3PlantaAlta
}

// 2. agrúpalos en un selector de edificios
const buildingMaps: Record<string, typeof tornavias> = {
  Tornavías: tornavias,
  Aulario: aulario
}

interface MapSelectorProps {
  building: string | 'Tornavías' | 'Aulario'
  level: string // '-1', '0', '1', '2', …
  classRoom?: string // e.g. 'A1'
}

export function MapSelector({ building, level, classRoom }: MapSelectorProps) {
  const mapSet = buildingMaps[building]
  if (!mapSet) return <p>Edificio desconocido</p>
  // obtengo el componente concreto para el floor
  const MapComponent = mapSet[level]
  if (!MapComponent) return <p>Piso “{level}” no disponible</p>

  return (
    <div className="modal">
      <MapComponent selectedCode={classRoom} />
    </div>
  )
}
