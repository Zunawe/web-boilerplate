import path from 'path'
import express from 'express'
import helmet from 'helmet'

import { httpLogger, errorLogger } from './middleware'
import { logger } from './util'
import indexRouter from './routes/index'

const init = async (): Promise<void> => {
  logger.info('Starting server')

  const PORT = process.env.PORT ?? '8000'
  const app = express()

  // Hot module replacement setup
  if (process.env.NODE_ENV === 'development') {
    const webpack = (await import('webpack')).default
    const webpackConfig = (await import(path.join(process.cwd(), 'webpack.dev'))).default

    const compiler = webpack(webpackConfig)

    const webpackDevMiddleware = (await import('webpack-dev-middleware')).default
    app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath
    }))

    const webpackHotMiddleware = (await import('webpack-hot-middleware')).default
    app.use(webpackHotMiddleware(compiler))
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
}

init()
  .then(() => { })
  .catch((error) => { throw error })
