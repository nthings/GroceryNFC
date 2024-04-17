import express from 'express'
import RecordController from '../controllers/record.controller'

const router = express.Router()

router.get('/', async (_req, res) => {
  const controller = new RecordController()
  const response = await controller.getRecords()
  return res.send(response)
})

router.post('/', async (req, res) => {
  const controller = new RecordController()
  const response = await controller.createRecord(req.body)
  return res.send(response)
})

router.get('/:id', async (req, res) => {
  const controller = new RecordController()
  const response = await controller.getRecord(req.params.id)
  if (!response) res.status(404).send({ message: 'No record found' })
  return res.send(response)
})

export default router
