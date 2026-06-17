import { IBuilding } from './Building'

export interface IReservation {
  id: string
  classroomName: string
  event: string
  course?: string
  courseData?: string[]
  schedules?: string
}
