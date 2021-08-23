import cors from 'cors'
import express, { Application } from 'express'
import { absences } from '../database/absenceDb'
import { members } from '../database/memberDb'
import { isValue } from '../util/typeGuardUtil'

const app: Application = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/absence', async (_req, res) => {
  const crewAbsences = await absences()
  const crewMembers = await members()

  try {
    const absenceList = crewAbsences.toAbsenceListDto(crewMembers)
    return res.status(200).send(absenceList)
  } catch (e) {
    return res.status(412).send(e.message)
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
