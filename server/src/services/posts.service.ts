import bcrypt from 'bcrypt'
import postModel from '@models/posts.model'
import { IPost } from '@interfaces/post.interface'
import { isEmpty } from '@utils/util'
import { HttpException } from '@exceptions/HttpException'
import { CreatePostDto } from '@dtos/post.dto'
import { IUser } from '@/interfaces/user.interface'

class PostsService {
  public posts = postModel

  public async findAllPosts(): Promise<IPost[]> {
    const posts: IPost[] = await this.posts.find().sort({ createdAt: 'desc'})
    return posts
  }

  public async createPost(postData: CreatePostDto, user: IUser): Promise<IPost> {
    if (isEmpty(postData)) throw new HttpException(400, 'The postData is empty')
    if (isEmpty(user)) throw new HttpException(400, 'The user is empty')

    const createPostData = await this.posts.create({...postData, user: user})

    return createPostData
  }

  public async findPostById(postId: string): Promise<IPost> {
    if (isEmpty(postId)) throw new HttpException(400, 'The post ID is empty')

    const findPost: IPost = await this.posts.findOne({_id: postId})
    if (!findPost) throw new HttpException(409, `Post with such ID ${postId} hasn't been found`)

    return findPost
  }

  public async updatePost(postId:string, postData: CreatePostDto): Promise<IPost> {
    if (isEmpty(postId)) throw new HttpException(400, 'Post ID is empty')
    if (isEmpty(postData)) throw new HttpException(400, 'Post data is empty')

    const findPost: IPost = await this.posts.findOne({_id: postId})
    if (!findPost) throw new HttpException(409, `Post with such ID ${postId} hasn't been found`)

    const updatePostById: IPost = await this.posts.findByIdAndUpdate(postId, postData, {new: true})
    if (!updatePostById) throw new HttpException(409, `Can't update the post data`)

    return updatePostById
  }

  public async deletePost(postId:string): Promise<IPost> {
    if (isEmpty(postId)) throw new HttpException(400, 'The post ID is empty')

    const deletePost: IPost = await this.posts.findByIdAndDelete(postId)
    if (!deletePost) throw new HttpException(409, `Can't find and delete the post by ID ${postId}`)

    return deletePost
  }

  public async createDummyPosts(posts: {title: string, body: string}[], user: IUser): Promise<IPost[]> {
    if (isEmpty(posts)) throw new HttpException(400, 'The posts are empty')
    if (isEmpty(user)) throw new HttpException(400, 'The user is empty')

    let createPostsData: IPost[] = []
    for (const post of posts) {
      const createPostData = await this.posts.create({title: post.title, body: post.body, user: user, isDummy: true})
      createPostsData.push(createPostData)
    }

    return createPostsData
  }

  public async deleteDummyPosts(): Promise<any> {
    const deletePostsResult = await this.posts.deleteMany({isDummy: true}) // { acknowledged: true, deletedCount: 100 }

    return deletePostsResult
  }
}

export default PostsService
