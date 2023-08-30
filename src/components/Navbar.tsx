/* eslint-disable import/no-extraneous-dependencies */
import React, { type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import lememe from '../assets/lememe.png'

function Navbar (): ReactElement {
  const navigate = useNavigate()
  // & pull messages from global state
  return (
    <div className="navbar">
      <img className="logoSmall" src={lememe} alt="" />
      <h1>Welcome to Tacos Everyday</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button
          className="signUp"
          type="button"
          onClick={() => {
            navigate('/group')
          }}
        >
          Select Group

        </button>
        <button
          className="signUp"
          type="button"
          onClick={() => {
            navigate('/')
          }}
        >
          Logout

        </button>
      </div>
    </div>
  )
}

export default Navbar
