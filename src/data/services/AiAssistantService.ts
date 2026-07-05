import { API_URL } from '@/config'
import axios from 'axios'
import { ICourseAi } from '../domain/Course'
import { Response } from '../domain/Response'

export class AiAssistantService {
  baseUrl: string = `${API_URL}/courses`

async getCoursesByPeriod(periodId: string): Promise<Response<ICourseAi[]>> {
    const res = await axios.get<Response<ICourseAi[]>>(
        `${this.baseUrl}/by-period/${periodId}`
    )
    return res.data
}
}

export const aiAssistantService = new AiAssistantService()