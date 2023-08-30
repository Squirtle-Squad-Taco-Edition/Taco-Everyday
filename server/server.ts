/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'

import type { Router, Express, Request, Response, NextFunction } from 'express'
import type { ServerError } from '../types/types'
import apiRouter from './routes/tacoRouter'
import userRouter from './routes/userRouter'
import groupRouter from './routes/groupRouter'

const PORT: number = 3030
const app: Express = express()

app.use(express.json())

// call to routers
app.use('/api/taco', apiRouter)
app.use('/api/user', userRouter)
app.use('/api/group', groupRouter)

// error handler for bad routes/requests to backend
app.use((req: Request, res: Response) => {
  res.status(404).send('The page does not exist.')
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
