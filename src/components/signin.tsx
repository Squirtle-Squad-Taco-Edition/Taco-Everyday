/* eslint-disable import/no-extraneous-dependencies */
import React, { type ReactElement, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import taco from '../assets/taco.png'

function Signin(): ReactElement {
  const [showModal, setShowModal] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')
  const [passMatch, setPassMatch] = useState(true)
  const [exists, setExists] = useState(false)
  const [correctInfo, setCorrectInfo] = useState(true)
  const navigate = useNavigate()

  // & authenticate user and assign info to state
  // ? potentially groups here or maybe later idk

  const handleLogin = async (): Promise<void> => {
    console.log('username, password: ', username, password)
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    const data: boolean = await response.json()
    console.log('data: ', data)
    if (data) navigate('/group')
    else setCorrectInfo(false)
  }

  const handleSignup = async (): Promise<void> => {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    const data: boolean = await response.json()
    if (data) setExists(true)
    else navigate('/group')
  }

  return (
    <div className="signInPage">
      <div className="signInBox">
        <div className="logoContainer">
          <h1>Not Taco Tuesday</h1>
          <img className="logo" src={taco} alt="taco" />
        </div>
        {showModal ? (
          <>
            <div>Sign Up:</div>
            <input
              className="signInInput"
              type="text"
              placeholder="username"
              onChange={e => setUsername(e.target.value)}
            />
            {exists ? <div>Username already exists</div> : null}
            <input
              className="signInInput"
              type="text"
              placeholder="password"
              onChange={e => setPassword(e.target.value)}
            />
            <input
              className="signInInput"
              type="text"
              placeholder="confirm password"
              onChange={e => setPasswordVerify(e.target.value)}
            />
          </>
        ) : (
          <>
            <div>Login:</div>
            <input
              className="signInInput"
              type="text"
              placeholder="username"
              onChange={e => setUsername(e.target.value)}
            />
            <input
              className="signInInput"
              type="text"
              placeholder="password"
              onChange={e => setPassword(e.target.value)}
            />
          </>
        )}
        {passMatch ? null : 'passwords dont match'}
        {correctInfo ? null : 'Username/Password incorrect'}
        <div className="passwordReset">Forgot Password?</div>
        <button
          className="signInSubmit"
          type="button"
          onClick={() => {
            if (!showModal) {
              handleLogin()
            } else if (
              password !== passwordVerify ||
              passwordVerify.length === 0
            ) {
              setPassMatch(false)
            } else handleSignup()
          }}>
          {showModal ? 'Sign Up' : 'Login'}
        </button>
        <div className="signInBottom">
          <div>
            <hr
              style={{
                margin: 0,
                padding: 0,
                marginBottom: '30px',
                width: '100%',
              }}
            />
            {showModal ? 'Have an account?' : 'Dont have an account?'}{' '}
            <button
              className="signUp"
              type="button"
              onClick={() => {
                showModal ? setShowModal(false) : setShowModal(true)
              }}>
              {showModal ? 'Login' : 'Sign up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
