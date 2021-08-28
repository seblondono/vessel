import { ChangeEvent, FC, useLayoutEffect, useState } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { Routes } from '../../Routes'
import { isValue } from '../../util/typeGuardUtil'
import { AbsenceFilterByType, AbsenceFilterType } from './model/absencesModel'
import { AbsenceQueryFilterType, TableQueryPaginationType } from './model/queryFilters'
import useQueryAbsences from './queries/useQueryAbsences'
import PageInformation from './table/PageInformation'
import PageNavigator from './table/PageNavigator'
import PageSizeSelector from './table/PageSizeSelector'
import Table from './table/Table'
import Filter from './tableFilter/Filter'
import FilterAbsenceStartDate from './tableFilter/FilterAbsenceStartDate'
import FilterAbsenceType from './tableFilter/FilterAbsenceType'

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
  const [absenceTypeFilter, setAbsenceTypeFilter] = useState<AbsenceFilterType>(AbsenceFilterByType.NONE)
  const handleFilterByAbsenceTypeChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setAbsenceTypeFilter(ev.target.value as AbsenceFilterType)
    setPage(1)
  }

  // new Date().toISOString().split('T')[0]
  const [absenceStartDate, setAbsenceStartDate] = useState('')
  const handleFilterByAbsenceStartDateChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setAbsenceStartDate(ev.target.value)
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
  if (absenceStartDate === '') {
    queryParams.delete(AbsenceQueryFilterType.START_DATE)
  } else {
    queryParams.set(AbsenceQueryFilterType.START_DATE, absenceStartDate)
  }
  const searchQuery = `${Routes.ABSENCE_MANAGER}?${queryParams.toString()}`

  useLayoutEffect(() => {
    history.push(searchQuery)
  }, [page, pageSize, absenceTypeFilter, absenceStartDate])

  if (location.search === '') {
    return <Redirect to={searchQuery} />
  }
  // endregion

  return (
    <div className='h-full overflow-auto p-8'>
      <Filter label='Filter absences by'>
        <FilterAbsenceType
          absenceTypeFilter={absenceTypeFilter}
          handleFilterByAbsenceTypeChange={handleFilterByAbsenceTypeChange}
        />
        <FilterAbsenceStartDate
          absenceStartDate={absenceStartDate}
          handleFilterByAbsenceStartDateChange={handleFilterByAbsenceStartDateChange}
          />
      </Filter>
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
