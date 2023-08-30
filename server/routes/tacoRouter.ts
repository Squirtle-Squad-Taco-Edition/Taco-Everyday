import express from 'express'
import apiController from '../controllers/tacoController'

const tacoRouter = express.Router()

tacoRouter.get(
  '/current/:groupId',
  apiController.current,
  (req, res, next) => {
    if (res.locals.fetchNewTaco === true) {
      return apiController.getNewTaco(req, res, next)
    }
    return apiController.queryById(req, res, next)
  },
  (req, res) => res.status(200).json(res.locals.recipe)
)

tacoRouter.get('/new/:groupId', apiController.getNewTaco, (req, res) => res.status(200).json(res.locals.recipe))

export default tacoRouter
