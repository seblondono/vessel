import cors from 'cors'
import express, { Application } from 'express'
import { absences } from './api'
import { isValue } from './util/typeGuardUtil'

const app: Application = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/absences', async (_req, res) => {
  const crewAbsences = await absences()
  return res.status(200).send(crewAbsences)
})

app.get('/absence/:id', async (req, res) => {
  const crewAbsences = await absences()
  const absence = crewAbsences.find((it) => it.id === Number(req.params.id))

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
