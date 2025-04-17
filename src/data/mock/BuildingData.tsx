import {
  a25,
  a26,
  a27,
  a28,
  a29,
  aduitorioLecturaMundi,
  gerenciaInformaticaSoporteTecnico,
  iamk,
  iamkDecanato,
  iamkServicios,
  lecturaMundiIdentidadVisual,
  sumSubsuelo
} from './ClassRoomData'
import { a18_N3, a19_N3, a20_N3, a17_N3, a16_N3, a15_N3 } from './ClassRoomData'

export const aularioPlantaBajaNave3 = {
  id: 0,
  text: 'Planta Baja',
  path: 'planta-baja',
  level: 0,
  classRooms: [a15_N3, a16_N3, a17_N3]
}

export const aularioPlantAltaNave3 = {
  id: 1,
  text: 'Planta Alta',
  path: 'planta-alta',
  level: 1,
  classRooms: [a19_N3, a18_N3, a20_N3]
}

// Tornavías
export const tornaviasSubsuelo = {
  id: 0,
  text: 'Subsuelo',
  path: 'subsuelo',
  level: -1,
  classRooms: [
    aduitorioLecturaMundi,
    lecturaMundiIdentidadVisual,
    sumSubsuelo,
    a27,
    a26,
    a25,
    gerenciaInformaticaSoporteTecnico,
    iamk,
    a28,
    a29,
    iamkServicios,
    iamkDecanato
  ]
}
const tornaviasPB = {
  id: 1,
  text: 'Planta Baja',
  path: 'planta-baja',
  level: 0,
  classRooms: [a17_N3, a16_N3, a15_N3]
}
const tornaviasPP = {
  id: 2,
  text: 'Primer Piso',
  path: 'primer-piso',
  level: 1,
  classRooms: [a19_N3, a18_N3, a20_N3]
}

export const buildingData = [
  {
    id: 0,
    text: 'Tornavías',
    path: 'tornavias',
    levels: [tornaviasSubsuelo, tornaviasPB, tornaviasPP]
  },
  {
    id: 1,
    text: 'Aulario - Nave 3',
    path: 'aularioNave3',
    levels: [aularioPlantaBajaNave3, aularioPlantAltaNave3]
  }
]
