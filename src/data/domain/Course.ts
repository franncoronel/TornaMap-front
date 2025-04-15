import { Entity } from "./Entity"
import { IEvent } from "./Event"

export interface ICourse extends Entity {
    name: string,
    programs: string[],
    events: IEvent[]
}

export interface ICourseList extends Entity {
    name: string,
    programs: string,
    events: string,
    professors: string,
    modality: string,
    schedules: string
}