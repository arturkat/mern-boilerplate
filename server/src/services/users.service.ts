import bcrypt from 'bcrypt'
import userModel from '@models/users.model'
import { IUser } from '@interfaces/user.interface'
import { isEmpty } from '@utils/util'
import { HttpException } from '@exceptions/HttpException'
import { CreateUserDto } from '@dtos/user.dto'

class UsersService {
  public users = userModel

  public async findAllUsers(): Promise<IUser[]> {
    const users: IUser[] = await this.users.find()
    return users
  }

  public async createUser(userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, 'The userData is empty')

    const findUser: IUser | null = await this.users.findOne({ email: userData.email })
    if (findUser) throw new HttpException(409, `User with such ${userData.email} email already exists`)

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const createUserData = await this.users.create({ ...userData, password: hashedPassword })

    return createUserData
  }

  public async findUserById(userId: string): Promise<IUser> {
    if (isEmpty(userId)) throw new HttpException(400, 'The user ID is empty')

    const findUser: IUser = await this.users.findOne({_id: userId})
    if (!findUser) throw new HttpException(409, `User with such ID ${userId} hasn't been found`)

    return findUser
  }

  public async updateUser(userId:string, userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userId)) throw new HttpException(400, 'User ID is empty')
    if (isEmpty(userData)) throw new HttpException(400, 'User data is empty')

    if (userData.email) {
      const findUser: IUser = await this.users.findOne({email: userData.email})
      if (findUser && String(findUser._id) != userId) throw new HttpException(409, `You're email ${userData.email} already exists`)
    }

    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10)
      userData = {...userData, password: hashedPassword}
    }

    const updateUserById: IUser = await this.users.findByIdAndUpdate(userId, userData, {new: true})
    if (!updateUserById) throw new HttpException(409, `Can't update the user data`)

    return updateUserById
  }

  public async deleteUser(userId:string): Promise<IUser> {
    if (isEmpty(userId)) throw new HttpException(400, 'The user ID is empty')

    const deleteUser: IUser = await this.users.findByIdAndDelete(userId)
    if (!deleteUser) throw new HttpException(409, `Can't find and delete the user by ID ${userId}`)

    return deleteUser
  }
}

export default UsersService
