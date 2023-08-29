/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, type ReactElement } from 'react'
import { GlobalContext } from './Context'
import Navbar from './Navbar'

function Group (): ReactElement {
  const { currentGroup } = useContext(GlobalContext)
  // & pull messages from global state
  return (
    <>
      <Navbar />
      <div className="groupBox">
        {currentGroup}
      </div>
    </>

  )
}

export default Group
