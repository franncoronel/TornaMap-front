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
}

export interface IEventCreate extends Entity {
  name: string
  isApproved: boolean
  isCancelled: boolean
  courseId: string
  periodId: string
  schedules: ISchedule[]
}





export interface IEventList extends IEvent {
  course: string
}