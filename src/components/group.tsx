/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useState, useRef, type ReactElement, useEffect } from 'react'
import { io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
// import CustomScroller from 'react-custom-scroller'
import { type TacoObj } from '../../types/types'
import { GlobalContext } from './Context'
import Navbar from './Navbar'

const tempArr = ['i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos']
function Group (): ReactElement {
  const [message, setMessage] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [taco, setTaco] = useState<TacoObj>()
  const [msgArr, setMsgArr] = useState<string[]>(tempArr)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const socket = io('http://127.0.0.1:3030', { transports: ['websocket'] })
  const { currentGroup } = useContext(GlobalContext)
  // & pull messages from global state
  socket.on('chat message', (msg) => {
    setNewMessage(msg)
  })
  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  async function getTaco (): Promise<void> {
    try {
      const result = await fetch('api/taco/new/3') // TODO dynamically pull group id
      const data = await result.json()
      setTaco(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (taco === undefined) void getTaco()
  }, [])
  useEffect(() => {
    const arr: string[] = [...msgArr]
    if (message !== '' || newMessage !== '') arr.push(newMessage)
    setMsgArr(arr)
    // console.log(newMessage)
  }, [newMessage])
  useEffect(() => {
    scrollToBottom()
  }, [msgArr])
  return (
    <>
      <Navbar />
      {taco !== undefined &&
      (
      <div className="tacoBox">
        <h3 style={{ textAlign: 'center' }}>{taco.label}</h3>
        <img className="logo" src={taco.imageurl} alt="main dish" />
        <div style={{ fontSize: 'small', padding: '10px' }}>{`Taco Description: ${taco.description}`}</div>
        <div className="infoBox">
          <div className="infoSmall">
            <p style={{ fontSize: 'small' }}>{`Servings: ${taco.servings}`}</p>
            <p style={{ fontSize: 'small' }}>{`Time to Cook: ${taco.totalTime} minutes`}</p>
            <p style={{ fontSize: 'small' }}>
              Check out the recipe
              {' '}
              <a style={{ textDecoration: 'underline' }} className="recipeLink" href={taco.url} target="_blank" rel="noreferrer">here</a>
            </p>
          </div>
          <div className="infoSmall">
            <p style={{ fontSize: 'small' }}>{`Calories: ${Math.round(taco.calories)}`}</p>
            {Object.entries(taco.totalNutrients).map(([nutrient, obj]): ReactElement => (
              <p key={uuidv4()} style={{ fontSize: 'small' }}>{`${nutrient}: ${Math.round(obj.quantity)}${obj.unit}`}</p>
            ))}
          </div>
        </div>
      </div>
      )}
      <div className="groupBox">
        <h3 style={{ textAlign: 'center' }}>
          Taco bout it
          {' '}
          <br />
          {localStorage.getItem('currGroup') ?? currentGroup}
        </h3>
        <div className="messageBox">
          {msgArr.map((msg: string): ReactElement => (
            <div className="msg" key={uuidv4()}>
              {msg}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div style={{ display: 'flex', width: '80%', justifyContent: 'space-between', padding: '5px', margin: '5px' }}>
          <input style={{ width: '80%', borderRadius: '5px', border: 'none' }} type="text" value={message} onChange={(e) => { setMessage(e.currentTarget.value) }} />
          <button style={{ border: 'none', borderRadius: '5px', cursor: 'pointer' }} aria-label="Send Message" type="submit" onClick={() => { socket.emit('chat message', message) }}>
            Submit
          </button>
        </div>
      </div>
    </>
  )
}
export default Group
