export interface User {
  _id: string
  username: string
  password: string
}

export type NewUser = Omit<User, '_id'>
