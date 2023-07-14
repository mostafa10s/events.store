import DB from '../DB.con'
import E from '../types/event.type'
import * as fs from 'fs'
import Jwt from 'jsonwebtoken'
import confige from '../config'
const tokenstatues = () => {
  if (fs.existsSync('mynewfile1.txt')) {
    const token = fs.readFileSync('mynewfile1.txt')
    let Registration = token.toString()
    const decode: any = Jwt.verify(Registration, confige.token as unknown as string)

    if (decode) {
      fs.unlinkSync('mynewfile1.txt')
      return decode.Registration.user_id
    }
    fs.unlinkSync('mynewfile1.txt')
    let message = 'no id sent fuction tokenId'
    throw message

    return message
  }
}

const adminId = tokenstatues()

class Admin {
  async accpetEvents(user_id: number, statues: string): Promise<any> {
    try {
      const con = await DB.connect()
      const sql = `Select *  from public.Registration where id=$1 `
      const result = await con.query(sql, adminId)
      if (result.rows[0].statues == '1') {
        if (result.rows[0].length) {
          if (statues == 'approve') {
            const sqlupdata = ` UPDATE RegistrationOnEvents SET statues=$1
          WHERE user_id=$2 returning  title, description, dateEvent`
            const result2 = await con.query(sqlupdata, ['approve', user_id])
            con.release()
            return result2.rows[0]
          } else {
            const sqlupdata2 = ` UPDATE Events SET statues=$1
      
            WHERE id=$2 returning  title, description, dateEvent ,statues`
            const result2 = await con.query(sqlupdata2, ['reject', user_id])

            con.release()
            return result2.rows[0]
          }
        }
      } else {
        const message = 'you are not allow to be here'
        return message
      }
    } catch (error) {
      console.log(error)
      throw new Error('you have to chick on titel or date well  ')
    }
  }

  async deleteEvent(event_id: number): Promise<E> {
    try {
      const con = await DB.connect()
      const sql = `Select *  from public.Registration where id=$1 `
      const result = await con.query(sql, adminId)
      if (result.rows[0].statues == '1') {
        const con = await DB.connect()
        const sql1 = `DELETE FROM Registrations_event WHERE event_id=($1) `
        await con.query(sql1, [event_id])
        const sql = `DELETE FROM events WHERE id=($1) `
        const result1 = await con.query(sql, [event_id])
      }
      con.release()
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw new Error('you have to chick on titel or date well  ')
    }
  }
  async registrationOnEvents(): Promise<any> {
    try {
      const con = await DB.connect()
      const sql = `Select *  from public.Registration where id=$1 `
      const result = await con.query(sql, adminId)
      if (result.rows[0].statues == '1') {
        const con = await DB.connect()
        const sql = `Select *  from public.RegistrationOnEvents `
        const result = await con.query(sql)
        con.release()
        return result.rows
      }
      return 'you are not allow to be here'
    } catch (error) {
      console.log(error)
      throw new Error('you have to chick on titel or date well')
    }
  }
}
export default Admin
