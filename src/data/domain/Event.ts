import { BackendSchedule } from '../services/EventService'
import { Entity } from './Entity'
import { ISchedule } from './Schedule'

export interface IEvent {
  id?: string
  name: string
  isApproved: boolean
  isCancelled: boolean
  courseName: string
  programNames: string[]
  schedules: ISchedule[]
  type: EventType         // ← NUEVO: ahora el front siempre recibe el tipo
}

export interface IEventCreate extends Entity {
  name: string
  isApproved: boolean
  isCancelled: boolean
  courseID: string
  periodID: string
  schedules: ISchedule[]
  type: EventType
  details: string
  customPeriodStart?: Date | null
  customPeriodEnd?: Date | null
}

export interface IEventCreateDto extends Entity {
  name: string
  isApproved: boolean
  isCancelled: boolean
  courseID: string
  periodID: string
  schedules: BackendSchedule[]
  type: EventType
  details: string
  customPeriodStart?: Date | null
  customPeriodEnd?: Date | null
}

export interface IEventList extends IEvent {
  course: string
}

// ─── Categorías de tipo ───────────────────────────
export const ACADEMIC_TYPES: EventType[] = ['CURSADA', 'PARCIAL', 'FINAL']
export const INSTITUTIONAL_TYPES: EventType[] = ['CHARLA', 'SEMINARIO', 'CONFERENCIA']

export const EVENT_TYPES = [
  { value: 'CURSADA', label: 'Cursada' },
  { value: 'CHARLA', label: 'Charla' },
  { value: 'SEMINARIO', label: 'Seminario' },
  { value: 'CONFERENCIA', label: 'Conferencia' },
  { value: 'FINAL', label: 'Final' },
  { value: 'PARCIAL', label: 'Parcial' }
] as const

export type EventType = (typeof EVENT_TYPES)[number]['value']

export interface InstitutionalEvent {
  id: string
  name: string
  type: 'CHARLA' | 'SEMINARIO' | 'CONFERENCIA'
  details: string
  startDate?: string
  startTime?: string
  endTime?: string
  courseName?: string
  location?: string
  isVirtual: boolean
}

export interface InstitutionalEventsResponse {
  current: InstitutionalEvent[]
  pendingToday: InstitutionalEvent[]
  finished: InstitutionalEvent[]
  upcoming: InstitutionalEvent[]
}