import { Request, Response, NextFunction } from 'express'
import { IPost } from '@interfaces/post.interface'
import PostsService from '@services/posts.service'
import { CreatePostDto, ResponsePostDto } from '@dtos/post.dto'
import {RequestWithUser} from '@interfaces/auth.interface'
import {ResponseUserDto} from '@dtos/user.dto'
import {IUser} from '@interfaces/user.interface'
import userModel from '@models/users.model'
import {HttpException} from '@exceptions/HttpException'
import UsersService from '@services/users.service'
import axios from 'axios'

class PostsController {
  public postsService = new PostsService()
  public usersService = new UsersService()

  public getPosts = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const posts: IPost[] = await this.postsService.findAllPosts()
      const postsResDto = posts.map(post => new ResponsePostDto(post))

      res.status(200).json({
        data: postsResDto,
        message: 'Find all posts'
      })
    } catch(error) {
      next(error)
    }
  }

  public getPostById = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const postId: string = req.params.id

      const post: IPost = await this.postsService.findPostById(postId)
      const postResDto = new ResponsePostDto(post)

      res.status(200).json({
        data: postResDto,
        message: 'Find post by id'
      })
    } catch(error) {
      next(error)
    }
  }

  public createPost = async (req:RequestWithUser, res:Response, next:NextFunction) => {
    try {
      const postData: CreatePostDto = req.body
      const user: IUser = req.user

      const post: IPost = await this.postsService.createPost(postData, user)
      const postResDto = new ResponsePostDto(post)

      res.status(201).json({
        data: postResDto,
        message: 'Post has been created'
      })
    } catch(error) {
      next(error)
    }
  }

  public updatePost = async (req:RequestWithUser, res:Response, next:NextFunction) => {
    try {
      const postId: string = req.params.id
      const postData: CreatePostDto = req.body
      const user: IUser = req.user

      const post: IPost = await this.postsService.findPostById(postId)
      if (String(user._id) !== String(post.user._id)) throw new HttpException(409, `You aren't the owner of this post`)

      const newPost: IPost = await this.postsService.updatePost(postId, postData)
      const newPostResDto = new ResponsePostDto(newPost)

      res.status(200).json({
        data: newPostResDto,
        message: 'Post has been updated'
      })
    } catch(error) {
      next(error)
    }
  }

  public deletePost = async (req:RequestWithUser, res:Response, next:NextFunction) => {
    try {
      const postId: string = req.params.id
      const user: IUser = req.user

      // Only owner can remove the post
      // const post: IPost = await this.postsService.findPostById(postId)
      // if (String(user._id) !== String(post.user._id)) throw new HttpException(409, `You aren't the owner of this post`)

      const deletedPost: IPost = await this.postsService.deletePost(postId)
      const deletedPostResDto = new ResponsePostDto(deletedPost)

      res.status(200).json({
        data: deletedPostResDto,
        message: 'Post has been deleted'
      })
    } catch(error) {
      next(error)
    }
  }

  public createDummyPosts = async (req:RequestWithUser, res:Response, next:NextFunction) => {
    try {
      const user: IUser = req.user

      const dummyPostsResponse: any = await axios.get(`https://jsonplaceholder.typicode.com/posts`)

      const dummyPostsAdded: IPost[] = await this.postsService.createDummyPosts(dummyPostsResponse.data, user)

      const dummyPostsResDto = dummyPostsAdded.map(post => new ResponsePostDto(post))

      res.status(201).json({
        data: dummyPostsResDto,
        message: 'Post has been created'
      })
    } catch(error) {
      next(error)
    }
  }

  public deleteDummyPosts = async (req:RequestWithUser, res:Response, next:NextFunction) => {
    try {
      const user: IUser = req.user

      const dummyPostsDeleteResult: {acknowledged: boolean, deletedCount: number} = await this.postsService.deleteDummyPosts()

      res.status(200).json({
        data: dummyPostsDeleteResult,
        message: 'Posts has been deleted'
      })
    } catch(error) {
      next(error)
    }
  }

}

export default PostsController
