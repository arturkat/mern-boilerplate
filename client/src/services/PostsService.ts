import $api from '@/http'
import { IPostRequest } from '@/types/post'

class AuthService {
  static async getPosts() {
    return await $api.get('/posts')
  }

  static async getPostById(id: string) {
    return await $api.get(`/posts/:id`)
  }

  static async createPost(post: IPostRequest) {
    return await $api.post('/posts', {...post})
  }

  static async updatePost(post: IPostRequest) {
    return await $api.put('/posts', {...post})
  }

  static async deletePost(id: string) {
    // debugger
    return await $api.delete(`/posts/${id}`)
  }
}

export default AuthService
