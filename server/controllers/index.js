const path = require('path')

const { logger } = require('../util')

const controller = {
  getIndex: (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '.build', 'index.html'), (err) => {
      logger.error(err)
    })
  }
}

module.exports = controller
