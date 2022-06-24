import { model, Schema, Document } from 'mongoose'
import { IUser } from '@interfaces/user.interface'

const userSchema: Schema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  }
}, {
  timestamps: true
})

const userModel = model<IUser & Document>('User', userSchema)

export default userModel
