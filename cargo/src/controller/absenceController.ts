import cors from 'cors'
import express, { Application, Response } from 'express'
import { absences } from '../database/absenceDb'
import { AbsenceListItemDto } from '../repository/absences/model/abscensesModel'
import absenceService from '../service/absenceService'
import { isValue } from '../util/typeGuardUtil'
import { PaginatedResult } from './model/paginatedResult'

const app: Application = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/absence', async (req, res: Response<PaginatedResult<AbsenceListItemDto>>) => {
  try {
    const absenceList = await absenceService(req)
    return res.status(200).send(absenceList)
  } catch (e) {
    return res.status(404).send(e.message)
  }
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

try {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
} catch (error) {
  console.error(`Error trying to listen on port ${port}: ${error.message}`)
}
