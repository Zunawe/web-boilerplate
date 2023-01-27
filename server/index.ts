import path from 'path'
import express from 'express'
import helmet from 'helmet'

import { httpLogger, errorLogger } from './middleware'
import { logger } from './util'
import * as routes from './routes'

const init = async (): Promise<void> => {
  logger.info('Starting server')

  const PORT = process.env.PORT ?? '8000'
  const app = express()

  // Middlewares
  if (process.env.NODE_ENV === 'production') {
    app.use(helmet())
  }

  app.use(httpLogger)

  // Hot module replacement
  if (process.env.NODE_ENV === 'development') {
    try {
      const webpack = (await import('webpack')).default
      const webpackConfig = (await import(path.join(process.cwd(), 'webpack.dev'))).default

      const compiler = webpack(webpackConfig)

      const webpackDevMiddleware = (await import('webpack-dev-middleware')).default
      // I haven't yet figured out what's triggering eslint here or how to make it happy
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: 'errors-only',
        writeToDisk: true // Otherwise Express can't find and send index.html
      }))

      const webpackHotMiddleware = (await import('webpack-hot-middleware')).default
      app.use(webpackHotMiddleware(compiler, {
        log: false,
        path: '/__webpack_hmr'
      }))
    } catch (error: any) {
      logger.error('Couldn\'t load webpack hot module replacement. Did you mean to run in production mode?')
    }
  }

  app.use(express.json())
  app.use('/static', express.static(path.join(process.cwd(), 'dist', 'client')))

  // Routes
  app.use('/', routes.root)

  app.use(errorLogger)

  // Starting the server
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
}

init()
  .then(() => { })
  .catch((error) => { throw error })
