/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { GlobalContext } from './Context'
import Navbar from './Navbar'

const tempGroups = ['Spectacolar', 'Will work for tacos']
function GroupSelect (): ReactElement {
  const navigate = useNavigate()
  const { setCurrentGroup } = useContext(GlobalContext)

  // & pull user info from global state
  return (
    <>
      <Navbar />
      <div className="groupBox">
        <h3>
          Select Group
        </h3>
        <hr style={{ width: '80%' }} />
        {tempGroups.map((group: string): ReactElement => (
          <div className="group" key={uuidv4()}>
            {group}
            <div style={{ display: 'flex' }}>
              <button
                className="signInSubmit"
                type="button"
                onClick={() => {
                  if (setCurrentGroup !== undefined) setCurrentGroup(group)
                  navigate('/specificgroup')
                }}
              >
                join

              </button>
              <button
                className="signInSubmit"
                type="button"
              >
                x

              </button>
            </div>
          </div>
        ))}
      </div>

    </>
  )
}

export default GroupSelect
