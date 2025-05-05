import { IClassroom } from "./Classroom"

export interface IBuilding {
  id: string
  name: string
}

export interface IBuildingList extends IBuilding {
  classrooms: IClassroom[]
}