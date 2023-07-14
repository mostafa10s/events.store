import registrationOnEventmodel from '../model/registrationOnEvents.model'
import { Request, Response, NextFunction } from 'express'

const RegistrationOnEventmodel = new registrationOnEventmodel()

export const CreateregistrationOnEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventdata = await RegistrationOnEventmodel.registrationOnEvents(req.body.id)
    res.json({
      statuse: 200,
      message: 'sucsses',
      data: eventdata
    })
  } catch (error) {
    next()
  }
}

export const SELECTregsterEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventdata = await RegistrationOnEventmodel.selectEvents()
    res.json({
      statuse: 200,
      message: 'sucsses',
      data: eventdata
    })
  } catch (error) {
    next()
  }
}
export const deleteteRegistrationEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventdata = await RegistrationOnEventmodel.deleteteRegistrationEvents(
      req.params.id as unknown as number
    )
    res.json({
      statuse: 200,
      message: 'sucsses'
    })
  } catch (error) {
    next()
  }
}
