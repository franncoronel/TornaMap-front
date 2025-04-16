import { Entity } from '@/data/domain/Entity'

export interface ServiceInterface {
  getAll?(): Promise<unknown>

  getById?(id: string | number): Promise<unknown>

  create?(entity: Entity): Promise<unknown>

  update?(entity: Entity): Promise<unknown>

  delete?(id: number): Promise<unknown>
}
