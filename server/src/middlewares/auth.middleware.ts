import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { HttpException } from '@exceptions/HttpException'
import {RequestWithUser} from '@interfaces/auth.interface'
import {DataStoredInToken} from '@interfaces/token.interface'
import {JWT_ACCESS_SECRET} from '@config'
import userModel from '@models/users.model'

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authCookieToken = req.cookies['accessToken'] ? req.cookies['accessToken'] : null
    const authHeaderToken = req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null
    let authToken = authCookieToken || authHeaderToken || null

    // authToken = '0';
    console.log(`-->> authToken: ${authToken}`)

    if (authToken) {
      const verificationResponse = (await jwt.verify(authToken, JWT_ACCESS_SECRET)) as DataStoredInToken
      const userId = verificationResponse._id
      const findUser = await userModel.findById(userId)

      if (findUser) {
        req.user = findUser
        req.authed = true
        next()
      } else {
        next(new HttpException(401, 'Wrong authentication token'))
      }
    } else {
      req.authed = false
      next(new HttpException(401, 'Authentication token missing'))
    }
  } catch(error) {
    req.authed = false
    next(new HttpException(401, 'Wrong authentication token _'))
  }
}

export default authMiddleware
