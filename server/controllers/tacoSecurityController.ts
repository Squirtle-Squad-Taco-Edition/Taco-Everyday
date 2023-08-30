import { type Request, type Response, type NextFunction } from 'express'

const { query } = require('../model/tacoModel')
const bcrypt = require('bcrypt')

const tacoSecurityController: any = {}

tacoSecurityController.setSopapilla = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const random = Math.floor(Math.random() * 10000)
  res.cookie('secret', random)
  return next()
}

tacoSecurityController.setHash = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { password } = req.body
  const salt = 5
  const hashedPass = bcrypt.hashSync(password, salt)
  console.log('hashedPass: ', hashedPass)
  res.locals.hash = hashedPass
  return next()
}

tacoSecurityController.checkHash = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body
  const queryString = 'SELECT password FROM users WHERE username = $1;'
  const values = [username]
  const result = await query(queryString, values)

  const dbPass = result.rows[0].password

  const verifyPass = bcrypt.compareSync(password, dbPass)
  res.locals.verify = verifyPass
  return next()
}

export default tacoSecurityController
