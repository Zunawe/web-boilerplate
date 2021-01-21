const morgan = require('morgan')
const { logger } = require('../util')

const stream = {
  write: (message) => logger.info(message.substring(0, message.lastIndexOf('\n')))
}
let format = 'combined'

if (process.env.NODE_ENV === 'development') {
  format = 'dev'
}

module.exports = morgan(format, { stream })
