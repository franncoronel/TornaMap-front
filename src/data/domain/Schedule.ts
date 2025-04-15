import { IClassroom } from './Classroom'

export interface ISchedule {
  id: string
  startTime: string
  endTime: string
  weekDay: string
  date: Date
  isVirtual: boolean
  professors: string[]
  classroom: IClassroom
}
