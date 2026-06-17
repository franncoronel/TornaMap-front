import { IClassroom } from "./Classroom"
import { OccupiedInterval } from "./Schedule"

export interface IPossibleReservation {
  classroom: IClassroom
  date?: string | null
  occupiedIntervals?: OccupiedInterval[]
}