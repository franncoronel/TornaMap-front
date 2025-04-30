import { Entity } from "./Entity"

export interface IPeriod extends Entity{
    title: string
    startDate: Date
    endDate: Date
}