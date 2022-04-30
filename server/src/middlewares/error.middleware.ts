import { NextFunction, Request, Response } from 'express'
import { HttpException } from '@exceptions/HttpException'
import { logger } from '@utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  // console.log(`error instanceof Error: `, error instanceof Error)

  try {
    if (error instanceof HttpException) {
      const status: number = error.status || 500
      const message: string = error.message || 'Something went wrong'

      logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`)
      res.status(status).json({message, error: true})
    } else {
      // @ts-ignore
      const message = error?.message || 'Unexpected error'
      logger.error(`[${req.method}] ${req.path} [!!!] >> Message:: ${message}`)
      console.log(error)
      res.status(500).json({message, error: true})
    }
  } catch (error) {
    next(error)
  }
};

export default errorMiddleware
