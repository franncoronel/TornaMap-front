import axios from 'axios'
import { ServiceInterface } from './ServiceInterface'
import { Response } from '../domain/Response'
import { API_URL } from '@/config'
import { IPeriod } from '../domain/Period'

export class PeriodService implements ServiceInterface {
  baseUrl: string = `${API_URL}/periods`

  async getAll(): Promise<Response<IPeriod[]>> {
    const periodsDto = await axios.get<Response<IPeriod[]>>(this.baseUrl)
    const periods = periodsDto.data
    return periods
  }

  async getById(id: string): Promise<Response<IPeriod>> {
    const programDto = await axios.get<Response<IPeriod>>(
      `${this.baseUrl}/${id}`
    )
    const periods = programDto.data
    return periods
  }
}

export const periodService = new PeriodService()
