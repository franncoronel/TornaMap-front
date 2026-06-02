import { mapColors } from "@/components/pages/map/mapColors"


type RoomType = 'classroom' | 'lab' 


export function getRoomStyle(type: RoomType, isSelected: boolean, hasSelection: boolean) {
  const baseStyles = {
    classroom: mapColors.classrooms,
    lab: mapColors.lab,
  }

  const base = baseStyles[type]

  //resalta el aula/laboratorio seleccionado
  if (isSelected) {
    return {
      fill: '#d32f2f',
      stroke: '#b71c1c',
      strokeWidth: base.strokeWidth,
    }
  }

  //cuando hay una selección activa, atenúa el resto para destacar la seleccionada
  if (hasSelection) {
    return {
      fill: 'white',
      stroke: '#cccccc',
      strokeWidth: 1,
    }
  }

  //estado normal del mapa cuando no hay selección
  return {
    fill: base.fill,
    stroke: base.stroke,
    strokeWidth: base.strokeWidth,
  }
}