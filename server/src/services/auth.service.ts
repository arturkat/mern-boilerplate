import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import {HttpException} from '@exceptions/HttpException'
import {isEmpty} from '@utils/util'
import {CreateUserDto} from '@dtos/user.dto'
import {IUser} from '@interfaces/user.interface'
import userModel from '@models/users.model'
import TokenService from '@services/token.service'
import {IToken, DataStoredInToken, TokenData} from '@interfaces/token.interface'
import {EMAIL_USER, EMAIL_PASS, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_RESET_PASSWORD_SECRET} from '@config'
import jwt from 'jsonwebtoken'
import {IPost} from '@interfaces/post.interface'

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
    const tokenDb: IToken = await this.tokenService.saveRefreshToken(String(findUser._id), refreshToken.token)

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
    const saveTokenDb: IToken = await this.tokenService.saveRefreshToken(String(findUser._id), refreshToken.token)

    return { accessToken, refreshToken, findUser }
  }

  async logOut(refreshToken: string): Promise<void> {
    if (!isEmpty(refreshToken)) {
      await this.tokenService.deleteRefreshToken(refreshToken) // { acknowledged: true, deletedCount: 1 }
    }
  }

  async resetPassword(email: string): Promise<void> {
    if (isEmpty(email)) throw new HttpException(409, `Email is empty`)

    const findUser: IUser = await this.users.findOne({email: email})
    if (!findUser) throw new HttpException(409, `No User has been found with such email ${email}`)

    const dataStoredInToken: DataStoredInToken = { _id: String(findUser._id) }
    const resetPasswordTokenExpiresIn: number = 60 * 60 * 1000 // 60 * 60sec
    const resetPasswordToken = jwt.sign(dataStoredInToken, JWT_RESET_PASSWORD_SECRET, {expiresIn: resetPasswordTokenExpiresIn + 'ms'})
    // console.log('-->> resetPasswordToken', resetPasswordToken)

    let resetLink = `http://localhost:8000/api/confirm-password-reset/${resetPasswordToken}`
    let emailContent = `
      <p>Do you want to reset your password?</p>
      <p>Press on this link below:</p>
      <a href="${resetLink}">${resetLink}</a>
    `

    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: String(EMAIL_USER),
        pass: String(EMAIL_PASS), // Gmail password for application
      },
    })
    let mailOptions = {
      from: `"MERN App" <mernapp@example.com>`,
      to: email,
      subject: `Reset Password`,
      html: emailContent,
    }
    let info = await transporter.sendMail(mailOptions);
    // console.log('==>> info:', info);
  }

  async confirmPasswordReset(token: string): Promise<void> {
    if (isEmpty(token)) throw new HttpException(409, `Token is empty`)

    const tokenData = (await jwt.verify(token, JWT_RESET_PASSWORD_SECRET)) as DataStoredInToken
    const userId = tokenData._id
    const findUser = await this.users.findById(userId)
    if (!findUser) throw new HttpException(409, `The user wasn't found`)

    const newPassword = Math.random().toString(36).slice(-8)
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUser: IUser = await this.users.findByIdAndUpdate(userId, {password: hashedPassword}, {new: true})
    if (!updatedUser) throw new HttpException(409, `Can't update the user's data`)

    let emailContent = `
      <p>Here is your new password: ${newPassword}</p>
    `
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: String(EMAIL_USER),
        pass: String(EMAIL_PASS), // Gmail password for application
      },
    })
    let mailOptions = {
      from: `"MERN App" <mernapp@example.com>`,
      to: updatedUser.email,
      subject: `New Password`,
      html: emailContent,
    }
    let info = await transporter.sendMail(mailOptions);
    // console.log('==>> info:', info);
  }

}

export default AuthService