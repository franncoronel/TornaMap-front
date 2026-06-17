import { Entity } from './Entity'
import { IEvent } from './Event'

export interface ICourse extends ICourseCreate {
  id?: string
  events: IEvent[]
}
export interface ICourseUpdate extends ICourseCreate {
  id: string
}
export interface ICourseCreate extends Entity {
  name: string
  description: string
  programs: string[]
}

export interface ICourseList extends Entity {
  name: string
  programs: string
  events: string
  professors: string
  modality: string
  schedules: string
}

export interface ICourseAi {
    id: string
    name: string
    students: number
}
