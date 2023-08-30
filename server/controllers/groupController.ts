/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable prefer-template */
import { type Request, type Response, type NextFunction } from 'express'

const { query } = require('../model/tacoModel')

const groupController: any = {}

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

groupController.createGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, userId } = req.body
    const queryString = `INSERT INTO groups (name, creator, created_at)
      VALUES ($1, $2, $3);`
    const date = getTime()
    const values = [name, userId, date]
    await query(queryString, values)
    return next()
  } catch (err) {
    return next({
      status: 400,
      log: `Error in userController.createUser: ${err}`,
      message: 'Error creating new user'
    })
  }
}

groupController.getMessages = async (req: Request, res: Response, next: NextFunction) => {
  
}

export default groupController
