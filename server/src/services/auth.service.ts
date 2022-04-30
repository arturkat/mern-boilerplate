import bcrypt from 'bcrypt'
import {HttpException} from '@exceptions/HttpException'
import {isEmpty} from '@utils/util'
import {CreateUserDto} from '@dtos/user.dto'
import {IUser} from '@interfaces/user.interface'
import userModel from '@models/users.model'
import TokenService from '@services/token.service'
import {IToken, DataStoredInToken, TokenData} from '@interfaces/token.interface'

class AuthService {
  users = userModel
  tokenService = new TokenService()

  async signUp(userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, 'The user data is empty')

    const findUser: IUser = await this.users.findOne({email: userData.email})
    if (findUser) throw new HttpException(409, `User with such email ${userData.email} already exist`)

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const signUpUserData: IUser = await this.users.create({...userData, password: hashedPassword})

    return signUpUserData
  }

  async logIn(userData: CreateUserDto): Promise<{accessToken: TokenData; refreshToken: TokenData; findUser: IUser}> {
    if (isEmpty(userData)) throw new HttpException(400, 'The user data is empty')

    const findUser: IUser = await this.users.findOne({email: userData.email})
    if (!findUser) throw new HttpException(409, `No User has been found with such email ${userData.email}`)

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password)
    if (!isPasswordMatching) throw new HttpException(409, `You're password not matching`)

    const {accessToken, refreshToken} = this.tokenService.createTokens(findUser)
    const tokenDb: IToken = await this.tokenService.saveRefreshToken(findUser._id, refreshToken.token)

    return { accessToken, refreshToken, findUser }
  }

  async refresh(refreshTokenParam: string): Promise<{accessToken: TokenData; refreshToken: TokenData; findUser: IUser}> {
    if (isEmpty(refreshTokenParam)) throw new HttpException(401, 'Refresh token is empty')

    const dataFromToken = (this.tokenService.validateRefreshToken(refreshTokenParam)) as DataStoredInToken
    if (!dataFromToken) throw new HttpException(401, `Refresh token is invalid`)

    const findTokenDb: IToken = await this.tokenService.findRefreshToken(refreshTokenParam)
    if (!findTokenDb) throw new HttpException(401, `Refresh token can't be found in DB`)

    const findUser: IUser = await this.users.findById(dataFromToken._id)
    if (!findUser) throw new HttpException(401, `Can't find the user using the refresh token data`)

    const {refreshToken, accessToken} = this.tokenService.createTokens(findUser)
    const saveTokenDb: IToken = await this.tokenService.saveRefreshToken(findUser._id, refreshToken.token)

    return { accessToken, refreshToken, findUser }
  }

  async logOut(refreshToken: string): Promise<void> {
    if (!isEmpty(refreshToken)) {
      await this.tokenService.deleteRefreshToken(refreshToken) // { acknowledged: true, deletedCount: 1 }
    }
  }
}

export default AuthService