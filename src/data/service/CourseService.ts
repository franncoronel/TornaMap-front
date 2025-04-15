import axios from "axios"
import { ICourse } from "../domain/Course"
import { ServiceInterface } from "./ServiceInterface"
import { Response } from "../domain/Response"
import { environment } from "@/environment"
export class CourseService implements ServiceInterface {
    private baseUrl: string = `${environment.apiUrl}/courses`

    async getAll(query?: string): Promise<ICourse[]> {
        const url = query ? `${this.baseUrl}?query=${query}` : this.baseUrl
        const courseDTOs = await axios.get<Response<ICourse[]>>(url)
        const courses = courseDTOs.data.data
        return courses
    }

    // async getById(id: number): Promise<Course> {
    //     const courseDTO = await axios.get<Course>(`${REST_API_URL}/courses/${id}`)
    //     const course = courseDTO.data
    //     return course
    // }
}

export const courseService = new CourseService()