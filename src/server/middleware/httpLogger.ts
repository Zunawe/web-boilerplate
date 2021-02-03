import { logger } from '../util'
import { RequestHandler } from 'express'
import moment from 'moment'

export const httpLogger: RequestHandler = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const userIdentifier = '-'
  const userId = '-'
  const date = moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')
  const method = req.method
  const path = req.path
  const httpMethod = req.secure ? 'HTTPS' : 'HTTP'
  const httpVersion = req.httpVersion

  res.on('finish', () => {
    const statusCode = res.statusCode
    const size = res.getHeader('content-length') || '-'

    logger.http(`${ip} ${userIdentifier} ${userId} [${date}] "${method} ${path} ${httpMethod}/${httpVersion}" ${statusCode} ${size}`)
  })
  next()
}
