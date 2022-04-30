import { DB_HOST, DB_PORT, DB_DATABASE } from '@config'

export const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  // No longer necessary for mongoose 6.2.8
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
}
