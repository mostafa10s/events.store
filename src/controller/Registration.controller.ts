import RegistrationModule from '../model/Registration .model'
import Jwt from 'jsonwebtoken'
import config from '../config'
import { Request, Response, NextFunction } from 'express'
const Registrationmodule = new RegistrationModule()
export const create_user = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await Registrationmodule.createUser(req.body)
    res.json({
      statuse: 200,
      message: 'sucsses',
      data: user
    })
  } catch (error) {
    next()
  }
}
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await Registrationmodule.login(req.body.Email, req.body.password)
    const token = Jwt.sign({ user }, config.token as unknown as string)
    res.json({
      statuse: 200,
      message: 'sucsses',
      data: user,
      Token: token
    })
  } catch (error) {
    next()
  }
}
