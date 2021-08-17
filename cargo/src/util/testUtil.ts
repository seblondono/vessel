import assert from 'assert'

export const everyItemContainsKey = <T>(key: string) => (collection: T[]) =>
  collection.forEach(item => assert(Object.keys(item).includes(key)))
