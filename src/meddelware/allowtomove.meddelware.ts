import Jwt from 'jsonwebtoken'
import * as fs from 'fs'
import confige from '../config'
import DB from '../DB.con'
import express, { NextFunction, Request, Response } from 'express'
const handelError = (next: NextFunction) => {
  const error: Error = new Error('login Error:please add a valid bearer token to headers ')
  next(error)
}
const tokenstatues = () => {
  if (fs.existsSync('mynewfile1.txt')) {
    const token = fs.readFileSync('mynewfile1.txt')
    let Registration = token.toString()
    const decode: any = Jwt.verify(Registration, confige.token as unknown as string)

    if (decode) {
      fs.unlinkSync('mynewfile1.txt')
      return decode.Registration
    }
    fs.unlinkSync('mynewfile1.txt')
    let message = 'no id sent fuction tokenId'
    throw message

    return message
  }
}

const infouser = tokenstatues()
let statues: number = infouser.statues
let userId: number = infouser.id

async function TrafficPower(user_id: number) {
  try {
    const con = await DB.connect()
    const sql = `SELECT *
      FROM public.registration where "id"=$1 `
    const result = await con.query(sql, [user_id])
    if (result.rows[0]) {
      if (result.rows[0].statuse == 1) {
        return true
      }
    }
    return false
  } catch (error) {
    console.log(error)
    throw new Error('you have probelm at TrafficPower')
  }
}

const nextstep = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Authorization: string = req.body('Authorization')
    const bearer: string = Authorization.split(' ')[0].toLowerCase()
    const Token: string = Authorization.split(' ')[1]
    if (Token && bearer == 'bearer') {
      const decode: any = Jwt.verify(Token, confige.token as unknown as string)
      if (decode) {
        const trafficPower = await TrafficPower(decode.registration.id)
        if (trafficPower) {
          handelError(next)
        }
      } else {
        handelError(next)
      }
    } else {
      handelError(next)
    }
  } catch (error) {
    console.log(error)
    throw new Error('you have probelm at token')
  }
}
export default nextstep
