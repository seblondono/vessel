import { PaginatedResult } from '../controller/model/paginatedResult'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 10

const paginateCollection = <T>(
  collection: T[], page: number = DEFAULT_PAGE, pageSize: number = DEFAULT_PAGE_SIZE): PaginatedResult<T> => {
  const pageEntriesStartIndex = (page - 1) * pageSize
  const pageEntriesEndIndex = page * pageSize
  const entries = collection.slice(pageEntriesStartIndex, pageEntriesEndIndex)
  const totalEntries = collection.length
  const totalPages = Math.ceil(totalEntries / pageSize)

  return {
    page,
    pageSize,
    totalPages,
    totalEntries,
    entries,
  }
}

export default paginateCollection
