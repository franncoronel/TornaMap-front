

export const floorToPath = (floor: number): string => {
  switch (floor) {
    case -1:
      return 'subsuelo'
    case 0:
      return 'planta-baja'
    case 1:
      return 'primer-piso'
    default:
      return `nivel-${floor}`
  }
}

export const floorToLabel = (floor: number): string => {
  switch (floor) {
    case -1:
      return 'Subsuelo'
    case 0:
      return 'Planta Baja'
    case 1:
      return 'Primer Piso'
    default:
      return `Nivel ${floor}`
  }
}

export const pathToFloor = (path: string): number => {
  switch (path) {
    case 'subsuelo':
      return -1
    case 'planta-baja':
      return 0
    case 'primer-piso':
      return 1
    default:
      return Number(path.replace('nivel-', ''))
  }
}