import { User } from '@/data/domain/User'
// import { environment } from '@/environment'
import { API_URL } from '@/config'

import axios from 'axios'
import { Response } from '@/data/domain/Response'
export const userService = {
  getProfile: async (): Promise<Response<Response<User>>> =>
    axios.get(`${API_URL}/users/profile`, { withCredentials: true }),
  login: async (email: string, password: string): Promise<Response<User>> =>
    await axios.post(
      'users/login',
      { email, password },
      { withCredentials: true }
    ),
  logout: async () =>
    await axios.post('users/logout', {}, { withCredentials: true }),

  //Para Profile STUDENT
  getMyCourses: async () =>
    axios.get(`${API_URL}/users/me/courses`, { withCredentials: true }),

  subscribeCourse: async (id: string | number) =>
    axios.post(`${API_URL}/users/me/courses/${id}`, {}, { withCredentials: true }),

  unsubscribeCourse: async (id: string | number) =>
    axios.delete(`${API_URL}/users/me/courses/${id}`, { withCredentials: true }),

  // Para Profile PROFESSOR
  getMyReservations: async () =>
    axios.get(`${API_URL}/users/me/reservations`, { withCredentials: true }),

  cancelReservation: async (id: string | number) =>
    axios.delete(`${API_URL}/users/me/reservations/${id}`, { withCredentials: true })

}
