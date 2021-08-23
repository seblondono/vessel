import { useQuery, UseQueryResult } from 'react-query'
import { useLocation } from 'react-router-dom'
import { PaginatedResult } from '../../../../../cargo/src/controller/model/paginatedResult'
import { AbsenceListItemDto } from '../../../../../cargo/src/repository/absences/model/abscensesModel'
import httpClient from '../../../network/httpClient'

const useQueryAbsences = (): UseQueryResult<PaginatedResult<AbsenceListItemDto>> => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  return useQuery(['absence', 'all'], async () => {
    const absences = await httpClient.absenceClient.getAbsences(queryParams)
    return absences.data
  })
}

export default useQueryAbsences
