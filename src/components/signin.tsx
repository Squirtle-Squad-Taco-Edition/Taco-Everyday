/* eslint-disable import/no-extraneous-dependencies */
import React, { type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import taco from '../assets/taco.png'

function Signin (): ReactElement {
  const navigate = useNavigate()
  return (
    <div className="signInBox">
      <div className="logoContainer">
        <h1>Not Taco Tuesday</h1>
        <img className="logo" src={taco} alt="taco" />
      </div>
      <input className="signInInput" type="text" placeholder="email or username" />
      <input className="signInInput" type="text" placeholder="password" />
      <div className="passwordReset">
        Forgot Password?
      </div>
      <button
        className="signInSubmit"
        type="button"
        onClick={() => {
          'thingy'

          navigate('/group')
        }}
      >
        Submit
      </button>
      <div className="signInBottom">
        dont have an account?
        {' '}
        <a>sign up</a>
      </div>
    </div>
  )
}

export default Signin
