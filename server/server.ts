import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import type { ServerError } from '../types/types'
// import { tacoController } from './controllers/tacoController'

const PORT = 3030

const app = express()
app.use(express.json())

// general endpoint for routes

// app.use('/taco', tacoController)

// error handler for bad routes/requests to backend
app.use((req, res) => {
  res.sendStatus(404)
})

// global error handler for all middleware and routes
app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Error caught in global handler',
    status: 500,
    message: { err: 'An error occurred' }
  }
  const errorObj = { ...defaultErr, ...err }
  console.log(errorObj.log)
  console.log(err)
  return res.status(errorObj.status).json(errorObj.message)
})
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })
export default app
