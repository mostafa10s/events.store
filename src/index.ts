import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import config from './config'
import routes from './routes'

// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(express.json())
app.use(morgan('short'))
app.use('/api', routes)

app.get('/', (_, res) => {
  res.send('Evens Is Working')
  return
})

app.listen(config.port, () => {
  console.log(`Server is starting at prot:${config.port}`)
})
