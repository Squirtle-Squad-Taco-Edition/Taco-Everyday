/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */

import express, { Response } from 'express'
import apiController from '../controllers/tacoController'

const tacoRouter = express.Router()

tacoRouter.get('/current/:groupId', apiController.current, apiController.querybyId, (req, res) => {
  return res.status(200).json(res.locals.currentTaco)
})

tacoRouter.get('/new/:groupId', apiController.getNewTaco, (req, res) => {
    return res.status(200).json(res.locals.tacoRandomId)
  })

tacoRouter.get('/monthly/:groupId', apiController.getRandomId, (req, res) => {
    return res.status(200).json(res.locals.tacoRandomId)
  })



export default tacoRouter
