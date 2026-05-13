import { ServiceInterface } from './ServiceInterface'
import { Response } from '../domain/Response'
import { IEventCreate, IEventCreateDto, IEventList } from '../domain/Event'
import axios from 'axios'
import { API_URL } from '@/config'
import { format } from 'date-fns'
import { ScheduleForm } from '@/components/pages/form/components/EventForm'

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
    const originalLength = events.data.length
    events.data = events.data.filter((event) => event.isApproved)
    console.log(`[Filtrado] Total: ${originalLength} | Aprobados: ${events.data.length} | Ocultados: ${originalLength - events.data.length}`)
    return events
  }

  async getById(id: string) {
    const { data } = await axios.get<Response<IEventCreate>>( // detail trae schedules
      `${this.baseUrl}/${id}`
    )
    return data
  }

  async getDetailById(id: string) {
    const { data } = await axios.get<Response<IEventCreate>>( // detail trae schedules
      `${this.baseUrl}/detail/${id}`
    )
    return data
  }

  async create(payload: IEventCreateDto): Promise<Response<IEventCreate>> {
    const { data } = await axios.post<Response<IEventCreate>>(
      this.baseUrl,
      payload,
      { withCredentials: true }
    )
    return data
  }

  async update(payload: IEventCreateDto): Promise<Response<IEventCreate>> {
    const { data } = await axios.put<Response<IEventCreate>>(
      `${this.baseUrl}`,
      payload,
      { withCredentials: true }
    )
    return data
  }

  delete = async (id: string) =>
    await axios.delete(`${this.baseUrl}/${id}`, { withCredentials: true })

  async getPendingRequests(): Promise<Response<IEventList[]>> {
    const { data } = await axios.get<Response<IEventList[]>>(
      `${this.baseUrl}/pending`
    )
    return data
  }

  async approve(id: string): Promise<void> {
    await axios.post(`${this.baseUrl}/${id}/approve`)
  }

  async reject(id: string): Promise<void> {
    await axios.post(`${this.baseUrl}/${id}/reject`)
  }
}

export function mapScheduleToBackend(s: ScheduleForm): BackendSchedule {
  // HH:mm ya viene en startTime / endTime
  return {
    weekDay: s.weekDay || null,
    date: s.date ? format(s.date, 'yyyy-MM-dd') : null, // el DatePicker ya devuelve 'yyyy-MM-dd'
    startTime: s.startTime,
    endTime: s.endTime,
    isVirtual: s.isVirtual,
    classroomId: s.classroomId || null // null si virtual o no seleccionado
  }
}

export type BackendSchedule = {
  weekDay: string | null
  date: string | null // yyyy-MM-dd
  startTime: string // HH:mm
  endTime: string // HH:mm
  isVirtual: boolean
  classroomId: string | null
}

export const eventService = new EventService()
