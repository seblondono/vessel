import { useQuery, UseQueryResult } from 'react-query'
import { useLocation } from 'react-router-dom'
import { PaginatedResult } from '../../../../../cargo/src/controller/model/paginatedResult'
import { AbsenceListItemDto } from '../../../../../cargo/src/repository/absences/model/abscensesModel'
import httpClient from '../../../network/httpClient'
import { isValue } from '../../../util/typeGuardUtil'

const useQueryAbsences = (): UseQueryResult<PaginatedResult<AbsenceListItemDto>> => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const page = queryParams.get('page')
  const pageSize = queryParams.get('pageSize')

  return useQuery(['absence', page, pageSize], async () => {
      const absences = await httpClient.absenceClient.getAbsences(queryParams)
      return absences.data
    }, {
      enabled: isValue(page) && isValue(pageSize),
      keepPreviousData: true,
    },
  )
}

export default useQueryAbsences
