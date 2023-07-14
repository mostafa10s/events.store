import DB from '../DB.con'
import E from '../types/event.type'
class RegistrationOnEvents {
  async registrationOnEvents(event_id: Number): Promise<E | null> {
    try {
      const con = await DB.connect()
      const sql = `SELECT * FROM Registrations_event WHERE event_id=($1) `
      const result = await con.query(sql, [event_id])

      if (result.rows[0]) {
        let Rester_event_id = result.rows[0].id

        const sql1 = `INSERT INTO public.RegistrationOnEvents(
          RgesterEvent_id,user_id,statues)
             VALUES ($1, $2, $3) returning  RgesterEvent_id,user_id,statues`
        const result1 = await con.query(sql1, [Rester_event_id, 4, 'Reservation'])
        con.release()
        return result1.rows[0]
      }
      con.release()
      return null
    } catch (error) {
      console.log(error)
      throw new Error('you have to chick on titel or date well  ')
    }
  }
  async selectEvents(): Promise<any> {
    try {
      const con = await DB.connect()
      const sql = `
      SELECT  rgesterevent_id, user_id, statues, "eventTitle", event_id
      FROM  public.registrationonevents
      INNER JOIN Registrations_event
      ON registrationonevents.rgesterevent_id = Registrations_event.id WHERE user_id=($1) `
      const result = await con.query(sql, [4])
      con.release()
      return result.rows
    } catch (error) {
      console.log(error)
      throw new Error('you have to problem at select resgetser to Event   ')
    }
  }
  async deleteteRegistrationEvents(id: number): Promise<any> {
    try {
      const con = await DB.connect()
      const sql = `Delete FROM RegistrationOnEvents WHERE rgesterevent_id=($1) `
      const result = await con.query(sql, [id])
      con.release()
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw new Error('you have toprobelm to delete your event')
    }
  }
}
export default RegistrationOnEvents
