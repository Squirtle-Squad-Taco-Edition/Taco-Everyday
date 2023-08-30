import { createContext, type Dispatch, type SetStateAction } from 'react'

export interface GlobalContextInterace {
  currentGroup?: string
  setCurrentGroup?: Dispatch<SetStateAction<string>>
  globalButton?: HTMLElement
  setGlobalButton?: Dispatch<SetStateAction<HTMLElement | undefined>>
}

export const GlobalContext = createContext<GlobalContextInterace>({})
