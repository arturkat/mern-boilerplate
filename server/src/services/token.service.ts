import jwt from 'jsonwebtoken'
import {IUser} from '@interfaces/user.interface'
import {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} from '@config'
import userModel from '@models/users.model'
import tokenModel from '@models/token.model'
import {HttpException} from '@exceptions/HttpException'
import {IToken, DataStoredInToken, TokenData} from '@interfaces/token.interface'

class TokenService {

  createTokens(user: IUser): {accessToken: TokenData, refreshToken: TokenData} {
    const dataStoredInToken: DataStoredInToken = { _id: String(user._id) }
    const accessTokenExpiresIn: number = 60 * 60 * 1000 // 60 * 60sec
    const refreshTokenExpiresIn: number = 30 * 24 * 60 * 60 * 1000 // 30d

    const accessToken = jwt.sign(dataStoredInToken, JWT_ACCESS_SECRET, {expiresIn: accessTokenExpiresIn + 'ms'})
    const refreshToken = jwt.sign(dataStoredInToken, JWT_REFRESH_SECRET, {expiresIn: refreshTokenExpiresIn + 'ms'})

    return {
      accessToken: {
        token: accessToken,
        expiresIn: accessTokenExpiresIn
      },
      refreshToken: {
        token: refreshToken,
        expiresIn: refreshTokenExpiresIn
      }
    }
  }

  validateAccessToken(accessToken: string) {
    try {
      const userData = jwt.verify(accessToken, JWT_ACCESS_SECRET); // throws an error is invalid
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const userData = jwt.verify(refreshToken, JWT_REFRESH_SECRET); // throws an error is invalid
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<IToken> {
    const user = await userModel.findById(userId)
    if (!user) throw new HttpException(409, `Can't find the user`)

    let tokenDb = await tokenModel.findOne({user: user._id})
    if (tokenDb) {
      tokenDb.refreshToken = refreshToken
      await tokenDb.save()
      return tokenDb
    }

    tokenDb = await tokenModel.create({user, refreshToken})
    if (!tokenDb) throw new HttpException(500, `Can't create a token`)

    return tokenDb
  }

  async deleteRefreshToken(refreshToken: string) {
    const tokenData = await tokenModel.deleteOne({refreshToken})
    return tokenData;
  }

  async findRefreshToken(refreshToken: string) {
    const tokenData = await tokenModel.findOne({refreshToken})
    return tokenData;
  }

  // createAccessToken(user: IUser): TokenData {
  //   const dataStoredInToken: DataStoredInToken = { _id: user._id }
  //   const expiresIn: number = 30 * 24 * 60 * 60 * 1000
  //
  //   const token = jwt.sign(dataStoredInToken, JWT_ACCESS_SECRET, { expiresIn })
  //
  //   return { token, expiresIn }
  // }
}

export default TokenService
