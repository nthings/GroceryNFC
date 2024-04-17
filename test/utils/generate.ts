import faker from 'faker'
import { Category } from '../../src/models';

export function generateCategoryData(overide = {}) {
  return {
    id: faker.random.number(),
    name: faker.lorem.word(),
    path: faker.lorem.word(),
    records: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCategoriesData(n: number = 1) {
  return Array.from({
    length: n
  }, (_, i) => {
    return generateCategoryData()
  });
}

export function generateCategoryPayload() {
  return {
    name: faker.lorem.word(),
    path: faker.lorem.word(),
  }
}

export function generateRecordData(overide = {}) {
  return {
    id: faker.random.number(),
    dateOpened: new Date(),
    dateFinished: new Date(),
    categoryId: faker.random.number(),
    category: new Category(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateRecordsData(n: number = 1, overide = {}) {
  return Array.from({
    length: n
  }, (_, i) => {
    return generateRecordData(overide)
  });
}

export function generateRecordPayload() {
  return {
    dateOpened: new Date(),
    dateFinished: new Date(),
    categoryId: faker.random.number(),
  }
}