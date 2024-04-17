import { getRepository } from 'typeorm'
import { Category } from '../models'

export interface ICategoryPayload {
  name: string
  path: string
}

export const getCategories = async (): Promise<Array<Category>> => {
  const categoryRepository = getRepository(Category)
  return categoryRepository.find()
}

export const createCategory = async (payload: ICategoryPayload): Promise<Category> => {
  const categoryRepository = getRepository(Category)
  const category = new Category()
  return categoryRepository.save({
    ...category,
    ...payload,
  })
}

export const getCategory = async (id: number): Promise<Category | null> => {
  const categoryRepository = getRepository(Category)
  const category = await categoryRepository.findOne({ id: id })
  if (!category) return null
  return category
}
