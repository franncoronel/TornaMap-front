import { ServiceInterface } from './ServiceInterface'
import { IPeriod, PeriodFormData } from '../domain/Period'
import { Response } from '../domain/Response'
import axios from 'axios'
import { API_URL } from '@/config'

export class PeriodsService implements ServiceInterface<IPeriod, PeriodFormData> {
  baseUrl: string = `${API_URL}/periods`

  async getAll(): Promise<Response<IPeriod[]>> {
    const response = await axios.get<Response<IPeriod[]>>(this.baseUrl)
    return response.data
  }

  async getById(id: string | number): Promise<Response<IPeriod>> {
    const response = await axios.get<Response<IPeriod>>(`${this.baseUrl}/${id}`)
    return response.data
  }

  async create(period: PeriodFormData): Promise<Response<IPeriod>> {
    const response = await axios.post<Response<IPeriod>>(this.baseUrl, period)
    return response.data
  }

  async update(period: IPeriod): Promise<Response<IPeriod>> {
    const response = await axios.put<Response<IPeriod>>(`${this.baseUrl}/${period.id}`, period)
    return response.data
  }

  async delete(id: string): Promise<Response<null>> {
    const response = await axios.delete<Response<null>>(`${this.baseUrl}/${id}`)
    return response.data
  }
}

export const periodsService = new PeriodsService()
