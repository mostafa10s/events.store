import Eventsmodel from '../model/Events.model'
import { Request, Response, NextFunction } from 'express'

const eventsmodel = new Eventsmodel()

export const createEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventdata = await eventsmodel.createEvent(req.body)
    res.json({
      statuse: 200,
      message: 'sucsses',
      data: eventdata
    })
  } catch (error) {
    next()
  }
}
export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventdata = await eventsmodel.getone(req.params.id as unknown as number)
    res.json({
      statuse: 200,
      message: 'sucsses',
      data: eventdata
    })
  } catch (error) {
    next()
  }
}
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventdata = await eventsmodel.getAll()
    res.json({
      statuse: 200,
      message: 'sucsses',
      data: eventdata
    })
  } catch (error) {
    next()
  }
}
export const filteEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventdata = await eventsmodel.filter(req.body.titel)
    res.json({
      statuse: 200,
      message: 'sucsses',
      data: eventdata
    })
  } catch (error) {
    next()
  }
}
export const updateEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventdata = await eventsmodel.updateEvent(req.params.id as unknown as number, req.body)
    res.json({
      statuse: 200,
      message: 'sucsses',
      data: eventdata
    })
  } catch (error) {
    next()
  }
}
export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventdata = await eventsmodel.deleteEvent(req.params.id as unknown as number)
    res.json({
      statuse: 200,
      message: 'sucsses',
      data: eventdata
    })
  } catch (error) {
    next()
  }
}
