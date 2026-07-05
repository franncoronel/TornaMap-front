import { Entity } from './Entity'

export type Role = 'ADMIN' | 'STUDENT' | 'PROFESSOR'

export class User implements Entity {
  constructor(
    public email: string,
    public id: string,
    public image: string,
    public lastName: string,
    public name: string,
    public isAdmin: boolean = false,
    public role?: Role,
    public password?: string
  ) {}
}

export class LoginRequest {
  constructor(
    public email: string,
    public password: string
  ) {}
}

export class LoggedIn {
  constructor(
    public id: string
  ) {}
}
