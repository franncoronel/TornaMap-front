import axios from 'axios'
import { ServiceInterface } from './ServiceInterface'
import { Response } from '../domain/Response'
import { API_URL } from '@/config'
import { IBuildingList } from '../domain/Building'

export class BuildingService implements ServiceInterface {
  baseUrl: string = `${API_URL}/buildings`

  async getAll(): Promise<Response<IBuildingList[]>> {
    const buildingsDto = await axios.get<Response<IBuildingList[]>>(this.baseUrl)
    const buildings = buildingsDto.data
    return buildings
  }

  async getById(id: string): Promise<Response<IBuildingList>> {
    const buildingDto = await axios.get<Response<IBuildingList>>(
      `${this.baseUrl}/${id}`
    )
    const buildings = buildingDto.data
    return buildings
  }
}

export const buildingService = new BuildingService()
