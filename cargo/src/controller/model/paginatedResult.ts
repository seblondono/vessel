export type PaginatedResult<T> = {
  page: number
  pageSize: number
  totalPages: number
  totalEntries: number
  entries: T[]
}
