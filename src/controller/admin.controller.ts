import adminModuel from '../model/admin.model'
import Jwt from 'jsonwebtoken'
import config from '../config'
import { Request, Response, NextFunction } from 'express'
const adminModuele = new adminModuel()
export const adminDesgin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await adminModuele.accpetEvents(req.body.user_id, req.body.statues)
    res.json({
      statuse: 200,
      message: 'sucsses',
      data: user
    })
  } catch (error) {
    next()
  }
}
export const adminSelecteAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await adminModuele.registrationOnEvents()
    res.json({
      statuse: 200,
      message: 'sucsses',
      data: user
    })
  } catch (error) {
    next()
  }
}
export const adminDeleteEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await adminModuele.deleteEvent(req.body.user_id)
    res.json({
      statuse: 200,
      message: 'sucsses',
      data: user
    })
  } catch (error) {
    next()
  }
}
