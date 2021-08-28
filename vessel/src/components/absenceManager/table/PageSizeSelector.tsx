import { ChangeEvent, FC, useLayoutEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { isValue } from '../../../util/typeGuardUtil'
import { TableQueryPaginationType } from '../model/queryFilters'

const PageSizeSelector: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const pageSizeFromUrl = queryParams.get(TableQueryPaginationType.PAGE_SIZE)
  if (!isValue(pageSizeFromUrl) || Number.isNaN(pageSizeFromUrl)) return null

  const [pageSize, setPageSize] = useState(Number(pageSizeFromUrl))
  const handlePageSizeChange = (ev: ChangeEvent<HTMLSelectElement>) => setPageSize(Number(ev.target.value))

  useLayoutEffect(() => {
    queryParams.set(TableQueryPaginationType.PAGE, '1')
    queryParams.set(TableQueryPaginationType.PAGE_SIZE, String(pageSize))
    history.push(`${location.pathname}?${queryParams.toString()}`)
  }, [pageSize])

  return (
    <div className='p-2 flex items-center'>
      <p>Page Size</p>
      <select className='ml-3 p-1 border' onChange={handlePageSizeChange}>
        <option value={10} selected={pageSize === 10}>10</option>
        <option value={30} selected={pageSize === 30}>30</option>
        <option value={50} selected={pageSize === 50}>50</option>
      </select>
    </div>
  )
}

export default PageSizeSelector
