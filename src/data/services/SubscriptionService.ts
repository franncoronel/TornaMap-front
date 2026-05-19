import axios from 'axios'
import { Response } from '../domain/Response'
import { API_URL } from '@/config'

export class SubscriptionService {
  baseUrl: string = `${API_URL}/subscription`

    async subscribeToNewsletter(email: string): Promise<Response<void>> {
        const response = await axios.post<Response<void>>(
        `${this.baseUrl}/newsletter`,
        { email }
        )
        return response.data
    }

    async subscribeToEvent(eventId: number): Promise<Response<void>> {
        const response = await axios.post<Response<void>>(
        `${this.baseUrl}/event/${eventId}`
        )
        return response.data
    }
}

export const subscriptionService = new SubscriptionService()