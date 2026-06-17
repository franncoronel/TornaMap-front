import { IClassroom } from "./Classroom"
import { OccupiedInterval } from "./Schedule"
import { IBuilding } from './Building'

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
