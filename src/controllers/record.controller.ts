import { Get, Route, Tags, Post as RecordMethod, Body, Path } from 'tsoa'
import { Record } from '../models'
import {
  createRecord,
  getRecords,
  IRecordPayload,
  getRecord,
} from '../repositories/record.repository'

@Route('records')
@Tags('Record')
export default class RecordController {
  @Get('/')
  public async getRecords(): Promise<Array<Record>> {
    return getRecords()
  }

  @RecordMethod('/')
  public async createRecord(@Body() body: IRecordPayload): Promise<Record> {
    return createRecord(body)
  }

  @Get('/:id')
  public async getRecord(@Path() id: string): Promise<Record | null> {
    return getRecord(Number(id))
  }
}
