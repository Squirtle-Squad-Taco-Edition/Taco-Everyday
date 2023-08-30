/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable prefer-template */
import { type Request, type Response, type NextFunction } from 'express'
import { getTime } from './helperFunc'
import { MessageObj } from '../../types/types'

const { query } = require('../model/tacoModel')

const groupController: any = {}

groupController.createGroup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, userId } = req.body
    console.log('req.body: ', req.body)
    const queryString = `INSERT INTO groups (name, creator, created_at)
      VALUES ($1, $2, $3);`
    const date = getTime()
    const values = [name, userId, date]
    await query(queryString, values)
    next()
  } catch (err) {
    next({
      status: 400,
      log: `Error in groupController.createGroup: ${err}`,
      message: 'Error creating new group',
    })
  }
}

groupController.getGroups = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params

    const queryString = 'SELECT group_id, name FROM groups WHERE creator = $1 ORDER BY created_at DESC LIMIT 30'

    const results = await query(queryString, [userId])
    const groups = results.rows
    console.log('groups: ', groups)
    
    res.locals.groups = groups
    next()
  } catch (err) {
    next({
      status: 400,
      log: `Error in groupController.getGroups: ${err}`,
      message: 'Error getting user groups'
    })
  }
}

groupController.getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { groupId } = req.params

    const queryString = 'SELECT message FROM messages WHERE group_id = $1 ORDER BY created_at DESC LIMIT 30'

    const results = await query(queryString, [groupId])
    const messages = results.rows
    const messageArr = messages.map((message: MessageObj) => message.message)
    console.log('messageArr: ', messageArr)
    res.locals.messages = messageArr

    next()
  } catch (err) {
    next({
      status: 400,
      log: `Error in groupController.getMessages: ${err}`,
      message: 'Error getting group messages',
    })
  }
}

groupController.createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { posterId, groupId, message } = req.body

    const date = getTime()
    let queryString: string = ''
    const values: string[] = [posterId, groupId, message, date]

    if (pictureUrl) {
      queryString = 'INSERT INTO messages ( poster_id, group_id, message, created_at, picture_url) VALUES ($1, $2, $3, $4, $5)'
      values.push(pictureUrl)
    } else {
      queryString = 'INSERT INTO messages ( poster_id, group_id, message, created_at) VALUES ($1, $2, $3, $4)'
    }

    await query(queryString, values)
    next()
  } catch (err) {
    next({
      status: 400,
      log: `Error in groupController.createPost: ${err}`,
      message: 'Error posting new group message',
    })
  }
}

export default groupController
