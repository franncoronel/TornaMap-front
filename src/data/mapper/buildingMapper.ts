import { IBuildingList } from '@/data/domain/Building'
import { floorToLabel, floorToPath } from './levelMapper'

export interface UILevel {
  level: number
  text: string
  path: string
}

export interface UIBuilding {
  id: string
  text: string
  path: string
  levels: UILevel[]
}

// Normalizador
export const normalize = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase()

// Mapper principal
export const mapBuildingsToUI = (
  buildings: IBuildingList[]  //me traigo los edificios del back
): UIBuilding[] => {
  return buildings.map((b) => {   //itero cada edificio 
    const levels = [
      ...new Set(b.classrooms.map((c) => c.floor)) //traigo los pisos de cada aula y elimino duplicados
    ]
      .sort((a, b) => a - b)  //ordeno los pisos de menor a mayor
      .map((lvl) => ({  //mappeo cada piso a su formato UI 
        level: lvl,
        text: floorToLabel(lvl),  //convierto el número a un texto
        path: floorToPath(lvl)  //convierto el número a formato URL
      }))

    return {
      id: b.id,
      text: b.name,   //nombre del edificio
      path: normalize(b.name),  //nombre del edificio en formto URL
      levels  //lista de pisos
    }
  })
}