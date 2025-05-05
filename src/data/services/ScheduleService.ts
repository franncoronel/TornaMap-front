import { API_URL } from "@/config"
import axios from "axios"
import { ServiceInterface } from "./ServiceInterface"
import { Response } from '../domain/Response'

export class ScheduleService implements ServiceInterface {
    baseUrl: string = `${API_URL}/schedules`

    async create(schedule: IScheduleCreate): Promise<Response<IScheduleCreate>> {
        const scheduleDTO = await axios.post<Response<IScheduleCreate>>(
            this.baseUrl,
            schedule,
            { withCredentials: true }
        )
        const createdSchedule = scheduleDTO.data
        return createdSchedule
    }
}

export const scheduleService = new ScheduleService()