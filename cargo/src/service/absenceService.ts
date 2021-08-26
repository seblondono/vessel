import { Request, Response } from 'express'
import { PaginatedResult } from '../controller/model/paginatedResult'
import { absences } from '../database/absenceDb'
import { members } from '../database/memberDb'
import { AbsenceListItemDto } from '../repository/absences/model/abscensesModel'
import { parseAbsenceQueryFilterParams } from '../util/parseQueryParams'
import { isValue } from '../util/typeGuardUtil'

const absenceManager = async (
  req: Request,
  res: Response<PaginatedResult<AbsenceListItemDto>>,
): Promise<Response<PaginatedResult<AbsenceListItemDto>>> => {
  const page = isValue(req.query.page) && typeof (req.query.page) === 'string' ? parseInt(req.query.page) : undefined
  const pageSize = isValue(req.query.pageSize) && typeof (req.query.pageSize) === 'string' ? parseInt(
    req.query.pageSize) : undefined

  const crewAbsences = await absences()
  const crewMembers = await members()

  try {
    const parsedQueryFilters = parseAbsenceQueryFilterParams(req.query)
    if (Object.keys(parsedQueryFilters).length > 0) {
      const absenceList = crewAbsences.applyFilters(parsedQueryFilters).toPaginatedResult(crewMembers, page, pageSize)
      return res.status(200).send(absenceList)
    }
  } catch (e) {
    return res.status(400).send(e.message)
  }

  try {
    const absenceList = crewAbsences.toPaginatedResult(crewMembers, page, pageSize)
    return res.status(200).send(absenceList)
  } catch (e) {
    return res.status(404).send(e.message)
  }
}

export default absenceManager
