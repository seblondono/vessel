import { ChangeEvent, FC, useLayoutEffect, useState } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { Routes } from '../../Routes'
import { AbsenceFilterByType, AbsenceType } from './model/absencesModel'
import { AbsenceQueryFilterType, TableQueryPaginationType } from './model/queryFilters'
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

  // region table filters
  const [absenceTypeFilter, setAbsenceTypeFilter] = useState(AbsenceFilterByType.NONE)
  const handleFilterByAbsenceTypeChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setAbsenceTypeFilter(ev.target.value as AbsenceType)
    setPage(1)
  }
  // endregion

  // region handle table search query
  const location = useLocation()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  queryParams.set(TableQueryPaginationType.PAGE, String(page))
  queryParams.set(TableQueryPaginationType.PAGE_SIZE, String(pageSize))
  if (absenceTypeFilter === AbsenceFilterByType.NONE) {
    queryParams.delete(AbsenceQueryFilterType.TYPE)
  } else {
    queryParams.set(AbsenceQueryFilterType.TYPE, absenceTypeFilter)
  }
  const searchQuery = `${Routes.ABSENCE_MANAGER}?${queryParams.toString()}`

  useLayoutEffect(() => {
    history.push(searchQuery)
  }, [page, pageSize, absenceTypeFilter])

  if (location.search === '') {
    return <Redirect to={searchQuery} />
  }
  // endregion

  return (
    <div className='h-full overflow-auto p-8'>
      <section className='flex items-center'>
        <p className='mr-4'>Filter absences by</p>
        <div className='p-2 flex items-center'>
          <p>Type</p>
          <select className='ml-3 p-1 border capitalize' onChange={handleFilterByAbsenceTypeChange}>
            <option
              value={AbsenceFilterByType.NONE}
              selected={absenceTypeFilter === AbsenceFilterByType.NONE}>
              {AbsenceFilterByType.NONE}
            </option>
            <option
              value={AbsenceFilterByType.SICKNESS}
              selected={absenceTypeFilter === AbsenceFilterByType.SICKNESS}>
              {AbsenceFilterByType.SICKNESS}
            </option>
            <option
              value={AbsenceFilterByType.VACATION}
              selected={absenceTypeFilter === AbsenceFilterByType.VACATION}>
              {AbsenceFilterByType.VACATION}
            </option>
          </select>
        </div>
      </section>
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
