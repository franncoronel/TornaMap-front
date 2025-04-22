import { ServiceInterface } from './ServiceInterface'
import { Response } from '../domain/Response'
import { IEventList } from '../domain/Event'
import axios from 'axios'
import { API_URL } from '@/config'
import { format } from 'date-fns'

export class EventService implements ServiceInterface {
  baseUrl: string = `${API_URL}/events`

  async getAll(
    classroomId?: string | null,
    date?: Date
  ): Promise<Response<IEventList[]>> {
    const encodedDate = date ? format(date, 'yyyy-MM-dd') : ''
    const url =
      classroomId && date
        ? `${this.baseUrl}/${classroomId}/${encodedDate}`
        : this.baseUrl
    const eventsDTOs = await axios.get<Response<IEventList[]>>(url)
    const events = eventsDTOs.data
    return events
  }

  /* async getById(id: string | number): Promise<Response<ICourse>> {
    const courseDTO = await axios.get<Response<ICourse>>(
      `${this.baseUrl}/${id}`
    )
    const course = courseDTO.data
    return course
  } */
}

export const eventService = new EventService()
