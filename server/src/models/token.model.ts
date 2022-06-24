import {Schema, model, Document} from 'mongoose'
import {IToken} from '@interfaces/token.interface'

const tokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  refreshToken: {
    type: Schema.Types.String,
    required: true
  }
})

const tokenModel = model<IToken & Document>('Token', tokenSchema)

export default tokenModel
