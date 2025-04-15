import axios from 'axios'
import { ICourse, ICourseList } from '../domain/Course'
import { ServiceInterface } from './ServiceInterface'
import { REST_API_URL } from '../constants'
import { Response } from '../domain/Response'
export class CourseService implements ServiceInterface {
  async getAll(query?: string): Promise<Response<ICourseList[]>> {
    const url = query
      ? `${REST_API_URL}/courses?query=${query}`
      : `${REST_API_URL}/courses`
    const courseDTOs = await axios.get<Response<ICourseList[]>>(url)
    const courses = courseDTOs.data
    return courses
  }

  async getById(id: string | number): Promise<Response<ICourse>> {
    const courseDTO = await axios.get<Response<ICourse>>(
      `${REST_API_URL}/courses/${id}`
    )
    const course = courseDTO.data
    return course
  }
}

export const courseService = new CourseService()
