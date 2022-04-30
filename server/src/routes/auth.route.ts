import {IRoutes} from "@interfaces/routes.interface"
import {Router} from "express"
import AuthController from "@controllers/auth.controller"
import validationMiddleware from '@middlewares/validation.middleware'
import authMiddleware from '@middlewares/auth.middleware'
import { ValidateUserDto} from '@dtos/user.dto'

class AuthRoute implements IRoutes {
  public path = '/api'
  public router = Router()
  public authController = new AuthController()

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/signup`, validationMiddleware(ValidateUserDto, 'body'), this.authController.signUp)
    this.router.post(`${this.path}/login`, validationMiddleware(ValidateUserDto, 'body'), this.authController.logIn)
    this.router.post(`${this.path}/logout`, this.authController.logOut)
    this.router.post(`${this.path}/authed`, authMiddleware, this.authController.authed)
    this.router.post(`${this.path}/refresh`, this.authController.refresh)
  }
}

export default AuthRoute
