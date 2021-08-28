import { useQuery, UseQueryResult } from 'react-query'
import { useLocation } from 'react-router-dom'
import { PaginatedResult } from '../../../../../cargo/src/controller/model/paginatedResult'
import httpClient from '../../../network/httpClient'
import { isValue } from '../../../util/typeGuardUtil'
import { AbsenceListItemDto } from '../model/absencesModel'
import { AbsenceQueryFilterType, TableQueryPaginationType } from '../model/queryFilters'

const useQueryAbsences = (): UseQueryResult<PaginatedResult<AbsenceListItemDto>> => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const page = queryParams.get(TableQueryPaginationType.PAGE)
  const pageSize = queryParams.get(TableQueryPaginationType.PAGE_SIZE)
  const absenceType = queryParams.get(AbsenceQueryFilterType.TYPE)
  const absenceStartDate = queryParams.get(AbsenceQueryFilterType.START_DATE)
  const absenceEndDate = queryParams.get(AbsenceQueryFilterType.END_DATE)

  return useQuery(['absence', page, pageSize, absenceType, absenceStartDate, absenceEndDate], async () => {
      const absences = await httpClient.absenceClient.getAbsences(queryParams)
      return absences.data
    }, {
      enabled: isValue(page) && isValue(pageSize),
      keepPreviousData: true,
    },
  )
}

export default useQueryAbsences
