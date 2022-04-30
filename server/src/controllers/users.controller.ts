import { Request, Response, NextFunction } from 'express'
import { IUser } from '@interfaces/user.interface'
import UsersService from '@services/users.service'
import { CreateUserDto } from '@dtos/user.dto'

class UsersController {
  public usersService = new UsersService()

  public getUsers = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const findAllUsersData: IUser[] = await this.usersService.findAllUsers()

      res.status(200).json({data: findAllUsersData, message: 'Find all users'})
    } catch(error) {
      next(error)
    }
  }

  public getUserById = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const userId: string = req.params.id
      const findOneUserData: IUser = await this.usersService.findUserById(userId)

      res.status(200).json({data: findOneUserData, message: 'Find user by id'})
    } catch(error) {
      next(error)
    }
  }

  public createUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const userData: CreateUserDto = req.body
      const createUserData: IUser = await this.usersService.createUser(userData)

      res.status(201).json({data: createUserData, message: 'User has been created'})
    } catch(error) {
      next(error)
    }
  }

  public updateUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const userId: string = req.params.id
      const userData: CreateUserDto = req.body
      const updateUserData: IUser = await this.usersService.updateUser(userId, userData)

      res.status(200).json({data: updateUserData, message: 'User has been updated'})
    } catch(error) {
      next(error)
    }
  }

  public deleteUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const userId: string = req.params.id
      const deleteUserData: IUser = await this.usersService.deleteUser(userId)

      res.status(200).json({data: deleteUserData, message: 'User has been deleted'})
    } catch(error) {
      next(error)
    }
  }
}

export default UsersController
