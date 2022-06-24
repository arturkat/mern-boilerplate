import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator'

// For validation middleware
export type CreatePostDto = {
  title: string
  body: string
}

export class ValidatePostDto {
  @IsString()
  @IsNotEmpty()
  public title: string

  @IsString()
  public body: string
}

// For sending in response
export class ResponsePostDto {
  public _id: string
  public userId: string
  public title: string
  public body: string
  public isDummy: boolean

  constructor(model) {
    this._id = model._id
    this.userId = model.user._id
    this.title = model.title
    this.body = model.body
    this.isDummy = !!model.isDummy
  }
}
