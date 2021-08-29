import { FC } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { AbsenceQueryFilterType, TableQueryPaginationType } from './model/queryFilters'
import useQueryAbsences from './queries/useQueryAbsences'
import AbsencesTable from './table/AbsencesTable'
import PageInformation from './table/PageInformation'
import PageNavigator from './table/PageNavigator'
import PageSizeSelector from './table/PageSizeSelector'
import TableBody from './table/TableBody'
import Filter from './tableFilter/Filter'
import FilterAbsenceByDate from './tableFilter/FilterAbsenceByDate'
import FilterAbsenceType from './tableFilter/FilterAbsenceType'

const AbsenceManager: FC = () => {
  // region fetch data
  const absences = useQueryAbsences()
  // endregion

  // region redirect to table with page and pageSize queries
  const location = useLocation()

  if (location.search === '') {
    const queryParams = new URLSearchParams(location.search)
    queryParams.set(TableQueryPaginationType.PAGE, '1')
    queryParams.set(TableQueryPaginationType.PAGE_SIZE, '10')

    return <Redirect to={`${location.pathname}?${queryParams.toString()}`} />
  }
  // endregion

  return (
    <div className='h-full overflow-auto p-8'>
      <Filter label='Filter absences by'>
        <FilterAbsenceType />
        <FilterAbsenceByDate
          label='Start date'
          dateFilterType={AbsenceQueryFilterType.START_DATE}
        />
        <FilterAbsenceByDate
          label='End date'
          dateFilterType={AbsenceQueryFilterType.END_DATE}
        />
      </Filter>
      <section className='flex justify-between items-center'>
        <PageInformation totalEntries={absences.data?.totalEntries} />
        <div className='flex justify-between items-center'>
          <PageNavigator totalPages={absences.data?.totalPages} />
          <PageSizeSelector />
        </div>
      </section>
      <AbsencesTable>
        <TableBody
          entries={absences.data?.entries}
          isLoading={absences.isLoading}
          isError={absences.isError}
          refetch={() => absences.refetch()}
        />
      </AbsencesTable>
    </div>
  )
}

export default AbsenceManager
