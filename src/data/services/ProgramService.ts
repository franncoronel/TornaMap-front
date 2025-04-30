import axios from 'axios'
import { ServiceInterface } from './ServiceInterface'
import { Response } from '../domain/Response'
import { API_URL } from '@/config'
import { IProgram } from '../domain/Program'

export class ProgramService implements ServiceInterface {
  baseUrl: string = `${API_URL}/programs`

  async getAll(): Promise<Response<IProgram[]>> {
    const programsDto = await axios.get<Response<IProgram[]>>(this.baseUrl)
    const programs = programsDto.data
    return programs
  }

  async getById(id: string): Promise<Response<IProgram>> {
    const programDto = await axios.get<Response<IProgram>>(
      `${this.baseUrl}/${id}`
    )
    const program = programDto.data
    return program
  }
}

export const programService = new ProgramService()
