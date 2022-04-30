import { Router } from 'express'
import { IRoutes } from '@interfaces/routes.interface'
import UsersController from '@controllers/users.controller'
import validationMiddleware from '@middlewares/validation.middleware'
import { ValidateUserDto } from '@dtos/user.dto'

class UsersRoute implements IRoutes {
  public path = '/api/users'
  public router = Router()
  public usersController = new UsersController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers)
    this.router.get(`${this.path}/:id`, this.usersController.getUserById)
    this.router.post(`${this.path}`, validationMiddleware(ValidateUserDto, 'body'), this.usersController.createUser)
    this.router.put(`${this.path}/:id`, validationMiddleware(ValidateUserDto, 'body', true), this.usersController.updateUser)
    this.router.delete(`${this.path}/:id`, this.usersController.deleteUser)
  }
}

export default UsersRoute