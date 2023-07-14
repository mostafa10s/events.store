import dotenv from 'dotenv'
dotenv.config()
const { port, Db_username, Db_password, Db_port, Db_place, db_name, secret, rutes, SECRET_TOKEN } =
  process.env
export default {
  port: port,
  username: db_name,
  password: Db_password,
  dbProt: Db_port,
  dbHost: Db_place,
  dbName: Db_username,
  Secret: secret,
  Rutes: rutes,
  token: SECRET_TOKEN
}
