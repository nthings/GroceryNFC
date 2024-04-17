import * as RecordRepository from './record.repository'
import { getRepository } from 'typeorm'
import { mocked } from 'ts-jest/utils'
import {
  generateRecordsData,
  generateRecordPayload,
  generateRecordData,
} from 'test/utils/generate'

jest.mock('typeorm')

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}))
beforeEach(() => {
  mockedGetRepo.find.mockClear()
  mockedGetRepo.findOne.mockClear()
  mockedGetRepo.save.mockClear()
})

describe('RecordRepository', () => {
  describe('getRecords', () => {
    test('should return empty array', async () => {
      mockedGetRepo.find.mockResolvedValue([])
      const records = await RecordRepository.getRecords()
      expect(records).toEqual([])
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })

    test('should return records list', async () => {
      const recordsData = generateRecordsData(2)
      mockedGetRepo.find.mockResolvedValue(recordsData)
      const records = await RecordRepository.getRecords()
      expect(records).toEqual(recordsData)
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })
  })

  describe('createRecord', () => {
    test('should add record to the database', async () => {
      const payload = generateRecordPayload()
      const recordData = generateRecordData(payload)
      mockedGetRepo.save.mockResolvedValue(recordData)
      const record = await RecordRepository.createRecord(payload)
      expect(record).toMatchObject(payload)
      expect(record).toEqual(recordData)
      expect(mockedGetRepo.save).toHaveBeenCalledWith(payload)
      expect(mockedGetRepo.save).toHaveBeenCalledTimes(1)
    })
  })

  describe('getRecord', () => {
    test('should return record from the database', async () => {
      const id = 1
      const recordData = generateRecordData({ id })
      mockedGetRepo.findOne.mockResolvedValue(recordData)
      const record = await RecordRepository.getRecord(id)
      expect(record).toEqual(recordData)
      expect(record?.id).toBe(id)
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({ id })
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })

    test('should return null if record not found', async () => {
      const id = 1
      mockedGetRepo.findOne.mockResolvedValue(null)
      const record = await RecordRepository.getRecord(id)
      expect(record).toBeNull()
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({ id })
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })
  })
})
