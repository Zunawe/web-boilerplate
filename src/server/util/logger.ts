import { createLogger, transports, format, Logger } from 'winston'

export const logger: Logger = createLogger({
  level: ['development', 'test'].includes(process.env.NODE_ENV ?? '') ? 'debug' : 'http',
  format: format.printf((info) => `[${info.level.toUpperCase()}] ${info.message}`),
  transports: [
    new transports.Console()
  ]
})
