import express from 'express'
const router = express.Router()

import * as controller from '../controllers/index'

router.get('/', controller.get)

export default router
