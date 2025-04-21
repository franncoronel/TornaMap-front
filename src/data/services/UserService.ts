import { User } from '@/data/domain/User'
// import { environment } from '@/environment'
import { API_URL } from '@/config'

import axios from 'axios'
import { Response } from '@/data/domain/Response'
export const userService = {
  getProfile: async (): Promise<Response<User>> =>
    axios.get(`${API_URL}/users/profile`, { withCredentials: true }),
  login: async (email: string, password: string): Promise<Response<User>> =>
    await axios.post(
      'users/login',
      { email, password },
      { withCredentials: true }
    ),
  logout: async () =>
    await axios.post('users/logout', {}, { withCredentials: true })
}
