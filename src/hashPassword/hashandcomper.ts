import config from '../config'
import bcrypt from 'bcrypt'
export const hashPassword = (password: string) => {
  //const salt = parseInt(config.Secret as string, 10)
  const hash_password = bcrypt.hashSync(`${password}${config.Rutes}`, 10)
  return hash_password
}
export const comberpw = (chickpw: string, hashPassword: string) => {
  const comber_pw = bcrypt.compareSync(`${chickpw}${config.Rutes}`, hashPassword)
  return comber_pw
}
