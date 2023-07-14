import E from '../types/event.type'
import DB from '../DB.con'
class Events {
  async createEvent(e: E): Promise<E | null> {
    try {
      const con = await DB.connect()
      const sql = `INSERT INTO public.Events(
            "title", description, "dateEvent", "user_id" ,statues)
           VALUES ($1, $2, $3, $4,$5) returning id  , "title", description, "dateEvent", "user_id" ,statues;`
      const date: Date = new Date()
      const result = await con.query(sql, [e.title, e.description, date, 6, 'waiting list']) //fromtoken
      if (result.rows.length) {
        const sql = `INSERT INTO public.Registrations_event (
           "eventTitle", event_id)
                VALUES ($1, $2);`
        await con.query(sql, [e.title, result.rows[0].id])
        con.release()
        return result.rows[0]
      }
      con.release()

      return null
    } catch (error) {
      console.log(error)
      throw new Error('you have problem with create your Event ')
    }
  }
  async getAll(): Promise<{}> {
    try {
      const con = await DB.connect()
      const sql = `Select *  from public.Events  `
      const result = await con.query(sql)
      con.release()
      return result.rows
    } catch (error) {
      console.log(error)
      throw new Error('you have problem with create your Event ')
    }
  }
  async getone(id: number): Promise<E> {
    try {
      const con = await DB.connect()
      const sql = `Select *  from public.Events where id=$1 `
      const result = await con.query(sql, [id])
      con.release()
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw new Error('you have problem with create your Event ')
    }
  }
  async filter(titel: string /* Date: Date*/): Promise<{}> {
    // stile have a date to check

    try {
      const con = await DB.connect()
      const sql = `Select *  from public.Events where title=$1 `

      const result = await con.query(sql, [titel])
      con.release()
      return result.rows
    } catch (error) {
      console.log(error)
      throw new Error('you have to chick on titel or date well  ')
    }
  }
  async updateEvent(id: number, e: E): Promise<E | null> {
    try {
      // still have date here to update
      const con = await DB.connect()
      //const date: Date = new Date()
      const sql = ` UPDATE Events SET title=$1,description=$2 
      WHERE id=$3 returning title, description ,id`

      const result = await con.query(sql, [e.title, e.description, id])
      if (result) {
        const sql1 = `DELETE FROM Registrations_event WHERE event_id=($1) `
        await con.query(sql1, [id])
        const sql2 = `INSERT INTO public.Registrations_event (
          "eventTitle", event_id)  VALUES ($1, $2);`
        await con.query(sql2, [e.title, result.rows[0].id])
        con.release()
        return result.rows[0]
      }
      con.release()

      return null
    } catch (error) {
      console.log(error)
      throw new Error('you have problem with update your data ')
    }
  }
  async deleteEvent(id: number): Promise<E> {
    try {
      const con = await DB.connect()
      const sql1 = `DELETE FROM Registrations_event WHERE event_id=($1) `
      await con.query(sql1, [id])
      const sql = `DELETE FROM Events WHERE id=($1) `
      const result = await con.query(sql, [id])

      con.release()
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw new Error('you have to chick on titel or date well  ')
    }
  }
  
}
export default Events
