/* eslint-disable import/no-extraneous-dependencies */
import React, { type ReactElement, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Signin from './components/signin'
import GroupSelect from './components/GroupSelect'
import Group from './components/NewGroup'
import { GlobalContext } from './components/Context'

function App(): ReactElement {
  const [currentGroup, setCurrentGroup] = useState<string>('')
  const [globalButton, setGlobalButton] = useState<HTMLElement>()
  return (
    <div className="App">
      <GlobalContext.Provider
        value={{
          currentGroup,
          setCurrentGroup,
          globalButton,
          setGlobalButton,
        }}>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/group" element={<GroupSelect />} />
          <Route path="/specificgroup" element={<Group />} />
        </Routes>
      </GlobalContext.Provider>
    </div>
  )
}

export default App
