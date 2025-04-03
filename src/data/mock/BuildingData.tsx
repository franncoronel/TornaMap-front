import { a25, a26, a27, a28, a29, aduitorioLecturaMundi, gerenciaInformaticaSoporteTecnico, iamk, iamkDecanato, iamkServicios, lecturaMundiIdentidadVisual, sumSubsuelo } from "./ClassRoomData"
import { a18_N3, a19_N3, a20_N3,a17_N3,a16_N3,a15_N3 } from "./ClassRoomData"

export const subsuelo = {
  id: 0,
  text: 'Subsuelo',
  path: 'tornavias-subsuelo',
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
    iamkDecanato,
  ]
}

export const aularioPlantaBajaNave3 = {
  id: 0,
  text: 'Planta Baja',
  path: 'Aulario-nave-3-planta-baja',
  classRooms: [
    a15_N3,
    a16_N3,
    a17_N3,
  ]
}

export const aularioPlantAltaNave3 = {
  id: 1,
  text: 'Planta Alta',
  path: 'Aulario-nave-3-planta-baja',
  classRooms: [
    a19_N3,
    a18_N3,
    a20_N3,
  ]
}

export const tornavias = {
  id: 0,
  text: 'Tornavías',
  path: 'mapa/tornavias-planta-baja',
  levels: [
    subsuelo
  ]
}

export const tornavia2 = {
  id: 1,
  text: 'Tornavia2',
  path: 'mapa/tornavias-primer-piso',
  levels: [
    subsuelo
  ]
}

export const aularioNave3 = {
  id: 2,
  text: 'Aulario - Nave 3',
  path: 'mapa/aulario-nave-3-planta-baja',
  levels: [
    aularioPlantaBajaNave3,
    //aularioPlantAltaNave3
  ]
}

export const buildingData = [
  tornavias,
  tornavia2,
  aularioNave3
]