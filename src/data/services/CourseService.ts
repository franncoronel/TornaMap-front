import axios from 'axios'
import { ICourse, ICourseCreate, ICourseList, ICourseUpdate } from '../domain/Course'
import { ServiceInterface } from './ServiceInterface'
import { Response } from '../domain/Response'
import { API_URL } from '@/config'

export class CourseService implements ServiceInterface {
  baseUrl: string = `${API_URL}/courses`

  async getAll(query?: string): Promise<Response<ICourseList[]>> {
    const url = query ? `${this.baseUrl}?query=${query}` : this.baseUrl
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

  async create(course: ICourseCreate): Promise<Response<ICourseCreate>> {
    const courseDTO = await axios.post<Response<ICourseCreate>>(this.baseUrl, course)
    const createdCourse = courseDTO.data
    return createdCourse
  }

  async update(course: ICourseUpdate): Promise<Response<ICourseUpdate>> {
    const courseDTO = await axios.put<Response<ICourseUpdate>>(
      `${this.baseUrl}/${course.id}`,
      course
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
