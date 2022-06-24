import { model, Schema, Document } from 'mongoose'
import { IPost } from '@interfaces/post.interface'

const postSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: Schema.Types.String,
    required: true,
  },
  body: {
    type: Schema.Types.String
  },
  isDummy: {
    type: Schema.Types.Boolean,
    default: false
  },
}, {
  timestamps: true
})

const postModel = model<IPost & Document>('Post', postSchema)

export default postModel
