import RecordController from './record.controller'
import * as RecordRepository from '../repositories/record.repository'
import {
  generateRecordsData,
  generateRecordPayload,
  generateRecordData,
} from 'test/utils/generate'

afterEach(() => {
  jest.resetAllMocks()
})

describe('RecordController', () => {
  describe('getRecords', () => {
    test('should return empty array', async () => {
      const spy = jest
        .spyOn(RecordRepository, 'getRecords')
        .mockResolvedValueOnce([])
      const controller = new RecordController()
      const records = await controller.getRecords()
      expect(records).toEqual([])
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should return records list', async () => {
      const recordsData = generateRecordsData(2)
      const spy = jest
        .spyOn(RecordRepository, 'getRecords')
        .mockResolvedValueOnce(recordsData)
      const controller = new RecordController()
      const records = await controller.getRecords()
      expect(records).toEqual(recordsData)
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('createRecord', () => {
    test('should add record to the database', async () => {
      const payload = generateRecordPayload()
      const recordData = generateRecordData(payload)
      const spy = jest
        .spyOn(RecordRepository, 'createRecord')
        .mockResolvedValueOnce(recordData)
      const controller = new RecordController()
      const record = await controller.createRecord(payload)
      expect(record).toMatchObject(payload)
      expect(record).toEqual(recordData)
      expect(spy).toHaveBeenCalledWith(payload)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('getRecord', () => {
    test('should return record from the database', async () => {
      const id = 1
      const recordData = generateRecordData({ id })
      const spy = jest
        .spyOn(RecordRepository, 'getRecord')
        .mockResolvedValueOnce(recordData)
      const controller = new RecordController()
      const record = await controller.getRecord(id.toString())
      expect(record).toEqual(recordData)
      expect(record?.id).toBe(id)
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should return null if record not found', async () => {
      const id = 1
      const spy = jest
        .spyOn(RecordRepository, 'getRecord')
        .mockResolvedValueOnce(null)
      const controller = new RecordController()
      const record = await controller.getRecord(id.toString())
      expect(record).toBeNull()
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
