/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */

import express from 'express'
import groupController from '../controllers/groupController'

const groupRouter = express.Router()

groupRouter.post('/create', groupController.createGroup, (req, res) => res.sendStatus(200))

groupRouter.get('/messages', groupController.getMessages, (req, res) => res.sendStatus(200).json(res.locals.messages))

groupRouter.post('/messages', groupController.createPost, (req, res) => res.sendStatus(200))

export default groupRouter
