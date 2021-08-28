import { FC, useLayoutEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { isValue } from '../../../util/typeGuardUtil'
import { TableQueryPaginationType } from '../model/queryFilters'

type Props = {
  totalPages: number | undefined
}

const PageNavigator: FC<Props> = ({ totalPages }) => {
  const history = useHistory()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const pageFromUrl = queryParams.get(TableQueryPaginationType.PAGE)
  if (!isValue(pageFromUrl) || Number.isNaN(pageFromUrl)) return null

  const [page, setPage] = useState(Number(pageFromUrl))
  const handlePreviousPageClick = () => {
    setPage(old => Math.max(old - 1, 1))
  }
  const handleNextPageClick = () => {
    setPage(old => Math.min(old + 1, Number(totalPages)))
  }

  useLayoutEffect(() => {
    queryParams.set(TableQueryPaginationType.PAGE, String(page))
    history.push(`${location.pathname}?${queryParams.toString()}`)
  }, [page])

  useLayoutEffect(() => {
    if (!Number.isNaN(pageFromUrl) && pageFromUrl !== String(page)) {
      setPage(Number(pageFromUrl))
      queryParams.set(TableQueryPaginationType.PAGE, pageFromUrl)
      history.push(`${location.pathname}?${queryParams.toString()}`)
    }
  }, [pageFromUrl])

  return (
    <div className='p-2 flex items-center'>
      <button onClick={handlePreviousPageClick} disabled={page === 1}>{'<'}</button>
      <div className='m-3'>{`${page} / ${isValue(totalPages) ? totalPages : '?'}`}</div>
      <button onClick={handleNextPageClick} disabled={page === totalPages}>{'>'}</button>
    </div>
  )
}

export default PageNavigator
