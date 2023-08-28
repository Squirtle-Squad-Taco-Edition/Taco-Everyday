import { type IncomingMessage } from 'http'
import type { RequestHandler } from 'express'
import { type Dispatch, type SetStateAction } from 'react'

export interface ServerError {
    err: '400'
  }