import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator'
import {IUser} from '@interfaces/user.interface'

// For validation middleware
export class ValidateUserDto {
  @IsEmail()
  public email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  public password: string
}

// For sending in response
export class ResponseUserDto {
  public email: string
  public _id: string

  constructor(model) {
    this.email = model.email
    this._id = model._id
  }
}

// For type purpose
export class CreateUserDto {
  constructor (
    public email: string,
    public password: string
  ) {}
}
