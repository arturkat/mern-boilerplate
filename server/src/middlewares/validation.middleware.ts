import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { RequestHandler } from 'express'
import { HttpException } from '@exceptions/HttpException'

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist: boolean = true,
  forbidNonWhitelisted: boolean = true,
): RequestHandler => {
  return (req, res, next) => {
    const validationInstance = plainToInstance(type, req[value])
    const validationResult: Promise<any> = validate(validationInstance, { skipMissingProperties, whitelist, forbidNonWhitelisted })
    validationResult.then((errors) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ')
        next(new HttpException(400, message))
      } else {
        next()
      }
    })
  }
}

export default validationMiddleware
