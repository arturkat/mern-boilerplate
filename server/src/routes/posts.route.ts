import { Router } from 'express'
import { IRoutes } from '@interfaces/routes.interface'
import PostsController from '@controllers/posts.controller'
import validationMiddleware from '@middlewares/validation.middleware'
import { ValidatePostDto } from '@dtos/post.dto'
import authMiddleware from '@middlewares/auth.middleware'

class PostsRoute implements IRoutes {
  public path = '/api/posts'
  public router = Router()
  public postsController = new PostsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/create-dummy-posts`, authMiddleware, this.postsController.createDummyPosts)
    this.router.delete(`${this.path}/delete-dummy-posts`, authMiddleware, this.postsController.deleteDummyPosts)

    this.router.get(`${this.path}`, this.postsController.getPosts)
    this.router.get(`${this.path}/:id`, this.postsController.getPostById)
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(ValidatePostDto, 'body', true), this.postsController.createPost)
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(ValidatePostDto, 'body', true), this.postsController.updatePost)
    this.router.delete(`${this.path}/:id`, authMiddleware, this.postsController.deletePost)
  }
}

export default PostsRoute