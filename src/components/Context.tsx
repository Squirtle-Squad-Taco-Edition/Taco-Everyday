import { createContext, type Dispatch, type SetStateAction } from 'react'

export interface GlobalContextInterace {
  globalTimer?: number
  setGlobalTimer?: Dispatch<SetStateAction<number>>
}

export const GlobalContext = createContext<GlobalContextInterace>({})
