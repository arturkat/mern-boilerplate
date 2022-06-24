import { Schema } from 'mongoose'
import {IUser} from '@interfaces/user.interface'

export interface IPost {
  _id: Schema.Types.ObjectId
  user: IUser
  title: string
  body: string
  isDummy: boolean
}
