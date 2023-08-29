/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */

import express from 'express'
import userController from '../controllers/userController'

const userRouter = express.Router()

userRouter.post('/api/user/signup', userController.createUser, (req, res) =>
res.status(200).json(res.locals.user);

userRouter.post('/api/user/login', userController.authUser, (req, res) =>
res.status(200).json(res.locals.key);

userRouter.post('/api/user/groups', userController.groupsUser, (req, res) =>
res.status(200).json(res.locals.groups);


module.exports = userRouter;
