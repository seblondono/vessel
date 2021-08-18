import assert from 'assert'
import { isValue } from './typeGuardUtil'

export const everyItemContainsKey = <T>(key: string) => (collection: T[]): void =>
  collection.forEach(item => assert(Object.keys(item).includes(key)))

export const everyKeyHasValue = <T>(key: keyof T) => (collection: T[]): void =>
  collection.forEach(item => assert(isValue(item[key])))
