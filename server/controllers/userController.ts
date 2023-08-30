/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable prefer-template */
import { type Request, type Response, type NextFunction } from 'express'

const { query } = require('../model/tacoModel')

const userController: any = {}

userController.createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body
    
    const queryString = 'INSERT INTO users (username, password) VALUES ($1, $2)'
    
    const values = [username, password]

    const result = await query(queryString, values)
    console.log('result: ', result)

    return next()
  } catch (err) {
    return next({
      status: 400,
      log: `Error in userController.createUser: ${err}`,
      message: 'Error creating new user'
    })
  }
}

export default userController
