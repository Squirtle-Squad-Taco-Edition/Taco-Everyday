/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */

import express from 'express'
import userController from '../controllers/userController'

const userRouter = express.Router()

userRouter.post(
  '/signup',
  userController.verifyUser,
  userController.createUser,
  (req, res) => res.status(200).json(res.locals.exists),
)

userRouter.post('/login', userController.authUser, (req, res) =>
  res.status(200).json(res.locals.success),
)

export default userRouter
