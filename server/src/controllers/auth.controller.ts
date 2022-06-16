import {Request, Response, NextFunction} from 'express'
import {IUser} from '@interfaces/user.interface'
import {RequestWithUser} from '@interfaces/auth.interface'
import {CreateUserDto, ResponseUserDto} from '@dtos/user.dto'
import AuthService from '@services/auth.service'

class AuthController {
  authService = new AuthService

  signUp = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const userData: CreateUserDto = req.body
      const singUpUserData: IUser = await this.authService.signUp(userData)
      const resUserDto = new ResponseUserDto(singUpUserData)

      res.status(201).json({
        data: resUserDto,
        message: 'User signed up'
      })
    } catch (error) {
      console.log(`-->> signUp:`, error)
      next(error)
    }
  }

  logIn = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const userData: CreateUserDto = req.body
      const {accessToken, refreshToken, findUser} = await this.authService.logIn(userData)
      // console.log('findUser:',findUser)
      const resUserDto = new ResponseUserDto(findUser)

      res.cookie('accessToken', accessToken.token, {maxAge: accessToken.expiresIn})
      res.cookie('refreshToken', refreshToken.token, {maxAge: refreshToken.expiresIn, httpOnly: true})
      res.status(200).json({
        data: resUserDto,
        message: 'User logged in'
      })
    } catch (error) {
      next(error)
    }
  }

  logOut = async (req:RequestWithUser, res:Response, next:NextFunction) => {
    try {
      const {refreshToken} = req.cookies
      await this.authService.logOut(refreshToken)

      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')
      res.status(200).json({
        message: 'User logged out'
      })
    } catch (error) {
      next(error)
    }
  }

  refresh = async (req:RequestWithUser, res:Response, next:NextFunction) => {
    try {
      const {refreshToken: refreshTokenFromCookie} = req.cookies
      // console.log(`-->> refreshTokenFromCookie: ${refreshTokenFromCookie}`)
      // console.log(`-->> req.cookies: ${JSON.stringify(req.cookies)}`)
      const {accessToken, refreshToken, findUser} = await this.authService.refresh(refreshTokenFromCookie)
      const resUserDto = new ResponseUserDto(findUser)

      res.cookie('accessToken', accessToken.token, {maxAge: accessToken.expiresIn})
      res.cookie('refreshToken', refreshToken.token, {maxAge: refreshToken.expiresIn, httpOnly: true})
      res.status(200).json({
        data: resUserDto,
        message: 'Token refreshed'
      })
    } catch (error) {
      next(error)
    }
  }

  authed = async (req:RequestWithUser, res:Response, next:NextFunction) => {
    try {
      let resUserDto = null;
      if (req.authed && req.user) {
        resUserDto = new ResponseUserDto(req.user);
      }
      res.status(200).json({
        data: {...resUserDto, authed: !!req.authed},
        message: 'Is user authed',
      })
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController
