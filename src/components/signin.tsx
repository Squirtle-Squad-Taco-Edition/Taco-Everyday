/* eslint-disable import/no-extraneous-dependencies */
import React, { type ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import taco from '../assets/taco.png'

function Signin (): ReactElement {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  return (
    <div className="signInPage">
      <div className="signInBox">
        <div className="logoContainer">
          <h1>Not Taco Tuesday</h1>
          <img className="logo" src={taco} alt="taco" />
        </div>
        {showModal
          ? (
            <>
              <input className="signInInput" type="text" placeholder="email" />
              <input className="signInInput" type="text" placeholder="username" />
              <input className="signInInput" type="text" placeholder="password" />
              <input className="signInInput" type="text" placeholder="confirm password" />
            </>
            )
          : (
            <>
              <input className="signInInput" type="text" placeholder="email or username" />
              <input className="signInInput" type="text" placeholder="password" />

            </>
            )}
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
          <div>
            <hr style={{ margin: 0, padding: 0, marginBottom: '30px', width: '100%' }} />
            dont have an account?
            {' '}
            <button
              className="signUp"
              type="button"
              onClick={() => {
                showModal ? setShowModal(false) : setShowModal(true)
              }}
            >
              sign up

            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
