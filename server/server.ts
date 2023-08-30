/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import type { Router, Express, Request, Response, NextFunction } from 'express'
import type { ServerError } from '../types/types'
import apiRouter from './routes/tacoRouter'
import userRouter from './routes/userRouter'
import groupRouter from './routes/groupRouter'
import tacoSecurityController from './controllers/tacoSecurityController'

const http = require('http')
const socketio = require('socket.io')

const PORT = 3030

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())
app.use(cookieParser())

app.use('/api/taco', apiRouter)
app.use('/api/user', userRouter)
app.use('/api/group', groupRouter)

io.on('connection', (socket: any) => {
  console.log('a user connected')
  socket.on('chat message', (msg: string) => {
    io.emit('chat message', msg)
    console.log(`message: ${msg}`)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
// general endpoint for routes

// app.use('/taco', tacoController)

app.get('/', tacoSecurityController.setSopapilla, (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'))
})

// error handler for bad routes/requests to backend
app.use((req: Request, res: Response) => {
  res.status(404).send('The page does not exist.')
})

// global error handler for all middleware and routes
app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Error caught in global handler',
    status: 500,
    message: { err: 'An error occurred' },
  }
  const errorObj = { ...defaultErr, ...err }
  console.log(errorObj.log)
  console.log(err)
  return res.status(errorObj.status).json(errorObj.message)
})
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
export default app
