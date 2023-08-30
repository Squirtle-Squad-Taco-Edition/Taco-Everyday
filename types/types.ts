// import { type IncomingMessage } from 'http'
// import type { RequestHandler } from 'express'
// import { type Dispatch, type SetStateAction } from 'react'

export interface ServerError {
  err: '400'
}

export interface TacoObj {
  [key: string]: any
  label: string
  description: string
  url: string
  imageurl: string
  calories: number
  totalNutrients: NutrientObj
  totalTime: number
  servings: number
}

export interface NutrientObj {
  [key: string]: any
  label: string
  quantity: number
  unit: string
}

export interface MessageObj {
  message: string
}

export interface GroupObj {
  groupId: number
  name: string
}
