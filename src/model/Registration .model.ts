import res from '../types/Registration .types'
import DB from '../DB.con'
import * as hashAndchick from '../hashPassword/hashandcomper'
class registration {
  async createUser(R: res): Promise<res> {
    try {
      const con = await DB.connect()
      const sql = `INSERT INTO public.registration(
         "email", "password", "firstName", "lastName")
        VALUES ($1, $2, $3, $4) returning  "email", "firstName", "lastName" ;`
      const result = await con.query(sql, [
        R.email,
        hashAndchick.hashPassword(R.password),
        R.firstName,
        R.lastName
      ])
      con.release()
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw new Error('you have problem with Registration check your info ')
    }
  }
  async getall(): Promise<{}> {
    try {
      const con = await DB.connect()

      const sql = `SELECT id, "email",concat("firstName" , "lastName") as userName
    FROM public.registration`
      const result = await con.query(sql)
      con.release()
      return result.rows
    } catch (error) {
     
      throw new Error('you have problem with to see all the uessers check your info ')
    }
  }
  async login(email: string, pasword: string): Promise<res | null> {
    try {
      const con = await DB.connect()
      const sql = `SELECT email,password
      FROM public.registration where "email"=$1 `
      const result = await con.query(sql, [email])
      if (result.rows.length) {
        const checkpaswword = hashAndchick.comberpw(pasword, result.rows[0].password)
        if (checkpaswword) {
          const sql = `SELECT id, "email",concat("firstName" , "lastName") as userName
          FROM public.registration where "email"=$1 `
          const result1 = await con.query(sql, [email])

          con.release()
          return result1.rows[0]
        }
      }
      con.release()
      return null
    } catch (error) {
      console.log(error)
      throw new Error('your Email or password wrong please try agian ,login ')
    }
  }
}

export default registration
