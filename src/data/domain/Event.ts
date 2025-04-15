import { ISchedule } from "./Schedule";

export interface IEvent{
    id: string,
    name: string,
    isActive: boolean,
    isCancelled: boolean,
    courseName: string,
    programNames: string[],
    schedules: ISchedule[]
}