import {IUser} from '@interfaces/user.interface'

// DB interface
export interface IToken {
  user: IUser,
  refreshToken: string
}

export interface TokenData {
  token: string
  expiresIn: number
}

export interface DataStoredInToken {
  _id: string
}
