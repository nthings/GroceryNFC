import { getRepository } from 'typeorm'
import { Record } from '../models'

export interface IRecordPayload {
  dateOpened: Date
  dateFinished: Date
  categoryId: number
}

export const getRecords = async (): Promise<Array<Record>> => {
  const recordRepository = getRepository(Record)
  return recordRepository.find()
}

export const createRecord = async (payload: IRecordPayload): Promise<Record> => {
  const recordRepository = getRepository(Record)
  const record = new Record()
  return recordRepository.save({
    ...record,
    ...payload,
  })
}

export const getRecord = async (id: number): Promise<Record | null> => {
  const recordRepository = getRepository(Record)
  const record = await recordRepository.findOne({ id: id })
  if (!record) return null
  return record
}
