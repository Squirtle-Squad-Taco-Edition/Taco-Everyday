/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable prefer-template */
import { type Request, type Response, type NextFunction } from 'express'

const { query } = require('../model/tacoModel')

const userController: any = {}

function getTime () {
  const date = new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()

  const amOrPm = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12

  const formattedDateTime = `${month}/${day}/${year}, ${formattedHours}:${minutes}:${seconds}.${milliseconds} ${amOrPm}`
  return formattedDateTime
}

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

userController.authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body

    const queryString = 'SELECT username, password FROM users WHERE username = $1'

    const result = await query(queryString, [username])
    console.log('result: ', result)
    
    if (result.rows[0] && result.rows[0].password === password) {
      console.log('result.rows[0]: ', result.rows[0])
      
      res.locals.success = true
    } else res.locals.success = false
    return next()
  } catch (err) {
    return next({
      status: 400,
      log: `Error in userController.authUser: ${err}`,
      message: 'Error authenticating user for login'
    })
  }
}

export default userController
