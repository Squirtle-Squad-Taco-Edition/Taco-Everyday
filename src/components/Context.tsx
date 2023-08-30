import { createContext, type Dispatch, type SetStateAction } from 'react'
import { type GroupObj } from '../../types/types'

export interface GlobalContextInterace {
  currentGroup?: string
  setCurrentGroup?: Dispatch<SetStateAction<string>>
  globalButton?: HTMLElement
  setGlobalButton?: Dispatch<SetStateAction<HTMLElement | undefined>>
  globalGroups?: GroupObj[]
  setGlobalGroups?: Dispatch<SetStateAction<GroupObj[] | undefined>>
}

export const GlobalContext = createContext<GlobalContextInterace>({})
