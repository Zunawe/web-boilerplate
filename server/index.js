const path = require('path')
const express = require('express')

const { httpLogger, errorLogger } = require('./middleware')
const { logger } = require('./util')
const indexRouter = require('./routes/index')

logger.info('Starting server')

const PORT = process.env.PORT || 8000
const app = express()

// Hot module replacement setup
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.development.config')

  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath
  }))
  app.use(require('webpack-hot-middleware')(compiler))
}

// Middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', '.build')))

app.use(httpLogger)

app.use('/', indexRouter)

app.use(errorLogger)

// Starting the server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

module.exports = app
