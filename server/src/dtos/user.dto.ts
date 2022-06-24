import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator'

export type CreateUserDto = {
  email: string
  password: string
}

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

export type ResetPasswordDto = {
  email: string
}

// For validation middleware
export class ValidateResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string
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
