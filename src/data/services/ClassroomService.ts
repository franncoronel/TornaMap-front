import axios from 'axios'
import { ServiceInterface } from './ServiceInterface'
import { Response } from '../domain/Response'
import { API_URL } from '@/config'
import { IClassroom } from '../domain/Classroom'

export class ClassroomService implements ServiceInterface {
  baseUrl: string = `${API_URL}/classroom`

  async getById(id: string): Promise<Response<IClassroom>> {
    const classroomDto = await axios.get<Response<IClassroom>>(
      `${this.baseUrl}/${id}`
    )
    const classroom = classroomDto.data
    return classroom
  }

  async getAll(): Promise<Response<IClassroom[]>> {
  const res = await axios.get<Response<IClassroom[]>>(this.baseUrl)
  return res.data
}
}

export const classroomService = new ClassroomService()
