import axios from 'axios'
import {
  ICourse,
  ICourseCreate,
  ICourseList,
  ICourseUpdate
} from '../domain/Course'
import { ServiceInterface } from './ServiceInterface'
import { Response } from '../domain/Response'
import { API_URL } from '@/config'

export class CourseService implements ServiceInterface {
  baseUrl: string = `${API_URL}/courses`

  async getAll(query?: string | string[]): Promise<Response<ICourseList[]>> {
    const normalizedQuery =
      typeof query === 'string'
        ? query
          ? [query]
          : []
        : (query ?? []).filter((q) => q.trim().length > 0)

    const url = normalizedQuery.length
      ? `${this.baseUrl}?${new URLSearchParams(
        normalizedQuery.map((q) => ['query', q])
      ).toString()}`
      : this.baseUrl

    const courseDTOs = await axios.get<Response<ICourseList[]>>(url)
    const courses = courseDTOs.data
    return courses
  }

  async getById(id: string | number): Promise<Response<ICourse>> {
    const courseDTO = await axios.get<Response<ICourse>>(
      `${this.baseUrl}/${id}`
    )
    const course = courseDTO.data
    if (course.data && course.data.events) {
      const originalLength = course.data.events.length
      course.data.events = course.data.events.filter((event) => event.isApproved)
      console.log(`[Búsqueda - Filtrado de Eventos] Total: ${originalLength} | Aprobados: ${course.data.events.length} | Ocultados: ${originalLength - course.data.events.length}`)
    }
    return course
  }

  async create(course: ICourseCreate): Promise<Response<ICourseCreate>> {
    const courseDTO = await axios.post<Response<ICourseCreate>>(
      this.baseUrl,
      course,
      { withCredentials: true }
    )
    const createdCourse = courseDTO.data
    return createdCourse
  }

  async update(course: ICourseUpdate): Promise<Response<ICourseUpdate>> {
    const courseDTO = await axios.put<Response<ICourseUpdate>>(
      `${this.baseUrl}`,
      course,
      { withCredentials: true }
    )
    const updatedCourse = courseDTO.data
    return updatedCourse
  }

  async delete(id: string | number): Promise<Response<ICourse>> {
    const courseDTO = await axios.delete<Response<ICourse>>(
      `${this.baseUrl}/${id}`
    )
    const deletedCourse = courseDTO.data
    return deletedCourse
  }
}

export const courseService = new CourseService()
