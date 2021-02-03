import { logger } from '../util'
import { ErrorRequestHandler } from 'express'

export const errorLogger: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err.stack)
  next()
}
