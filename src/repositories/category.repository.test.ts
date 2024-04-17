import * as CategoryRepository from './category.repository'
import { getRepository } from 'typeorm'
import { mocked } from 'ts-jest/utils'
import {
  generateCategoriesData,
  generateCategoryPayload,
  generateCategoryData,
} from 'test/utils/generate'

jest.mock('typeorm')

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}))
beforeEach(() => {
  mockedGetRepo.find.mockClear()
  mockedGetRepo.findOne.mockClear()
  mockedGetRepo.save.mockClear()
})

describe('CategoryRepository', () => {
  describe('getCategories', () => {
    test('should return empty array', async () => {
      mockedGetRepo.find.mockResolvedValue([])
      const categories = await CategoryRepository.getCategories()
      expect(categories).toEqual([])
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })

    test('should return category list', async () => {
      const categoriesData = generateCategoriesData(2)
      mockedGetRepo.find.mockResolvedValue(categoriesData)
      const categories = await CategoryRepository.getCategories()
      expect(categories).toEqual(categoriesData)
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })
  })

  describe('addCategory', () => {
    test('should add category to the database', async () => {
      const payload = generateCategoryPayload()
      const categoryData = generateCategoryData(payload)
      mockedGetRepo.save.mockResolvedValue(categoryData)
      const category = await CategoryRepository.createCategory(payload)
      expect(category).toMatchObject(payload)
      expect(category).toEqual(categoryData)
      expect(mockedGetRepo.save).toHaveBeenCalledWith(payload)
      expect(mockedGetRepo.save).toHaveBeenCalledTimes(1)
    })
  })

  describe('getCategory', () => {
    test('should return category from the database', async () => {
      const id = 1
      const categoryData = generateCategoryData({ id })
      mockedGetRepo.findOne.mockResolvedValue(categoryData)
      const category = await CategoryRepository.getCategory(id)
      expect(category).toEqual(categoryData)
      expect(category?.id).toBe(id)
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({ id })
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })

    test('should return null if category not found', async () => {
      const id = 1
      mockedGetRepo.findOne.mockResolvedValue(null)
      const category = await CategoryRepository.getCategory(id)
      expect(category).toBeNull()
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({ id })
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })
  })
})
