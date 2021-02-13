import express from 'express'

import { root as controller } from '../controllers'

const router = express.Router()

router.get('/', controller.get)

export { router }
