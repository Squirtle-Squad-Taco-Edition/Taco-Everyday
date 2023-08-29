/* eslint-disable import/no-extraneous-dependencies */
import React, { type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import lememe from '../assets/lememe.png'

function Group (): ReactElement {
  return (
    <>
      <div className="navbar">
        <img className="logoSmall" src={lememe} alt="" />
        <h1>Welcome to Tacos Everyday</h1>
      </div>
      <div className="signInBox">
        group page
      </div>

    </>
  )
}

export default Group
