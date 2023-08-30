/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */

import express from 'express'
import userController from '../controllers/groupController'

const userRouter = express.Router()

userRouter.post('/groups', userController.createGroup, (req, res) => res.sendStatus(200))

export default userRouter
