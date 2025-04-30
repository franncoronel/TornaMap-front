import { ServiceInterface } from './ServiceInterface'
import { Response } from '../domain/Response'
import { IEvent, IEventCreate, IEventList } from '../domain/Event'
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

  async getById(id: string) {
    const { data } = await axios.get<Response<IEvent>>( // detail trae schedules
      `${this.baseUrl}/${id}`
    )
    return data
  }

  async create(payload: IEventCreate): Promise<Response<IEventCreate>> {
    const { data } = await axios.post<Response<IEventCreate>>(
      this.baseUrl,
      payload,
      { withCredentials: true }
    )
    return data
  }

  async update(payload: IEventCreate): Promise<Response<IEventCreate>> {
    const { data } = await axios.put<Response<IEventCreate>>(
      `${this.baseUrl}/${payload.id}`,
      payload,
      { withCredentials: true }
    )
    return data
  }

  delete = async (id: string) =>
    await axios.delete(`${this.baseUrl}/${id}`, { withCredentials: true })
}

export const eventService = new EventService()
