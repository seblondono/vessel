import { useQuery, UseQueryResult } from 'react-query'
import { AbsenceDto } from '../../../../../cargo/src/absences/model/abscensesModel'
import httpClient from '../../../network/httpClient'
import { isValue } from '../../../util/typeGuardUtil'

const useQueryAbsences = (): UseQueryResult<AbsenceDto[]> => {
  return useQuery(['absence', 'all'], async () => {
    console.log('absences query', 'start')
    const absences = await httpClient.absenceClient.getAbsences()
    console.log('absences query', absences.data)


    if (!isValue(absences)) {
      return undefined
    }
    return absences.data
  })
}

export default useQueryAbsences
