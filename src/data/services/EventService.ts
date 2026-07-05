import { ServiceInterface } from './ServiceInterface'
import { Response } from '../domain/Response'
import { IEventCreate, IEventCreateDto, IEventList, InstitutionalEventsResponse } from '../domain/Event'
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
    return events
  }

  async getById(id: string) {
    const { data } = await axios.get<Response<IEventCreate>>(
      `${this.baseUrl}/${id}`
    )
    return data
  }

  async getDetailById(id: string) {
    const { data } = await axios.get<Response<IEventCreate>>(
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

  // ──────────────────────────────────────────────
  // Eventos institucionales con búsqueda opcional
  // ──────────────────────────────────────────────
  async getInstitutionalEvents(query?: string): Promise<Response<IEventList[]>> {
    const url = query
      ? `${this.baseUrl}/institutional?query=${encodeURIComponent(query)}`
      : `${this.baseUrl}/institutional`

    const { data } = await axios.get<Response<IEventList[]>>(url)
    return data
  }

  async getInstitutionalEventsDashboard(): Promise<Response<InstitutionalEventsResponse>> {
    const { data } = await axios.get<Response<InstitutionalEventsResponse>>(
      `${this.baseUrl}/institutional/today` )

    return data
  }
}

export function mapScheduleToBackend(s: ScheduleForm): BackendSchedule {
  return {
    weekDay: s.weekDay || null,
    date: s.date ? format(s.date, 'yyyy-MM-dd') : null,
    startTime: s.startTime,
    endTime: s.endTime,
    isVirtual: s.isVirtual,
    classroomId: s.classroomId || null
  }
}

export type BackendSchedule = {
  weekDay: string | null
  date: string | null
  startTime: string
  endTime: string
  isVirtual: boolean
  classroomId: string | null
}

export const eventService = new EventService()