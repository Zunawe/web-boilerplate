const { logger } = require('../util')

module.exports = (err, req, res, next) => {
  logger.error(err.stack)
  next()
}
