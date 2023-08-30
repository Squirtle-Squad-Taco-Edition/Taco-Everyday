import { createContext, type Dispatch, type SetStateAction } from 'react'

export interface GlobalContextInterace {
  currentGroup?: string
  setCurrentGroup?: Dispatch<SetStateAction<string>>
}

export const GlobalContext = createContext<GlobalContextInterace>({})
