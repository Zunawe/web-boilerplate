import path from 'path'
import express from 'express'
import helmet from 'helmet'

import { httpLogger, errorLogger } from './middleware'
import { logger } from './util'
import indexRouter from './routes/index'

logger.info('Starting server')

const PORT = process.env.PORT ?? '8000'
const app = express()

// Hot module replacement setup
if (process.env.NODE_ENV === 'development') {
  import('webpack').then((webpack) => {
    import(path.join(process.cwd(), 'webpack.development.config')).then((webpackConfig) => {
      const compiler = webpack.default(webpackConfig.default)

      import('webpack-dev-middleware')
        .then((webpackDevMiddleware) => {
          app.use(webpackDevMiddleware.default(compiler, {
            publicPath: webpackConfig.output.publicPath
          }))
        })
        .then(async () => await import('webpack-hot-middleware'))
        .then((webpackHotMiddleware) => {
          app.use(webpackHotMiddleware.default(compiler))
        })
        .catch(() => {})
    })
      .catch(() => {})
  })
    .catch(() => {})
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
