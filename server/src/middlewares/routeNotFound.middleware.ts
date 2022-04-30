import {Request, Response, NextFunction } from 'express'
import { HttpException } from '@exceptions/HttpException'

const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({message: 'Route Not Found', error: true})
};

export default routeNotFound
