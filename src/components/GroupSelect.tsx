/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, type ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { GlobalContext } from './Context'
import Navbar from './Navbar'
import { type GroupObj } from '../../types/types'

function GroupSelect (): ReactElement {
  const navigate = useNavigate()
  const { setCurrentGroup } = useContext(GlobalContext)
  const { setGlobalGroups } = useContext(GlobalContext)

  const posterId = 3

  useEffect(() => {
    void (async function getGroups (): Promise<void> {
      try {
        const response = await fetch(`/api/group/groups/${posterId}`)
        const data: GroupObj[] = await response.json()
        if (setGlobalGroups !== undefined) setGlobalGroups(data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])
  // & pull user info from global state
  return (
    <>
      <Navbar />
      <div className="groupBox">
        <h3>
          Select Tacomunity
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
                  localStorage.setItem('currGroup', JSON.stringify(group))
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
