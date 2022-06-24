import {config} from 'dotenv'
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` })

// console.log('test port: ' + process.env.PORT)

export const {
  NODE_ENV,
  PORT,
  ORIGIN,
  CREDENTIALS,
  CLIENT_URL,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_RESET_PASSWORD_SECRET,
  LOG_FORMAT,
  LOG_DIR,
  EMAIL_USER,
  EMAIL_PASS
} = process.env
