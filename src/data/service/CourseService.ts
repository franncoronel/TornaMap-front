import axios from "axios"
import { Course } from "../domain/Course"
import { ServiceInterface } from "./ServiceInterface"
import { REST_API_URL } from "../constants"

export class CourseService implements ServiceInterface {
    async getAll(query?: string): Promise<Course[]> {
        const url = query ? `${REST_API_URL}/courses?query=${query}` : `${REST_API_URL}/courses`
        const courseDTOs = await axios.get<Course[]>(url)
        const courses = courseDTOs.data
        return courses
    }
    
    // async getById(id: number): Promise<Course> {
    //     const courseDTO = await axios.get<Course>(`${REST_API_URL}/courses/${id}`)
    //     const course = courseDTO.data
    //     return course
    // }
}

export const courseService = new CourseService()