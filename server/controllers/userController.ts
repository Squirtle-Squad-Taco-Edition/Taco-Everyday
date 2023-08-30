/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable prefer-template */
import { type Request, type Response, type NextFunction } from 'express'
import { getTime } from './helperFunc'
import { resourceLimits } from 'worker_threads'

const { query } = require('../model/tacoModel')

const userController: any = {}

userController.verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username } = req.body

    const queryString = 'SELECT * FROM users WHERE username = $1;'

    const values = [username]

    const result = await query(queryString, values)
    console.log('result: ', result)
    if (result.rows.length) res.locals.exists = true
    else res.locals.exists = false

    return next()
  } catch (err) {
    next({
      status: 400,
      log: `Error in userController.createUser: ${err}`,
      message: 'Error verify existence of user',
    })
  }
}

userController.createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body

    const queryString =
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id'

    const values = [username, password]
    if (!res.locals.exists) {
      const result = await query(queryString, values)
    }

    return next()
  } catch (err) {
    return next({
      status: 400,
      log: `Error in userController.createUser: ${err}`,
      message: 'Error creating new user',
    })
  }
}

userController.authUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body

    const queryString =
      'SELECT username, password FROM users WHERE username = $1'

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
      message: 'Error authenticating user for login',
    })
  }
}

export default userController
