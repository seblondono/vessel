import { useQuery, UseQueryResult } from 'react-query'
import { AbsenceListDto } from '../../../../../cargo/src/repository/absences/model/abscensesModel'
import httpClient from '../../../network/httpClient'

const useQueryAbsences = (): UseQueryResult<AbsenceListDto> => {
  return useQuery(['absence', 'all'], async () => {
    console.log('absences query', 'start')
    const absences = await httpClient.absenceClient.getAbsences()
    return absences.data
  })
}

export default useQueryAbsences
