/* eslint-disable import/no-extraneous-dependencies */
import React, { type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import lememe from '../assets/lememe.png'

const tempGroups = ['Spectacolar', 'Will work for tacos']
function Group (): ReactElement {
  const navigate = useNavigate()
  // & pull user info from global state
  return (
    <div className="navbar">
      <img className="logoSmall" src={lememe} alt="" />
      <h1>Welcome to Tacos Everyday</h1>
    </div>
  )
}

export default Group
