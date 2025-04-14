import { Entity } from "./Entity"

export class User implements Entity {
  constructor(
    public email: string,
    public id: number,
    public image: string,
    public isAdmin: boolean,
    public lastName: string,
    public name: string,
    public password?: string,
  ) {}

}

export class LoginRequest {
  constructor(
      public email: string,
      public password: string,
  ){}
}

export class LoggedIn{
  constructor(
      public id: number,
      /* */
  ){}
}