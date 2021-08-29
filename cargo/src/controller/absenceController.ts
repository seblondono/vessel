import { Response } from 'express'
import { app } from '../server'
import { absences } from '../database/absenceDb'
import { AbsenceListItemDto } from '../repository/absences/model/abscensesModel'
import absenceService from '../service/absenceService'
import { isValue } from '../util/typeGuardUtil'
import { PaginatedResult } from './model/paginatedResult'

export const absenceController = () => {
  app.get('/absence', async (req, res: Response<PaginatedResult<AbsenceListItemDto>>) => {
    return absenceService(req, res)
  })

  app.get('/absence/:id', async (req, res) => {
    const crewAbsences = await absences()
    const absence = crewAbsences.getById(Number(req.params.id))

    if (!isValue(absence)) {
      return res.status(404).send({
        message: `Cannot find absence with id ${req.params.id}`,
      })
    }

    return res.status(200).send(absence)
  })
}
