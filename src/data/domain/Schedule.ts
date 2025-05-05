import { IClassroom } from './Classroom'

export interface ISchedule {
  id: string
  startTime: string
  endTime: string
  weekDay: string | null
  date: Date | null
  isVirtual: boolean
  professors: string[]
  classroom: IClassroom | null
}
