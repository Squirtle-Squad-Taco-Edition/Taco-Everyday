/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */

import express from 'express'
import userController from '../controllers/userController'
import tacoSecurityController from '../controllers/tacoSecurityController'

const userRouter = express.Router()

userRouter.post(
  '/signup',
  tacoSecurityController.setHash,
  userController.verifyUser,
  userController.createUser,
  (req, res) => res.status(200).json(res.locals.exists),
)

userRouter.post('/login', tacoSecurityController.checkHash, (req, res) =>
  res.status(200).json(res.locals.verify),
)

export default userRouter
