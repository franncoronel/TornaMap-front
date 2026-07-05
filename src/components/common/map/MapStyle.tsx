export interface MapAreaStyle {
  fill: string
  stroke: string
  strokeWidth: number
}

/**
 * Aplica el estilo visual para elementos del mapa que no son seleccionables.
 * Cuando existe una selección activa, el elemento se atenúa para destacar
 * el aula o laboratorio seleccionado.
 */
export function getMapStyle(
  baseStyle: MapAreaStyle,
  hasSelection: boolean
): MapAreaStyle {
  if (hasSelection) {
    return {
      fill: 'white',
      stroke: '#cccccc',
      strokeWidth: 1,
    }
  }

  return {
    fill: baseStyle.fill,
    stroke: baseStyle.stroke,
    strokeWidth: baseStyle.strokeWidth,
  }
}