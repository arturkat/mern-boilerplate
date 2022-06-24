import { Schema } from 'mongoose'

export interface IUser {
  _id: Schema.Types.ObjectId
  email: string
  password: string
}
