import express from 'express'
import PingController from '../controllers/ping.controller'
import RecordRouter from './record.router'
import CategoryRouter from './category.router'

const router = express.Router()

router.get('/ping', async (_req, res) => {
  const controller = new PingController()
  const response = await controller.getMessage()
  return res.send(response)
})

router.use('/categories', CategoryRouter)
router.use('/records', RecordRouter)

export default router
