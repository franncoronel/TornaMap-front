// utils/helpers.ts
export const weekDayES = [
  'LUNES',
  'MARTES',
  'MIÉRCOLES',
  'JUEVES',
  'VIERNES',
  'SÁBADO',
  'DOMINGO'
] as const

export const weekDayEN = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
    ] as const

/* si quieres 3-letras para mostrar */
export const weekDayShort: Record<(typeof weekDayES)[number], string> = {
  LUNES: 'Lun',
  MARTES: 'Mar',
  MIÉRCOLES: 'Mié',
  JUEVES: 'Jue',
  VIERNES: 'Vie',
  SÁBADO: 'Sáb',
  DOMINGO: 'Dom'
}

export function toMins(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}