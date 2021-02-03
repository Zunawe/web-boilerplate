import path from 'path'
import express from 'express'
import helmet from 'helmet'

import { httpLogger, errorLogger } from './middleware'
import { logger } from './util'
import indexRouter from './routes/index'

logger.info('Starting server')

const PORT = process.env.PORT || 8000
const app = express()

// Hot module replacement setup
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackConfig = require(path.join(process.cwd(), 'webpack.development.config'))

  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath
  }))
  app.use(require('webpack-hot-middleware')(compiler))
}

// Middlewares
if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
}

app.use(express.json())
app.use(express.static(path.join(process.cwd(), '.build', 'client')))

app.use(httpLogger)

app.use('/', indexRouter)

app.use(errorLogger)

// Starting the server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

module.exports = app
