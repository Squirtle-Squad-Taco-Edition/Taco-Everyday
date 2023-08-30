import express from 'express'
import apiController from '../controllers/tacoController'

const tacoRouter = express.Router()

tacoRouter.get('/current/:groupId', apiController.current, (req, res) => {
  return res.send(200).json(res.locals.currentId)
})

// apiController.queryById,

tacoRouter.get('/new/:groupId', apiController.getNewTaco, (req, res) => {
  return res.status(200).json(res.locals.tacoRandomId)
})

// tacoRouter.get('/monthly/:groupId', apiController.getRandomId, (req, res) => {
//   return res.status(200).json(res.locals.tacoRandomId);
// });

export default tacoRouter
