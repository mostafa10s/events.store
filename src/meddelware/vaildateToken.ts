import Jwt from 'jsonwebtoken'
import confige from '../config'
import express, { NextFunction, Request, Response } from 'express'
import * as fs from 'fs'

const handelError = (next: NextFunction) => {
  const error: Error = new Error('login Error:please add a valid bearer token to headers ')
  next(error)
}

const vaildateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const Authorization: string = req.body('Authorization')
    const bearer: string = Authorization.split(' ')[0].toLowerCase()
    const Token: string = Authorization.split(' ')[1]
    if (Token && bearer == 'bearer') {
      const decode: any = Jwt.verify(Token, confige.token as unknown as string)
      if (decode) {
        if (!fs.existsSync('mynewfile1.txt')) {
          const fileToken = fs.appendFileSync('mynewfile1.txt', `${Token}`)
        }
        handelError(next)
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
export default vaildateToken
