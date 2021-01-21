const { createLogger, transports, format } = require('winston')

const logger = createLogger({
  format: format.printf((info) => `[${info.level.toUpperCase()}] ${info.message}`),
  transports: [
    new transports.Console()
  ]
})

module.exports = logger
