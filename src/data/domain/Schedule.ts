import { IClassroom } from './Classroom'

export interface ISchedule extends IScheduleCreate {
  id?: string
}

export interface IScheduleCreate {
  startTime: string
  endTime: string
  weekDay: string | null
  date: Date | null
  isVirtual: boolean
  professors: string[]
  classroom?: IClassroom | null
}

export interface OccupiedInterval {
  startTime: string
  endTime: string
}
