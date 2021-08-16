import express, {Application} from 'express'

const app: Application = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async (_req, res) => {
  return res.status(200).send({
    message: 'Welcome to the vessel cargo bay',
  })
})

try {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
} catch (error) {
  console.error(`Error trying to listen on port ${port}: ${error.message}`)
}
