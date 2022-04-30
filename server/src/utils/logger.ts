import path from 'path'
import {existsSync, mkdirSync} from 'fs'
import winston from 'winston'
import winstonDaily from 'winston-daily-rotate-file'
import {LOG_DIR} from '@config'

// logs dir
const logDir: string = path.join(__dirname, LOG_DIR)

if (!existsSync(logDir)) {
  mkdirSync(logDir)
}

// Define log format
const logFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: '!' }),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    logFormat
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/debug', // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 days saved
      json: false,
      zippedArchive: true
    }),
    // error log settings
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    })
  ]
})

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize())
  })
)

const loggerStream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')))
  }
}

export { logger, loggerStream }
