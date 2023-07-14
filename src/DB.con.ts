import { Pool } from 'pg'
import config from './config'

const database = new Pool({
  user: config.dbName,
  host: config.dbHost,
  port: parseInt(config.dbProt as string),
  password: config.password,
  database: config.username
})

export default database
