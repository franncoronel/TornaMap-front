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
  buildings: IBuildingList[]
): UIBuilding[] => {
  return buildings.map((b) => {
    const levels = [
      ...new Set(b.classrooms.map((c) => c.floor))
    ]
      .sort((a, b) => a - b)
      .map((lvl) => ({
        level: lvl,
        text: floorToLabel(lvl),
        path: floorToPath(lvl)
      }))

    return {
      id: b.id,
      text: b.name,
      path: normalize(b.name),
      levels
    }
  })
}