import { Request } from 'express'
import { PaginatedResult } from '../controller/model/paginatedResult'
import { absences } from '../database/absenceDb'
import { members } from '../database/memberDb'
import { AbsenceListItemDto } from '../repository/absences/model/abscensesModel'
import { isValue } from '../util/typeGuardUtil'

const absenceManager = async (req: Request): Promise<PaginatedResult<AbsenceListItemDto>> => {
  const page = isValue(req.query.page) && typeof (req.query.page) === 'string' ? parseInt(req.query.page) : undefined
  const pageSize = isValue(req.query.pageSize) && typeof (req.query.pageSize) === 'string' ? parseInt(
    req.query.pageSize) : undefined

  const crewAbsences = await absences()
  const crewMembers = await members()

  return crewAbsences.toPaginatedResult(crewMembers, page, pageSize)
}

export default absenceManager
