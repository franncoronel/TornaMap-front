import { Entity } from '@/data/domain/Entity'

export interface ServiceInterface<EntityType = Entity, CreateDTO = EntityType> {
  getAll?(): Promise<unknown>

  getById?(id: string | number): Promise<unknown>

  create?(entity: CreateDTO): Promise<unknown>

  update?(entity: EntityType): Promise<unknown>

  delete?(id: number | string): Promise<unknown>

}


