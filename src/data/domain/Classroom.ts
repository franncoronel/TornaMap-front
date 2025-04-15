import { IBuilding } from "./Building";

export interface IClassroom {
    id: string,
    name: string,
    capacity: number,
    type: string,
    floor: number,
    building: IBuilding,
    code: string
}
