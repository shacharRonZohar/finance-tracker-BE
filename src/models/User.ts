import { ObjectId } from 'mongodb'

export interface User {
  _id: ObjectId
  username: string
  password: string
}

export type CleanUser = Omit<User, 'password'>

export type NewUser = Omit<User, '_id'>
