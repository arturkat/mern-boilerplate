import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import { PORT, NODE_ENV, ORIGIN, LOG_FORMAT, CREDENTIALS, CLIENT_URL } from '@config'
import { IRoutes } from '@interfaces/routes.interface'
import { dbConnection } from '@databases'
import errorMiddleware from '@middlewares/error.middleware'
import routeNotFoundMiddleware from '@middlewares/routeNotFound.middleware'
import { logger, loggerStream } from '@utils/logger'

class App {
  public app: Application
  public env: string
  public port: string | number

  constructor(routes: IRoutes[]) {
    this.app = express()
    this.env = NODE_ENV || 'development'
    this.port = PORT || 8000

    this.connectToDatabase()
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeErrorHandling()
  }

  public getServer() {
    return this.app
  }

  public listen() {
    try {
      this.app.listen(this.port, () => {
        logger.info(`=================================`);
        logger.info(`======= ENV: ${this.env} =======`);
        logger.info(`🚀 App listening on the port ${this.port}`);
        logger.info(`=================================`);
        // console.log(`Connected successfully on port: ${this.port}`)
        // console.log(`NODE_ENV: ${this.env}`)
      })
    } catch(error) {
      console.error(`Error occured: ${error.message}`)
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream: loggerStream }))
    this.app.use(express.json())
    this.app.use(express.urlencoded( { extended: true }))
    this.app.use(cookieParser())
    this.app.use(cors({
      credentials: true,
      origin: [CLIENT_URL]
      // credentials: CREDENTIALS,
    }))
    this.app.use(helmet())
    this.app.use(hpp())
  }

  private initializeRoutes(routes: IRoutes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router)
    })
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(dbConnection.url)
      .then(result => console.log('Connected to DB: ', dbConnection.url))
      .catch(error => console.error('DB connection error: ', error))
  }

  private initializeErrorHandling() {
    this.app.use(routeNotFoundMiddleware)
    this.app.use(errorMiddleware)
  }
}

export default App
