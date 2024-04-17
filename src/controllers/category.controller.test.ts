import CategoryController from './category.controller'
import * as CategoryRepository from '../repositories/category.repository'
import {
  generateCategoriesData,
  generateCategoryPayload,
  generateCategoryData,
} from 'test/utils/generate'

afterEach(() => {
  jest.resetAllMocks()
})

describe('CategoryController', () => {
  describe('getCategories', () => {
    test('should return empty array', async () => {
      const spy = jest
        .spyOn(CategoryRepository, 'getCategories')
        .mockResolvedValueOnce([])
      const controller = new CategoryController()
      const categories = await controller.getCategories()
      expect(categories).toEqual([])
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should return category list', async () => {
      const categoriesData = generateCategoriesData(2)
      const spy = jest
        .spyOn(CategoryRepository, 'getCategories')
        .mockResolvedValueOnce(categoriesData)
      const controller = new CategoryController()
      const categories = await controller.getCategories()
      expect(categories).toEqual(categoriesData)
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('addCategory', () => {
    test('should add category to the database', async () => {
      const payload = generateCategoryPayload()
      const categoryData = generateCategoryData(payload)
      const spy = jest
        .spyOn(CategoryRepository, 'createCategory')
        .mockResolvedValueOnce(categoryData)
      const controller = new CategoryController()
      const category = await controller.createCategory(payload)
      expect(category).toMatchObject(payload)
      expect(category).toEqual(categoryData)
      expect(spy).toHaveBeenCalledWith(payload)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('getCategory', () => {
    test('should return category from the database', async () => {
      const id = 1
      const categoryData = generateCategoryData({ id })
      const spy = jest
        .spyOn(CategoryRepository, 'getCategory')
        .mockResolvedValueOnce(categoryData)
      const controller = new CategoryController()
      const category = await controller.getCategory(id.toString())
      expect(category).toEqual(categoryData)
      expect(category?.id).toBe(id)
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should return null if category not found', async () => {
      const id = 1
      const spy = jest
        .spyOn(CategoryRepository, 'getCategory')
        .mockResolvedValueOnce(null)
      const controller = new CategoryController()
      const category = await controller.getCategory(id.toString())
      expect(category).toBeNull()
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
