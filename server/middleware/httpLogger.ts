import { logger } from '../util'
import { RequestHandler } from 'express'
import moment from 'moment'

export const httpLogger: RequestHandler = (req, res, next) => {
  const ip = (req.headers['x-forwarded-for'] ?? req.socket.remoteAddress) as string
  const userIdentifier = '-'
  const userId = '-'
  const date = moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')
  const method = req.method
  const path = req.path
  const httpMethod = req.secure ? 'HTTPS' : 'HTTP'
  const httpVersion = req.httpVersion

  res.on('finish', () => {
    const statusCode = res.statusCode.toString()
    const size = (res.getHeader('content-length') ?? '-').toString()

    logger.http(`${ip} ${userIdentifier} ${userId} [${date}] "${method} ${path} ${httpMethod}/${httpVersion}" ${statusCode} ${size}`)
  })
  next()
}
