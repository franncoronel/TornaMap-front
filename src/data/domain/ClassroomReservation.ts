import { IClassroom } from "./Classroom"
import { OccupiedInterval } from "./Schedule"

export interface IPossibleReservation {
  classroom: IClassroom
  date?: string | null
  occupiedIntervals?: OccupiedInterval[]
}

export interface IReservation {
  id: string
  classroomName: string
  event: string
  course?: string
  courseData?: string[]
  schedules?: string
}

// Payload para crear una reserva de aula (POST /users/me/reservations)
export interface IReservationCreate {
  classroomId: string
  title: string
  date: string // yyyy-MM-dd
  startTime: string // HH:mm
  endTime: string // HH:mm
  eventType: string
  details?: string
  courseID?: string | null
}
