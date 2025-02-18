import { a25, a26, a27, a28, a29, aduitorioLecturaMundi, gerenciaInformaticaSoporteTecnico, iamk, iamkDecanato, iamkServicios, lecturaMundiIdentidadVisual, sumSubsuelo } from "./ClassRoomData"

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
  path: 'mapa/tornavias-planta-baja',
  levels: [
    subsuelo
  ]
}

export const buildingData = [
  tornavias,
  tornavia2
]