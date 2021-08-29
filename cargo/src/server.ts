import cors from 'cors'
import express, { Application } from 'express'
import { absenceController } from './controller/absenceController'

export const app: Application = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

absenceController()

try {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
} catch (error) {
  console.error(`Error trying to listen on port ${port}: ${error.message}`)
}
