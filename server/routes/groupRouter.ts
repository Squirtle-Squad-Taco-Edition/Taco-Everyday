/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */

import express from 'express'
import groupController from '../controllers/groupController'

const groupRouter = express.Router()

groupRouter.post('/create', groupController.createGroup, (req, res) => res.sendStatus(200))

groupRouter.get('/groups/:userId', groupController.getGroups, (req, res) => res.status(200).json(res.locals.groups))

groupRouter.get('/messages/:groupId', groupController.getMessages, (req, res) => res.status(200).json(res.locals.messages))

groupRouter.post('/messages', groupController.createPost, (req, res) => res.sendStatus(200))

export default groupRouter
