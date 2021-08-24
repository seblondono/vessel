import { ChangeEvent, FC, useLayoutEffect, useState } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { Routes } from '../../Routes'
import useQueryAbsences from './queries/useQueryAbsences'
import PageInformation from './table/PageInformation'
import PageNavigator from './table/PageNavigator'
import PageSizeSelector from './table/PageSizeSelector'
import Table from './table/Table'

const AbsenceManager: FC = () => {
  // region fetch data
  const absences = useQueryAbsences()
  // endregion

  // region table page and page size state
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)

  const handlePageSizeChange = (ev: ChangeEvent<HTMLSelectElement>) => setPageSize(Number(ev.target.value))
  const handlePreviousPageClick = () => {
    setPage(old => Math.max(old - 1, 1))
  }
  const handleNextPageClick = () => {
    const totalPages = absences.data?.totalPages
    setPage(old => Math.min(old + 1, Number(totalPages)))
  }
  // endregion

  // region handle table search query
  const location = useLocation()
  const history = useHistory()
  const searchQuery = `${Routes.ABSENCE_MANAGER}?page=${page}&pageSize=${pageSize}`

  useLayoutEffect(() => {
    history.push(searchQuery)
  }, [page, pageSize])

  if (location.search === '') {
    return <Redirect to={searchQuery} />
  }
  // endregion

  return (
    <div className='h-full overflow-auto p-8'>
      <section className='flex justify-between items-center'>
        <PageInformation
          page={page}
          pageSize={pageSize}
          totalEntries={absences.data?.totalEntries}
        />
        <div className='flex justify-between items-center'>
          <PageNavigator
            page={page}
            totalPages={absences.data?.totalPages}
            handleNextPageClick={handleNextPageClick}
            handlePreviousPageClick={handlePreviousPageClick}
          />
          <PageSizeSelector pageSize={pageSize} handlePageSizeChange={handlePageSizeChange} />
        </div>
      </section>
      <Table
        entries={absences.data?.entries}
        isLoading={absences.isLoading}
      />
    </div>
  )
}

export default AbsenceManager
