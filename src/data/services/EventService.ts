import { ServiceInterface } from './ServiceInterface'
import { environment } from '@/environment'
import { Response } from '../domain/Response'
import { IEventList } from '../domain/Event'
import axios from 'axios'
export class EventService implements ServiceInterface {
  baseUrl: string = `${environment.apiUrl}/events`

  async getAll(
    classroomId?: string,
    date?: Date
  ): Promise<Response<IEventList[]>> {
    const encodedDate = encodeURIComponent(date?.toISOString() ?? '')
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
