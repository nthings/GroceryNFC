import { Get, Route, Tags, Post, Body, Path } from 'tsoa'
import { Category } from '../models'
import {
  getCategories,
  createCategory,
  ICategoryPayload,
  getCategory,
} from '../repositories/category.repository'

@Route('categories')
@Tags('Category')
export default class CategoryController {
  @Get('/')
  public async getCategories(): Promise<Array<Category>> {
    return getCategories()
  }

  @Post('/')
  public async createCategory(@Body() body: ICategoryPayload): Promise<Category> {
    return createCategory(body)
  }

  @Get('/:id')
  public async getCategory(@Path() id: string): Promise<Category | null> {
    return getCategory(Number(id))
  }
}
