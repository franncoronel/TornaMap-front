import { ServiceInterface } from './ServiceInterface'
import { IProgram,ProgramFormData } from '../domain/Program'
import { Response } from '../domain/Response'
import axios from 'axios'
import { API_URL } from '@/config'

export class ProgramService implements ServiceInterface<IProgram, ProgramFormData> {
  baseUrl: string = `${API_URL}/programs`

  async getAll(): Promise<Response<IProgram[]>> {
    const response = await axios.get<Response<IProgram[]>>(this.baseUrl)
    return response.data
  }

  async getById(id: string | number): Promise<Response<IProgram>> {
    const response = await axios.get<Response<IProgram>>(`${this.baseUrl}/${id}`)
    return response.data
  }

  async create(program: ProgramFormData): Promise<Response<IProgram>> {
    const response = await axios.post<Response<IProgram>>(this.baseUrl, program)
    return response.data
  }

  async update(program: IProgram): Promise<Response<IProgram>> {
    const response = await axios.put<Response<IProgram>>(`${this.baseUrl}/${program.id}`, program)
    return response.data
  }

  async delete(id: string): Promise<Response<null>> {
    const response = await axios.delete<Response<null>>(`${this.baseUrl}/${id}`)
    return response.data
  }
}

export const programService = new ProgramService()
