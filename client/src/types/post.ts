
export interface IPostRequest {
  title: string
  body?: string
}

export interface IPostResponse {
  _id: string
  userId: string
  title: string
  body?: string
  isDummy?: boolean
}
