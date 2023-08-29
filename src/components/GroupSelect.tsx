/* eslint-disable import/no-extraneous-dependencies */
import React, { type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import lememe from '../assets/lememe.png'

const tempGroups = ['Spectacolar', 'Will work for tacos']
function GroupSelect (): ReactElement {
  const navigate = useNavigate()
  // & pull user info from global state
  return (
    <>
      <div className="navbar">
        <img className="logoSmall" src={lememe} alt="" />
        <h1>Welcome to Tacos Everyday</h1>
      </div>
      <div className="groupBox">
        {tempGroups.map((group: string): ReactElement => (
          <div className="group" key={uuidv4()}>
            {group}
            <div>
              <button
                className="groupButton"
                type="button"
                onClick={() => {
                  'thingy'

                  navigate('/specificgroup')
                }}
              >
                join

              </button>
              <button
                className="groupButton"
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
