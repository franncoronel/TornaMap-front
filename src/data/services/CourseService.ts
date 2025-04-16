import axios from 'axios'
import { ICourse, ICourseList } from '../domain/Course'
import { ServiceInterface } from './ServiceInterface'
import { Response } from '../domain/Response'
import { environment } from '@/environment'
export class CourseService implements ServiceInterface {
  baseUrl: string = `${environment.apiUrl}/courses`

  async getAll(query?: string): Promise<Response<ICourseList[]>> {
    const url = query
      ? `${this.baseUrl}?query=${query}`
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
    return course
  }
}

export const courseService = new CourseService()
