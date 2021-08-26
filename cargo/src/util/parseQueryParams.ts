import * as core from 'express-serve-static-core'
import { AbsenceQueryFilterType } from '../repository/absences/model/abscensesModel'
import { isValue } from './typeGuardUtil'

export const parseAbsenceQueryFilterParams = (query: core.Query): Partial<Record<AbsenceQueryFilterType, any>> => {
  const parsedQueryFilters: Partial<Record<AbsenceQueryFilterType, any>> = {}
  return Object.values(AbsenceQueryFilterType).reduce((acc, it) => {
    const filterValue = query[it]
    if (isValue(filterValue)) {
      // TODO: validate value
      // throw new Error(`Invalid query param value ${filterValue} for filter key ${it}`)
      acc[it] = filterValue
      return acc
    } else {
      return acc
    }
  }, parsedQueryFilters)
}
